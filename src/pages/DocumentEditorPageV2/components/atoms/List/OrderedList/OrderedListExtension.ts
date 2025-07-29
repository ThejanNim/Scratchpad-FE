import { mergeAttributes, Node, wrappingInputRule } from "@tiptap/core";
import OrderedList from "./OrderedList";
import { ReactNodeViewRenderer } from "@tiptap/react";

const ListItemName = "listItem";
const TextStyleName = "textStyle";

export interface OrderedListOptions {
  itemTypeName: string;
  HTMLAttributes: React.HTMLAttributes<HTMLOListElement>;
  keepMarks: boolean;
  keepAttributes: boolean;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    orderedList: {
      toggleOrderedList: () => ReturnType;
    };
  }
}

export const orderedListInputRegex = /^(\d+)\.\s$/;

export const OrderedListExtension = Node.create<OrderedListOptions>({
  name: "orderedList",

  addOptions() {
    return {
      itemTypeName: "listItem",
      HTMLAttributes: {},
      keepMarks: false,
      keepAttributes: false,
    };
  },

  group: "block list",

  content() {
    return `${this.options.itemTypeName}+`;
  },

  addAttributes() {
    return {
      start: {
        default: 1,
        parseHTML: (element) => {
          return element.hasAttribute("start")
            ? parseInt(element.getAttribute("start") || "", 10)
            : 1;
        },
      },
      type: {
        default: null,
        parseHTML: (element) => element.getAttribute("type"),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "ol",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { start, ...attributesWithoutStart } = HTMLAttributes;

    return start === 1
      ? [
          "ol",
          mergeAttributes(this.options.HTMLAttributes, attributesWithoutStart),
          0,
        ]
      : [
          "ol",
          mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
          0,
        ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(OrderedList);
  },

  addCommands() {
    return {
      toggleOrderedList:
        () =>
        ({ commands, chain }) => {
          if (this.options.keepAttributes) {
            return chain()
              .toggleList(
                this.name,
                this.options.itemTypeName,
                this.options.keepMarks
              )
              .updateAttributes(
                ListItemName,
                this.editor.getAttributes(TextStyleName)
              )
              .run();
          }
          return commands.toggleList(
            this.name,
            this.options.itemTypeName,
            this.options.keepMarks
          );
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      "Mod-Shift-7": () => this.editor.commands.toggleOrderedList(),
    };
  },

  addInputRules() {
    let inputRule = wrappingInputRule({
      find: orderedListInputRegex,
      type: this.type,
      getAttributes: (match) => ({ start: +match[1] }),
      joinPredicate: (match, node) =>
        node.childCount + node.attrs.start === +match[1],
    });

    if (this.options.keepMarks || this.options.keepAttributes) {
      inputRule = wrappingInputRule({
        find: orderedListInputRegex,
        type: this.type,
        keepMarks: this.options.keepMarks,
        keepAttributes: this.options.keepAttributes,
        getAttributes: (match) => ({
          start: +match[1],
          ...this.editor.getAttributes(TextStyleName),
        }),
        joinPredicate: (match, node) =>
          node.childCount + node.attrs.start === +match[1],
        editor: this.editor,
      });
    }
    return [inputRule];
  },
});

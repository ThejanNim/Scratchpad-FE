import { mergeAttributes, Node, wrappingInputRule } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import type React from "react";
import BulletList from "./BulletList";

const ListItemName = "listItem";
const TextStyleName = "textStyle";

export interface BulletListOptions {
  itemTypeName: string;
  HTMLAttributes: React.HTMLAttributes<HTMLUListElement>;
  keepMarks: boolean;
  keepAttributes: boolean;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    bulletList: {
      toggleBulletList: () => ReturnType;
    };
  }
}

export const bulletListInputRegex = /^\s*([-+*])\s$/;

export const BulletListExtension = Node.create<BulletListOptions>({
  name: "bulletList",

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

  parseHTML() {
    return [{ tag: "ul" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['ul', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)]
  },

  addNodeView() {
    return ReactNodeViewRenderer(BulletList);
  },

  addCommands() {
    return {
      toggleBulletList:
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
      "Mod-Shift-8": () => this.editor.commands.toggleBulletList(),
    };
  },

  addInputRules() {
    let inputRule = wrappingInputRule({
      find: bulletListInputRegex,
      type: this.type,
    });

    if (this.options.keepMarks || this.options.keepAttributes) {
      inputRule = wrappingInputRule({
        find: bulletListInputRegex,
        type: this.type,
        keepMarks: this.options.keepMarks,
        keepAttributes: this.options.keepAttributes,
        getAttributes: () => {
          return this.editor.getAttributes(TextStyleName);
        },
        editor: this.editor,
      });
    }
    return [inputRule];
  },
});

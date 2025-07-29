import { mergeAttributes, Node, textblockTypeInputRule } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

import Heading from './Heading';

export type Level = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingOptions {
  levels: Level[];
  HTMLAttributes: React.HTMLAttributes<HTMLHeadingElement>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    heading: {
      /**
       * Set a heading node
       * @param attributes The heading attributes
       * @example editor.commands.setHeading({ level: 1 })
       */
      setHeading: (attributes: { level: Level }) => ReturnType;
      /**
       * Toggle a heading node
       * @param attributes The heading attributes
       * @example editor.commands.toggleHeading({ level: 1 })
       */
      toggleHeading: (attributes: { level: Level }) => ReturnType;
    };
  }
}

export const HeadingExtension = Node.create<HeadingOptions>({
  name: "heading",

  addOptions() {
    return {
      levels: [1, 2, 3, 4, 5, 6],
      HTMLAttributes: {},
    };
  },

  content: "inline*",

  group: "block",

  defining: true,

  addAttributes() {
    return {
      level: {
        default: 1,
        rendered: false,
      },
    };
  },

  parseHTML() {
    return this.options.levels.map((level: Level) => ({
      tag: `h${level}`,
      attrs: { level },
    }));
  },

  renderHTML({ HTMLAttributes }) {
    return ['heading', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(Heading);
  },

  addCommands() {
    return {
      setHeading:
        (attributes) =>
        ({ commands }) => {
          if (!this.options.levels.includes(attributes.level)) {
            return false;
          }

          return commands.setNode(this.name, attributes);
        },
      toggleHeading:
        (attributes) =>
        ({ commands }) => {
          if (!this.options.levels.includes(attributes.level)) {
            return false;
          }

          return commands.toggleNode(this.name, "paragraph", attributes);
        },
    };
  },

  addKeyboardShortcuts() {
    return this.options.levels.reduce(
      (items, level) => ({
        ...items,
        ...{
          [`Mod-Alt-${level}`]: () =>
            this.editor.commands.toggleHeading({ level }),
        },
      }),
      {}
    );
  },

  addInputRules() {
    return this.options.levels.map((level) => {
      return textblockTypeInputRule({
        find: new RegExp(
          `^(#{${Math.min(...this.options.levels)},${level}})\\s$`
        ),
        type: this.type,
        getAttributes: {
          level,
        },
      });
    });
  },
});

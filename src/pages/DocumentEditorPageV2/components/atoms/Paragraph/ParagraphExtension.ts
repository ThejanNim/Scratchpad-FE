import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import Paragraph from './Paragraph'

export interface ParagraphOptions {
  HTMLAttributes: React.HTMLAttributes<HTMLParagraphElement>
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    paragraph: {
      setParagraph: () => ReturnType
    }
  }
}

export const ParagraphExtension = Node.create<ParagraphOptions>({
  name: 'paragraph',

  priority: 1000,

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  group: 'block',

  content: 'inline*',

  parseHTML() {
    return [{ tag: 'p' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['p', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },

  addNodeView() {
    return ReactNodeViewRenderer(Paragraph)
  },

  addCommands() {
    return {
      setParagraph:
        () =>
        ({ commands }) => {
          return commands.setNode(this.name)
        },
    }
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Alt-0': () => this.editor.commands.setParagraph(),
    }
  },
})
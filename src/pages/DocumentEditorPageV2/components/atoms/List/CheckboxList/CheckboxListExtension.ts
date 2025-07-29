/* eslint-disable @typescript-eslint/no-explicit-any */
import { mergeAttributes, Node } from '@tiptap/core'

export interface TaskListOptions {
  itemTypeName: string
  HTMLAttributes: Record<string, any>
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    checkboxList: {
      toggleCheckboxList: () => ReturnType
    }
  }
}

export const CheckboxListExtension = Node.create<TaskListOptions>({
  name: 'checkboxList',

  addOptions() {
    return {
      itemTypeName: 'checkboxItem',
      HTMLAttributes: {},
    }
  },

  group: 'block list',

  content() {
    return `${this.options.itemTypeName}+`
  },

  parseHTML() {
    return [
      {
        tag: `ul[data-type="${this.name}"]`,
        priority: 51,
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['ul', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { 'data-type': this.name, class: "list-none ml-0 pl-0" }), 0]
  },

  addCommands() {
    return {
      toggleCheckboxList:
        () =>
        ({ commands }) => {
          return commands.toggleList(this.name, this.options.itemTypeName)
        },
    }
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Shift-9': () => this.editor.commands.toggleCheckboxList(),
    }
  },
})
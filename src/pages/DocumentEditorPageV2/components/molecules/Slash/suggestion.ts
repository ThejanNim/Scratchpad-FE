import { computePosition, flip, shift } from '@floating-ui/dom'
import { posToDOMRect, ReactRenderer } from '@tiptap/react'
import SlashList from './SlashList'

const updatePosition = (editor, element) => {
  const virtualElement = {
    getBoundingClientRect: () => posToDOMRect(editor.view, editor.state.selection.from, editor.state.selection.to),
  }

  computePosition(virtualElement, element, {
    placement: 'bottom-start',
    strategy: 'absolute',
    middleware: [shift(), flip()],
  }).then(({ x, y, strategy }) => {
    element.style.width = 'max-content'
    element.style.position = strategy
    element.style.left = `${x}px`
    element.style.top = `${y}px`
  })
}

export default {
  items: ({ query }) => {
    return [
      {
        id: 'heading-1',
        text: 'Heading 1',
        action: ({ editor }) => {
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        }
      },
      {
        id: 'heading-2',
        text: 'Heading 2',
        action: ({ editor }) => {
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
      },
      {
        id: 'heading-3',
        text: 'Heading 3',
        action: ({ editor }) => {
          editor.chain().focus().toggleHeading({ level: 3 }).run()
        }
      },
      {
        id: "bullet-list",
        text: "Bullet List",
        action: ({ editor }) => {
          editor.chain().focus().toggleBulletList().run()
        }
      },
      {
        id: "ordered-list",
        text: "Ordered List",
        action: ({ editor }) => {
          editor.chain().focus().toggleOrderedList().run()
        }
      },
      {
        id: "checkbox-list",
        text: "Checkbox List",
        action: ({ editor }) => {
          editor.chain().focus().toggleCheckboxList().run()
        }
      },
    ]
      .filter(item => item.text.toLowerCase().startsWith(query.toLowerCase()))
      .slice(0, 10)
  },

  render: () => {
    let component

    return {
      onStart: props => {
        component = new ReactRenderer(SlashList, {
          props,
          editor: props.editor,
        })

        if (!props.clientRect) {
          return
        }

        component.element.style.position = 'absolute'

        document.body.appendChild(component.element)

        updatePosition(props.editor, component.element)
      },

      onUpdate(props) {
        component.updateProps(props)

        if (!props.clientRect) {
          return
        }

        updatePosition(props.editor, component.element)
      },

      onKeyDown(props) {
        if (props.event.key === 'Escape') {
          component.destroy()

          return true
        }

        return component.ref?.onKeyDown(props)
      },

      onExit() {
        component.element.remove()
        component.destroy()
      },
    }
  },
}
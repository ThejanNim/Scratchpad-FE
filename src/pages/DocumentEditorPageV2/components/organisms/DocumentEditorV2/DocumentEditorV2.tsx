import { EditorContent, EditorContext, useEditor } from "@tiptap/react";
import TextAlign from "@tiptap/extension-text-align";
import suggestion from "../../molecules/Slash/suggestion";
import { HeadingExtension } from "../../atoms/Heading/HeadingExtension";
import { BulletListExtension } from "../../atoms/List/BulletList/BulletListExtension";
import { ListItem } from "../../atoms/List/ListItem/ListItem";
import { OrderedListExtension } from "../../atoms/List/OrderedList/OrderedListExtension";
import Slash from "../../molecules/Slash/Slash";
import { CheckboxListExtension } from "../../atoms/List/CheckboxList/CheckboxListExtension";
import { CheckboxItemExtension } from "../../atoms/List/CheckboxItem/CheckboxItemExtension";
import Document from '@tiptap/extension-document'
import Text from '@tiptap/extension-text'
import Paragraph from '@tiptap/extension-paragraph'
import { UndoRedo } from '@tiptap/extensions'

export default function DocumentEditorV2() {
  const content = "<p>Type a slash</p><p></p><p></p>";

  const editor = useEditor({
    extensions: [
      Document,
      Text,
      Paragraph,
      UndoRedo,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Slash.configure({
        HTMLAttributes: {
          class: "slash",
        },
        suggestion,
      }),
      HeadingExtension.configure({
        levels: [1, 2, 3],
      }),
      BulletListExtension,
      OrderedListExtension,
      CheckboxListExtension,
      ListItem,
      CheckboxItemExtension
    ],
    content: content,
  });

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-7xl mx-8 pt-4">
        <EditorContext.Provider value={{ editor }}>
          <EditorContent editor={editor} />
        </EditorContext.Provider>
      </div>
    </div>
  );
}

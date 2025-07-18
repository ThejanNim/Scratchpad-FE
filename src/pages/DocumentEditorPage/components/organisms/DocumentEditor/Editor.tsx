/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Plate, usePlateEditor } from "platejs/react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  EditorContainer,
  Editor as EditorComponent,
} from "./PlateEditor/editor";
import { EditorKit } from "./EditorKit";
import { useGetDocumentById } from "@/api/document";

interface EditorProps {
  value: any | null;
  documentId: string;
  onChange: (value: any) => void;
}

interface EditableHeadingProps {
  documentId: string;
}

const EditableHeading = ({ documentId }: EditableHeadingProps) => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [title, setTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const { data: document } = useGetDocumentById(documentId);

  const currentTitle = document?.title || "New Document";

  useEffect(() => {
    if (headingRef.current && currentTitle && !isEditing) {
      headingRef.current.innerText =
        currentTitle !== "New Document" ? currentTitle : "";
      setTitle(currentTitle);
    }
  }, [currentTitle, isEditing]);

  const showPlaceholder = !title || title === "New Document";

  return (
    <h1
      ref={headingRef}
      contentEditable
      suppressContentEditableWarning
      spellCheck={false}
      data-placeholder="New Document"
      className={`capitalize sm:px-[max(64px,calc(50%-350px))] font-heading text-[40px] font-bold relative w-full outline-none max-w-full whitespace-pre-wrap break-words p-[3px_2px_0px] text-[1em] font-inherit m-0 min-h-[1em] text-[rgb(50,48,44)] caret-[rgb(50,48,44)] cursor-text ${
        showPlaceholder
          ? "before:absolute before:text-[rgba(55,53,47,0.15)] before:content-[attr(data-placeholder)] before:pointer-events-none"
          : ""
      }`}
      style={{
        direction: "ltr", // Ensure left-to-right text direction
        unicodeBidi: "plaintext",
      }}
    />
  );
};

export default function Editor({ value, documentId, onChange }: EditorProps) {
  console.log(
    "Editor component loaded with documentId:",
    documentId,
    "and value:",
    value
  );
  
  const editor = usePlateEditor({
    plugins: EditorKit,
    value: value
  });

  const saveTimeoutRef = useRef<NodeJS.Timeout>(null);

  const handleChange = useCallback(
    (newValue: any) => {
      const content = newValue.children || newValue;

      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }

      saveTimeoutRef.current = setTimeout(() => {
        console.log("Auto-saving document with content:", content);
        onChange({
          id: documentId,
          content: content.value,
        });
      }, 1000);
    },
    [documentId, onChange]
  );

  return (
    <Plate editor={editor} onChange={handleChange}>
      <EditorContainer>
        <EditableHeading documentId={documentId} />
        <EditorComponent variant="default" />
      </EditorContainer>
    </Plate>
  );
}

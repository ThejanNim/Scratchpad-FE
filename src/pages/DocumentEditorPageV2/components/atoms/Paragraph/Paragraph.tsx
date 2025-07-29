import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import { useRef, useEffect, useState } from "react";

export default function Paragraph() {
  const ref = useRef<HTMLParagraphElement>(null);
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    const checkEmpty = () => {
      if (ref.current) {
        setIsEmpty(ref.current.textContent === "");
      }
    };
    checkEmpty();

    const observer = new MutationObserver(checkEmpty);
    if (ref.current) {
      observer.observe(ref.current, { childList: true, subtree: true, characterData: true });
    }
    return () => observer.disconnect();
  }, []);

  return (
    <NodeViewWrapper>
      <p
        ref={ref}
        data-placeholder="Write, type '/' for commands..."
        className={`relative min-h-[1.5em] ${
          isEmpty
            ? "before:content-[attr(data-placeholder)] before:text-gray-400 before:absolute before:pointer-events-none"
            : ""
        }`}
        contentEditable
        suppressContentEditableWarning
      >
        <NodeViewContent />
      </p>
    </NodeViewWrapper>
  );
}
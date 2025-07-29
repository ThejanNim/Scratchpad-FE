import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";

export default function BulletList() {
  return (
    <NodeViewWrapper>
      <ul className="list-disc pr-4 pl-4 mt-[1.25rem] mr-[1rem] mb-[1.25rem] ml-[0.4rem]">
        <NodeViewContent className="content is-editable"/>
      </ul>
    </NodeViewWrapper>
  );
}
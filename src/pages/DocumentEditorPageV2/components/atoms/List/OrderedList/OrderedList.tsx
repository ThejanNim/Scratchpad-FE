import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import clsx from "clsx";

export default function OrderedList() {
    return (
        <NodeViewWrapper>
            <ol className={clsx("list-decimal pr-[1rem] pl-[1rem] mt-[1.25rem] mr-[1rem] mb-[1.25rem] ml-[0.4rem]")}>
                <NodeViewContent className="content is-editable"/>
            </ol>
        </NodeViewWrapper>
    )
}
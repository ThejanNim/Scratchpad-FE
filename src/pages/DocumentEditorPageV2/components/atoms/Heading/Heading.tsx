import {
  NodeViewContent,
  NodeViewWrapper,
  type ReactNodeViewProps,
} from "@tiptap/react";
import clsx from "clsx";

export default function Heading(props: ReactNodeViewProps<HTMLHeadingElement>) {
  return (
    <NodeViewWrapper>
      <h1
        className={clsx(
          "w-full whitespace-break-spaces break-keep mb-1 py-[3px] px-[2px] font-semibold leading-[1.3]",
          props.node.attrs.level === 1 && "mt-[2rem] text-[1.875rem]",
          props.node.attrs.level == 2 && "mt-[1.4rem] text-[1.5rem]",
          props.node.attrs.level == 3 && "mt-[1rem] text-[1.25rem]"
        )}
      >
        <NodeViewContent className="content is-editable" />
      </h1>
    </NodeViewWrapper>
  );
}

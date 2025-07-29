import clsx from "clsx";

import { useEffect, useImperativeHandle, useState } from "react";

export default function SlashList(props: any) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = (index: any) => {
    const item = props.items[index];

    if (item) {
      const { state } = props.editor;
      const { from } = state.selection;

      props.editor.commands.command(({ tr }) => {
        tr.delete(from - 1, from);
        return true;
      });

      item.action({ editor: props.editor });
    }
  };

  const upHandler = () => {
    setSelectedIndex(
      (selectedIndex + props.items.length - 1) % props.items.length
    );
  };

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length);
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  useEffect(() => setSelectedIndex(0), [props.items]);

  useImperativeHandle(props.ref, () => ({
    onKeyDown: ({ event }) => {
      if (event.key === "ArrowUp") {
        upHandler();
        return true;
      }

      if (event.key === "ArrowDown") {
        downHandler();
        return true;
      }

      if (event.key === "Enter") {
        enterHandler();
        return true;
      }

      return false;
    },
  }));

  return (
    <div className="min-w-[180px] w-80 bg-white rounded-[10px] slash-border overflow-y-auto max-h-[40vh]">
      <div className="text-[rgb(115,114,110)] text-xs font-medium leading-[120%] select-none px-3 py-2">Basic Blocks</div>
      {props.items.length ? (
        props.items.map((item, index) => (
          <div
            className={clsx(
              "flex gap-2 rounded-[6px] items-center text-sm mx-2 px-1 h-8 opacity-[0.9] hover:bg-[rgba(55,53,47,0.06)]",
            )}
            key={index}
            onClick={() => selectItem(index)}
          >
            <item.icon width={20} height={20} fill="#32302c" stroke="#32302c"/>
            {item.text}
          </div>
        ))
      ) : (
        <div className="item">No result</div>
      )}
    </div>
  );
}

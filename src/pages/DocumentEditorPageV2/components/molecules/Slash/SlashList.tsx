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
    <div className="bg-white border border-gray-300 rounded-lg flex flex-col gap-[0.1rem] overflow-auto p-2 relative">
      {props.items.length ? (
        props.items.map((item, index) => (
          // index === selectedIndex ? 'is-selected' : ''
          <button
            className={clsx(
              "items-center bg-transparent flex gap-1 text-right w-full hover:bg-gray-100",
              index === selectedIndex && "!bg-gray-200"
            )}
            key={index}
            onClick={() => selectItem(index)}
          >
            {item.text}
          </button>
        ))
      ) : (
        <div className="item">No result</div>
      )}
    </div>
  );
}

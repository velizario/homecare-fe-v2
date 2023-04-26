import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import classNames from "../../../../helpers/classNames";
import { SelectionOption } from "../../../../types/types";

type SelectionProps = {
  disabled: boolean;
  selected: SelectionOption | null;
  setSelected: React.Dispatch<React.SetStateAction<SelectionOption | null>>;
  selections: SelectionOption[];
  validOptions: SelectionOption[];
  selectClass: string;
};

export default function SelectionDropdown({
  selected,
  disabled,
  setSelected,
  selections,
  validOptions,
  selectClass,
}: SelectionProps) {
  const [open, setOpen] = useState(false);
  function updateSelection(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const selectedId = Number(e.currentTarget.dataset.id);
    const selectedChoice = selections.find((item) => item.id === selectedId);
    if (!selectedChoice) return;
    setSelected(selectedChoice);
  }

  const dismissDropdown = (e: MouseEvent) => {
    const clickedOutside = (e.target as HTMLElement).closest(`${`.` + selectClass}`) == null;
    if (clickedOutside) setOpen(false);
  };

  useEffect(() => {
    if (open) document.addEventListener("click", dismissDropdown);
    return () => {
      document.removeEventListener("click", dismissDropdown);
    };
  }, [open]);

  // TODO: handle click outside
  return (
    <div className="relative w-full">
      <div className={selectClass}>
        <div
          onClick={() => !disabled && setOpen((isOpen) => !isOpen)}
          className={classNames(
            disabled
              ? "bg-gray-50 text-gray-600"
              : open
              ? " ring-2 ring-inset ring-indigo-600"
              : "bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300",
            "w-full cursor-pointer rounded-md border-0 py-1.5 pl-3 pr-10 sm:text-sm sm:leading-6"
          )}
        >
          {`${selected?.value || "(избери)"}`}
        </div>
        <button
          onClick={() => !disabled && setOpen((isOpen) => !isOpen)}
          className={classNames(
            disabled ? "hidden" : "absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
          )}
        >
          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </button>
      </div>

      <div
        className={classNames(
          "z-10 mt-1 flex max-h-64 w-full flex-col overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm",
          open ? "absolute" : "hidden"
        )}
      >
        {selections.map((item) => (
          <div
            onClick={updateSelection}
            data-id={item.id}
            key={item.id}
            className={classNames(
              "p-2 text-sm ",
              selected?.id === item.id
                ? "cursor-pointer bg-indigo-600 text-white"
                : validOptions.find((option) => option.id === item.id)
                ? "cursor-pointer hover:bg-neutral-100"
                : "pointer-events-none cursor-default text-gray-400  line-through"
            )}
          >
            <p>{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { FieldValues, Path, PathValue, UseFormSetValue } from "react-hook-form";
import classNames from "../helpers/classNames";
import { SelectionOption } from "../types/types";


// TODO check where else to use this component
interface TSelectionDropdown<T extends FieldValues> {
  setValue: UseFormSetValue<T>;
  defaultValue: string;
  name: string;
  disabled?: boolean;
  selections: SelectionOption[];
  validOptions?: SelectionOption[];
  label: string;
}

export default function ComboSingleSelect<K extends FieldValues>({
  selections,
  label,
  name,
  defaultValue,
  setValue,
  validOptions,
  disabled = false,
}: TSelectionDropdown<K>) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selection, setSelection] = useState(defaultValue);

  const filteredSelections =
    query === ""
      ? selections
      : selections.filter((selection) => {
          return selection.value.toLowerCase().includes(query.toLowerCase());
        });

  useEffect(() => {
    if (query.length > 0 && open === false) setOpen(true);
  }, [filteredSelections]);

  function updateSelection(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const selectedId = Number(e.currentTarget.dataset.id);
    const selectedChoice = selections.find((item) => item.id === selectedId);
    if (!selectedChoice) return;
    setQuery("");
    setSelection(selectedChoice.value);
    setValue(name as Path<K>, selectedChoice.value as PathValue<K, Path<K>>);
  }

  const dismissDropdown = (e: MouseEvent) => {
    const clickedOutside = (e.target as HTMLElement).closest(`${`.` + name}`) == null;
    if (clickedOutside) setOpen(false);
  };

  useEffect(() => {
    if (open) document.addEventListener("click", dismissDropdown);
    return () => {
      document.removeEventListener("click", dismissDropdown);
    };
  }, [open]);

  return (
    <div className="relative sm:col-span-3">
      <label htmlFor={name} className="block text-sm font-normal text-gray-900">
        {label}
      </label>
      <div className={classNames(`relative mt-1  ${name}`)}>
        <input
          className={classNames(
            disabled
              ? "bg-gray-50 text-gray-600"
              : "bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600",
            open ? "ring-2 ring-inset ring-indigo-600" : "",
            "w-full rounded-md border-0 py-1.5 pl-3 pr-10  sm:text-sm sm:leading-6"
          )}
          onChange={(event) => {
            const newValue = event.target.value;
            setQuery(newValue);
            setSelection(newValue);
            setValue(name as Path<K>, newValue as PathValue<K, Path<K>>);
            // setValue("visitFrequency" as Path<K>, { id: selectedId } as PathValue<K, Path<K>>);
          }}
          value={selection}
        />
        <button
          type="button"
          onClick={() => {
            !disabled && setOpen((isOpen) => !isOpen);
            setQuery("");
          }}
          className={classNames(disabled ? "hidden" : "absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none")}
        >
          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </button>
      </div>

      <div
        className={classNames(
          "absolute z-10 mt-1 flex max-h-64 w-full flex-col overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 transition-opacity focus:outline-none sm:text-sm",
          open ? "opacity-100" : " invisible opacity-0"
        )}
      >
        {filteredSelections.map((item) => (
          <div
            onClick={updateSelection}
            data-id={item.id}
            key={item.id}
            className={classNames(
              "p-2 text-sm ",
              query === item.value
                ? "cursor-pointer bg-indigo-600 text-white"
                : (validOptions || selections).find((option) => option.id === item.id)
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

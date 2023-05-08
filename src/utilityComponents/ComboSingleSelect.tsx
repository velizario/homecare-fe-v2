import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { Control, FieldValues, Path, PathValue, useController, UseFormSetValue } from "react-hook-form";
import classNames from "../helpers/classNames";
import { SelectionOption } from "../types/types";

// TODO forbid entering free text, maybe via some validation
// TODO enable mouse events - mouse up/down, enter, escape
interface TSelectionDropdown<T extends FieldValues> {
  name: string;
  disabled?: boolean;
  control: Control<T, object>;
  options: SelectionOption[];
  validOptions?: SelectionOption[];
  label: string;
}

export default function ComboSingleSelect<K extends FieldValues>({ options, label, name, control, validOptions, disabled = false }: TSelectionDropdown<K>) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState<string | null>(null);

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name: name as Path<K>,
    control,
  });

  const filteredOptions =
    query === "" || query === null
      ? options
      : options.filter((option) => {
          return option.value.toLowerCase().includes(query.toLowerCase());
        });

  useEffect(() => {
    if (query && query.length > 0 && open === false) setOpen(true);
  }, [filteredOptions]);

  function updateSelection(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const selectedId = Number(e.currentTarget.dataset.id);
    const selectedChoice = options.find((item) => item.id === selectedId);
    if (!selectedChoice) return;
    setQuery(null);
    onChange(selectedChoice);
  }

  const dismissDropdown = (e: MouseEvent) => {
    const clickedOutside = (e.target as HTMLElement).closest(`${`.` + name}`) == null;
    if (clickedOutside) {
      setQuery(null);
      setOpen(false);
    }
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
              ? "bg-gray-50 text-gray-600 pointer-events-none"
              : "bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600",
            open ? "ring-2 ring-inset ring-indigo-600" : "",
            "w-full rounded-md border-0 py-1.5 pl-3 pr-10  sm:text-sm sm:leading-6"
          )}
          onChange={(event) => {
            const newValue = event.target.value;
            setQuery(newValue);
          }}
          value={`${query ?? (value?.value || "")}`}
        />
        <button
          type="button"
          onClick={() => {
            !disabled && setOpen((isOpen) => !isOpen);
            setQuery(null);
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
        {filteredOptions.map((item) => (
          <div
            onClick={updateSelection}
            data-id={item.id}
            key={item.id}
            className={classNames(
              "p-2 text-sm ",
              query === item.value
                ? "cursor-pointer bg-indigo-600 text-white"
                : (validOptions || options).find((option) => option.id === item.id)
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

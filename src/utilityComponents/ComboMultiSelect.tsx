import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useEffect, useRef, useState } from "react";
import { Control, FieldValues, Path, PathValue, useController, UseFormSetValue } from "react-hook-form";
import classNames from "../helpers/classNames";
import { toggleSelectionOption } from "../helpers/helperFunctions";
import { SelectionOption } from "../types/types";
import Badge from "./Badge";

// TODO forbid entering free text, maybe via some validation
// TODO enable mouse events - mouse up/down, enter, escape
interface TComboMultiSelect<T extends FieldValues> {
  name: string;
  id: string;
  control: Control<T, object>;
  options: SelectionOption[];
  validOptions?: SelectionOption[];
  disabled?: boolean;
  multiSelect?: boolean;
  label?: string;
}

export default function ComboMultiSelect<K extends FieldValues>({
  options,
  name,
  id,
  control,
  validOptions = options,
  disabled = false,
  multiSelect = true,
  label,
}: TComboMultiSelect<K>) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState<string | null>(null);

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name: name as Path<K>,
    control,
  });

  const selections = (value || []) as SelectionOption[];

  const filteredOptions =
    query === "" || query === null
      ? options
      : options.filter((option) => {
          return option.value.toLowerCase().includes(query.toLowerCase());
        });

  useEffect(() => {
    if (query && query.length > 0 && open === false) setOpen(true);
  }, [filteredOptions]);

  const dismissDropdown = (e: MouseEvent) => {
    const clickedOutside = (e.target as HTMLElement).closest(`${`.` + id}`) == null;
    if (clickedOutside) {
      setQuery(null);
      setOpen(false);
    }
  };

  const selectionIncludes = (selectedItem: SelectionOption, selection: SelectionOption[]) => {
    return selection.findIndex((item) => item.id === selectedItem.id) >= 0;
  };

  useEffect(() => {
    document.addEventListener("click", dismissDropdown);
    return () => {
      document.removeEventListener("click", dismissDropdown);
    };
  }, []);

  return (
    <div className="relative sm:col-span-3">
      <label htmlFor={id} className="block text-sm font-normal text-gray-900">
        {label}
      </label>
      <div className={classNames(`relative mt-1  ${id}`)}>
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
            !newValue && setOpen(false);
          }}
          value={query ?? (multiSelect ? "" : selections[0]?.value || "")}
        />
        <button
          type="button"
          onClick={() => {
            !disabled && setOpen((isOpen) => !isOpen);
          }}
          className={classNames(disabled ? "hidden" : "absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none")}
        >
          <ChevronUpDownIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
        </button>
      </div>
      <div
        className={classNames(
          "z-10 mt-1 flex max-h-64 w-full flex-col overflow-auto overscroll-contain rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none  sm:text-sm",
          open ? "absolute" : "hidden",
          multiSelect ? id : ""
        )}
      >
        {filteredOptions.map((option) => (
          <div
            onClick={() => {
              if (multiSelect) {
                onChange(toggleSelectionOption(option, selections || []));
              } else {
                setQuery(null);
                onChange([option]);
              }
            }}
            key={option.id}
            className={classNames(
              "group relative cursor-pointer p-2 text-sm hover:bg-indigo-600 hover:text-white",
              validOptions.find((item) => item.id === option.id)
                ? selectionIncludes(option, selections)
                  ? "font-semibold text-indigo-600 "
                  : "text-gray-800"
                : "pointer-events-none cursor-default text-gray-400 line-through"
            )}
          >
            <p>{option.value}</p>
            {selectionIncludes(option, selections) && (
              <span className={classNames("absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-hover:text-white")}>
                <CheckIcon className="h-5 w-5" aria-hidden="true" />
              </span>
            )}
          </div>
        ))}
      </div>
      {multiSelect && (
        <div className="mt-1 flex flex-wrap gap-y-2 leading-relaxed line-clamp-2">
          {selections.map((selection) => (
            <Badge key={selection.id} styles="whitespace-nowrap">
              {selection?.value}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}

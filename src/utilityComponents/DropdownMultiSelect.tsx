import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import classNames from "../helpers/classNames";
import { toggleSelectionOption } from "../helpers/helperFunctions";
import { SelectionOption } from "../types/types";
import InputErrorMessage from "./InputErrorMessage";

// Configured for multiple selections by default, can be changed by parent Component via 'multiSelect={false}' prop)

interface TDropdownMultiSelect<T extends FieldValues> {
  name: string;
  label: string;
  control: Control<T, object>;
  id: string;
  className?: string;
  options: SelectionOption[];
  validOptions?: SelectionOption[];
  disabled?: boolean;
  multiSelect? : boolean
}

const truncArrayToText = (arr: SelectionOption[] | undefined) => {
  if (!arr) return "";
  const joinedString = arr.map((item) => item.value).join(", ");
  return joinedString.length > 30 ? joinedString.slice(0, 30).concat("....") : joinedString;
};

export default function DropdownMultiSelect<K extends FieldValues>({
  options,
  className,
  name,
  id,
  label,
  control,
  validOptions = options,
  disabled = false,
  multiSelect = true,
}: TDropdownMultiSelect<K>) {
  const [open, setOpen] = useState(false);

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name: name as Path<K>,
    control,
  });

  const selections = (value || []) as SelectionOption[];



  const selectionIncludes = (selectedItem: SelectionOption, selection: SelectionOption[]) => {
    return selection.findIndex((item) => item.id === selectedItem.id) >= 0;
  };

  // I dont need error, but will leave it for building other components from this
  const errorMessage = error?.message?.toString();

  const dismissDropdown = (e: MouseEvent) => {
    const clickedOutside = (e.target as HTMLElement).closest(`${`.` + id}`) == null;
    if (clickedOutside) setOpen(false);
  };

  useEffect(() => {
    if (open) document.addEventListener("click", dismissDropdown);
    return () => {
      document.removeEventListener("click", dismissDropdown);
    };
  }, [open]);

  return (
    <div className={classNames("relative", className)}>
      <label htmlFor={id} className="block text-sm font-normal text-gray-900">
        {label}
      </label>

      <div className={classNames("relative mt-1", id)}>
        <div
          onClick={() => !disabled && setOpen((isOpen) => !isOpen)}
          className={classNames(
            disabled
              ? "bg-gray-50 text-gray-600"
              : open
              ? " ring-2 ring-inset ring-indigo-600"
              : "bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300",
            "min-h-[2.375rem] w-full cursor-pointer rounded-md border-0 py-1.5 pl-3 pr-10 text-sm sm:leading-6"
          )}
        >
          {`${truncArrayToText(selections)}`}
        </div>
        <button
          type="button"
          onClick={() => !disabled && setOpen((isOpen) => !isOpen)}
          className={classNames(disabled ? "hidden" : "absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none")}
        >
          <ChevronDownIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
        </button>
      </div>

      <div
        className={classNames(
          open ? "ring-2 ring-inset ring-indigo-600" : "",
          value || value?.value ? "font-medium" : "font-light shadow-sm ring-1 ring-inset ring-gray-300",
          "text-gray-900 bg-white  h-[2.25rem] w-full cursor-pointer rounded-md border-0 py-1.5 pl-3 pr-10 shadow-sm ring-1 ring-inset ring-gray-300 transition-colors sm:text-sm  sm:leading-6",
          disabled ? "pointer-events-none bg-gray-100 text-gray-500 ring-gray-200" : "",
        )}
      >
        {options.map((option) => (
          <div
            onClick={() => (multiSelect ? onChange(toggleSelectionOption(option, selections || [])) : onChange([option]))}
            data-id={option.id}
            key={option.id}
            className={classNames(
              "group relative cursor-pointer p-2 text-sm hover:bg-neutral-100 font-normal",
              validOptions.find((item) => item.id === option.id)
                ? selectionIncludes(option, selections)
                  ? "cursor-pointer bg-indigo-600 text-white"
                  : "text-gray-800"
                : "pointer-events-none cursor-default text-gray-400 line-through"
            )}
          >
            <p>{option.value}</p>
            {selectionIncludes(option, selections) && (
              <span className={classNames("absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 ")}>
                <CheckIcon className="h-5 w-5" aria-hidden="true" />
              </span>
            )}
          </div>
        ))}
      </div>
      <InputErrorMessage>{errorMessage}</InputErrorMessage>
    </div>
  );
}

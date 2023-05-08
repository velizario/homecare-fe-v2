import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import classNames from "../helpers/classNames";
import { SelectionOption } from "../types/types";
import InputErrorMessage from "./InputErrorMessage";

// TODO use ComboSingleSelect practices

interface TDropdownSingleSelect<T extends FieldValues> {
  name: string;
  label: string;
  control: Control<T, object>;
  options: SelectionOption[];
  className?: string;
  validOptions?: SelectionOption[];
  disabled?: boolean;
}

export default function DropdownSingleSelect<K extends FieldValues>({
  options,
  name,
  label,
  control,
  className,
  validOptions = options,
  disabled = false,
}: TDropdownSingleSelect<K>) {
  const [open, setOpen] = useState(false);

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name: name as Path<K>,
    control,
  });

  // I dont need error, but will leave it for building other components from this
  const errorMessage = error?.message?.toString();

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
    <div className={classNames("relative", className || "")}>
      <label htmlFor={name} className="block text-sm font-normal text-gray-900">
        {label}
      </label>

      <div className={classNames("relative mt-1", name)}>
        <div
          onClick={() => !disabled && setOpen((isOpen) => !isOpen)}
          className={classNames(
            disabled
              ? "pointer-events-none bg-gray-50 text-gray-600"
              : open
              ? " ring-2 ring-inset ring-indigo-600"
              : "bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300",
            "w-full cursor-pointer rounded-md border-0 py-1.5 pl-3 pr-10 sm:text-sm sm:leading-6"
          )}
        >
          {`${value?.value || value || "(избери)"}`}
        </div>
        <button
          type="button"
          onClick={() => !disabled && setOpen((isOpen) => !isOpen)}
          className={classNames(disabled ? "hidden" : "absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none")}
        >
          <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </button>
      </div>

      <div
        className={classNames(
          "z-10 mt-1 flex max-h-64 w-full flex-col overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm",
          open ? "absolute" : "hidden"
        )}
      >
        {options.map((option) => (
          <div
            onClick={() => onChange(option)}
            data-id={option.id}
            key={option.id}
            className={classNames(
              "p-2 text-sm ",
              value?.id === option.id
                ? "cursor-pointer bg-indigo-600 text-white"
                : validOptions.find((option) => option.id === option.id)
                ? "cursor-pointer hover:bg-neutral-100"
                : "pointer-events-none cursor-default text-gray-400  line-through"
            )}
          >
            <p>{option.value}</p>
          </div>
        ))}
      </div>

      <InputErrorMessage>{errorMessage}</InputErrorMessage>
    </div>
  );
}

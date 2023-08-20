import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import classNames from "../helpers/classNames";
import { SelectionOption } from "../types/types";
import InputErrorMessage from "./InputErrorMessage";

// TODO use ComboSingleSelect practices

interface TDropdownSingleSelect<T extends FieldValues> {
  name: string;
  label: string;
  control: Control<T, object>;
  options: SelectionOption[];
  id: string;
  className?: string;
  validOptions?: SelectionOption[];
  disabled?: boolean;
  placeholder?: boolean;
  integratedLabel?: boolean;
}

export default function DropdownSingleSelect<K extends FieldValues>({
  options,
  name,
  id,
  label,
  control,
  className,
  validOptions = options,
  disabled = false,
  placeholder = true,
  integratedLabel = false,
}: TDropdownSingleSelect<K>) {
  const [open, setOpen] = useState(false);

  const placeholderValue = integratedLabel ? `Избери ${label.toLocaleLowerCase()}` : "(избери)"

  useEffect(() => {
    if (!placeholder) return;
    options.unshift({ id: -1, value: placeholderValue });
  }, [options]);

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name: name as Path<K>,
    control,
  });

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
    <div className={classNames("relative", className || "")}>
      {!integratedLabel && <label htmlFor={id} className="block text-sm font-normal text-gray-900">
        {label}
      </label>}

      <div className={classNames("relative mt-1", id)}>
        <div
          onClick={() => !disabled && setOpen((isOpen) => !isOpen)}
          className={twMerge(
            open ? "ring-2 ring-inset ring-indigo-600" : "",
            value || value?.value ? "font-medium" : "font-light shadow-sm ring-1 ring-inset ring-gray-300",
            "text-gray-900 bg-white  h-[2.25rem] w-full cursor-pointer rounded-md border-0 py-1.5 pl-3 pr-10 shadow-sm ring-1 ring-inset ring-gray-300 transition-colors sm:text-sm  sm:leading-6",
            disabled ? "pointer-events-none bg-gray-100 text-gray-500 ring-gray-200" : "",
          )}
        >
          {`${value?.value || value || placeholderValue}`}
        </div>
        <button
          type="button"
          onClick={() => !disabled && setOpen((isOpen) => !isOpen)}
          className={classNames(disabled ? "hidden" : "absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none")}
        >
          <ChevronDownIcon className={classNames("h-5 w-5 text-gray-600")} aria-hidden="true" />
        </button>
      </div>

      <div
        className={classNames(
          "absolute z-10 mt-1 flex max-h-64 w-full flex-col overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5  focus:outline-none sm:text-sm",
          open ? "opacity-100 translate-y-0  transition-all duration-200" : " invisible opacity-0 -translate-y-1"
        )}
      >
        {options.map((option) => (
          <div
            onClick={() => onChange(option.id > 0 ? option : null)}
            data-id={option.id}
            key={option.id}
            className={classNames(
              "p-2 text-sm font-normal min-h-[36px] flex",
              value?.id === option.id
                ? "cursor-pointer bg-indigo-600 text-white"
                : validOptions.find((validOption) => validOption.id === option.id)
                ? "cursor-pointer hover:bg-neutral-100"
                : "pointer-events-none cursor-default text-gray-400  line-through"
            )}
          >
            <p >{option.value}</p>
          </div>
        ))}
      </div>

      <InputErrorMessage>{errorMessage}</InputErrorMessage>
    </div>
  );
}

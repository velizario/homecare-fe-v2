import { useState } from "react";
import { FieldPath, FieldValues, Path, PathValue, UseFormSetValue } from "react-hook-form";
import classNames from "../helpers/classNames";
import { type SelectionOption } from "../types/types";

interface RadioGroupProps<T extends FieldValues> {
  options: SelectionOption[];
  // onClick: (id: string) => void;
  styles?: string;
  name: FieldPath<T>;
  setValue: UseFormSetValue<T>;
}

export default function RadioGroup<K extends FieldValues>({
  options,
  styles,
  name,
  setValue,
}: RadioGroupProps<K>) {

  const [activeId, setActiveId] = useState<string | undefined>()

  const onSelect = (e: React.SyntheticEvent<HTMLDivElement>) => {
    (e.currentTarget.querySelector("input") as HTMLInputElement).focus();
    setActiveId(e.currentTarget.dataset.id);
    setValue(name as Path<K>, e.currentTarget.dataset.id as PathValue<K, Path<K>>);
  };

  const stopPrapagate = (e: React.SyntheticEvent) => {
    e.stopPropagation();
  };

  return (
    <fieldset className={classNames("mt-3")}>
      <legend className="sr-only">Plan</legend>
      <div className={classNames(styles ?? "flex flex-col space-y-5")}>
        {options.map((option) => (
          <div
            id={name}
            key={option.id}
            data-id={option.id}
            onClick={onSelect}
            className="relative flex cursor-pointer items-start"
          >
            <div className="flex h-5 items-center">
              <input
                id={`${name}-${option.id}`}
                checked={option.id === activeId}
                onChange={stopPrapagate}
                aria-describedby={`${option.id}-description`}
                name={name}
                type="radio"
                className="mt-1 h-5 w-5 cursor-pointer border-gray-300 text-indigo-600 transition-all duration-300 focus:ring-indigo-500"
              />
            </div>
            <div className="ml-3">
              <label
                htmlFor={`${name}-${option.id}`}
                onClick={stopPrapagate}
                className={classNames(
                  "cursor-pointer text-gray-800",
                  activeId === option.id ? "font-medium text-indigo-700" : ""
                )}
              >
                {option.name}
              </label>
              <p className="mt-1.5 cursor-pointer text-sm font-light text-gray-500">{option.description}</p>
            </div>
          </div>
        ))}
      </div>
    </fieldset>
  );
}

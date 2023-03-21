import { MouseEventHandler, useState } from "react";
import { FieldPath, FieldValues, Path, PathValue, UseFormSetValue } from "react-hook-form";
import { type SelectionOption } from "../types/types";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface CardChoiceProps<T extends FieldValues> {
  handleUpdate: MouseEventHandler<HTMLDivElement>;
  options: SelectionOption[];
  styles?: string;
  activeId: string[];
}

export default function CardChoice<K extends FieldValues>({
  options,
  styles,
  handleUpdate,
  activeId,
}: CardChoiceProps<K>) {
  return (
    <div className={classNames("mt-3 flex flex-wrap gap-3 whitespace-nowrap sm:col-span-4", styles ?? "")}>
      {options.map((option) => (
        <div
          key={option.id}
          data-id={option.id}
          onClick={handleUpdate}
          className={classNames(
            activeId.includes(option.id)
              ? "border-transparent bg-indigo-600 text-white"
              : "border-gray-200 bg-white text-gray-600 hover:bg-indigo-50",
            "flex flex-1 cursor-pointer justify-center gap-1 rounded-full border py-3 px-5 text-sm shadow-order "
          )}
        >
          <span className="text-base">{option.name}</span>
        </div>
      ))}
    </div>
  );
}

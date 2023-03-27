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
    <div className={classNames("mt-4 flex  flex-wrap gap-4 whitespace-nowrap ", styles ?? "")}>
      {options.map((option) => (
        <div
          key={option.id}
          data-id={option.id}
          onClick={handleUpdate}
          className={classNames(
            activeId.includes(option.id)
              ? "border-transparent  text-indigo-700 ring-1 ring-indigo-400 bg-indigo-50 "
              : " text-gray-600 ring-1 ring-indigo-100",
            "flex flex-1 cursor-pointer justify-center gap-1 rounded-full py-3 px-5 text-sm shadow-sm hover:ring-indigo-300"
          )}
        >
          <span className="text-base">{option.name}</span>
        </div>
      ))}
    </div>
  );
}

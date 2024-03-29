import { useState } from "react";
import { FieldValues, Path, PathValue, UseFormSetValue } from "react-hook-form";
import classNames from "../helpers/classNames";
import { EssentialDataServiceType } from "../types/types";

type ListSingleSelectProps<T extends FieldValues> = {
  options: EssentialDataServiceType[];
  name: string;
  setValue: UseFormSetValue<T>;
};

export default function ListSingleSelect<K extends FieldValues>({ options, name, setValue }: ListSingleSelectProps<K>) {
  const [activeValue, setActiveValue] = useState<number | null>(null);
  return (
    <ul role="list" className="space-y-4 py-3 text-sm font-medium text-gray-900">
      <span className="text-xs font-normal uppercase text-gray-900">Категории</span>
      {options.map((category) => (
        <li key={category.value}>
          <span
            onClick={() => {
              setActiveValue(category.id);
              setValue(name as Path<K>, {service:  category } as PathValue<K, Path<K>>);
            }}
            className={classNames("ml-2 inline-block cursor-pointer text-gray-900 hover:text-indigo-600", category.id === activeValue ? "text-indigo-600 font-semibold" : null)}
          >
            {category.value}
          </span>
        </li>
      ))}
    </ul>
  );
}

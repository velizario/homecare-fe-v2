import { FieldValues } from "react-hook-form";
import { type SelectionOption } from "../types/types";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface CardChoiceProps<T extends FieldValues> {
  handleUpdate: (e: number) => void;
  options: SelectionOption[];
  styles?: string;
  selections: number[];
}

export default function CardChoice<K extends FieldValues>({
  options,
  styles,
  handleUpdate,
  selections,
}: CardChoiceProps<K>) {

  function updateHandler (e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const selectedId = Number(e.currentTarget.dataset.id);
    if (!selectedId) return;
    handleUpdate(selectedId);
  }

  return (

    <div className={classNames("mb-10 flex flex-wrap gap-4 whitespace-nowrap p-10 border rounded-2xl bg-stone-50", styles ?? "")}>
      
      {options.map((option) => (
        <div
          key={option.id}
          data-id={option.id}
          onClick={updateHandler}
          className={classNames(
            selections.includes(option.id)
              ? "border-transparent  text-indigo-700 ring-1 ring-indigo-300 bg-indigo-50 "
              : "text-gray-600 ring-1 ring-indigo-100 bg-white",
            "flex flex-1 cursor-pointer justify-center gap-1 rounded-full py-3 px-5 text-sm shadow-sm hover:ring-indigo-200"
          )}
        >
          <span className="text-base">{option.value}</span>
        </div>
      ))}
    </div>
  );
}

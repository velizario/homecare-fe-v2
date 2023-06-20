import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import classNames from "../../../../helpers/classNames";
import { weekDaySelections } from "../../../../store/static";
import { SelectionOption } from "../../../../types/types";

export const daysOptions = [
  { id: 1, option: "Пн" },
  { id: 2, option: "Вт" },
  { id: 3, option: "Ср" },
  { id: 4, option: "Чт" },
  { id: 5, option: "Пт" },
  { id: 6, option: "Сб" },
  { id: 7, option: "Нд" },
];

type DaySelectionProps = {
  disabled: boolean;
  selected: SelectionOption | null;
  setSelected: React.Dispatch<React.SetStateAction<SelectionOption | null>>;
  validOptions : SelectionOption[]
};

export default function DaySelection({selected, disabled, setSelected, validOptions }: DaySelectionProps) {
  const [open, setOpen] = useState(false);


  console.log(validOptions)
  function updateVisitDay(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const selectedId = Number(e.currentTarget.dataset.id);
    const selectedChoice = weekDaySelections.find((day) => day.id === selectedId);
    if (!selectedChoice) return;
    console.log("selected! ", selectedChoice)
    setSelected(selectedChoice);
  }
  useEffect(() => {
    console.log("koe?", selected)
  }, [selected])

  const dismissDropdown = (e: MouseEvent) => {
    const clickedOutside = (e.target as HTMLElement).closest(".daySelect") == null;
    console.log((e.target as HTMLElement).closest(".daySelect"));
    if (clickedOutside) setOpen(false);
  };

  useEffect(() => {
    document.addEventListener("click", dismissDropdown);
    return () => {
      document.removeEventListener("click", dismissDropdown);
    };
  }, []);

  // TODO: handle click outside
  return (
    <div className="relative w-full">
      <div className="daySelect">
        <div
          onClick={() => !disabled && setOpen((isOpen) => !isOpen)}
          className={classNames(
            disabled
              ? "bg-gray-50 text-gray-600"
              : "cursor-pointer bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600",
            "w-full rounded-md border-0 py-1.5 pl-3 pr-10  sm:text-sm sm:leading-6"
          )}
        >
          {`${selected?.value || "(избери)"}`}
        </div>
        <button
          onClick={() => !disabled && setOpen((isOpen) => !isOpen)}
          className={classNames(
            disabled ? "hidden" : "absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
          )}
        >
          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </button>
      </div>

      <div
        className={classNames(
          "z-10 mt-1 grid max-h-60 w-full grid-cols-7 gap-2 rounded-md bg-white p-2  text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm",
          open ? "absolute" : "hidden"
        )}
      >
        {daysOptions.map((day) => (
          <div
            onClick={updateVisitDay}
            data-id={day.id}
            key={day.id}
            className={classNames(
              "flex h-10 w-10 items-center justify-center rounded-md text-sm leading-tight",
              selected?.id === day.id
                ? "cursor-pointer bg-violet-100"
                : validOptions.find(option => option.id === day.id)
                ? "cursor-pointer hover:bg-neutral-100"
                : "pointer-events-none cursor-default text-gray-400  line-through"
            )}
          >
            <p>{day.option}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

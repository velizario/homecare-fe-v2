import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { FieldValues, Path, PathValue, UseFormSetValue } from "react-hook-form";
import Schedule from "../../assets/schedule.jpg";
import classNames from "../../helpers/classNames";
import { type SelectionOption } from "../../types/types";
import CardChoice from "../../utilityComponents/CardChoice";

interface CreateOrderInputProps<T extends FieldValues> {
  setValue: UseFormSetValue<T>;
  setNextStep: () => void;
}

export type CreateOrderForm = {
  service: string;
  additionalService: string[];
  frequency: string;
  serviceDay: string[];
  serviceHour: string[];
  areaSize: string;
  district: string;
};

export const frequencyChoices: SelectionOption[] = [
  { id: "1", name: "Еднократно" },
  { id: "2", name: "Седмично" },
  { id: "3", name: "На 2 седмици" },
  { id: "4", name: "На 4 седмици" },
];

const serviceDayChoices: SelectionOption[] = [
  { id: "1", name: "Понеделник" },
  { id: "2", name: "Вторник" },
  { id: "3", name: "Сряда" },
  { id: "4", name: "Четвъртък" },
  { id: "5", name: "Петък" },
  { id: "6", name: "Събота" },
  { id: "7", name: "Неделя" },
];

const ServiceHourChoices: SelectionOption[] = [
  { id: "1", name: "08:00" },
  { id: "2", name: "08:30" },
  { id: "3", name: "09:00" },
  { id: "4", name: "10:00" },
  { id: "5", name: "10:30" },
  { id: "6", name: "11:00" },
  { id: "7", name: "11:30" },
  { id: "8", name: "12:00" },
  { id: "9", name: "12:30" },
  { id: "10", name: "13:00" },
  { id: "11", name: "13:30" },
  { id: "12", name: "14:00" },
  { id: "13", name: "14:30" },
  { id: "14", name: "15:00" },
  { id: "16", name: "15:30" },
  { id: "17", name: "16:00" },
  { id: "18", name: "16:30" },
  { id: "19", name: "17:00" },
  { id: "20", name: "17:30" },
  { id: "21", name: "18:00" },
];

const daytime = [
  { id: "1", daytime: "morning" },
  { id: "2", daytime: "morning" },
  { id: "3", daytime: "morning" },
  { id: "4", daytime: "morning" },
  { id: "5", daytime: "morning" },
  { id: "6", daytime: "morning" },
  { id: "7", daytime: "morning" },
  { id: "8", daytime: "morning" },
  { id: "9", daytime: "afternoon" },
  { id: "10", daytime: "afternoon" },
  { id: "11", daytime: "afternoon" },
  { id: "12", daytime: "afternoon" },
  { id: "13", daytime: "afternoon" },
  { id: "14", daytime: "afternoon" },
  { id: "16", daytime: "afternoon" },
  { id: "17", daytime: "afternoon" },
  { id: "18", daytime: "afternoon" },
  { id: "19", daytime: "afternoon" },
  { id: "20", daytime: "afternoon" },
  { id: "21", daytime: "afternoon" },
];

export default function SelectTimeFrame<K extends FieldValues>({ setValue, setNextStep }: CreateOrderInputProps<K>) {
  const [visitDays, setVisitDays] = useState<string[]>([]);
  const [visitHours, setVisitHours] = useState<string[]>([]);

  function toggleSelection(selectedId: string, selection: string[]) {
    console.log(selection);
    console.log(selectedId);
    return selection?.includes(selectedId) ? selection.filter((id) => id !== selectedId) : [...selection, selectedId];
  }

  function updateVisitDays(selectedId: string) {
    setVisitDays((days) => toggleSelection(selectedId, days));
  }

  function updateVisitHours(selectedId: string) {
    setVisitHours((hours) => toggleSelection(selectedId, hours));
  }

  const handleServiceHoursMultiple: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    const filterWord = e.currentTarget.dataset.id;
    if (filterWord === "clear") {
      setVisitHours([]);
      return;
    }

    const btnChoices = daytime.filter((item) => item.daytime === filterWord).map((hour) => hour.id);
    setVisitHours((hours) => [...hours, ...btnChoices]);
  };

  function handleSubmit() {
    setValue("serviceDays" as Path<K>, visitDays as PathValue<K, Path<K>>);
    setValue("serviceHours" as Path<K>, visitHours as PathValue<K, Path<K>>);
    setNextStep();
  }

  return (
    <div className="relative flex w-full flex-col p-8">
      <div className="mb-4 flex items-end justify-between gap-4">
        <h2 className="text-lg font-semibold leading-7 text-indigo-600">Кога ви е удобно да идваме?</h2>
        <img src={Schedule} className="h-20 w-20" />
      </div>
      <p className="mb-1 text-gray-600">Избери един или повече дни и часове, в които предпочитате да ви посещаваме.</p>
      <p className="mb-8 text-gray-600">При съставянето на офертата ще се спрем на една от избраните възможности.</p>
      <CardChoice
        options={serviceDayChoices}
        styles="grid grid-cols-2"
        handleUpdate={updateVisitDays}
        selections={visitDays}
      ></CardChoice>

      <div className="mb-2 flex justify-between px-2">
        <button
          className="inline-flex items-center rounded bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          data-id="morning"
          onClick={handleServiceHoursMultiple}
        >
          <PlusIcon className="-ml-1 mr-0.5 mt-0.5 h-3 w-3" /> преди обяд
        </button>
        <button
          className="inline-flex items-center rounded bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          data-id="afternoon"
          onClick={handleServiceHoursMultiple}
        >
          <PlusIcon className="-ml-1 mr-0.5 mt-0.5 h-3 w-3" />
          след обяд
        </button>
        <button
          className="inline-flex items-center rounded bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          data-id="clear"
          onClick={handleServiceHoursMultiple}
        >
          <XMarkIcon className="-ml-1 mr-0.5 mt-0.5 h-3 w-3" />
          изчисти
        </button>
      </div>

      <CardChoice
        options={ServiceHourChoices}
        styles="grid grid-cols-3"
        selections={visitHours}
        handleUpdate={updateVisitHours}
      ></CardChoice>
      <a
        onClick={handleSubmit}
        className={classNames(
          visitDays.length > 0 && visitHours.length > 0
            ? "bg-indigo-600 font-semibold text-white"
            : "bg-gray-200 font-normal  text-gray-400",
          "mt-8 block cursor-pointer rounded-md  py-2.5 px-3.5 text-center text-sm   shadow transition-colors hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:mt-10"
        )}
      >
        Продължи
      </a>
    </div>
  );
}

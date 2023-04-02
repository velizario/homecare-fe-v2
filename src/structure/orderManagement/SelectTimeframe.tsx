import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { FieldValues, Path, PathValue, UseFormSetValue } from "react-hook-form";
import Schedule from "../../assets/schedule.jpg";
import classNames from "../../helpers/classNames";
import { daytime, serviceDayChoices, ServiceHourChoices } from "../../store/static";
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


export default function SelectTimeFrame<K extends FieldValues>({ setValue, setNextStep }: CreateOrderInputProps<K>) {
  const [visitDays, setVisitDays] = useState<string[]>([]);
  const [visitHours, setVisitHours] = useState<string[]>([]);

  function toggleSelection(selectedId: string, selection: string[]) {
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
        <h2 className="mx-auto mb-2 mt-4 w-max text-2xl font-semibold text-gray-900">Кога ви е удобно да идваме?</h2>
        <img src={Schedule} className="h-20 w-20" />
      </div>
      <p className="mb-1 text-gray-600">Избери един или повече дни и часове, в които предпочитате да ви посещаваме.</p>
      <p className="mb-8 text-gray-600">При съставянето на офертата ще се спрем на една от избраните възможности.</p>
      <h2 id="step-6" className="ml-2 mb-2 text-lg font-semibold leading-7 text-indigo-600">
        Дни за посещение:
      </h2>
      <CardChoice
        options={serviceDayChoices}
        styles="grid grid-cols-2"
        handleUpdate={updateVisitDays}
        selections={visitDays}
      ></CardChoice>

      <h2 id="step-6" className="ml-2 mb-2 text-lg font-semibold leading-7 text-indigo-600">
        Часове за посещение:
      </h2>

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

import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef } from "react";
import { FieldPath, FieldValues, Path, PathValue, useForm, UseFormSetValue, useWatch } from "react-hook-form";
import Schedule from "../../assets/schedule.jpg";
import { createOrder } from "../../model/orderModel";
import { type SelectionOption } from "../../types/types";
import CardChoice from "../../utilityComponents/CardChoice";
import { toasted } from "../../utilityComponents/Toast";
import RangeSlider from "../searchOrders/RangeSlider";
import Location from "../../assets/location.jpg";
import ComboSingleSelect from "./ComboSingleSelect";

interface CreateOrderInputProps {
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

const serviceTypeChoices: SelectionOption[] = [
  {
    id: "1",
    name: "Почистване на дома",
    description: "Почистване на гъз, глава, и тем подобни",
  },
  {
    id: "2",
    name: "Почистване на офиси и магазини",
    description: "Рязане на кабели и промиване с чист спирт",
  },
  {
    id: "3",
    name: "Основно почистване",
    description: "Рязане на кабели и промиване с чист спирт",
  },
  {
    id: "4",
    name: "Следремонтно чистене",
    description: "Рязане на кабели и промиване с чист спирт",
  },
  {
    id: "5",
    name: "Индустриално обслужване",
    description: "Рязане на кабели и промиване с чист спирт",
  },
  {
    id: "6",
    name: "Пране на мека мебел",
    description: "Почистване на фотьойли и изхвърляне на котки",
  },
  {
    id: "7",
    name: "Пране на мокети / килими",
    description: "Рязане на кабели и промиване с чист спирт",
  },
  {
    id: "8",
    name: "Почистване на подови настилки",
    description: "Рязане на кабели и промиване с чист спирт",
  },
  {
    id: "9",
    name: "Почистване на прозорци и витрини",
    description: "Рязане на кабели и промиване с чист спирт",
  },
];

const additionalServiceChoices: Record<string, SelectionOption[]> = {
  "1": [
    { id: "1", name: "Миене на печка" },
    { id: "4", name: "Миене на хладилник" },
    { id: "3", name: "Миене на тераса" },
    { id: "2", name: "Миене на прозорци" },
  ],
  "2": [
    { id: "1", name: "sdasdgasdgasdgasdg" },
    { id: "4", name: "sdasdgasdgasdgasdg" },
    { id: "3", name: "sdasdgasdgasdgasdg" },
    { id: "2", name: "sdasdgasdgasdgasdg" },
  ],
  "3": [
    { id: "1", name: "Миене на печка" },
    { id: "4", name: "Миене на хладилник" },
    { id: "3", name: "Миене на тераса" },
    { id: "2", name: "Миене на прозорци" },
  ],
  "4": [
    { id: "1", name: "Миене на печка" },
    { id: "4", name: "Миене на хладилник" },
    { id: "3", name: "Миене на тераса" },
    { id: "2", name: "Миене на прозорци" },
  ],
  "5": [
    { id: "1", name: "Миене на печка" },
    { id: "4", name: "Миене на хладилник" },
    { id: "3", name: "Миене на тераса" },
    { id: "2", name: "Миене на прозорци" },
  ],
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

export const areaSizeChoices: SelectionOption[] = [
  { id: "1", name: "0" },
  { id: "2", name: "20" },
  { id: "3", name: "40" },
  { id: "4", name: "60" },
  { id: "5", name: "80" },
  { id: "6", name: "100" },
  { id: "7", name: "120" },
  { id: "8", name: "140" },
  { id: "9", name: "160" },
  { id: "10", name: "180" },
  { id: "11", name: "200" },
];

const districtChoices: SelectionOption[] = [
  { id: "1", name: "Надежда 1" },
  { id: "2", name: "Дружба" },
  { id: "3", name: "Младост 1" },
  { id: "4", name: "Младост 2" },
  { id: "5", name: "Младост 3" },
  { id: "6", name: "Младост 4" },
  { id: "7", name: "Хладилника" },
  { id: "8", name: "Овча Купел" },
  { id: "9", name: "Витоша" },
  { id: "10", name: "Лозенец" },
  { id: "11", name: "Център" },
  { id: "12", name: "Бояна" },
  { id: "13", name: "Надежда 2" },
  { id: "14", name: "Надежда 3" },
  { id: "15", name: "Надежда 4" },
  // More users...
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
  { id: "22", name: "18:30" },
  // More users...
];

export default function CreateOrderInput({ setNextStep }: CreateOrderInputProps) {
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateOrderForm>({ defaultValues: { areaSize: areaSizeChoices[5].id } });
  // { resolver: zodResolver(ValidationSchema) }

  const watch = useWatch({ control });
  useEffect(() => {
    console.log(watch);
  }, [watch]);

  const cleaningRef = useRef<HTMLHeadingElement | null>(null);

  function CardChoiceUpdateHandler<T extends FieldValues>(
    selectedId: string | undefined,
    currentChoices: string[] = [],
    setValue: UseFormSetValue<T>,
    name: FieldPath<T>
  ) {
    if (!selectedId) return;

    const newChoices = currentChoices?.includes(selectedId)
      ? currentChoices.filter((id) => id !== selectedId)
      : [...currentChoices, selectedId];
    setValue(name, newChoices as PathValue<T, Path<T>>);
  }

  const handleServiceHoursMultiple: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    // let newSet = new Set(["1","2","3","4","5","6","7"])
    e.preventDefault();
    const filterWord = e.currentTarget.dataset.id;
    if (filterWord === "clear") {
      setValue("serviceHour", []);
      return;
    }
    const btnChoices = ServiceHourChoices.filter((choice) => {
      switch (filterWord) {
        case "morning":
          return choice.name <= "12:00";
        case "afternoon":
          return choice.name >= "12:30";
        default:
          return false;
      }
    }).map((hour) => hour.id);

    const newServiceHours = [...btnChoices, ...(watch.serviceHour || [])];
    setValue("serviceHour", newServiceHours);
  };

  const handleAreaSizeChange = (value: string) => {
    const valueToSet = areaSizeChoices.find((areaSize) => areaSize.name === value)?.id;
    if (valueToSet) setValue("areaSize", valueToSet);
  };

  const submitFormHandler = async (data: CreateOrderForm) => {
    const resData = await createOrder(data);
    console.log(resData);
    toasted(`Заявката е изпратена! Можете да видите статуса й в административния панел`, "success");
    setNextStep();
  };

  return (
    <form className="relative flex w-full flex-col p-8" onSubmit={handleSubmit(submitFormHandler)}>
      <div className="mb-10 flex items-center gap-4">
        <h2 className=" text-center text-lg font-semibold leading-7 text-indigo-600">Колко често ще ви посещаваме?</h2>
        <img src={Schedule} className="h-20 w-20" />
      </div>

      <CardChoice
        options={serviceDayChoices}
        styles="grid grid-cols-2"
        handleUpdate={(e) =>
          CardChoiceUpdateHandler(e.currentTarget.dataset.id, watch.serviceDay, setValue, "serviceDay")
        }
        activeId={watch.serviceDay || []}
      ></CardChoice>
      <p className="mt-4 text-xs text-gray-600">(Изберете повече варианти, ако ви устройват)</p>

      <div className="mt-14 flex justify-between px-2">
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
        activeId={watch.serviceHour || []}
        handleUpdate={(e) =>
          CardChoiceUpdateHandler(e.currentTarget.dataset.id, watch.serviceHour, setValue, "serviceHour")
        }
      ></CardChoice>
      <p className="mt-4 text-xs text-gray-600">(Изберете повече варианти, ако ви устройват)</p>

      <div className="mt-10  flex items-center justify-between text-gray-100">
        <h2 id="step-6" className=" text-center text-lg font-semibold leading-7 text-indigo-600">
          Каква площ ще почистваме?
        </h2>
        <img
          className="h-20 w-20"
          src="https://i.pinimg.com/originals/6f/d8/84/6fd884b4cba095b894173481692785cd.gif"
        ></img>
      </div>
      <RangeSlider options={areaSizeChoices} activeId={watch.areaSize} onClick={handleAreaSizeChange} styles="" />

      <div className="mt-10 flex items-center justify-between">
        <h2 ref={cleaningRef} id="step-7" className=" text-center text-lg font-semibold leading-7 text-indigo-600">
          В кой район ще почистваме?
        </h2>
        <img className="h-20 w-20" src={Location} />
      </div>
      <ComboSingleSelect />
      <button
        type="submit"
        className="mt-10 flex items-center justify-center rounded-md  bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
      >
        Изпрати заявка
      </button>
    </form>
  );
}

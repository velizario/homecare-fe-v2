import { Control, FieldPath, FieldValues, useWatch } from "react-hook-form";
import { SelectionOption } from "../../types/types";
import RangeSlider from "../searchOrders/RangeSlider";
import ComboSingleSelect from "./ComboSingleSelect";


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

interface CleaningEntityInfoProps<T extends FieldValues> {
  control: Control<T, object>;
  name: FieldPath<T
  defaultValue?: string;
}

export default function CleaningEntityInfo({ control }: CleaningEntityInfoProps) {
  const watch = useWatch({ control });

  
  const handleAreaSizeChange = (value: string) => {
    const valueToSet = areaSizeChoices.find((areaSize) => areaSize.name === value)?.id;
    if (valueToSet) setValue("areaSize", valueToSet);
  };

  return (
    <>
      <div className="mt-10  flex items-end justify-between text-gray-100">
        <h2 id="step-6" className="text-center text-lg font-semibold leading-7 text-indigo-600">
          Каква площ ще почистваме?
        </h2>
        <img
          className="h-20 w-20"
          src="https://i.pinimg.com/originals/6f/d8/84/6fd884b4cba095b894173481692785cd.gif"
        ></img>
      </div>
      <RangeSlider options={areaSizeChoices} activeId={watch.areaSize} onClick={handleAreaSizeChange} styles="" />

      <div className="mt-10 flex items-end justify-between">
        <h2 ref={cleaningRef} id="step-7" className="text-center text-lg font-semibold leading-7 text-indigo-600">
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
    </>
  );
}

import { useEffect, useState } from "react";
import { Control, FieldPath, FieldValues, Path, PathValue, UseFormSetValue, useWatch } from "react-hook-form";
import { SelectionOption } from "../../types/types";
import RangeSlider from "../searchOrders/RangeSlider";
import ComboSingleSelect, { Location } from "./ComboSingleSelect";
import LocationImage from "../../assets/location.jpg"
import classNames from "../../helpers/classNames";
import { areaSizeChoices } from "../../store/static";


interface CleaningEntityInfoProps<T extends FieldValues> {
  // control: Control<T, object>;
  // name: FieldPath<T>;
  // defaultValue?: string;
  setValue: UseFormSetValue<T>;
  setNextStep: () => void;
}

export default function CleaningEntityInfo<K extends FieldValues>({
  setValue,
  setNextStep,
}: CleaningEntityInfoProps<K>) {
  // const watch = useWatch({ control });

  const [areaSize, setAreaSize] = useState<string>("60");
  const [location, setLocation] = useState<Location | null>(null);

  useEffect(() => {console.log(areaSize,location)}, [areaSize,location])

  const handleAreaSizeChange = (value: string) => {
    setAreaSize(value)
  };

  const handleClick = () => {
    setValue("areaSize" as Path<K>, areaSize as PathValue<K, Path<K>>);
    setValue("district" as Path<K>, location?.id as PathValue<K, Path<K>>);
    setNextStep()
  };

  return (
    <div className="relative flex w-screen max-w-full flex-col p-8">
            <h2 className="mx-auto mb-2 mt-4 w-max text-2xl font-semibold text-gray-900">Допълнителна информация</h2>
      <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
        Детайли за локация, размер на дома/офиса
      </p>

      <div className="mt-10  flex items-end justify-between text-gray-100">
        <h2 id="step-6" className="text-center text-lg font-semibold leading-7 text-indigo-600">
          Каква площ ще почистваме?
        </h2>
        <img
          className="h-20 w-20"
          src="https://i.pinimg.com/originals/6f/d8/84/6fd884b4cba095b894173481692785cd.gif"
        ></img>
      </div>
      <RangeSlider options={areaSizeChoices} activeArea={areaSize} onClick={handleAreaSizeChange} styles="" />

      <div className="mt-10 flex items-end justify-between">
        <h2 id="step-7" className="text-center text-lg font-semibold leading-7 text-indigo-600">
          В кой район ще почистваме?
        </h2>
        <img className="h-20 w-20" src={LocationImage} />
      </div>
      <ComboSingleSelect location={location} setLocation={setLocation}  />
      <button
        onClick={handleClick}
        className={classNames((areaSize && location ) ? "bg-indigo-600 text-white font-medium  hover:bg-indigo-500" : "bg-gray-200 font-normal  text-gray-400", " transition-colors mt-10 flex items-center justify-center rounded-md  px-4 py-2 text-base shadow-sm hover:bg-indigo-700")}
      >
        Изпрати заявка
      </button>
    </div>
  );
}

import { useEffect, useState } from "react";
import { FieldValues, Path, PathValue, UseFormSetValue } from "react-hook-form";
import LocationImage from "../../assets/location.jpg";
import classNames from "../../helpers/classNames";
import { fetchDistrictNames } from "../../model/essentialsModel";
import { essentialsStore } from "../../store/essentialsStore";
import { estateSizeSelections } from "../../store/static";
import { SelectionOption } from "../../types/types";
import RangeSlider from "../searchOrders/RangeSlider";
import ComboSingleSelect from "../../utilityComponents/ComboSingleSelect";

interface CleaningEntityInfoProps<T extends FieldValues> {
  // control: Control<T, object>;
  // name: FieldPath<T>;
  // defaultValue?: string;
  setValue: UseFormSetValue<T>;
  setNextStep: () => void;
}

export const rangeSliderData = ["0", "20", "40", "60", "80", "100", "120", "140", "160", "180", "200"];

export default function CleaningEntityInfo<K extends FieldValues>({
  setValue,
  setNextStep,
}: CleaningEntityInfoProps<K>) {
  // const watch = useWatch({ control });

  const [selectedestateSize, setSelectedestateSize] = useState<string>("60");
  const [selectedDistrict, setSelectedDistrict] = useState<SelectionOption | null>(null);
  const districtNames = essentialsStore((essentials) => essentials.districtNames);

  const handleAreaSizeChange = (value: string) => {
    setSelectedestateSize(value);
  };

  const handleClick = () => {
    const estateSizeId = estateSizeSelections.find((estateSize) => estateSize.value === selectedestateSize)?.id;
    setValue("estateSize" as Path<K>, {id: estateSizeId} as PathValue<K, Path<K>>);
    setValue("districtName" as Path<K>, {id: selectedDistrict?.id} as PathValue<K, Path<K>>);
    setNextStep();
  };

  useEffect(() => {
      fetchDistrictNames();
    },
    []);

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
      <RangeSlider
        options={rangeSliderData}
        activeArea={selectedestateSize}
        onChange={handleAreaSizeChange}
        styles=""
      />

      <div className="mt-10 mb-8 flex items-end justify-between">
        <h2 id="step-7" className="text-center text-lg font-semibold leading-7 text-indigo-600">
          В кой район ще почистваме?
        </h2>
        <img className="h-20 w-20" src={LocationImage} />
      </div>
      <ComboSingleSelect
        selected={selectedDistrict}
        setSelected={setSelectedDistrict}
        selections={districtNames}
      />
      <button
        onClick={handleClick}
        className={classNames(
          selectedestateSize && location
            ? "bg-indigo-600 font-medium text-white  hover:bg-indigo-500"
            : "bg-gray-200 font-normal  text-gray-400",
          " mt-10 flex items-center justify-center rounded-md px-4  py-2 text-base shadow-sm transition-colors hover:bg-indigo-700"
        )}
      >
        Изпрати заявка
      </button>
    </div>
  );
}

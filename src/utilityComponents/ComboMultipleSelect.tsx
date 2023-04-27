import { Combobox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useEffect, useRef, useState } from "react";
import { FieldValues, Path, PathValue, UseFormSetValue } from "react-hook-form";
import { District } from "../types/types";
import Badge from "./Badge";

// TODO: replace with ComboSingleSelect by making it multiple, or create separte ComboSelect based on ComboSingleSelect practices

const districts: District[] = [
  { id: 1, districtName: "Leslie Alexander" },
  { id: 2, districtName: "saf Alexander" },
  { id: 3, districtName: "Lessaglie Alefjxander" },
  { id: 4, districtName: "edfh Alexander" },
  { id: 5, districtName: "Ledsadie Alefjxander" },
  { id: 6, districtName: "Ledfhsljie Alexander" },
  { id: 7, districtName: "Ledfhstfjjslie Alexander" },
  { id: 8, districtName: "Ledfhssdglie Alexander" },
  { id: 9, districtName: "Ledfhslie Alexander" },
  { id: 10, districtName: "Ledfhdjslie Alexanjfder" },
  { id: 11, districtName: "Ledfhslie Alexandfer" },
  { id: 12, districtName: "Ledfhfgdjslie Alexander" },
  { id: 13, districtName: "Ledfhfgjfslie Alejxandfgjer" },
  { id: 14, districtName: "Ledfhslie Alefgjxander" },
  { id: 15, districtName: "Ledfhslie Alexander" },
  // More users...
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface ComboMultipleSelectProps<T extends FieldValues> {
  defaultValue?: District[];
  setValue: UseFormSetValue<T>;
}

export default function ComboMultipleSelect<K extends FieldValues>({ setValue, defaultValue }: ComboMultipleSelectProps<K>) {
  const [query, setQuery] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState<District[]>([]);
  const comboRef = useRef<null | HTMLUListElement>(null);

  //   fix scrolling behavior for mobile (dropdown not to hide)
  const scrollDropdownIntoView = (behavior: "auto" | "smooth" = "auto") => {
    const el = comboRef.current;
    if (el == null) return;
    const scrollGap = el.getBoundingClientRect().bottom - window.innerHeight;
    if (scrollGap > 0)
      comboRef.current?.scrollIntoView({
        block: "end",
        inline: "nearest",
        behavior,
      });
    // window.scrollBy(0, scrollGap)
  };

  const filteredPeople =
    query === ""
      ? districts
      : districts.filter((person) => {
          return person.districtName.toLowerCase().includes(query.toLowerCase());
        });

  useEffect(() => {
    scrollDropdownIntoView();
  }, [query]);

  useEffect(() => {
    defaultValue &&
      //   need to use original district array otherwize combobox value will not work
      setSelectedDistrict(() => districts.filter((district) => defaultValue.findIndex((value) => value.id === district.id) >= 0));
  }, [defaultValue]);

  const changeHandler = (value: District[]) => {
    setSelectedDistrict(value);
    setValue("servedDistrict" as Path<K>, value as PathValue<K, Path<K>>);
  };

  return (
    <Combobox
      as="div"
      //   defaultValue={districts}
      value={selectedDistrict}
      onChange={changeHandler}
      multiple
      //   nullable
      className="coverage-combo-box sm:col-span-3"
    >
      <>
        <div className="flex flex-row justify-between gap-2 ">
          <p className="block text-sm font-normal text-gray-900">Квартали на покритие</p>
          <button
            type="button"
            onClick={() => {
              changeHandler(selectedDistrict.length !== districts.length ? districts : []);
            }}
            className="inline-flex h-full items-center text-xs font-medium text-gray-600 underline  hover:text-black "
          >
            Избирам всички
          </button>
        </div>
        <div className="relative mb-2">
          <Combobox.Input
            className="mt-1 block w-full rounded-md border-gray-300 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            onChange={(event) => {
              setQuery(event.target.value);
            }}
            onFocus={() => {
              setQuery("");
            }}
          />
          <Combobox.Button
            onClick={() =>
              setTimeout(() => {
                scrollDropdownIntoView("smooth");
              }, 200)
            }
            className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
          >
            <ChevronUpDownIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
          </Combobox.Button>
          {filteredPeople.length > 0 && (
            <Combobox.Options
              ref={comboRef}
              className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
              {filteredPeople.map((person) => (
                <Combobox.Option
                  key={person.id}
                  value={person}
                  className={({ active }) =>
                    classNames("relative cursor-default select-none py-2 pl-3 pr-9", active ? "bg-indigo-600 text-white" : "text-gray-900")
                  }
                >
                  {({ active, selected }) => (
                    <>
                      <span className={classNames("block truncate", selected ? "font-semibold" : "")}>{person.districtName}</span>
                      {selected && (
                        <span className={classNames("absolute inset-y-0 right-0 flex items-center pr-4", active ? "text-white" : "text-indigo-600")}>
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}
        </div>
        <Combobox.Label className="flex flex-wrap leading-relaxed line-clamp-2">
          {selectedDistrict.map(
            (district) =>
              "districtName" in district && (
                <Badge key={district.id} styles="whitespace-nowrap">
                  {district?.districtName}
                </Badge>
              )
          )}
        </Combobox.Label>
      </>
    </Combobox>
  );
}

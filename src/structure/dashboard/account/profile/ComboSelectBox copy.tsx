import { forwardRef, useEffect, useRef, useState } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";
import Badge from "../../../../utilityComponents/Badge";
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  Path,
  PathValue,
  UseFormSetValue,
  useWatch,
} from "react-hook-form";

export interface District {
  id: number;
  districtName: string;
}

interface ComboSelectBoxProps<T extends FieldValues> {
  control: Control<T, object>;
  name: FieldPath<T>;
  defaultValue?: string[];
  setValue: UseFormSetValue<T>;
}

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

function ComboSelectBoxInner<K extends FieldValues>(
  { control, name, defaultValue, setValue, ...props }: ComboSelectBoxProps<K>,
  _ref: React.ForwardedRef<HTMLInputElement>
) {
  const [query, setQuery] = useState("");
  //   const [selectedDistrict, setSelectedDistrict] = useState<
  //     District[] | Array<Record<string, any>>
  //   >([]);

  const filteredDistricts =
    query === ""
      ? districts
      : districts.filter((district) => {
          return district.districtName
            .toLowerCase()
            .includes(query.toLowerCase());
        });

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

  useEffect(() => {
    scrollDropdownIntoView();
  }, [query]);

  const comboRef = useRef<null | HTMLUListElement>(null);
  const watchFormData = useWatch({ control });
  const servedDistrict = watchFormData.servedDistrict as District[];

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ref } }) => (
        <Combobox
          defaultValue={defaultValue}
          as="div"
          // value={value}
          onChange={onChange}
          multiple
          nullable
          className="coverage-combo-box sm:col-span-3"
        >
          <>
            <div className="flex flex-row justify-between gap-2 ">
              <p className="block text-sm font-normal text-gray-900">
                Квартали на покритие
              </p>
              <button
                type="button"
                onClick={() => {
                  setValue(
                    name,
                    servedDistrict.length !== districts.length ? (districts as PathValue<K, Path<K>>) : ([] as PathValue<K, Path<K>>)
                  );
                }}
                className="inline-flex h-full items-center text-xs font-medium text-gray-600 underline  hover:text-black "
              >
                Избирам всички
              </button>
            </div>
            <div className="relative mb-2">
              <Combobox.Input
                {...props}
                className="mt-1 block w-full rounded-md border-gray-300 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                // displayValue={() => value}
                onFocus={() => {
                  setQuery("");
                }}
                ref={ref}
                onChange={(event) => {
                  setQuery(event.target.value);
                  onChange(event);
                }}
                // onChange={onChange}
              />

              <Combobox.Button
                onClick={() =>
                  setTimeout(() => {
                    scrollDropdownIntoView("smooth");
                  }, 200)
                }
                className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
              >
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-500"
                  aria-hidden="true"
                />
              </Combobox.Button>
              {filteredDistricts.length > 0 && (
                <Combobox.Options
                  ref={comboRef}
                  className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                >
                  {filteredDistricts.map((district) => (
                    <Combobox.Option
                      key={district.id}
                      value={district}
                      className={({ active }) =>
                        classNames(
                          "relative cursor-default select-none py-2 pl-3 pr-9",
                          active ? "bg-indigo-600 text-white" : "text-gray-900"
                        )
                      }
                    >
                      {({ active, selected }) => (
                        <>
                          <span
                            className={classNames(
                              "block truncate",
                              selected ? "font-semibold" : ""
                            )}
                          >
                            {district.districtName}
                          </span>
                          {selected && (
                            <span
                              className={classNames(
                                "absolute inset-y-0 right-0 flex items-center pr-4",
                                active ? "text-white" : "text-indigo-600"
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
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
              {servedDistrict &&
                servedDistrict.map(
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
      )}
    />
  );
}

const ComboSelectBox = forwardRef(ComboSelectBoxInner) as <
  T extends FieldValues
>(
  props: ComboSelectBoxProps<T> & { ref?: React.ForwardedRef<HTMLInputElement> }
) => ReturnType<typeof ComboSelectBoxInner>;

export default ComboSelectBox;

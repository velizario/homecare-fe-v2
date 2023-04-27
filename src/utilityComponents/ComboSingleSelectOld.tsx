import { Combobox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import classNames from "../helpers/classNames";
import { SelectionOption } from "../types/types";

interface ComboSingleSelectProps {
  selected: SelectionOption | null;
  setSelected: React.Dispatch<React.SetStateAction<SelectionOption | null>>;
  selections: SelectionOption[];
  disabled?: boolean;
}

export default function ComboSingleSelectOld({ selected, setSelected, selections, disabled }: ComboSingleSelectProps) {
  const [query, setQuery] = useState("");

  const filteredDistricts =
    query === ""
      ? selections
      : selections.filter((district) => {
          return district.value.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox as="div" disabled={disabled} value={selected} onChange={setSelected}>
      <div className="relative">
        <Combobox.Input
          className={classNames(
            disabled
              ? "bg-gray-50 text-gray-600"
              : "bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600",
            "w-full rounded-md border-0 py-1.5 pl-3 pr-10  sm:text-sm sm:leading-6"
          )}
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(district) => (district as SelectionOption)?.value || ""}
        />
        <Combobox.Button className={classNames(disabled ? "hidden" : "absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none")}>
          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>

        {filteredDistricts.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredDistricts.map((district) => (
              <Combobox.Option
                key={district.id}
                value={district}
                className={({ active }) =>
                  classNames("relative cursor-default select-none py-2 pl-3 pr-9", active ? "bg-indigo-600 text-white" : "text-gray-900")
                }
              >
                {({ active, selected }) => (
                  <>
                    <span className={classNames("block truncate", selected ? "font-semibold" : "")}>{district?.value || ""}</span>

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
    </Combobox>
  );
}

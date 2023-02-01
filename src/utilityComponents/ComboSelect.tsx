import { useEffect, useRef, useState } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";
import Badge from "./Badge";
import { type SelectionOption } from "../helpers/types";
import classNames from "../helpers/classNames";

interface ComboSelectBoxProps {
    options: SelectionOption[];
    selection: SelectionOption[] | Array<Record<string, any>>;
    handleChange: React.Dispatch<
        React.SetStateAction<SelectionOption[] | Array<Record<string, any>>>
    >;
}

export default function ComboSelect({
    options,
    selection,
    handleChange,
}: ComboSelectBoxProps) {
    const [query, setQuery] = useState("");

    const [value, setValue] = useState("");

    const filteredPeople =
        query === ""
            ? options
            : options.filter((option) => {
                  return option.name
                      .toLowerCase()
                      .includes(query.toLowerCase());
              });

    const scrollDropdownIntoView = (behavior: "auto" | "smooth" = "auto") => {
        const el = comboRef.current;
        if (el == null) return;
        const scrollGap =
            el.getBoundingClientRect().bottom - window.innerHeight;
        if (scrollGap > 0)
            comboRef.current?.scrollIntoView({
                block: "end",
                inline: "nearest",
                behavior,
            });
    };

    useEffect(() => {
        scrollDropdownIntoView();
    }, [query]);

    const comboRef = useRef<null | HTMLUListElement>(null);

    return (
        <Combobox
            as="div"
            value={selection}
            onChange={handleChange}
            multiple
            nullable
            className="coverage-combo-box sm:col-span-3"
        >
            <>
                <div className="relative mb-2">
                    <Combobox.Input
                        className="mt-1 block w-full rounded-md border-gray-300 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        onChange={(event) => {
                            setQuery(event.target.value);
                        }}
                        onBlur={() => {
                            setValue("");
                        }}
                        displayValue={() => value}
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
                        <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-500"
                            aria-hidden="true"
                        />
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
                                        classNames(
                                            "relative cursor-default select-none py-2 pl-3 pr-9",
                                            active
                                                ? "bg-indigo-600 text-white"
                                                : "text-gray-900"
                                        )
                                    }
                                >
                                    {({ active, selected }) => (
                                        <>
                                            <span
                                                className={classNames(
                                                    "block truncate",
                                                    selected
                                                        ? "font-semibold"
                                                        : ""
                                                )}
                                            >
                                                {person.name}
                                            </span>
                                            {selected && (
                                                <span
                                                    className={classNames(
                                                        "absolute inset-y-0 right-0 flex items-center pr-4",
                                                        active
                                                            ? "text-white"
                                                            : "text-indigo-600"
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
                <Combobox.Label className="flex flex-wrap leading-relaxed line-clamp-3">
                    {selection.map(
                        (person) =>
                            "name" in person && (
                                <Badge
                                    key={person.id}
                                    styles="whitespace-nowrap"
                                >
                                    {person?.name}
                                </Badge>
                            )
                    )}
                </Combobox.Label>
            </>
        </Combobox>
    );
}

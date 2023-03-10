import { Combobox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import classNames from "../helpers/classNames";
import { type SelectionOption } from "../helpers/types";
import Badge from "./Badge";

interface ComboSelectBoxProps {
    options: SelectionOption[];
    selection: SelectionOption[] | Array<Record<string, any>>;
    handleChange: React.Dispatch<
        React.SetStateAction<SelectionOption[] | Array<Record<string, any>>>
    >;
    styles?: string;
}

export default function ComboSelect({
    options,
    selection,
    handleChange,
    styles,
}: ComboSelectBoxProps) {
    const [query, setQuery] = useState("");
    const [opened, setOpened] = useState(false);
    const [value, setValue] = useState("");

    const filteredPeople =
        query === ""
            ? options
            : options.filter((option) => {
                  return option.name
                      .toLowerCase()
                      .includes(query.toLowerCase());
              });

    //   The scroll function to ensure visibility of the dropdown values
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

    // Mobile autoscroll fix
    const listener = () => {
        if (!window.visualViewport) return;
        console.log(window.visualViewport?.height);
        const MIN_KEYBOARD_HEIGHT = 300; // N.B.! this might not always be correct

        const isMobile = window.innerWidth < 768;
        const isKeyboardOpen =
            isMobile &&
            window.screen.height - MIN_KEYBOARD_HEIGHT >
                window.visualViewport.height;

        isKeyboardOpen && scrollDropdownIntoView("smooth");
    };
    const triggerMobileResize = () => {
        window.visualViewport?.addEventListener("resize", listener);
        setTimeout(() => {
            window.visualViewport?.removeEventListener("resize", listener);
        }, 500);
    };

    const comboRef = useRef<null | HTMLUListElement>(null);
    const comboInputRef = useRef<null | HTMLInputElement>(null);

    return (
        <Combobox
            as="div"
            value={selection}
            onChange={handleChange}
            multiple
            nullable
            className={classNames(
                "coverage-combo-box mt-3 sm:col-span-3",
                styles ?? ""
            )}
        >
            {({ open }) => (
                <>
                    <button>click me!</button>
                    <div
                        className={classNames(
                            "relative mb-2 ui-open:fixed ui-open:top-0 ui-open:left-0 ui-open:z-20 ui-open:h-[100dvh] ui-open:w-full ui-open:bg-white ui-open:px-2",
                            opened ? "absolute top-0 left-0" : ""
                        )}
                    >
                        {open && (
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl text-gray-900">
                                    ???????? ???? ?????????????????????
                                </h2>
                                <ChevronLeftIcon className="my-2 mr-2 h-5 w-5 cursor-pointer" />
                            </div>
                        )}
                        <Combobox.Input
                            ref={comboInputRef}
                            className="mt-1 block w-full rounded-md border-gray-300 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            onClick={() => setOpened(true)}
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

                            className="absolute ui-open:hidden inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
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
                                        onClick={() =>
                                            handleChange(
                                                selection.filter(
                                                    (item) =>
                                                        item.id !== person.id
                                                )
                                            )
                                        }
                                        key={person.id}
                                        styles="whitespace-nowrap"
                                        xMark={true}
                                    >
                                        {person?.name}
                                    </Badge>
                                )
                        )}
                    </Combobox.Label>
                </>
            )}
        </Combobox>
    );
}

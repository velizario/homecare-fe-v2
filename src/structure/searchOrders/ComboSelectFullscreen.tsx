import { CheckIcon } from "@heroicons/react/24/outline";
import debounce from "lodash.debounce";
import { ChangeEvent, MutableRefObject, useEffect, useRef, useState } from "react";
import classNames from "../../helpers/classNames";
import { SelectionOption } from "../../types/types";
import Badge from "../../utilityComponents/Badge";

interface ComboSelectFullScreenProps {
  options: SelectionOption[];
  selection: SelectionOption[];
  handleChange: (e: SelectionOption) => void;
  scrollToElement: React.MutableRefObject<HTMLHeadingElement | null>;
}

export default function ComboSelectFullScreen({
  options,
  selection,
  handleChange,
  scrollToElement,
}: ComboSelectFullScreenProps) {
  const [opened, setOpened] = useState(false);
  const [inputValue, setInputValue] = useState<string | undefined>("");
  const [items, setItems] = useState<SelectionOption[]>(options);

  const containerRef = useRef<HTMLUListElement | null>(null);

  // function to scroll into view
  const scrollInputToFocus = () => {
    setTimeout(() => {
      containerRef.current?.scrollIntoView({
        block: "end",
        inline: "nearest",
        behavior: "smooth",
      });
    }, 100);
  };

  useEffect(() => {
    if (opened) scrollInputToFocus();
  }, [opened]);

  // close options modal, called by click eventlistener
  const closeOptionsModal = (e: MouseEvent) => {
    e.stopPropagation();
    const clickedOutside = (e.target as Element).closest("#input-container") === null;
    if (clickedOutside) {
      setOpened(false);
      setInputValue("");
    }
  };

  // add listener to close options modal if user clicks outside input
  useEffect(() => {
    document.addEventListener("click", closeOptionsModal);
  }, []);

  // updates user input in state
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // handle click on list item

  // filters options list based on input value
  useEffect(() => {
    if (inputValue == null || inputValue.length < 3) {
      setOpened(false);
      setItems(options);
      return;
    }

    const filteredList = options.filter((option) =>
      option.name.toLowerCase().trim().includes(inputValue.toLowerCase().trim())
    );
    // console.log(filteredList)
    debounce(() => {
      setItems(filteredList);
      if (filteredList.length > 0) setOpened(true);
    }, 200)();
  }, [inputValue]);

  return (
    <div id="input-container" className="relative mt-3">
      <div className="relative flex items-center justify-between">
        <input
          onFocus={(e) => {
            scrollInputToFocus();
          }}
          value={inputValue}
          onChange={handleInput}
          className="block h-10 w-full rounded-md border border-gray-300 p-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm"
        ></input>
        <button
          onClick={() => setOpened((opened) => !opened)}
          className="absolute inset-y-0 right-0 flex h-full items-center rounded-r-md px-2 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            className="h-5 w-5 text-gray-500"
          >
            <path
              fillRule="evenodd"
              d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <ul
        ref={containerRef}
        className={classNames(
          "absolute z-20 mt-1 max-h-[240px] w-full flex-col gap-1 overflow-y-auto rounded-lg border bg-white pt-1 shadow-order",
          opened ? "flex" : "hidden"
        )}
      >
        {items.map((item) => {
          const activeSelection = selection?.find((option) => option.name === item.name) !== undefined;
          return (
            <li
              data-name={item.name}
              onClick={() => handleChange(item)}
              key={item.id}
              className={classNames(
                "group flex cursor-pointer select-none items-center justify-between py-3 px-3 text-sm hover:bg-indigo-600 hover:text-indigo-50"
              )}
            >
              <span
                className={classNames(activeSelection ? "font-medium text-indigo-700 group-hover:text-indigo-50" : "")}
              >
                {item.name}
              </span>
              {activeSelection && <CheckIcon className="h-4 w-4" />}
            </li>
          );
        })}
      </ul>
      <div className="flex flex-wrap line-clamp-3">
        {selection.map((item) => (
          <Badge onClick={() => handleChange(item)} styles="whitespace-nowrap" xMark={true} key={item.id}>
            {item.name}
          </Badge>
        ))}
      </div>
    </div>
  );
}

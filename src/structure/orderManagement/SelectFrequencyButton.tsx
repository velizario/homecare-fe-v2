import { CheckIcon } from "@heroicons/react/24/outline";
import { ChevronDoubleRightIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { Dispatch, MouseEventHandler, SetStateAction } from "react";
import classNames from "../../helpers/classNames";
import { SelectionOption } from "../../types/types";

type SelectFrequencyButtonProps = {
  selection: SelectionOption;
  handleChange: MouseEventHandler<HTMLDivElement>;
};

const SelectFrequencyButton = ({ selection, handleChange }: SelectFrequencyButtonProps) => {
  return (
    <div
      key={selection.id}
      data-id={selection.id}
      onClick={handleChange}
      className={classNames(
        // checked
        //   ? "font-semibold text-indigo-800 ring-2 ring-indigo-600"
        //   : "font-normal ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300",
        // "flex cursor-pointer items-center justify-center rounded-md py-3 px-3 text-sm sm:flex-1"
        "group bg-indigo-600 w-full font-medium text-white hover:bg-indigo-500 block cursor-pointer rounded-md py-2.5 px-3.5 text-center text-sm shadow transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      )}
    >
      <p className="flex justify-center items-center">
        <span>{selection.value}</span>
        <ChevronDoubleRightIcon className="h-4 w-4 transition-all opacity-0 group-hover:opacity-100 group-hover:translate-x-2"/>
        {/* {checked && (
          <CheckIcon
            className="check-icon-animate absolute -right-5 -top-1.5 h-5 w-5 flex-none stroke-indigo-600 text-white"
            aria-hidden="true"
          />
        )} */}
      </p>
    </div>
  );
};

export default SelectFrequencyButton;

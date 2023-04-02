import { RadioGroup } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction } from "react";
import classNames from "../../helpers/classNames";

const frequencyChoices = [
  { id: 2, value: "Седмично", open: true },
  { id: 3, value: "Двуседмично", open: true },
];

interface RadioButtonFrequencyProps {
  setRecurrence: Dispatch<SetStateAction<number>>;
  recurrence: number;
}

export default function RadioButtonFrequency({recurrence, setRecurrence }: RadioButtonFrequencyProps) {

  return (
    <div>
      <RadioGroup value={recurrence}  onChange={setRecurrence} className="mt-2">
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {frequencyChoices.map((option) => (
            <RadioGroup.Option
              key={option.value}
              value={option.id}
              className={({ active, checked }) =>
                classNames(
                  option.open ? "relative cursor-pointer focus:outline-none" : "cursor-not-allowed opacity-25",
                  checked
                    ? "font-semibold text-indigo-800 ring-2 ring-indigo-600"
                    : "font-normal ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300 ",
                  "flex items-center justify-center rounded-md py-3 px-3 text-sm sm:flex-1"
                )
              }
              disabled={!option.open}
            >
              <RadioGroup.Label className="relative text-center " as="div">
                <p className="relative ">{option.value}</p>
                {recurrence === option.id && (
                  <>
                    {/* <div className="check-icon-animate absolute -right-5 -top-1.5 h-5 w-5 bg-white"></div> */}
                    <CheckIcon
                      className="check-icon-animate absolute -right-5 -top-1.5 h-5 w-5 flex-none stroke-indigo-600 text-white"
                      aria-hidden="true"
                    />
                  </>
                )}
              </RadioGroup.Label>
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}

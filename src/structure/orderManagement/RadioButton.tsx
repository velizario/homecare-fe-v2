import { RadioGroup } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import classNames from "../../helpers/classNames";

const frequencyChoices = [
  { id: 0, name: "Седмично", inStock: true },
  { id: 1, name: "Двуседмично", inStock: true },
];

export default function RadioButton() {
  const [frequency, setFrequency] = useState<(typeof frequencyChoices)[0] | undefined>();

  return (
    <div>
      <RadioGroup value={frequency} onChange={setFrequency} className="mt-2">
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {frequencyChoices.map((option) => (
            <RadioGroup.Option
              key={option.name}
              value={option}
              className={({ active, checked }) =>
                classNames(
                  option.inStock ? "relative cursor-pointer focus:outline-none" : "cursor-not-allowed opacity-25",
                  checked
                    ? "font-medium text-indigo-800 ring-2 ring-indigo-600"
                    : "font-normal ring-1 ring-gray-300 hover:ring-indigo-300",
                  "flex items-center justify-center rounded-md py-3 px-3 text-sm sm:flex-1"
                )
              }
              disabled={!option.inStock}
            >
              <RadioGroup.Label className="relative text-center " as="div">
                <p className="relative ">{option.name}</p>
                {frequency && frequency.id === option.id && (
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

import { CheckIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { FieldValue, FieldValues, Path, PathValue, UseFormSetValue } from "react-hook-form";
import classNames from "../../helpers/classNames";
import RadioButtonFrequency from "./RadioButtonFrequency";

const tiers = [
  {
    id: 0,
    name: "Абонамент",
    priceMonthly: "15 лв",
    description: "Идеалният план за да осигурите чистота във вашия дом и офис",
    features: [
      "Работа с един и същи екип / човек",
      "Гарантирано посрещане на нуждите ви",
      "Добра цена",
      "Възможност за редовна обратна връзка",
      "Планиране на графика",
    ],
    featured: true,
    selector: false,
  },
  {
    id: 1,
    name: "Еднократно",
    priceMonthly: "20 лв",
    description: "Добър вариант, ако желаи да се запознаи с работата на изпълнителя",
    features: ["Вижте как работим", "Гъвкав избор на час"],
    featured: false,
    selector: true,
  },
];

interface SelectFrequencyProps<T extends FieldValues> {
  setNextStep: () => void;
  setValue: UseFormSetValue<T>;
}

export default function SelectFrequency<K extends FieldValues>({ setValue, setNextStep }: SelectFrequencyProps<K>) {
  const [recurrence, setRecurrence] = useState<number>(0);

  return (
    <div className="relative isolate max-w-4xl bg-white px-6 sm:py-10 lg:px-8">
      <div className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl" aria-hidden="true">
        <svg className="mx-auto w-[72.1875rem]" viewBox="0 0 1155 678">
          <path
            fill="url(#083c110e-60c8-42bb-a9db-29bba74cc569)"
            fillOpacity=".3"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="083c110e-60c8-42bb-a9db-29bba74cc569"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9089FC" />
              <stop offset={1} stopColor="#FF80B5" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <h2 className="mx-auto mb-2 mt-4 w-max text-2xl font-semibold text-gray-900">Колко често ще ви посещаваме?</h2>
      <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
        Възползвайте се от абонаментата ни услуга и получи отстъпка или избери еднократно посещение.
      </p>
      <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-10 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
        {tiers.map((tier, frequencyIdx) => (
          <div
            key={tier.id}
            className={classNames(
              tier.featured ? "relative bg-white shadow-2xl" : "bg-white/60 sm:mx-8 lg:mx-0",
              tier.featured
                ? ""
                : frequencyIdx === 0
                ? "rounded-t-3xl sm:rounded-b-none lg:rounded-tr-none lg:rounded-bl-3xl"
                : "sm:rounded-t-none lg:rounded-tr-3xl lg:rounded-bl-none",
              "rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10"
            )}
          >
            <h3 className="text-lg font-semibold leading-7 text-indigo-600">{tier.name}</h3>
            <p className="mt-4 flex items-baseline gap-x-2">
              <span className="text-5xl font-bold tracking-tight text-gray-900">{tier.priceMonthly}</span>
              <span className="text-base text-gray-500">/час</span>
            </p>
            <p className="mt-6 text-base leading-7 text-gray-600">{tier.description}</p>
            <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600 sm:mt-10">
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
            {!tier.selector && <RadioButtonFrequency recurrence={recurrence} setRecurrence={setRecurrence} />}
            <a
              onClick={() => {
                setValue(
                  "frequency" as Path<K>,
                  ((tier.selector && tier.id) || recurrence) as PathValue<K, Path<K>>
                );
                setNextStep();
              }}
              className={classNames(
                tier.featured
                  ? recurrence > 0
                    ? "bg-indigo-600 text-white font-medium hover:bg-indigo-500"
                    : " bg-gray-200 text-gray-400 font-normal  "
                  : "text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300",
                "mt-8 block cursor-pointer rounded-md py-2.5 px-3.5 transition-colors text-center text-sm font-semibold shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:mt-10"
              )}
            >
              Избери
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

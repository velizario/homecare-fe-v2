import { Dispatch, SetStateAction } from "react";
import { FieldValues, Path, PathValue, UseFormSetValue } from "react-hook-form";
import classNames from "../../helpers/classNames";
import { serviceTypeChoices } from "../../store/static";

interface SelectserviceProps<T extends FieldValues> {
  setValue: UseFormSetValue<T>;
  setNextStep: () => void;
}

export default function SelectService<K extends FieldValues>({setValue, setNextStep }: SelectserviceProps<K>) {
  return (
    <div className="max-w-4xl py-10">
      <h2 id="step-1" className="mx-auto mt-4 w-max text-2xl font-semibold text-gray-900">
        Избери вид услуга
      </h2>
      <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
        Разполагаме с богата гама от услуги за да посрещнем вашите нужди.
      </p>
      <div className="mt-8 divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
        {serviceTypeChoices.map((action, actionIdx) => (
          <div
            key={action.title}
            className={classNames(
              "group relative bg-white p-2 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 hover:bg-neutral-100 sm:p-4 md:p-6"
            )}
          >
            <div className="flex max-h-[7rem] justify-between overflow-hidden">
              <div className="h-full">
                <img src={action.img} className="h-full object-cover" aria-hidden="true" />
              </div>
              <span
                className="pointer-events-none ml-4 hidden text-gray-300 group-hover:text-gray-400 sm:block"
                aria-hidden="true"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                </svg>
              </span>
            </div>
            <div className="mt-2">
              <h3 className="text-base font-semibold leading-6 text-gray-900">
                <a
                  onClick={() => {
                    setValue("service" as Path<K>, action.id as PathValue<K, Path<K>>);
                    setNextStep();
                  }}
                  className="cursor-pointer focus:outline-none"
                >
                  {/* Extend touch target to entire panel */}
                  <span className="absolute inset-0" aria-hidden="true" />
                  {action.title}
                </a>
              </h3>
              <p className="mt-2 text-sm text-gray-500">{action.description}</p>
            </div>
          </div>
        ))}
      </div>
      {/* TODO add sub-survice */}
      {/* <Toggle
        visible={watch.service ? true : false}
        options={additionalServiceChoices[watch.service ?? "1"]}
        styles=""
        setValue={setValue}
        name="additionalService"
      /> */}
    </div>
  );
}

import { useEffect } from "react";
import { FieldValues, Path, PathValue, UseFormSetValue } from "react-hook-form";
import classNames from "../../helpers/classNames";
import { fetchServiceTypeState } from "../../model/essentialsModel";
import { essentialsStore } from "../../store/essentialsStore";
import { EssentialDataServiceType } from "../../types/types";

interface SelectserviceProps<T extends FieldValues> {
  setValue: UseFormSetValue<T>;
  setNextStep: () => void;
}

export default function SelectService<K extends FieldValues>({ setValue, setNextStep }: SelectserviceProps<K>) {
  useEffect(() => {
    fetchServiceTypeState();
  }, []);

  const serviceTypeChoices = essentialsStore((store) => store.serviceTypes);

  return (
    <>
      {serviceTypeChoices.length>0 && (
        <div className="max-w-4xl pt-10">
          <h2 id="step-1" className="mx-auto mt-4 w-max text-2xl font-semibold text-gray-900">
            Избери вид услуга
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
            Разполагаме с богата гама от услуги за да посрещнем вашите нужди.
          </p>
          <div className="mt-8 rounded-lg sm:grid sm:grid-cols-2">
            {serviceTypeChoices.map((serviceType: EssentialDataServiceType, serviceTypeIdx) => (
              <div
                key={serviceType.value}
                className={classNames(
                  "group relative bg-white p-2 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 hover:bg-neutral-100 sm:p-4 md:p-6 border-b [&:nth-child(odd)]:border-r"
                )}
              >
                <div className="flex max-h-[7rem] justify-between overflow-hidden">
                  <div className="h-full">
                    <img src={serviceType.imgUrl} className="h-full object-cover" aria-hidden="true" />
                  </div>
                  <span className="pointer-events-none ml-4 hidden text-gray-300 group-hover:text-gray-400 sm:block" aria-hidden="true">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                    </svg>
                  </span>
                </div>
                <div className="mt-2">
                  <h3 className="text-base font-semibold leading-6 text-gray-900">
                    <a
                      onClick={() => {
                        setValue("serviceType" as Path<K>, { id: serviceType.id } as PathValue<K, Path<K>>);
                        setNextStep();
                      }}
                      className="cursor-pointer focus:outline-none"
                    >
                      {/* Extend touch target to entire panel */}
                      <span className="absolute inset-0" aria-hidden="true" />
                      {serviceType.value}
                    </a>
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">{serviceType.description}</p>
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
      )}
    </>
  );
}

import { Disclosure } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { FieldValues, Path, PathValue, UseFormRegister, UseFormSetValue } from "react-hook-form";

type VendorFiltersType<T extends FieldValues> = {
  id: string;
  label: string;
  options: {
    name: string;
    value: string;
    label: string;
    checked: boolean;
  }[];
  setValue: UseFormSetValue<T>;
};

export default function VendorFilters<K extends FieldValues>({ id, label, options, setValue }: VendorFiltersType<K>) {
  return (
    <>
      <Disclosure defaultOpen as="div" key={id} className="border-b border-gray-200 py-6">
        {({ open }) => (
          <>
            <h3 className="-my-3 flow-root">
              <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                <span className="text-xs font-normal uppercase text-gray-900">{label}</span>
                <span className="ml-6 flex items-center">
                  {open ? <MinusIcon className="h-5 w-5" aria-hidden="true" /> : <PlusIcon className="h-5 w-5" aria-hidden="true" />}
                </span>
              </Disclosure.Button>
            </h3>
            <Disclosure.Panel className="pt-6">
              <div className="space-y-4">
                {options.map((option, optionIdx) => (
                  <div key={option.name} className="flex items-center px-2">
                    <input
                      id={`filter-${id}-${optionIdx}`}
                      defaultValue={option.value}
                      type="checkbox"
                      defaultChecked={option.checked}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      onChange={(e) => setValue(option.name as Path<K>, (e.target.checked || null) as PathValue<K, Path<K>>)}
                    />
                    <label htmlFor={`filter-${id}-${optionIdx}`} className="ml-3 text-sm text-gray-600">
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}

import { FieldErrors, FieldValues, Path, UseFormRegister } from "react-hook-form";
import classNames from "../../../../helpers/classNames";
import { SelectionOption } from "../../../../types/types";
import InputErrorMessage from "../../../../utilityComponents/InputErrorMessage";

// TODO replace SelectionDropdown with this??

interface TInputField<T extends FieldValues> {
  name: string;
  label: string;
  register: UseFormRegister<T>;
  className: string;
  errors: FieldErrors<T>;
  options: SelectionOption[];
  autoComplete?: string;
  disabled?: boolean;
}

export default function InputField<K extends FieldValues>({
  options,
  className,
  name,
  label,
  register,
  errors,
  autoComplete,
  disabled = false,
}: TInputField<K>) {
  const errorMessage = errors[name]?.message?.toString();
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-normal text-gray-900">
        {label}
      </label>
      <select
        className={classNames(
          disabled
            ? "bg-gray-50 text-gray-600"
            : "bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600",
          "mt-1 w-full rounded-md border-0 py-1.5 pl-3 pr-10  sm:text-sm sm:leading-6"
        )}
        id={name}
        autoComplete={autoComplete}
        {...register(name as Path<K>)}
      >
        <span
          className={classNames(
            "absolute z-10 mt-1 flex max-h-64 w-full flex-col overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            // open ? "absolute" : "hidden"
          )}
        >
          {options.map((option) => (
            <div
              // onClick={updateSelection}
              data-id={option.id}
              key={option.id}
              className={classNames(
                "p-2 text-sm ",
                // selected?.id === item.id
                // ? "cursor-pointer bg-indigo-600 text-white"
                // : validOptions.find((option) => option.id === item.id)
                // ? "cursor-pointer hover:bg-neutral-100"
                "pointer-events-none cursor-default text-gray-400  line-through"
              )}
            >
              <option key={option.value}>{option.value}</option>
            </div>
          ))}
        </span>
        {/* {options.map((option) => (
          <option  key={option.value}>{option.value}</option>
        ))} */}
      </select>

      <InputErrorMessage>{errorMessage}</InputErrorMessage>
    </div>
  );
}

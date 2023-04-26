import { FieldErrors, FieldValues, Path, UseFormRegister } from "react-hook-form";
import InputErrorMessage from "./InputErrorMessage";

interface TInputFieldNew<T extends FieldValues> {
  name: string;
  label: string;
  register: UseFormRegister<T>;
  className: string;
  errors: FieldErrors<T>;
  defaultValue?: string;
  autoComplete?: string;
}

export default function InputFieldNew<K extends FieldValues>({ defaultValue, className, name, label, register, errors, autoComplete }: TInputFieldNew<K>) {
  const errorMessage = errors[name]?.message?.toString();
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-normal text-gray-900">
        {label}
      </label>
      <input
        defaultValue={defaultValue}
        type="text"
        className="mt-1 block w-full rounded-md border-gray-300 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        id={name}
        autoComplete={autoComplete}
        {...register(name as Path<K>)}
      ></input>
      <InputErrorMessage>{errorMessage}</InputErrorMessage>
    </div>
  );
}

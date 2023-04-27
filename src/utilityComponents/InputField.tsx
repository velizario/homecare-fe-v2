import { FieldErrors, FieldValues, Path, UseFormRegister } from "react-hook-form";
import InputErrorMessage from "./InputErrorMessage";

interface TInputField<T extends FieldValues> {
  name: string;
  label: string;
  register: UseFormRegister<T>;
  className: string;
  errors: FieldErrors<T>;
  autoComplete?: string;
}

export default function InputField<K extends FieldValues>({ className, name, label, register, errors, autoComplete }: TInputField<K>) {
  const errorMessage = errors[name]?.message?.toString();
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-normal text-gray-900">
        {label}
      </label>
      <input
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

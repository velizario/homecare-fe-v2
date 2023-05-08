import { Control, FieldErrors, FieldPath, FieldValues, Path, useController, UseFormRegister } from "react-hook-form";
import InputErrorMessage from "./InputErrorMessage";

interface TInputField<T extends FieldValues> {
  name: string;
  label: string;
  control: Control<T, object>;
  className?: string;
  autoComplete?: string;
  type?: string;
}

export default function InputField<K extends FieldValues>({ className, name, label, control, autoComplete, type="text" }: TInputField<K>) {
  
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name: name as Path<K>,
    control,
  });
  
  const errorMessage = error?.message?.toString();

  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-normal text-gray-900">
        {label}
      </label>
      <input
        type={type}
        className="mt-1 block w-full rounded-md border-gray-300 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        id={name}
        autoComplete={autoComplete}
        onChange={onChange}
        value={value || ""}
      ></input>
      <InputErrorMessage>{errorMessage}</InputErrorMessage>
    </div>
  );
}

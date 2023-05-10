import { Control, FieldErrors, FieldPath, FieldValues, Path, useController, UseFormRegister } from "react-hook-form";
import InputErrorMessage from "./InputErrorMessage";

interface TInputField<T extends FieldValues> {
  name: string;
  id: string;
  label: string;
  control: Control<T, object>;
  className?: string;
  autoComplete?: string;
  type?: string;
}

export default function InputField<K extends FieldValues>({ className, name, id, label, control, autoComplete, type="text" }: TInputField<K>) {
  
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
      <label htmlFor={id} className="block text-sm font-normal text-gray-900">
        {label}
      </label>
      <input
        type={type}
        className="mt-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 w-full rounded-md border-0 py-1.5 pl-3 pr-10 sm:text-sm sm:leading-6 focus:border-blue-500 focus:ring-blue-500"
        id={id}
        autoComplete={autoComplete}
        onChange={onChange}
        value={value || ""}
      ></input>
      <InputErrorMessage>{errorMessage}</InputErrorMessage>
    </div>
  );
}

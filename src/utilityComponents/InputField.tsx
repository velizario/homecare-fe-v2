import { forwardRef } from "react";
import { Control, Controller, FieldPath, FieldValues, useFormState } from "react-hook-form";
import classNames from "../helpers/classNames";
import InputErrorMessage from "./InputErrorMessage";

interface InputFieldProps<T extends FieldValues> {
  control: Control<T, object>;
  name: FieldPath<T>;
  label: string;
  id: string;
  autoComplete?: string;
  className: string;
  include?: boolean;
  defaultValue?: string;
  type?: string;
}

function InputFieldInner<K extends FieldValues>(
  {
    control,
    label,
    name,
    id,
    autoComplete,
    className,
    include,
    defaultValue,
    type = "text",
    ...props
  }: InputFieldProps<K>,
  _ref: React.ForwardedRef<HTMLInputElement>
) {
  const { errors } = useFormState({ control });
  const errorMessage = errors[name]?.message?.toString();

  return (
    <div className={classNames(include === undefined && typeof include !== "undefined" ? "hidden" : "", className)}>
      <label htmlFor={name} className="block text-sm font-normal text-gray-900">
        {label}
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value, ref } }) => (
          <>
            <input
              defaultValue={defaultValue}
              className="mt-1 block w-full rounded-md border-gray-300 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              type={type}
              id={id}
              autoComplete={autoComplete}
              {...props}
              ref={ref}
              onChange={onChange}
            />
            <InputErrorMessage>{errorMessage}</InputErrorMessage>
          </>
        )}
      />
    </div>
  );
}

const InputField = forwardRef(InputFieldInner) as <T extends FieldValues>(
  props: InputFieldProps<T> & { ref?: React.ForwardedRef<HTMLInputElement> }
) => ReturnType<typeof InputFieldInner>;

export default InputField;

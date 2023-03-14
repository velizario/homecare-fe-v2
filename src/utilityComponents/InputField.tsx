import { forwardRef, HTMLInputTypeAttribute } from "react";
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  useFormState,
} from "react-hook-form";
import classNames from "../helpers/classNames";
import { userState } from "../store/userState";
import { ProfileForm } from "../structure/dashboard/account/profile/Profile";

interface InputFieldProps<T extends FieldValues> {
  control: Control<T, object>;
  name: FieldPath<T>;
  label: string;
  id: string;
  autoComplete?: string;
  className: string;
  include?: boolean;
  defaultValue?: string;
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
    ...props
  }: InputFieldProps<K>,
  _ref: React.ForwardedRef<HTMLInputElement>
) {
  const { errors } = useFormState({ control });
  const errorMessage = errors[name]?.message?.toString();
  const userData = userState((state) => state.userData);


  return (
    <div
      className={classNames(
        include === undefined && typeof include !== "undefined" ? "hidden" : "",
        className
      )}
    >
      <label htmlFor={name} className="block text-sm font-normal text-gray-900">
        {label}
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value, ref } }) => (
          <input
            {...props}
            defaultValue={defaultValue}
            className="mt-1 block w-full rounded-md border-gray-300 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            type="text"
            id={id}
            autoComplete={autoComplete}
            ref={ref}
            onChange={onChange}
          />
        )}
      />
    </div>
  );
}

const InputField = forwardRef(InputFieldInner) as <T extends FieldValues>(
  props: InputFieldProps<T> & { ref?: React.ForwardedRef<HTMLInputElement> }
) => ReturnType<typeof InputFieldInner>;

export default InputField;

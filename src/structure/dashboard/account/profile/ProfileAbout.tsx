import { forwardRef } from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

interface ProfileAboutProps<T extends FieldValues> {
  control: Control<T, object>;
  name: FieldPath<T>;
  defaultValue?: string;
}

function ProfileAboutInner<K extends FieldValues>(
  { defaultValue, name, control, ...props }: ProfileAboutProps<K>,
  _ref: React.ForwardedRef<HTMLInputElement>
) {
  return (
    <div className="sm:col-span-6">
      <label
        htmlFor="description"
        className="block text-sm font-normal text-gray-900"
      >
        Няколко думи за Вас*
      </label>
      <div className="mt-1">
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, value, ref } }) => (
            <textarea
              {...props}
              id="description"
              name="description"
              rows={4}
              className="block w-full overflow-y-scroll rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm md:overflow-y-auto"
              defaultValue={defaultValue}
              ref={ref}
              onChange={onChange}
            />
          )}
        />
      </div>
    </div>
  );
}

const ProfileAbout = forwardRef(ProfileAboutInner) as <T extends FieldValues>(
  props: ProfileAboutProps<T> & { ref?: React.ForwardedRef<HTMLInputElement> }
) => ReturnType<typeof ProfileAboutInner>;

export default ProfileAbout;

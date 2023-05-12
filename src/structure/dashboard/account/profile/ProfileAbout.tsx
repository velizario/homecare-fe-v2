import { Control, FieldValues, Path, useController } from "react-hook-form";

interface ProfileAboutProps<T extends FieldValues> {
  control: Control<T, object>;
  name: string;
  label: string;
  className?: string;
}

export default function ProfileAbout<K extends FieldValues>({ name, control, label, className }: ProfileAboutProps<K>) {
  const {
    field: { value, onChange },
  } = useController({
    name: name as Path<K>,
    control,
  });

  return (
    <div className={className}>
      <label htmlFor="description" className="block text-sm font-normal text-gray-900">
        {label}
      </label>
      <textarea
        name={name}
        rows={4}
        className="mt-1 block w-full overflow-y-scroll rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm md:overflow-y-auto"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

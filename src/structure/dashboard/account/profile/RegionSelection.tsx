import { forwardRef } from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

interface RegionSelectionProps<T extends FieldValues> {
  control: Control<T, object>;
  name: FieldPath<T>;
  defaultValue?: string;
}

function RegionSelectionInner<K extends FieldValues>(
  { control, name, defaultValue, ...props }: RegionSelectionProps<K>,
  _ref: React.ForwardedRef<HTMLSelectElement>
) {

  const options = [
    {id: 1, value: "Витоша"},
    {id: 1, value: "Банишора"},
    {id: 1, value: "Триъгълниците"},
    {id: 1, value: "Център"},
    {id: 1, value: "Лозенец"},
  ]

  return (
    <div className="sm:col-span-3">
      <label htmlFor="country" className="block text-sm text-gray-900">
        Квартал/Район
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value, ref } }) => (
          <select
            {...props}
            defaultValue={defaultValue}
            value={value}
            id="country"
            autoComplete="country-name"
            className="mt-1 block w-full rounded-md border-gray-300 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            ref={ref}
            onChange={onChange}
          >
            <option />
            {options.map((option) => <option key={option.value} >{option.value}</option>)}

          </select>
          
        )}
      />
    </div>
  );
}

const RegionSelection = forwardRef(RegionSelectionInner) as <T extends FieldValues>(
  props: RegionSelectionProps<T> & { ref?: React.ForwardedRef<HTMLInputElement> }
) => ReturnType<typeof RegionSelectionInner>;

export default RegionSelection;

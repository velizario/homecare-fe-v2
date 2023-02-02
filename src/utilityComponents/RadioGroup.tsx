import classNames from "../helpers/classNames";
import { type SelectionOption } from "../helpers/types";

interface RadioGroupProps {
  options: SelectionOption[];
  activeId: string | undefined;
  onClick: (id: string) => void;
  styles?: string;
  name: string;
}

export default function RadioGroup({ options, activeId, onClick, styles, name }: RadioGroupProps) {

  const onSelect = (e: React.SyntheticEvent<HTMLDivElement>) => {
    console.log(e.currentTarget);
    (e.currentTarget.querySelector("input") as HTMLInputElement).focus();
    onClick(e.currentTarget.dataset.id as string)
  }

  const stopPrapagate = (e: React.SyntheticEvent) => {
    e.stopPropagation()
  }

  return (
    <fieldset className={classNames("mt-3", styles ?? "")}>
      <legend className="sr-only">Plan</legend>
      <div className="space-y-5 max-w-md">
        {options.map((option) => (
          <div id={name} key={option.id} data-id={option.id} onClick={onSelect} className="relative flex items-start cursor-pointer">
            <div className="flex h-5 items-center">
              <input
                id={`${name}-${option.id}`}
                checked={option.id === activeId}
                onChange={stopPrapagate}
                aria-describedby={`${option.id}-description`}
                name={name}
                type="radio"
                className="mt-1 h-5 w-5 border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer transition-all duration-300"
              />
            </div>
            <div className="ml-3">
              <label htmlFor={`${name}-${option.id}`} onClick={stopPrapagate} className="text-gray-800 cursor-pointer">
                {option.name}
              </label>
              <p className="text-gray-500 font-light text-sm mt-1.5 cursor-pointer">
                {option.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </fieldset>
  )
}

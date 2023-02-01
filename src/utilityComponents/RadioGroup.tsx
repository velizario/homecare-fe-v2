import { type SelectionOption } from "../helpers/types";

interface RadioGroupProps {
  options: SelectionOption[];
  activeId: string | undefined;
  onClick: (id: string) => void;
}

// interface UserTypeSelectionProps {
//   options: SelectionOption[];
//   styles?: string;
// }


export default function RadioGroup({ options, activeId, onClick }: RadioGroupProps) {

  const onSelect = (e: React.SyntheticEvent<HTMLDivElement>) => {
    (e.currentTarget.querySelector("input") as HTMLInputElement).focus();
    onClick(e.currentTarget.dataset.id as string)
  }

  const stopPrapagate = (e: React.SyntheticEvent) => {
    e.stopPropagation()
  }

  return (
    <fieldset>
      <legend className="sr-only">Plan</legend>
      <div className="space-y-5 max-w-md mt-3">
        {options.map((option) => (
          <div key={option.id} data-id={option.id} onClick={onSelect} className="relative flex items-start cursor-pointer">
            <div className="flex h-5 items-center">
              <input
                id={option.id}
                checked={option.id === activeId}
                onChange={stopPrapagate}
                aria-describedby={`${option.id}-description`}
                name="option"
                type="radio"
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer transition-all duration-300"
              />
            </div>
            <div className="ml-3">
              <label htmlFor={option.id} onClick={stopPrapagate} className="text-gray-800 cursor-pointer">
                {option.name}
              </label>
              <p id={`${option.id}-description`} className="text-gray-500 font-light text-sm mt-1.5 cursor-pointer">
                {option.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </fieldset>
  )
}

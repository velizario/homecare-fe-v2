import { SelectionOption } from "../../helpers/types";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface UserTypeSelectionProps {
  activeId: string | Set<string> | undefined;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  options: SelectionOption[];
  styles?: string;
}

export default function UserTypeSelection({ activeId, onClick, options, styles }: UserTypeSelectionProps) {


  return (
    <>
      <div className="sm:col-span-4 mt-2">
        <div className={classNames("flex flex-wrap gap-3 whitespace-nowrap", styles || "")}>
          {options.map((option) => (
            <div
              key={option.id}
              data-id={option.id}
              onClick={onClick}
              className={classNames(
                (activeId === option.id || (activeId instanceof Set && activeId.has(option.id)))
                  ? 'bg-indigo-600 border-transparent text-white hover:bg-indigo-700'
                  : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50',
                'border rounded-full py-3 px-5 flex justify-center text-sm gap-1 cursor-pointer shadow-order flex-1'
              )
              }
            >
              <span className="text-base">{option.name}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

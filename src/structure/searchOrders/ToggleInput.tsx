import { Switch } from '@headlessui/react'
import classNames from '../../helpers/classNames';
import { type SelectionOption } from '../../types/types';

interface ToggleInputProps {
  options: SelectionOption[];
  activeId: string | Set<string> | undefined;
  onClick: React.MouseEventHandler<HTMLElement>
  styles? :string;
}

export default function ToggleInput({ options, activeId, onClick, styles }: ToggleInputProps) {
  return (
    <div className={classNames('flex flex-col gap-6 mt-3', styles ?? "")}>
      {
        options.map(option => {
          const enabled = (activeId === option.id || (activeId instanceof Set && activeId.has(option.id)));
          return (
            <div key={option.id} className='flex gap-2'>
              <Switch.Group>
                <Switch
                  key={option.id}
                  data-id={option.id}
                  checked={enabled}
                  onClick={onClick}
                  className={`${enabled ? 'bg-indigo-600' : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 items-center rounded-full`}
                >
                  <span className="sr-only">Enable notifications</span>
                  <span
                    className={`${enabled ? 'translate-x-6' : 'translate-x-1'
                      } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                  />
                </Switch>
                <Switch.Label className={classNames("cursor-pointer", enabled ? "text-indigo-700 font-medium" : "text-gray-500")}>{option.name}</Switch.Label>
              </Switch.Group>
            </div>)
        }
        )}
    </div>
  )
}
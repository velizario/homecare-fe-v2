import { useState } from 'react'
import { Switch } from '@headlessui/react'
import classNames from '../../helpers/classNames';
import { SelectionOption } from '../../helpers/types';

interface ToggleInputProps {
  options: SelectionOption[];
  activeId: string | Set<string> | undefined;
  onClick: React.MouseEventHandler<HTMLElement>
}

export default function ToggleInput({ options, activeId, onClick }: ToggleInputProps) {
  return (
    <div className='flex flex-col gap-6 max-w-md mt-3'>
      {
        options.map(option => {
          let enabled = (activeId === option.id || (activeId instanceof Set && activeId.has(option.id)));
          return (
            <div className='flex gap-2'>
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
                {option.name && <Switch.Label className={classNames("cursor-pointer", enabled ? "text-indigo-800" : "text-gray-500")}>{option.name}</Switch.Label>}
              </Switch.Group>
            </div>)
        }
        )}
    </div>
  )
}
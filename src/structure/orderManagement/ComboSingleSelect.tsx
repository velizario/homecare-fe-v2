/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { useState } from 'react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Combobox } from '@headlessui/react'
import classNames from '../../helpers/classNames'

export type Location = {id: number, value: string}

const locations: Location[] = [
    {id: 1, value: "Витоша"},
    {id: 2, value: "Банишора"},
    {id: 3, value: "Триъгълниците"},
    {id: 4, value: "Център"},
    {id: 5, value: "Лозенец"},
]


interface ComboSingleSelectProps {
  location: Location | null;
  setLocation: React.Dispatch<React.SetStateAction<Location | null>>;
}

export default function ComboSingleSelect({location, setLocation} : ComboSingleSelectProps) {
  const [query, setQuery] = useState('')

  const filteredlocations =
    query === ''
      ? locations
      : locations.filter((location) => {
          return location.value.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <Combobox as="div" value={location} onChange={setLocation}>
      <div className="relative mt-8">
        <Combobox.Input
          className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(location) => (location as Location)?.value || ""}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>

        {filteredlocations.length > 0 && (
          <Combobox.Options className="absolute bottom-full z-10 mb-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredlocations.map((location) => (
              <Combobox.Option
                key={location.id}
                value={location}
                className={({ active }) =>
                  classNames(
                    'relative cursor-default select-none py-2 pl-3 pr-9',
                    active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span className={classNames('block truncate', selected ? 'font-semibold': "")}>{location?.value || ""}</span>

                    {selected && (
                      <span
                        className={classNames(
                          'absolute inset-y-0 right-0 flex items-center pr-4',
                          active ? 'text-white' : 'text-indigo-600'
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  )
}
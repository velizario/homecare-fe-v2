import { useEffect, useRef, useState } from 'react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Combobox } from '@headlessui/react'
import Badge from '../../../../utilityComponents/Badge';


interface Person { id: number; name: string }

const people: Person[] = [

    { id: 1, name: 'Leslie Alexander' },
    { id: 2, name: 'saf Alexander' },
    { id: 3, name: 'Lessaglie Alefjxander' },
    { id: 4, name: 'edfh Alexander' },
    { id: 5, name: 'Ledsadie Alefjxander' },
    { id: 6, name: 'Ledfhsljie Alexander' },
    { id: 7, name: 'Ledfhstfjjslie Alexander' },
    { id: 8, name: 'Ledfhssdglie Alexander' },
    { id: 9, name: 'Ledfhslie Alexander' },
    { id: 10, name: 'Ledfhdjslie Alexanjfder' },
    { id: 11, name: 'Ledfhslie Alexandfer' },
    { id: 12, name: 'Ledfhfgdjslie Alexander' },
    { id: 13, name: 'Ledfhfgjfslie Alejxandfgjer' },
    { id: 14, name: 'Ledfhslie Alefgjxander' },
    { id: 15, name: 'Ledfhslie Alexander' },
    // More users...
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}



export default function ComboSelectBox() {
    const [query, setQuery] = useState('')
    const [selectedPerson, setSelectedPerson] = useState<Person[] | Array<Record<string, any>>>([])
    const [value, setValue] = useState("")


    const filteredPeople =
        query === ''
            ? people
            : people.filter((person) => {
                return person.name.toLowerCase().includes(query.toLowerCase())
            })

    const scrollDropdownIntoView = (behavior: "auto" | "smooth" = "auto") => {
        const el = comboRef.current;
        if (el == null) return
        const scrollGap = el.getBoundingClientRect().bottom - window.innerHeight
        if (scrollGap > 0)
            comboRef.current?.scrollIntoView({ block: "end", inline: "nearest", behavior })
        // window.scrollBy(0, scrollGap)
    }

    useEffect(() => {
        scrollDropdownIntoView();
    }, [query])

    const comboRef = useRef<null | HTMLUListElement>(null)


    return (


        <Combobox as="div" value={selectedPerson} onChange={setSelectedPerson} multiple nullable className="sm:col-span-3 coverage-combo-box">
                <>
                    <div className='flex flex-col md:flex-row gap-2 items-start md:justify-between md:items-center'>
                        <p className="block text-sm font-normal text-gray-900">Квартали, в които работите</p>
                        <button
                            type="button"
                            onClick={() => { setSelectedPerson(selected => selected.length !== people.length ? people : []); }}
                            className="inline-flex underline items-center h-full text-xs font-medium text-gray-600  hover:text-black "
                        >
                            Избирам всички
                        </button>
                    </div>
                    <div className="relative mb-2">
                        <Combobox.Input
                            className="mt-1 block w-full rounded-md border-gray-300 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            onChange={(event) => { setQuery(event.target.value); }}
                            onBlur={() => { setValue(""); }}
                            displayValue={() => value}
                            onFocus={() => { setQuery(""); }}
                        />
                        <Combobox.Button onClick={() => setTimeout(() => {
                            scrollDropdownIntoView("smooth")
                        }, 200)} className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                            <ChevronUpDownIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
                        </Combobox.Button>
                        {filteredPeople.length > 0 && (
                            <Combobox.Options ref={comboRef} className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {filteredPeople.map((person) => (
                                    <Combobox.Option
                                        key={person.id}
                                        value={person}
                                        className={({ active }) =>
                                            classNames(
                                                'relative cursor-default select-none py-2 pl-3 pr-9',
                                                active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                                            )
                                        }
                                    >
                                        {({ active, selected }) => (
                                            <>
                                                <span className={classNames('block truncate', selected ? 'font-semibold' : "")}>{person.name}</span>
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
                    <Combobox.Label className="flex flex-wrap line-clamp-3 leading-relaxed">
                        {selectedPerson.map((person) => "name" in person && <Badge key={person.id} styles="whitespace-nowrap">{person?.name}</Badge>)}
                    </Combobox.Label>
                </>
        </Combobox >
    )
}
import { useState } from "react"
import classNames from "../../../helpers/classNames"

const chatBuddies = [
    {
        id: 1,
        name: 'Leslie Alexander',
        handle: 'lesliealexander',
        role: 'Co-Founder / CEO',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        unread: 4
    },
    {
        id: 2,
        name: 'Michael Foster',
        handle: 'michaelfoster',
        role: 'Co-Founder / CTO',
        imageUrl:
            'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        unread: 4
    },
    {
        id: 3,
        name: 'Dries Vincent',
        handle: 'driesvincent',
        role: 'Manager, Business Relations',
        imageUrl:
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        unread: 4
    },
    {
        id: 4,
        name: 'Lindsay Walton',
        handle: 'lindsaywalton',
        role: 'Front-end Developer',
        imageUrl:
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        unread: 4
    },
]

export default function ChatBuddies() {
    const [active, setActive] = useState(1);

    return (
        <div className="w-full max-w-xs flex-none border-y">
            {
                <ul role="list" className="relative z-0">
                    {chatBuddies.map((person) => (
                        <li key={person.id} onClick={() => setActive(person.id)} className={classNames(person.id === active ? "bg-indigo-50" : "", "group hover:bg-indigo-50 px-6 flex justify-between cursor-pointer border-b border-indigo-100")}>
                            <div className="relative flex items-center space-x-3 py-5 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500 ">
                                <img className="flex-shrink-0 h-10 w-10 rounded-full" src={person.imageUrl} alt="" />
                                <div className="min-w-0 flex-1">
                                    <a className="focus:outline-none">
                                        {/* Extend touch target to entire panel */}
                                        <span className="absolute inset-0" aria-hidden="true" />
                                        <p className="text-sm font-medium text-gray-900">{person.name}</p>
                                        <p className="truncate text-sm text-gray-500">{person.role}</p>
                                    </a>
                                </div>
                            </div>
                            {person.unread ? (
                                <span
                                    className={classNames(
                                        person.id === active ? 'bg-indigo-200' : 'bg-indigo-50',
                                        'self-center ml-3 inline-block py-0.5 px-3 text-xs font-medium rounded-full group-hover:bg-indigo-200'
                                    )}
                                >
                                    {person.unread}
                                </span>
                            ) : null}
                        </li>
                    ))}
                </ul>
            }
        </div>
    )
}
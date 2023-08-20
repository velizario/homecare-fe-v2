import { useEffect, useState } from "react";
import classNames from "../../../helpers/classNames";
import { fetchOrderState } from "../../../model/orderModel";
import Messages from "./Messages";

const chatBuddies = [
  {
    id: 1,
    name: "Leslie Alexand  asfasfsd sadf  asf asf as easd sadg asdr",
    handle: "lesliealexander",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    unread: 4,
  },
  {
    id: 2,
    name: "Michael Foster",
    handle: "michaelfoster",
    role: "Co-Founder / CTO",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    unread: 4,
  },
  {
    id: 3,
    name: "Dries Vincent",
    handle: "driesvincent",
    role: "Manager, Bus asdf sd sdf siness Relations",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    unread: 4,
  },
  {
    id: 4,
    name: "Lindsay Walton",
    handle: "lindsaywalton",
    role: "Front-end Developer",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    unread: 4,
  },
];

export default function Chat() {
  const [active, setActive] = useState(1);

  const handleBuddySelect = (buddyId: number) => {
    setActive(buddyId);
  };

  useEffect(() => {
    fetchOrderState();
  }, []);

  return (
    <div className="overflow-none flex h-[calc(100vh-116px)]">
      <div className={classNames("block", "w-full min-w-0 flex-none border-y md:block md:w-auto")}>
        {
          <ul role="list" className="relative z-0">
            {chatBuddies.map((person) => (
              <li
                key={person.id}
                onClick={() => {
                  handleBuddySelect(person.id);
                }}
                className={classNames(
                  person.id === active ? "bg-indigo-50" : "",
                  "group flex cursor-pointer justify-between border-b border-indigo-100 px-4  hover:bg-indigo-50"
                )}
              >
                <div className="relative flex items-center space-x-3 py-4 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500 ">
                  <img className="h-10 w-10 flex-shrink-0 rounded-full" src={person.imageUrl} alt="" />
                  <div className="w-44 truncate">
                    <a className="focus:outline-none">
                      {/* Extend touch target to entire panel */}
                      <span className="absolute inset-0" aria-hidden="true" />
                      <p className="truncate text-sm font-medium text-gray-900">{person.name}</p>
                      <p className="truncate text-xs text-gray-500">{person.role}</p>
                    </a>
                  </div>
                </div>
                {person.unread > 0 ? (
                  <span
                    className={classNames(
                      person.id === active ? "bg-indigo-200" : "bg-indigo-50",
                      "ml-3 block self-center rounded-full px-3 py-0.5 text-xs font-medium group-hover:bg-indigo-200 "
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
      <Messages />
    </div>
  );
}

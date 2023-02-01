import {
  ChatBubbleBottomCenterTextIcon, ClipboardDocumentListIcon, HomeIcon, UserIcon
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "../../../helpers/classNames";

export const sideNavigation = [
  {
    id: 1,
    name: "Начало",
    route: "/",
    icon: HomeIcon,
    count: 0
  },
  {
    id: 2,
    name: "Поръчки",
    route: "orders",
    icon: ClipboardDocumentListIcon,
    count: 2
  },
  {
    id: 3,
    name: "Съобщения",
    route: "chat",
    icon: ChatBubbleBottomCenterTextIcon,
    count: 12
  },
  {
    id: 4,
    name: "Акаунт",
    route: "account",
    icon: UserIcon,
    count: 0
  },
]

interface SidebarProps {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


export default function Sidebar({ setSidebarOpen }: SidebarProps) {

  const [activeMenuItem, setActiveMenuItem] = useState(1)

  const handleMenuItemClick = (selectedMenuItemId:number) => {
    setActiveMenuItem(selectedMenuItemId)
    setSidebarOpen(false)
  }

  return (
    <>
      <div className="flex w-full flex-col items-center py-6">
        <div className="hidden md:flex  flex-shrink-0 items-center lg:self-start lg:pl-6">
          <img
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=white"
            alt="Your Company"
          />
        </div>
        <nav className="mt-5 w-full flex-1 space-y-1 px-2">
          {sideNavigation.map((item) => (
            <Link
              key={item.name}
              data-id={item.id}
              onClick={() => { handleMenuItemClick(item.id); }}
              to={item.route}
              className={classNames(
                item.id === activeMenuItem
                  ? "bg-indigo-800 text-white"
                  : "text-indigo-100 hover:bg-indigo-600 hover:bg-opacity-75 ",
                "group w-full p-3 lg:px-6 lg:text-sm rounded-md flex flex-col lg:flex-row items-center text-xs font-medium"
              )}
              aria-current={item.id === activeMenuItem ? "page" : undefined}
            >
              <item.icon
                className={classNames(
                  item.id === activeMenuItem
                    ? "text-white"
                    : "text-indigo-300 ",
                  "h-6 w-6 lg:mr-3"
                )}
                aria-hidden="true"
              />
              {/* no mt-2; flex-1 */}
              <span className="mt-2 lg:mt-0">{item.name}</span>
              {item.count > 0 ? (
                <span
                  className={classNames(
                    item.id === activeMenuItem ? 'bg-indigo-600' : 'bg-indigo-800',
                    'hidden lg:inline-block ml-3 py-0.5 px-3 text-xs font-medium rounded-full'
                  )}
                >
                  {item.count}
                </span>
              ) : null}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}

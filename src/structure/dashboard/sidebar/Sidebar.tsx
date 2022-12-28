import classNames from "../../../helpers/classNames";
import {
    HomeIcon,
    ChatBubbleBottomCenterTextIcon,
    UserIcon,
    ClipboardDocumentListIcon,
  } from "@heroicons/react/24/outline";

export const navigation = [
    { name: "Начало", href: "#", icon: HomeIcon, current: false },
    {
      name: "Поръчки",
      href: "#",
      icon: ClipboardDocumentListIcon,
      current: false,
    },
    {
      name: "Съобщения",
      href: "#",
      icon: ChatBubbleBottomCenterTextIcon,
      current: true,
    },
    { name: "Профил", href: "#", icon: UserIcon, current: false },
  ]
  const userNavigation = [
  
  
    { name: 'Your Profile', href: '#' },
    { name: 'Sign out', href: '#' },
  ]

  
export default function Sidebar() {
  return (
    <>
      <div className="hidden w-28 overflow-y-auto bg-indigo-700 md:block">
        <div className="flex w-full flex-col items-center py-6">
          <div className="flex flex-shrink-0 items-center">
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=white"
              alt="Your Company"
            />
          </div>
          <div className="mt-6 w-full flex-1 space-y-1 px-2">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={classNames(
                  item.current
                    ? "bg-indigo-800 text-white"
                    : "text-indigo-100 hover:bg-indigo-800 hover:text-white",
                  "group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium"
                )}
                aria-current={item.current ? "page" : undefined}
              >
                <item.icon
                  className={classNames(
                    item.current
                      ? "text-white"
                      : "text-indigo-300 group-hover:text-white",
                    "h-6 w-6"
                  )}
                  aria-hidden="true"
                />
                <span className="mt-2">{item.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

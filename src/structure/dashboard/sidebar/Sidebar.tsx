import classNames from "../../../helpers/classNames";
import {
    HomeIcon,
    ChatBubbleBottomCenterTextIcon,
    UserIcon,
    ClipboardDocumentListIcon,
  } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";

export const sideNavigation = [
    { name: "Начало", route: "/", icon: HomeIcon, current: false, count: 0 },
    {
      name: "Поръчки",
      route: "orders",
      icon: ClipboardDocumentListIcon,
      current: false,
      count: 2
    },
    {
      name: "Съобщения",
      route: "chat",
      icon: ChatBubbleBottomCenterTextIcon,
      current: true,
      count: 12
    },
    { name: "Акаунт", route: "account", icon: UserIcon, current: false, count: 0 },
  ]
  const userNavigation = [
  
  
    { name: 'Your Profile', route: '#' },
    { name: 'Sign out', route: '#' },
  ]


  
export default function Sidebar() {

  const navigate = useNavigate();

  const routeTo = (to?: string) => {
    if (!to) return;
    navigate(to);
  }

  return (
    <>
        <div className="flex w-full flex-col items-center py-6">
          <div className="hidden md:block flex-shrink-0 items-center">
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=white"
              alt="Your Company"
            />
          </div>
          <div className="mt-6 w-full flex-1 space-y-1 px-2">
            {sideNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.route}
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
              </Link>
            ))}
          </div>
        </div>
    </>
  );
}

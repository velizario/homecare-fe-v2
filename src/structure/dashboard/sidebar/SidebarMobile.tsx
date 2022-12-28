import classNames from "../../../helpers/classNames";
import { navigation } from "./Sidebar";

// TODO reuse the sidebar component instead of mobile. Fix parent divs behavior for it.
export default function SidebarMobile() {
  return (
    <>
      <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
        <div className="flex flex-shrink-0 items-center px-4">
          <img
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=300"
            alt="Your Company"
          />
        </div>
        <nav className="mt-5 space-y-1 px-2">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={classNames(
                item.current
                  ? "bg-indigo-800 text-white"
                  : "text-white hover:bg-indigo-600 hover:bg-opacity-75",
                "group flex items-center px-2 py-2 text-base font-medium rounded-md"
              )}
            >
              <item.icon
                className="mr-4 h-6 w-6 flex-shrink-0 text-indigo-300"
                aria-hidden="true"
              />
              {item.name}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}

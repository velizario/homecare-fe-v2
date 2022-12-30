import { CalendarIcon, ChartBarIcon, FolderIcon, HomeIcon, InboxIcon, UsersIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { sideNavigation } from './Sidebar'


function classNames(...classes:string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function SidebarDesktop() {
  return (
    <div className="flex min-h-0 flex-1 flex-col bg-indigo-700">
      <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
        <div className="flex flex-shrink-0 items-center px-4">
          <img
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=300"
            alt="Your Company"
          />
        </div>
        <nav className="mt-5 flex-1 space-y-1 px-2" aria-label="Sidebar">
          {sideNavigation.map((item) => (
            <Link
            to={item.route}
              key={item.name}
              className={classNames(
                item.current ? 'bg-indigo-800 text-white' : 'text-indigo-100 hover:bg-indigo-600 hover:bg-opacity-75',
                'group flex items-center px-6 py-2 text-sm font-medium rounded-md'
              )}
            >
              <item.icon className="mr-3 h-6 w-6 flex-shrink-0 text-indigo-300" aria-hidden="true" />
              <span className="flex-1">{item.name}</span>
              {item.count ? (
                <span
                  className={classNames(
                    item.current ? 'bg-indigo-600' : 'bg-indigo-800',
                    'ml-3 inline-block py-0.5 px-3 text-xs font-medium rounded-full'
                  )}
                >
                  {item.count}
                </span>
              ) : null}
            </Link>

          ))}
        </nav>
      </div>
      <div className="flex flex-shrink-0 border-t border-indigo-800 p-4">
        <a href="#" className="group block w-full flex-shrink-0">
          <div className="flex items-center">
            <div>
              <img
                className="inline-block h-9 w-9 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">Tom Cook</p>
              <p className="text-xs font-medium text-indigo-200 group-hover:text-white">View profile</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  )
}

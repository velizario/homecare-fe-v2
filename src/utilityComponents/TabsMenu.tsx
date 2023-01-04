import { useState } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface TabsMenuProps {
  tabs: {
    id: number;
    name: string;
    href: string;
  }[];
  defaultTab: string;
}

export default function TabsMenu({ tabs, defaultTab }: TabsMenuProps) {

  const [current, setCurrent] = useState(defaultTab);

  // const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   let id = tabs.find(tab => tab.name === e.target.value)?.id;
  //   id && setCurrent(id)
  // }

  return (
    <div className="mb-4">
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <form>
          <select
            id="tabs"
            className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            onChange={e => setCurrent(e.target.value)}
            value={current}
          >
            {tabs.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
        </form>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <a
                key={tab.id}
                href={tab.href}
                onClick={() => setCurrent(tab.name)}
                className={classNames(
                  tab.name === current
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-500 hover:border-gray-700',
                  'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm cursor-pointer'
                )}
                aria-current={tab.name === current ? 'page' : undefined}
              >
                {tab.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}

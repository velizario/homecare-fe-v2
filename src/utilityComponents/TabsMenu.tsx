import { useState } from "react";
import { Link } from "react-router-dom";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface TabsMenuProps {
  tabs: Array<{
    id: number;
    name: string;
    href: string;
  }>;
  defaultTab: string;
}

export default function TabsMenu({ tabs, defaultTab }: TabsMenuProps) {

  const [current, setCurrent] = useState(defaultTab);

  // const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   let id = tabs.find(tab => tab.name === e.target.value)?.id;
  //   id && setCurrent(id)
  // }

  return (
    <div>
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              to={tab.href}
              onClick={() => { setCurrent(tab.name); }}
              className={classNames(
                tab.name === current
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-500 hover:border-gray-700',
                'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm cursor-pointer'
              )}
              aria-current={tab.name === current ? 'page' : undefined}
            >
              {tab.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}

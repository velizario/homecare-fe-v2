import { ChevronRightIcon, HomeIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

// const pages = [
//   { name: "Поръчки", to: "dashboard/orders/list", current: false },
//   { name: "232", to: "#", current: true },
// ];

export default function BreadCrumb() {
  const location = useLocation();
  const [pages, setPages] = useState<{ name: string; to: string }[]>([]);

  useEffect(() => {
    const paths = location.pathname.split("/");
    paths.shift();

    const newPages = paths.map((path) => ({
      name: path,
      to: location.pathname.split(path)[0] + path,
    }));

    setPages(newPages);
  }, [location]);

  return (
    <nav className="mb-2 flex px-2" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-2">
        <li>
          <div>
            <Link to="#" className="text-gray-400 hover:text-gray-500">
              <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>
        {pages.map((page) => (
          <li key={page.name}>
            <div className="flex items-center">
              <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
              <Link
                to={page.to}
                className="ml-2 text-sm font-medium text-gray-500 hover:text-gray-700"
                // aria-current={page.current ? "page" : undefined}
              >
                {page.name}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}

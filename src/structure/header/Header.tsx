import { Bars3Icon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

interface HeaderProps {
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header({ setSidebarOpen }: HeaderProps) {
    return (
        <div className="relative z-20 flex items-center  justify-between bg-white px-4 py-6 sm:px-6 md:justify-start md:space-x-10">
            {/* burger menu icon in mobile */}
            <div className="flex w-full items-center justify-between md:w-auto">
                <div className="md:hidden">
                    <button
                        onClick={() => {
                            setSidebarOpen(true);
                        }}
                        className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                    >
                        <span className="sr-only">Open menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <a href="#" className="flex">
                    <span className="sr-only">Your Company</span>
                    <img
                        className="h-8 w-auto sm:h-10"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt=""
                    />
                </a>
            </div>
            {/* Navigation */}
            <nav className="hidden md:flex md:flex-1 md:items-center md:justify-between">
                <div className="flex space-x-10">
                    <Link
                        to="dashboard"
                        className="text-base font-medium text-gray-500
                        hover:text-gray-900"
                    >
                        Dashboard
                    </Link>
                    <Link
                        to="vendor-card-full"
                        className="text-base font-medium text-gray-500
                        hover:text-gray-900"
                    >
                        Vendor card
                    </Link>
                    <Link
                        to="create-order"
                        className="text-base font-medium
                        text-gray-500 hover:text-gray-900"
                    >
                        {" "}
                        Create order
                    </Link>
                    <Link
                        to="vendor-list"
                        className="text-base font-medium text-gray-500 hover:text-gray-900"
                    >
                        Vendor list
                    </Link>
                </div>
                {/* Sign in & Sign up buttons desktop */}
                <div className="flex items-center md:ml-12">
                    <Link
                        to="signin"
                        className="text-base font-medium text-gray-500 hover:text-gray-900"
                    >
                        Влез
                    </Link>
                    <Link
                        type="button"
                        to="register"
                        className="ml-8 inline-flex items-center justify-center rounded-md  bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                        Регистрирай се
                    </Link>
                </div>
            </nav>
        </div>
    );
}

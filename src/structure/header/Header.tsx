import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartBarIcon,
  CursorArrowRaysIcon,
  DocumentChartBarIcon,
  ShieldCheckIcon,
  Squares2X2Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const solutions = [
  {
    name: "Analytics",
    description:
      "Get a better understanding of where your traffic is coming from.",
    href: "#",
    icon: ChartBarIcon,
  },
  {
    name: "Engagement",
    description: "Speak directly to your customers in a more meaningful way.",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Security",
    description: "Your customers' data will be safe and secure.",
    href: "#",
    icon: ShieldCheckIcon,
  },
  {
    name: "Integrations",
    description: "Connect with third-party tools that you're already using.",
    href: "#",
    icon: Squares2X2Icon,
  },
  {
    name: "Automations",
    description:
      "Build strategic funnels that will drive your customers to convert",
    href: "#",
    icon: ArrowPathIcon,
  },
  {
    name: "Reports",
    description:
      "Get detailed reports that will help you make more informed decisions ",
    href: "#",
    icon: DocumentChartBarIcon,
  },
];
const resources = [
  {
    name: "Help Center",
    description:
      "Get all of your questions answered in our forums or contact support.",
    href: "#",
  },
  {
    name: "Guides",
    description:
      "Learn how to maximize our platform to get the most out of it.",
    href: "#",
  },
  {
    name: "Events",
    description:
      "See what meet-ups and other events we might be planning near you.",
    href: "#",
  },
  {
    name: "Security",
    description: "Understand how we take your privacy seriously.",
    href: "#",
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface HeaderProps {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header({ setSidebarOpen }: HeaderProps) {
  return (
    <div className="flex relative bg-white z-20  items-center justify-between px-4 py-6 sm:px-6 md:justify-start md:space-x-10">
      {/* burger menu icon in mobile*/}
      <div className="flex justify-between items-center w-full md:w-auto">
        <div className="md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
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
          <a
            href="#"
            className="text-base font-medium text-gray-500 hover:text-gray-900"
          >
            Pricing
          </a>
          <a
            href="#"
            className="text-base font-medium text-gray-500 hover:text-gray-900"
          >
            Docs
          </a>
        </div>
        {/* Sign in & Sign up buttons desktop */}
        <div className="flex items-center md:ml-12">
          <a
            href="#"
            className="text-base font-medium text-gray-500 hover:text-gray-900"
          >
            Sign in
          </a>
          <a
            href="#"
            className="ml-8 inline-flex items-center justify-center rounded-md  bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Sign up
          </a>
        </div>
      </nav>
    </div>
  );
}

import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";
import { Route, Routes } from "react-router-dom";
import BreadCrumb from "../../utilityComponents/BreadCrumb";
import Footer from "../footer/Footer";
import Account from "./account/Account";
import Chat from "./chat/Chat";
import Orders from "./orders/Orders";
import Sidebar from "./sidebar/Sidebar";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <BreadCrumb />
      <div className="flex max-w-[90rem]  bg-white">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-28 max-w-xs flex-col bg-indigo-700">
                  {/* sidebar button close */}
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => {
                          setSidebarOpen(false);
                        }}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* mobile sidebar */}
                  <Sidebar setSidebarOpen={setSidebarOpen} />
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0" aria-hidden="true">
                {/* Force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}

        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="hidden bg-indigo-700 md:block">
          <Sidebar setSidebarOpen={setSidebarOpen} />
        </div>
        <div className="flex-1 px-2 md:px-6 lg:px-8">
          <Routes>
            <Route path="chat/*" element={<Chat />} />
            <Route path="account/*" element={<Account />} />
            <Route path="orders/*" element={<Orders />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

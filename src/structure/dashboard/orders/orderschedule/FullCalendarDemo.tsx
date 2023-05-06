import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import { addDays, getMonth } from "date-fns";
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classNames from "../../../../helpers/classNames";
import { orderState } from "../../../../store/orderState";
import Tooltip from "../../../cards/Tooltip";
import { createCalendarSchedule, defineCalendarRange } from "./CalendarLogic";
import { dateRangeStore } from "./OrderSchedule";

export default function FullCalendarDemo() {
  const [dateRange] = dateRangeStore((store) => [store.dateRange]);
  const [orderData] = orderState((state) => [state.orderData]);
  const [allEvents, setAllEvents] = useState<{ orderId: number; eventDate: Date }[]>([]);
  const [eventsInRange, setEventsInRange] = useState<{ orderId: number; eventDate: Date }[]>([]);

  const days = createCalendarSchedule(orderData, getMonth(new Date()));

  return (
    <div className="lg:flex lg:h-full lg:flex-col w-full">
      <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4 lg:flex-none">
        <h1 className="text-base font-semibold leading-6 text-gray-900">
          <time dateTime="2022-01">January 2022</time>
        </h1>
        <div className="flex items-center">
          <div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
            <div className="pointer-events-none absolute inset-0 rounded-md ring-1 ring-inset ring-gray-300" aria-hidden="true" />
            <button
              type="button"
              className="flex items-center justify-center rounded-l-md py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button type="button" className="hidden px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block">
              Today
            </button>
            <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
            <button
              type="button"
              className="flex items-center justify-center rounded-r-md py-2 pl-4 pr-3 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
            >
              <span className="sr-only">Next month</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden md:ml-4 md:flex md:items-center">
            <Menu as="div" className="relative">
              <Menu.Button
                type="button"
                className="flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Month view
                <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
              </Menu.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a href="#" className={classNames(active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm")}>
                          Day view
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a href="#" className={classNames(active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm")}>
                          Week view
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a href="#" className={classNames(active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm")}>
                          Month view
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a href="#" className={classNames(active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm")}>
                          Year view
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            <div className="ml-6 h-6 w-px bg-gray-300" />
            <button
              type="button"
              className="ml-6 rounded-md  bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add event
            </button>
          </div>
          <Menu as="div" className="relative ml-6 md:hidden">
            <Menu.Button className="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500">
              <span className="sr-only">Open menu</span>
              <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a href="#" className={classNames(active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm")}>
                        Create event
                      </a>
                    )}
                  </Menu.Item>
                </div>
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a href="#" className={classNames(active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm")}>
                        Go to today
                      </a>
                    )}
                  </Menu.Item>
                </div>
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a href="#" className={classNames(active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm")}>
                        Day view
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a href="#" className={classNames(active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm")}>
                        Week view
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a href="#" className={classNames(active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm")}>
                        Month view
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a href="#" className={classNames(active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm")}>
                        Year view
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </header>
      <div className="shadow-[0px_5px_35px_-15px_rgba(0,0,0,0.1)] ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
        <div className=" grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
          <div className="bg-white py-2">
            M<span className="sr-only sm:not-sr-only">on</span>
          </div>
          <div className="bg-white py-2">
            T<span className="sr-only sm:not-sr-only">ue</span>
          </div>
          <div className="bg-white py-2">
            W<span className="sr-only sm:not-sr-only">ed</span>
          </div>
          <div className="bg-white py-2">
            T<span className="sr-only sm:not-sr-only">hu</span>
          </div>
          <div className="bg-white py-2">
            F<span className="sr-only sm:not-sr-only">ri</span>
          </div>
          <div className="bg-white py-2">
            S<span className="sr-only sm:not-sr-only">at</span>
          </div>
          <div className="bg-white py-2">
            S<span className="sr-only sm:not-sr-only">un</span>
          </div>
        </div>
        <div className="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
          <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
            {days.map((day) => (
              <div key={day.date} className={classNames(day.isCurrentMonth ? "bg-white" : "bg-gray-50 text-gray-500", "relative pr-1.5 pt-1")}>
                <time
                  dateTime={day.date}
                  className={day.isToday ? "flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white" : "pl-2 font-medium"}
                >
                  {parseInt(day.date.slice(0, 2)).toString()}
                </time>
                {day.events.length > 0 && (
                  <ol className="mt-1 flex flex-col divide-y divide-gray-400">
                    {day.events.slice(0, 2).map((event) => (
                      <Tooltip
                        styles="text-start max-w-[25rem] px-3 py-3 bg-gradient-to-tl from-indigo-50 from-10% via-sky-50 via-40% to-emerald-50 to-90%"
                        tooltipText={
                          <div className="gap-1 flex flex-col">
                            <div>
                              <span>Вид поръчка: </span>
                              <span  className="font-medium text-sm">{event.type}</span>
                            </div>
                            <div>
                              <span>Клиент/Доставчик: </span>
                              <span  className="font-medium text-sm">{event.time}</span>
                            </div>
                            <div>
                              <span>Район: </span>
                              <span  className="font-medium text-sm">{event.location}</span>
                            </div>
                            <div>
                              <span>Ден: </span>
                              <span  className="font-medium text-sm">{event.day}</span>
                            </div>
                            <div>
                              <span>Час: </span>
                              <span  className="font-medium text-sm">{event.time}</span>
                            </div>
                            <div>
                              <span>(отвори за повече)</span>
                            </div>
                          </div>
                        }
                      >
                        <Link to={event.href}>
                          <li key={event.id}>
                            <a href={event.href} className="group flex">
                              <p className="my-auto flex-auto items-center truncate border-l-4 border-emerald-600 bg-emerald-50 py-0.5 pl-1 text-xs font-medium text-black transition-colors group-hover:border-emerald-700 group-hover:bg-emerald-100">
                                {event.time}
                              </p>
                              <time dateTime={event.time} className="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 ">
                                {event.time}
                              </time>
                            </a>
                          </li>
                        </Link>
                      </Tooltip>
                    ))}
                    {day.events.length > 2 && (
                      <Link to="#">
                        <li className="text-gray-500">+ {day.events.length - 2} още</li>
                      </Link>
                    )}
                  </ol>
                )}
              </div>
            ))}
          </div>
          <div className="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
            {days.map((day) => (
              <button
                key={day.date}
                type="button"
                className={classNames(
                  day.isCurrentMonth ? "bg-white" : "bg-gray-50",
                  (day.isSelected || day.isToday) && "font-semibold",
                  day.isSelected && "text-white",
                  !day.isSelected && day.isToday && "text-indigo-600",
                  !day.isSelected && day.isCurrentMonth && !day.isToday && "text-gray-900",
                  !day.isSelected && !day.isCurrentMonth && !day.isToday && "text-gray-500",
                  "flex h-14 flex-col px-3 py-2 hover:bg-gray-100 focus:z-10"
                )}
              >
                <time
                  dateTime={day.date}
                  className={classNames(
                    day.isSelected && "flex h-6 w-6 items-center justify-center rounded-full",
                    day.isSelected && day.isToday && "bg-indigo-600",
                    day.isSelected && !day.isToday && "bg-gray-900",
                    "ml-auto font-medium"
                  )}
                >
                  {parseInt(day.date.slice(0, 2)).toString()}
                </time>
                <span className="sr-only">{day.events.length} events</span>
                {day.events.length > 0 && (
                  <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                    {day.events.map((event) => (
                      <span key={event.id} className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400" />
                    ))}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { addMonths } from "date-fns";
import { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "../../../../helpers/classNames";
import { dateFormatted } from "../../../../helpers/helperFunctions";
import { orderState } from "../../../../store/orderState";
import Tooltip from "../../../cards/Tooltip";
import { createCalendarSchedule } from "./CalendarLogic";

export default function FullCalendarDemo() {
  const [orderData] = orderState((state) => [state.orderData]);
  const [calendarDate, setCalendarDate] = useState(new Date());

  const days = createCalendarSchedule(orderData, calendarDate);
  const changeMonth = (month: number) => setCalendarDate(date => addMonths(date, month))

  return (
    <div className="w-full min-w-fit flex-shrink lg:flex lg:h-full lg:flex-col">
      <header className="flex items-center justify-between border-b border-gray-200 py-4 lg:flex-none">
        <div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
          <div className="pointer-events-none absolute inset-0 rounded-md ring-1 ring-inset ring-gray-300" aria-hidden="true" />
          <button
            type="button"
            onClick={() => changeMonth(-1)}
            className="flex items-center justify-center rounded-l-md py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500  md:w-9 md:px-2 md:hover:bg-gray-50"
          >
            <span className="sr-only">Previous month</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <button className="hidden px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50  md:block">
            <time>{dateFormatted(calendarDate, "MMM yyyy")}</time>
          </button>
          <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
          <button
            type="button"
            onClick={() => changeMonth(1)} 
            className="flex items-center justify-center rounded-r-md py-2 pl-4 pr-3 text-gray-400 hover:text-gray-500  md:w-9 md:px-2 md:hover:bg-gray-50"
          >
            <span className="sr-only">Next month</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </header>
      <div className="shadow-[0px_5px_35px_-15px_rgba(0,0,0,0.1)] ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
        <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
          <div className="bg-white py-2 px-0.5">
            П<span className="sr-only md:not-sr-only">онеделник</span>
          </div>
          <div className="bg-white py-2 px-0.5">
            Вт<span className="sr-only md:not-sr-only">орник</span>
          </div>
          <div className="bg-white py-2 px-0.5">
            Ср<span className="sr-only md:not-sr-only">яда</span>
          </div>
          <div className="bg-white py-2 px-0.5">
            Ч<span className="sr-only md:not-sr-only">етвъртък</span>
          </div>
          <div className="bg-white py-2 px-0.5">
            П<span className="sr-only md:not-sr-only">етък</span>
          </div>
          <div className="bg-white py-2 px-0.5">
            С<span className="sr-only md:not-sr-only">ъбота</span>
          </div>
          <div className="bg-white py-2 px-0.5">
            Н<span className="sr-only md:not-sr-only">еделя</span>
          </div>
        </div>
        <div className="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
          <div className="w-full grid grid-cols-7 grid-rows-6 gap-px">
            {days.map((day) => (
              <div
                key={day.date}
                className={classNames(day.isCurrentMonth ? "bg-white font-medium" : "bg-gray-50 text-gray-400", "relative px-1.5 text-gray-600 min-h-[4rem]")}
              >
                <time
                  dateTime={day.date}
                  className={classNames(day.isToday ? "flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white" : "", "")}
                >
                  {parseInt(day.date.slice(0, 2)).toString()}
                </time>
                {day.events.length > 0 && (
                  <ol className="flex flex-col divide-y divide-gray-400">
                    {day.events.slice(0, 2).map((event) => (
                      <Tooltip
                        styles="text-start max-w-[25rem] px-3 py-3 bg-gradient-to-tl from-indigo-50 from-10% via-sky-50 via-40% to-emerald-50 to-90%"
                        tooltipText={
                          <div className="flex flex-col gap-1">
                            <div>
                              <span>Вид поръчка: </span>
                              <span className="text-sm font-medium">{event.type}</span>
                            </div>
                            <div>
                              <span>Клиент/Доставчик: </span>
                              <span className="text-sm font-medium">{event.time}</span>
                            </div>
                            <div>
                              <span>Район: </span>
                              <span className="text-sm font-medium">{event.location}</span>
                            </div>
                            <div>
                              <span>Ден: </span>
                              <span className="text-sm font-medium">{event.day}</span>
                            </div>
                            <div>
                              <span>Час: </span>
                              <span className="text-sm font-medium">{event.time}</span>
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

        </div>
      </div>
    </div>
  );
}

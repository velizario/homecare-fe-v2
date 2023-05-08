import { Menu, Transition } from "@headlessui/react";
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon, ClockIcon, EllipsisHorizontalIcon, MapPinIcon, UserIcon } from "@heroicons/react/20/solid";
import { addDays, nextFriday, nextMonday, nextSaturday, nextSunday, nextThursday, nextTuesday, nextWednesday } from "date-fns";
import { Fragment, useEffect, useState } from "react";
import classNames from "../../../../helpers/classNames";
import { createFullName, dateFormatted, publicImage } from "../../../../helpers/helperFunctions";
import { orderState } from "../../../../store/orderState";
import { Order } from "../../../../types/types";
import { createOrdersEvents } from "./CalendarLogic";
import { dateRangeStore } from "./OrderSchedule";

// const orderEntrys = [
//   {
//     id: 1,
//     date: "January 10th, 2022",
//     time: "5:00 PM",
//     datetime: "2022-01-10T17:00",
//     name: "Leslie Alexander",
//     imageUrl:
//       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     location: "Starbucks",
//   },
//   {
//     id: 2,
//     date: "January 10th, 2022",
//     time: "5:00 PM",
//     datetime: "2022-01-10T17:00",
//     name: "Leslie Alexander",
//     imageUrl:
//       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     location: "Starbucks",
//   },
//   {
//     id: 3,
//     date: "January 10th, 2022",
//     time: "5:00 PM",
//     datetime: "2022-01-10T17:00",
//     name: "Leslie Alexander",
//     imageUrl:
//       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     location: "Starbucks",
//   },
//   {
//     id: 4,
//     date: "January 10th, 2022",
//     time: "5:00 PM",
//     datetime: "2022-01-10T17:00",
//     name: "Leslie Alexander",
//     imageUrl:
//       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     location: "Starbucks",
//   },
//   {
//     id: 5,
//     date: "January 10th, 2022",
//     time: "5:00 PM",
//     datetime: "2022-01-10T17:00",
//     name: "Leslie Alexander",
//     imageUrl:
//       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     location: "Starbucks",
//   },
//   {
//     id: 6,
//     date: "January 10th, 2022",
//     time: "5:00 PM",
//     datetime: "2022-01-10T17:00",
//     name: "Leslie Alexander",
//     imageUrl:
//       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     location: "Starbucks",
//   },
//   {
//     id: 7,
//     date: "January 10th, 2022",
//     time: "5:00 PM",
//     datetime: "2022-01-10T17:00",
//     name: "Leslie Alexander",
//     imageUrl:
//       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     location: "Starbucks",
//   },
//   // More meetings...
// ];

const dayToFn = {
  1: nextMonday,
  2: nextTuesday,
  3: nextWednesday,
  4: nextThursday,
  5: nextFriday,
  6: nextSaturday,
  7: nextSunday,
};

type TWeekDay = keyof typeof dayToFn;
const today = new Date();

export default function ScheduleList() {
  const [dateRange] = dateRangeStore((store) => [store.dateRange]);
  const [orderData] = orderState((state) => [state.orderData]);
  const [events, setEvents] = useState<{ date: Date; order: Order }[]>([]);

  useEffect(() => {
    if (orderData.length < 1) return;
    const range = { from: dateRange?.from || new Date(), to: dateRange?.to || addDays(new Date(), 30) };
    const mapBookedDays = createOrdersEvents(orderData, range).sort((a, b) => a.date.getTime() - b.date.getTime());
    setEvents(mapBookedDays);
  }, [orderData, dateRange]);

  // Transition on appear
  const newspaperSpinning = [{ opacity: "0" }, { opacity: "0" }, { opacity: "0" }, { opacity: "100" }];
  const newspaperTiming = {
    duration: 400,
    iterations: 1,
  };
  const newspaper = document.querySelector(".dizzy");
  useEffect(() => {
    newspaper?.getAnimations().map((animation) => animation.cancel());
    newspaper?.animate(newspaperSpinning, newspaperTiming);
  }, [events.length]);

  // TODO: another scenario during loading time to show something like Suspense
  // When clicking on "изчисти", // When clicking on "изчисти", things are getting messy, because I'm triggering the above animation incorrectly
  return (
    <div className="w-full">
      <header className="flex items-center justify-between  border-gray-200 py-4 lg:flex-none">
        <div className=" relative ml-auto  mr-0 flex items-center rounded-md bg-white shadow-sm md:items-stretch">
          <div className="pointer-events-none absolute inset-0 rounded-md ring-1 ring-inset ring-gray-300" aria-hidden="true" />
          <button
            type="button"
            className="flex items-center justify-center rounded-l-md py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500  md:w-9 md:px-2 md:hover:bg-gray-50"
          >
            <span className="sr-only">Previous month</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <button className="hidden px-3.5 text-sm font-semibold text-gray-900  hover:bg-gray-50 md:block ">
            <p>стр. 1/2</p>
          </button>
          <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
          <button
            type="button"
            className="flex items-center justify-center rounded-r-md py-2 pl-4 pr-3 text-gray-400 hover:text-gray-500  md:w-9 md:px-2 md:hover:bg-gray-50"
          >
            <span className="sr-only">Next month</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </header>
      {events.length === 0 && <div className="px-10 py-20 lg:min-w-fit">Няма събития за избрания период</div>}
      {events.length > 0 && (
        <div
          className={classNames(
            "dizzy w-full transition-opacity lg:grid-cols-12 lg:gap-x-16 first-letter:lg:grid"
            // , selectionChanged ? "opacity-0 invisible" : "opacity-100 visible"
          )}
        >
          <ol className="flex flex-col gap-4 text-sm lg:col-span-7">
            {events.map((event) => {
              const orderEntry = orderData.find((order) => order.id === event.order.id);
              if (!orderEntry) return <div>Ненамерена поръчка</div>;
              return (
                <li
                  key={event.date.toString() + event.order.id.toString()}
                  className="relative flex items-center gap-y-10 rounded-xl border border-stone-200 p-8 shadow-[0px_5px_35px_-15px_rgba(0,0,0,0.10)] hover:shadow-indigo-300 "
                >
                  <img src={publicImage(orderEntry.vendor.user.imageUrl)} alt="" className="w-28 self-stretch rounded-lg object-cover xl:w-20" />
                  <div className="ml-[min(5%,2rem)] flex-auto ">
                    <h3 className="text-base font-semibold text-gray-900 xl:pr-0">{orderEntry.serviceType.value}</h3>
                    <dl className="mt-2 flex flex-row gap-2 font-medium text-gray-500 ">
                      <div className="flex flex-col gap-2 whitespace-nowrap">
                        <div className="flex items-start space-x-1">
                          <dt className="">
                            <CalendarIcon className="mt-0.5 h-4 w-4 text-indigo-500" aria-hidden="true" />
                          </dt>
                          <dd>{dateFormatted(event.date, "dd MMM")}</dd>
                        </div>
                        <div className="flex items-start space-x-1">
                          <dt className="">
                            <ClockIcon className="mt-0.5 h-4 w-4 text-indigo-500" aria-hidden="true" />
                          </dt>
                          <dd>{dateFormatted(event.date, "HH:mm")}</dd>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 ">
                        <div className="flex items-start space-x-1 xl:mt-0 ">
                          <dt className="">
                            <span className="sr-only">Person</span>
                            <UserIcon className="mt-0.5 h-4 w-4 text-indigo-500" aria-hidden="true" />
                          </dt>
                          <dd>{createFullName(orderEntry.client.user)}</dd>
                        </div>
                        <div className="flex items-start space-x-1 xl:mt-0 ">
                          <dt className="">
                            <span className="sr-only">Location</span>
                            <MapPinIcon className="mt-0.5 h-4 w-4 text-indigo-500" aria-hidden="true" />
                          </dt>
                          <dd>{orderEntry.districtName.value}</dd>
                        </div>
                      </div>
                    </dl>
                  </div>
                  <Menu as="div" className="self-start">
                    <div>
                      <Menu.Button className="-mr-6 -mt-6 flex items-center rounded-full p-2 text-gray-500 hover:text-gray-600">
                        <span className="sr-only">Open options</span>
                        <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <a href="#" className={classNames(active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm")}>
                                Edit
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a href="#" className={classNames(active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm")}>
                                Cancel
                              </a>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </li>
              );
            })}
          </ol>
        </div>
      )}
    </div>
  );
}

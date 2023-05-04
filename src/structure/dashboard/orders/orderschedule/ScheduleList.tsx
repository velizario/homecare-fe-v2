import { Menu, Transition } from "@headlessui/react";
import { CalendarIcon, ClockIcon, EllipsisHorizontalIcon, MapPinIcon, UserIcon } from "@heroicons/react/20/solid";
import { add, eachDayOfInterval, endOfDay, nextFriday, nextMonday, nextSaturday, nextSunday, nextThursday, nextTuesday, nextWednesday, parse } from "date-fns";
import { Fragment, useEffect, useState } from "react";
import classNames from "../../../../helpers/classNames";
import { createFullName, dateFormatted, userImage } from "../../../../helpers/helperFunctions";
import { orderState } from "../../../../store/orderState";
import Filters from "../../../../utilityComponents/Filters";
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

const dateListFromWeekday = (weekDay: TWeekDay, start: Date, frequency: number) => {
  const recurrenceEndDate = add(today, { days: 365 });
  const startingDate = dayToFn[weekDay](start);
  const calculateEventDays = eachDayOfInterval({ start: startingDate, end: recurrenceEndDate }, { step: frequency * 7 });
  return calculateEventDays;
};


export default function ScheduleList() {
  const [dateRange] = dateRangeStore((store) => [store.dateRange]);
  const [orderData] = orderState((state) => [state.orderData]);
  const [allEvents, setAllEvents] = useState<{ orderId: number; eventDate: Date }[]>([]);
  const [eventsInRange, setEventsInRange] = useState<{ orderId: number; eventDate: Date }[]>([]);
  // const [selectionChanged, setSelectionChanged] = useState(false)

  // useEffect(() => {
  //   setSelectionChanged(true);
  //   setTimeout(() => {
  //     setSelectionChanged(false);
  //   }, 200);
  // }, [eventsInRange.length])

  const filterEventsByRange = () => {
    const filteredEvents = allEvents.filter((event) => {
      const afterStartDate = !dateRange?.from ? true : event.eventDate.getTime() >= dateRange.from.getTime();
      const beforeEndDate = !dateRange?.to ? true : event.eventDate.getTime() <= endOfDay(dateRange.to).getTime();
      return afterStartDate && beforeEndDate;
    });
    setEventsInRange(filteredEvents);
  };

  useEffect(() => {
    filterEventsByRange();
  }, [dateRange, allEvents]);

  useEffect(() => {
    // ORder should have a starting day. For now I'm using today as starting day
    if (orderData.length < 1) return;
    const mapBookedDays = orderData
      .reduce((acc, order) => {
        if (!order.visitDay?.id) return acc;
        const orderEventsDates = dateListFromWeekday(order.visitDay.id as TWeekDay, today, order.visitFrequency.id);
        const ordersByDays = orderEventsDates.map((date) => ({ orderId: order.id, eventDate: parse(order.visitHour.value, "HH:mm", date) }));
        return [...acc, ...ordersByDays];
      }, [] as { orderId: number; eventDate: Date }[])
      .sort((a, b) => a.eventDate.getTime() - b.eventDate.getTime());
    setAllEvents(mapBookedDays);
  }, [orderData]);

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
  }, [eventsInRange.length]);

  // TODO: another scenario during loading time to show something like Suspense
  // When clicking on "изчисти", // When clicking on "изчисти", things are getting messy, because I'm triggering the above animation incorrectly
  return (
    <>
      {eventsInRange.length === 0 && allEvents.length > 0 && <div className="min-w-[30rem] px-10 py-20">Няма събития за избрания период</div>}
      {eventsInRange.length > 0 && (
        <div
          className={classNames(
            "dizzy max-w-lg transition-opacity md:max-w-3xl lg:grid-cols-12 lg:gap-x-16 first-letter:lg:grid"
            // , selectionChanged ? "opacity-0 invisible" : "opacity-100 visible"
          )}
        >
          <ol className="mt-4 flex flex-col gap-4 text-sm lg:col-span-7">
            {eventsInRange.map((event) => {
              const orderEntry = orderData.find((order) => order.id === event.orderId);
              if (!orderEntry) return <div>Ненамерена поръчка</div>;
              return (
                <li
                  key={event.eventDate.toString() + event.orderId.toString()}
                  className="relative flex items-center gap-y-10 space-x-6 rounded-xl border border-stone-200 p-8 shadow-[0px_5px_35px_-15px_rgba(0,0,0,0.10)] hover:shadow-indigo-300 "
                >
                  <img src={userImage(orderEntry.vendor.user.imageUrl)} alt="" className="w-28 self-stretch rounded-lg object-cover xl:w-20" />
                  <div className="flex-auto">
                    <h3 className="pr-10 text-base font-semibold text-gray-900 xl:pr-0">{orderEntry.serviceType.value}</h3>
                    <dl className="mt-2 flex flex-col gap-2 font-medium text-gray-500 xl:flex-row">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-start space-x-1">
                          <dt className="">
                            <CalendarIcon className="mt-0.5 h-4 w-4 text-indigo-500" aria-hidden="true" />
                          </dt>
                          <dd>{dateFormatted(event.eventDate, "dd MMM")}</dd>
                        </div>
                        <div className="flex items-start space-x-1">
                          <dt className="">
                            <ClockIcon className="mt-0.5 h-4 w-4 text-indigo-500" aria-hidden="true" />
                          </dt>
                          <dd>{dateFormatted(event.eventDate, "HH:mm")}</dd>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-start space-x-1 xl:mt-0 xl:ml-3.5 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5">
                          <dt className="">
                            <span className="sr-only">Person</span>
                            <UserIcon className="mt-0.5 h-4 w-4 text-indigo-500" aria-hidden="true" />
                          </dt>
                          <dd>{createFullName(orderEntry.client.user)}</dd>
                        </div>
                        <div className="flex items-start space-x-1 xl:mt-0 xl:ml-3.5 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5">
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
                      <Menu.Button className="-m-2 flex items-center rounded-full p-2 text-gray-500 hover:text-gray-600">
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
    </>
  );
}

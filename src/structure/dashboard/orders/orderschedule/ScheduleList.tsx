import { Menu, Transition } from "@headlessui/react";
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon, ClockIcon, EllipsisHorizontalIcon, MapPinIcon, UserIcon } from "@heroicons/react/20/solid";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import { addDays, nextFriday, nextMonday, nextSaturday, nextSunday, nextThursday, nextTuesday, nextWednesday } from "date-fns";
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classNames from "../../../../helpers/classNames";
import { createFullName, dateFormatted, publicImage } from "../../../../helpers/helperFunctions";
import { editOrderEvent } from "../../../../model/orderModel";
import { orderState } from "../../../../store/orderState";
import { Order } from "../../../../types/types";
import ButtonDefault from "../../../../utilityComponents/CustomButton";
import useModal from "../../../../utilityComponents/Modal";
import StatusBadge from "../../../../utilityComponents/StatusBadge";
import { toasted } from "../../../../utilityComponents/Toast";
import { createOrdersEvents } from "./CalendarLogic";
import Feedback, { TFeedbackForm } from "./Feedback";
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
  const [feedbackEventId, setFeedbackEventId] = useState<string | null>(null);
  const [events, setEvents] = useState<{ id: string; date: Date; order: Order }[] | null>(null);
  const { openModal, Modal, closeModal } = useModal();

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
  }, [events?.length]);

  const handleFeedbackSubmit = (data: TFeedbackForm, feedbackEventId : null | string) => {
    // TODO handle on frontend, backend, etc.
    const eventData = {...data, id: feedbackEventId, orderId: feedbackEventId?.slice(0, feedbackEventId.indexOf("-"))}
    console.log(eventData);
    editOrderEvent(eventData)
    closeModal();
    toasted("Благодарим за обратната връзка!", "success");
  };

  console.log(events);

  // TODO: another scenario during loading time to show something like Suspense
  // When clicking on "изчисти", // When clicking on "изчисти", things are getting messy, because I'm triggering the above animation incorrectly
  return (
    <div className="w-full">
      <Modal>
        <Feedback submitModal={(data) => handleFeedbackSubmit(data, feedbackEventId)} />
      </Modal>

      {!events && <div className="px-2 py-20 lg:min-w-fit">Зареждане на събитията...</div>}
      {events?.length === 0 && <div className="px-2 py-20 lg:min-w-fit">Няма събития за избрания период</div>}
      {events?.length && events?.length > 0 && (
        <>
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
          <div
            className={classNames(
              "dizzy w-full transition-opacity lg:grid-cols-12 lg:gap-x-16 first-letter:lg:grid"
              // , selectionChanged ? "opacity-0 invisible" : "opacity-100 visible"
            )}
          >
            <ol className="flex flex-col gap-4 text-sm lg:col-span-7">
              {events?.map((event) => {
                const orderEntry = orderData.find((order) => order.id === event.order.id);
                if (!orderEntry) return <div>Ненамерена поръчка</div>;
                return (
                  <li
                    key={event.date.toString() + event.order.id.toString()}
                    className="relative items-center gap-y-10 rounded-xl border border-stone-200 p-8 shadow-[0px_5px_35px_-15px_rgba(0,0,0,0.10)] hover:shadow-indigo-300 "
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-1">
                          <dt className="">
                            <CalendarIcon className="mt-0.5 h-3 w-3 text-gray-600" aria-hidden="true" />
                          </dt>
                          <dd className="text-base font-semibold text-gray-900">{dateFormatted(event.date, "dd MMM")}</dd>
                        </div>
                        <h3 className="text-sm font-normal text-gray-600 xl:pr-0">{orderEntry.serviceType.value}</h3>
                      </div>
                      <StatusBadge label={event.order.orderStatus.value} orderDate={event.date}></StatusBadge>
                    </div>
                    <div className="flex items-center justify-between ">
                      <img src={publicImage(orderEntry.vendor.user.imageUrl)} alt="" className="mt-4 h-28 w-28 self-stretch rounded-lg object-cover" />
                      <div className="ml-[min(5%,2rem)] flex-auto ">
                        <dl className="space-y-2 font-normal text-gray-600 ">
                          <div className="flex items-center space-x-1">
                            <dt className="">
                              <ClockIcon className="mt-0.5 h-3 w-3 text-gray-600" aria-hidden="true" />
                            </dt>
                            <dd>{dateFormatted(event.date, "HH:mm")}</dd>
                          </div>
                          <div className="flex items-center space-x-1 xl:mt-0 ">
                            <dt className="">
                              <span className="sr-only">Person</span>
                              <UserIcon className="h-3 w-3 text-gray-600" aria-hidden="true" />
                            </dt>
                            <dd>{createFullName(orderEntry.client.user)}</dd>
                          </div>
                          <div className="flex items-center space-x-1 xl:mt-0 ">
                            <dt className="">
                              <span className="sr-only">Location</span>
                              <MapPinIcon className="h-3 w-3 text-gray-600" aria-hidden="true" />
                            </dt>
                            <dd>{orderEntry.districtName.value}</dd>
                          </div>
                        </dl>
                      </div>
                      <div className="w-fit max-w-[8rem] space-y-4">
                        <ButtonDefault
                          onClick={() => {
                            setFeedbackEventId(event.id);
                            openModal();
                          }}
                          category="primary"
                          className="w-full"
                          size="small"
                        >
                          Оцени
                        </ButtonDefault>
                        <ButtonDefault onClick={openModal} category="secondary" className="w-full" size="small">
                          Маркирай като завършена
                        </ButtonDefault>
                        <Link className="group flex items-center justify-center text-xs hover:text-gray-600" to={`/dashboard/orders/${event.order.id}`}>
                          Към поръчката
                          <ChevronDoubleRightIcon className="ml-0.5 h-3 w-3 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                    <Menu as="div" className="self-start">
                      <div>
                        <Menu.Button className="-mr-6 -mt-6 flex items-center rounded-full p-2 text-gray-600 hover:text-gray-600">
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
        </>
      )}
    </div>
  );
}

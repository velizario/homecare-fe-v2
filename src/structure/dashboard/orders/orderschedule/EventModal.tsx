import { Menu, Transition } from "@headlessui/react";
import { CalendarIcon, ChevronDoubleRightIcon, ClockIcon, EllipsisHorizontalIcon, MapPinIcon, StarIcon, UserIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import classNames from "../../../../helpers/classNames";
import { createFullName, dateFormatted, publicImage } from "../../../../helpers/helperFunctions";
import { upsertOrderEvent } from "../../../../model/orderModel";
import { OrderEvent } from "../../../../types/types";
import ButtonDefault from "../../../../utilityComponents/CustomButton";
import StatusBadge from "../../../../utilityComponents/StatusBadge";

type EventModalProps = {
  event: OrderEvent;
};

export default function EventModal({ event }: EventModalProps) {
  return (
    <div key={event.date.toString() + event.order.id.toString()} className="p-8">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center space-x-1">
            <dt className="">
              <CalendarIcon className="mt-0.5 h-3 w-3 text-gray-600" aria-hidden="true" />
            </dt>
            <dd className="text-base font-semibold text-gray-900">{dateFormatted(event.date, "dd MMM")}</dd>
          </div>
          <h3 className="text-sm font-normal text-gray-600 xl:pr-0">{event.order.serviceType.value}</h3>
        </div>
        <StatusBadge label={event.order.orderStatus.value} orderDate={event.date}></StatusBadge>
      </div>
      <div className="flex items-center justify-between gap-x-8 text-sm">
        <img src={publicImage(event.order.vendor.user.imageUrl)} alt="" className="mt-4 h-28 w-28 self-stretch rounded-lg object-cover" />
        <div className="flex-auto ">
          <dl className="space-y-2 font-normal text-gray-600 ">
            <div className="flex items-center space-x-1">
              <dt className="">
                <ClockIcon className="mt-0.5 h-3 w-3 text-gray-600" aria-hidden="true" />
              </dt>
              <dd>{dateFormatted(event.date, "HH:mm")}</dd>
            </div>
            <div className="flex w-max max-w-[10rem] items-center space-x-1 xl:mt-0">
              <dt className="">
                <span className="sr-only">Person</span>
                <UserIcon className="h-3 w-3 text-gray-600" aria-hidden="true" />
              </dt>
              <dd>{createFullName(event.order.client.user)}</dd>
            </div>
            <div className="flex items-center space-x-1 xl:mt-0 ">
              <dt className="">
                <span className="sr-only">Location</span>
                <MapPinIcon className="h-3 w-3 text-gray-600" aria-hidden="true" />
              </dt>
              <dd>{event.order.districtName.value}</dd>
            </div>
          </dl>
        </div>
        <div className="flex-col flex  items-center space-y-4">
          <div>
            {event.rating && (
              <div className="flex w-full justify-center">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={classNames(
                      event.rating >= rating ? "text-yellow-400 " : "stroke-gray-300 text-white ",
                      "stroke h-4 w-4 flex-shrink-0 cursor-pointer stroke-1"
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>
            )}
          </div>
          <ButtonDefault onClick={() => upsertOrderEvent({id: event.id, status: 2})} category="secondary" size="small" className="w-full">
            Анулирай
          </ButtonDefault>
          <Link className="group flex w-max items-center justify-center text-xs hover:text-gray-600" to={`/dashboard/orders/${event.order.id}`}>
            Към поръчката
            <ChevronDoubleRightIcon className="ml-0.5 h-3 w-3 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
      {/* <Menu as="div" className="self-start">
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
      </Menu> */}
    </div>
  );
}

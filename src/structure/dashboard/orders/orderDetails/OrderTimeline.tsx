import { ArrowPathIcon, CheckIcon, ChevronDoubleRightIcon, HandThumbUpIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { format, parseJSON } from "date-fns";
import { useState } from "react";

import classNames from "../../../../helpers/classNames";
import { createFullName, sortObjArrDesc } from "../../../../helpers/helperFunctions";
import { OrderHistory, OrderHistoryLogType } from "../../../../types/types";

const eventTypes: Record<number, {updateType: string, icon: JSX.Element; style: string }> = {
  [OrderHistoryLogType.NEW] : {updateType: "Създадена", icon: <PlusIcon className="h-5 w-5 text-white" aria-hidden="true" />, style: "bg-green-400"},
  [OrderHistoryLogType.CANCELLED] : { updateType: "Анулирана", icon: <XMarkIcon className="h-5 w-5 text-white" aria-hidden="true" />, style: "bg-red-400" },
  [OrderHistoryLogType.COMPLETE] : {updateType: "Активна", icon: <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />, style: "bg-blue-400"},
  [OrderHistoryLogType.UPDATED] : {updateType: "Променена", icon: <ArrowPathIcon className="h-5 w-5 text-white" aria-hidden="true" />, style: "bg-indigo-400"},
};

type OrderTimelineProps = {
  orderHistory: OrderHistory[];
};

export default function OrderTimeline({ orderHistory }: OrderTimelineProps) {
  const [briefView, setBriefView] = useState(true)
  const orderList = briefView ? orderHistory.slice(0,3) : orderHistory
console.log(orderList)
  return (
    <section aria-labelledby="timeline-title" className="xl:col-span-1 xl:col-start-3">
      <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
        <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
          История
        </h2>

        {/* Activity Feed */}
        <div className="mt-6 flow-root">
          <ul role="list" className="-mb-8">
            {sortObjArrDesc(orderList).map((entry, itemIdx) => (
              <li key={entry.id}>
                <div className="relative pb-8">
                  {itemIdx !== orderList.length - 1 ? (
                    <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                  ) : null}
                  <div className="relative flex space-x-3">
                    <div>
                      <span
                        className={classNames(
                          eventTypes[entry.updateType].style,
                          "flex h-8 w-8 items-center justify-center rounded-full ring-8 ring-white"
                        )}
                      >
                        {eventTypes[entry.updateType].icon}
                      </span>
                    </div>
                    <div className="flex min-w-0 flex-1 justify-between gap-x-4 pt-1.5">
                      <div className="">
                        <p className="text-sm text-gray-500 ">
                          {eventTypes[entry.updateType].updateType} от{" "}
                          <a href="#" className=" font-medium text-gray-900">
                            {createFullName(entry.user)}
                          </a>
                        </p>
                      </div>
                      <div className="text-right text-sm text-gray-500 flex-wrap">
                        <time dateTime={entry.createdAt} className="whitespace-nowrap">
                          {format(parseJSON(entry.createdAt), "dd MMM")}
                        </time>{" "}
                        <time dateTime={entry.createdAt} className="whitespace-nowrap">
                          {format(parseJSON(entry.createdAt), "HH:mm")}
                        </time>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="justify-stretch mt-6 flex flex-col">
          <button
          onClick={()=> setBriefView(view => !view)}
            type="button"
            className="group inline-flex items-center p-1 text-xs font-medium hover:text-indigo-600 gap-0.5 transition-all"
          >
            {briefView ? "Повече..." : "По-малко..."}
            <ChevronDoubleRightIcon className="h-2.5 w-2.5 align-middle  group-hover:translate-x-0.5 transition-transform"/>
          </button>
        </div>
      </div>
    </section>
  );
}

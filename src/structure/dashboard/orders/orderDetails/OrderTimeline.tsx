import { CheckIcon, HandThumbUpIcon } from "@heroicons/react/20/solid";
import { format, parseJSON } from "date-fns";

import classNames from "../../../../helpers/classNames";
import { sortObjArrDesc } from "../../../../helpers/helperFunctions";
import { OrderHistory, OrderHistoryEvents } from "../../../../types/types";

const eventTypes: Record<keyof typeof OrderHistoryEvents, { icon: JSX.Element; style: string }> = {
  // NEW: {icon: <UserIcon className="h-5 w-5 text-white" aria-hidden="true" />, style: "bg-gray-400"},
  UPDATED: {icon: <HandThumbUpIcon className="h-5 w-5 text-white" aria-hidden="true" />, style: "bg-blue-400"},
  NEW: { icon: <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />, style: "bg-green-400" },
};

type OrderTimelineProps = {
  orderHistory: OrderHistory[];
};

export default function OrderTimeline({ orderHistory }: OrderTimelineProps) {
  return (
    <section aria-labelledby="timeline-title" className="xl:col-span-1 xl:col-start-3">
      <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
        <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
          История
        </h2>

        {/* Activity Feed */}
        <div className="mt-6 flow-root">
          <ul role="list" className="-mb-8">
            {sortObjArrDesc(orderHistory).map((entry, itemIdx) => (
              <li key={entry.id}>
                <div className="relative pb-8">
                  {itemIdx !== orderHistory.length - 1 ? (
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
                          {OrderHistoryEvents[entry.updateType]} от{" "}
                          <a href="#" className=" font-medium text-gray-900">
                            Велизар Максимов
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
            type="button"
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Действие?
          </button>
        </div>
      </div>
    </section>
  );
}

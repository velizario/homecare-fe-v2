import { InformationCircleIcon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { MouseEventHandler } from "react";
import classNames from "../helpers/classNames";
import Tooltip from "../structure/cards/Tooltip";

interface StatusBadgeProps {
  label: string;
  children?: React.ReactNode;
  xMark?: boolean;
  onClick?: MouseEventHandler<HTMLSpanElement> | undefined;
  orderDate: Date;
}

const statusStyles = new Map([
  ["Нова", "text-violet-700 bg-white ring-violet-700 opacity-70"],
  ["Оферта", "text-sky-700 bg-white ring-sky-700 opacity-70"],
  ["Резервация", "text-sky-700 bg-white ring-sky-700 opacity-70"],
  ["Активна", "text-sky-700 bg-white ring-sky-700 opacity-70"],
  ["Завършена", "text-green-700 bg-white ring-green-700 opacity-70"],
  ["Анулирана", "text-orange-700 bg-white ring-orange-700 opacity-70"],
  ["Изминала", "text-red-800 bg-white ring-red-800 opacity-70"],
]);

const StatusBadge = ({ children, label, xMark, onClick, orderDate }: StatusBadgeProps) => {
  
  const status = ((label === "Активна") && (orderDate < new Date())) ? "Изминала" : label
  
  return (
    <div className="flex items-center gap-2">
      {/* <Tooltip tooltipText="Няколко изречения за статуса, упътващи клиента и доставчика относно техните очаквания и задължения">
        <p className={classNames("flex h-4 w-4 items-center justify-center rounded-full text-xs font-semibold text-gray-500 ring-1 ring-inset ring-gray-500")}>
          <span className="">i</span>
        </p>
      </Tooltip> */}
      <Tooltip tooltipText="Няколко изречения за статуса, упътващи клиента и доставчика относно техните очаквания и задължения">
        <span
          onClick={onClick}
          className={classNames(
            "inline-flex min-w-[5rem] items-center justify-center gap-2 rounded-xl bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-800 ring-1",
            statusStyles.get(status) ?? "",
            xMark ? "cursor-pointer transition-colors" : ""
          )}
        >
          {children || status}
        </span>
      </Tooltip>
    </div>
  );
};
export default StatusBadge;

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
}

const statusStyles = new Map([
  ["Нова", "text-violet-600 bg-white ring-violet-600"],
  ["Оферта", "text-sky-600 bg-white ring-sky-600"],
  ["Резервация", "text-sky-600 bg-white ring-sky-600"],
  ["Активна", "text-sky-600 bg-white ring-sky-600"],
  ["Завършена", "text-green-600 bg-white ring-green-600"],
  ["Анулирана", "text-orange-600 bg-white ring-orange-600"],
]);

const StatusBadge = ({ children, label, xMark, onClick }: StatusBadgeProps) => {
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
            "inline-flex min-w-[6rem] items-center justify-center gap-2 rounded-xl bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-800 ring-1",
            statusStyles.get(label) ?? "",
            xMark ? "cursor-pointer transition-colors" : ""
          )}
        >
          {children || label}
        </span>
      </Tooltip>
    </div>
  );
};
export default StatusBadge;

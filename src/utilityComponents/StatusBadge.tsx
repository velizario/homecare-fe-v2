import { InformationCircleIcon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { MouseEventHandler } from "react";
import classNames from "../helpers/classNames";
import Tooltip from "../structure/cards/Tooltip";

interface StatusBadgeProps {
  children: React.ReactNode;
  xMark?: boolean;
  onClick?: MouseEventHandler<HTMLSpanElement> | undefined;
  label: string;
}

const statusStyles = new Map([
  ["Нова", "text-violet-400 bg-white ring-violet-400"],
  ["Оферта", "text-sky-400 bg-white ring-sky-400"],
  ["Резервация", "text-sky-400 bg-white ring-sky-400"],
  ["Активна", "text-sky-400 bg-white ring-sky-400"],
  ["Завършена", "text-green-400 bg-white ring-green-400"],
  ["Анулирана", "text-orange-400 bg-white ring-orange-400"],
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
          {children}
        </span>
      </Tooltip>
    </div>
  );
};
export default StatusBadge;

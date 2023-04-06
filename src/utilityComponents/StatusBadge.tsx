import { XMarkIcon } from "@heroicons/react/24/outline";
import { MouseEventHandler } from "react";
import classNames from "../helpers/classNames";

interface StatusBadgeProps {
  children: React.ReactNode;
  xMark?: boolean;
  onClick?: MouseEventHandler<HTMLSpanElement> | undefined;
  label: string;
}

const statusStyles = new Map([
  ["Нова", "text-violet-700 bg-violet-100"],
  ["Активна", "text-sky-700 bg-sky-100"],
  ["Завършена", "text-green-700 bg-green-100"],
  ["Анулирана", "text-orange-700 bg-orange-100"],
]);

const StatusBadge = ({ children, label, xMark, onClick }: StatusBadgeProps) => {
  return (
    <span
      onClick={onClick}
      className={classNames(
        "group mr-2 inline-flex justify-center items-center gap-0.5 text- rounded-full bg-gray-100 px-3 min-w-[6rem] py-1 text-base font-medium text-gray-800 last:mr-0",
        statusStyles.get(label) ?? "",
        xMark ? "cursor-pointer transition-colors" : ""
      )}
    >
      {children}
      {xMark && <XMarkIcon className="h-3 w-3 text-gray-500 transition-colors group-hover:text-black" />}
    </span>
  );
};
export default StatusBadge;

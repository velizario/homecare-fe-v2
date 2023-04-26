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
  ["Нова", "text-violet-500 bg-violet-50"],
  ["Оферта", "text-sky-500 bg-sky-50"],
  ["Резервация", "text-sky-500 bg-sky-50"],
  ["Активна", "text-sky-500 bg-sky-50"],
  ["Завършена", "text-green-500 bg-green-50"],
  ["Анулирана", "text-orange-500 bg-orange-50"],
]);

const StatusBadge = ({ children, label, xMark, onClick }: StatusBadgeProps) => {
  return (
    <span
      onClick={onClick}
      className={classNames(
        "inline-flex justify-center rounded-2xl bg-gray-100 px-3 py-1 min-w-[6rem] text-sm font-medium text-gray-800",
        statusStyles.get(label) ?? "",
        xMark ? "cursor-pointer transition-colors" : ""
      )}
    >
      {children}
    </span>
  );
};
export default StatusBadge;

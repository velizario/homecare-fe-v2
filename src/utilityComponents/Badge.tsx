import { XMarkIcon } from "@heroicons/react/24/outline";
import { MouseEventHandler } from "react";
import classNames from "../helpers/classNames";
import { SelectionOption } from "../types/types";

interface BadgeProps {
    children: React.ReactNode;
    styles?: string;
    xMark?: boolean;
    onClick?: MouseEventHandler<HTMLSpanElement> | undefined;
}
const Badge = ({ children, styles, xMark, onClick }: BadgeProps) => {
    return (
        <span
        onClick={onClick}
            className={classNames(
                "group mr-2 inline-flex items-center gap-0.5 rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-800 last:mr-0",
                styles ?? "",
                xMark ? "cursor-pointer transition-colors" : ""
            )}
        >
            {children}
            {xMark && <XMarkIcon className="h-3 w-3 text-gray-500 transition-colors group-hover:text-black" />}
        </span>
    );
};
export default Badge;

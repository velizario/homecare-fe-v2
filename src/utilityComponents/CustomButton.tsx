import { ReactNode } from "react";
import classNames from "../helpers/classNames";

type TButtonDefault = {
  category: "primary" | "secondary" | "bare";
  children: ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  size?: "regular" | "small";
};

const buttonStyles = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white border shadow-sm justify-center ",
  secondary: "hover:bg-gray-50 text-gray-900 bg-white border border-gray-300 shadow-sm justify-center ",
  bare: "",
};

export default function ButtonDefault({ category, children, type = "button", onClick, disabled = false, className = "", size = "regular" }: TButtonDefault) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={classNames(
        className,
        "flex min-w-min flex-grow rounded-md  font-medium ",
        disabled ? "pointer-events-none border-transparent text-gray-400 ring-gray-100" : buttonStyles[category],
        size === "regular" ? "px-4 py-2 text-sm " : size === "small" ? "px-3 py-1.5 text-xs" : ""
      )}
    >
      {children}
    </button>
  );
}

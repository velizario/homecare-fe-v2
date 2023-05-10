import { ReactNode } from "react";
import classNames from "../helpers/classNames";

type TButtonDefault = {
  category: "primary" | "secondary";
  children: ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

const buttonStyles = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white",
  secondary: "hover:bg-gray-50 text-gray-900 bg-white border-gray-300",
};

export default function ButtonDefault({ category, children, type = "button", onClick, disabled = false, className = "" }: TButtonDefault) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={classNames(
        className, "inline-flex  min-w-min flex-grow justify-center rounded-md border px-4 py-2 text-sm font-medium shadow-sm",
        disabled ? "pointer-events-none border-transparent text-gray-400 ring-gray-100" : buttonStyles[category],
        
      )}
    >
      {children}
    </button>
  );
}

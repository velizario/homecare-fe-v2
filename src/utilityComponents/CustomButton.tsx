import { ReactNode } from "react";
import classNames from "../helpers/classNames";
import { twMerge } from "tailwind-merge";

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
  primary: "bg-blue-600 hover:bg-blue-700 text-white ring-1 shadow-sm",
  secondary: "hover:bg-gray-50 text-gray-900 bg-white ring-1 ring-gray-300 shadow-sm",
  bare: "",
};

export default function ButtonDefault({ category, children, type = "button", onClick, disabled = false, className = "", size = "regular" }: TButtonDefault) {
  return (
    <>
      <button
        onClick={onClick}
        type={type}
        className={twMerge(
          "flex min-w-min flex-grow items-center justify-center rounded-md font-medium ring-1",
          size === "regular" && "px-4 py-2 text-sm ",
          size === "small" && "px-3 py-1.5 text-xs",
          className,
          disabled && "pointer-events-none bg-gray-100 text-gray-400 shadow-none ring-1 ring-gray-300"
        )}
      >
        {children}
      </button>
    </>
  );
}

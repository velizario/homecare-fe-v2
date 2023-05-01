import React, { ReactNode } from "react";
import classNames from "../helpers/classNames";

type TButtonDefault = {
  category: "primary" | "secondary";
  children: ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
};

const buttonStyles = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white",
  secondary: "hover:bg-gray-50 text-gray-900 bg-white border-gray-300",
};

export default function ButtonDefault({
  category,
  children,
  type = "button",
  onClick,
  disabled = false,
}: TButtonDefault) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={classNames(
        "flex-grow inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium shadow-sm",
        disabled ? "pointer-events-none text-gray-400 ring-gray-100" : buttonStyles[category]
      )}
    >
      {children}
    </button>
  );
}

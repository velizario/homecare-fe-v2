import React, { ReactNode } from "react";
import classNames from "../helpers/classNames";

type TButtonDefault = {
  type: "primary" | "secondary";
  children: ReactNode;
};

const buttonStyles = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white",
  secondary: " hover:bg-gray-50 text-gray-900  bg-white border-gray-300",
};

export default function ButtonDefault({ type, children }: TButtonDefault) {
  return (
    <button
      type="submit"
      className={classNames(
        "inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium shadow-sm ",
        buttonStyles[type]
      )}
    >
      {children}
    </button>
  );
}

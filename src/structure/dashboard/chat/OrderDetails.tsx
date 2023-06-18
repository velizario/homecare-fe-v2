import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { Fragment, useEffect, useState } from "react";

export default function OrderDetails() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const modal = document.querySelector(".modal");
    if (!modal) return;
    modal.classList.toggle("grid-rows-[1fr]");
    modal.classList.toggle("grid-rows-[0fr]");
  }, [isOpen]);
  return (
    <>
      <button
        onClick={() => setIsOpen((state) => !state)}
        className="flex max-h-80 w-full items-center justify-between rounded-lg bg-purple-100 px-2 py-1 text-xl font-medium text-purple-900 transition-colors hover:bg-purple-200"
      >
        <span>Детайли за заявката</span>
        <ChevronUpIcon className={`${isOpen ? "rotate-180 transform" : ""} h-5 w-5 text-purple-500`} />
      </button>
      <div className="modal grid grid-rows-[0fr] p-2 transition-[grid-template-rows] [&>div]:overflow-hidden duration-300">
        <div>
          <div>Детайли за заявката</div>
          <div>Детайли за заявката</div>
          <div>Детайли за заявката</div>
        </div>
      </div>
    </>
  );
}

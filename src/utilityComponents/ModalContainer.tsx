import { Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import classNames from "../helpers/classNames";

interface ModalContainerProps {
  closeModal: () => void;
  children: React.ReactNode;
}

export default function ModalContainer({ closeModal, children }: ModalContainerProps) {
  const dismissModal = (e: MouseEvent) => {
    const clickedInside = (e.target as HTMLElement).closest(".create-order-input") !== null;
    if (!clickedInside) closeModal();
  };

  useEffect(() => {
    document.addEventListener("click", dismissModal);
    return () => {
      document.removeEventListener("click", dismissModal);
    };
  }, []);

  return (
    <>
      {/* backdrop */}
      <Transition
        as={Fragment}
        appear={true}
        show={true}
        enter="transition-opacity duration-150"
        enterFrom="opacity-0"
        enterTo="opacity-60"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-60"
        leaveTo="opacity-0"
      >
        <div className={classNames("fixed top-0 left-0 z-20 h-full w-full bg-black")}></div>
      </Transition>

      <div
        className={classNames(
          "create-order-input fixed top-1/2 left-1/2 z-30 max-h-[90vh] -translate-y-1/2 -translate-x-1/2  overflow-auto overscroll-contain rounded bg-white"
        )}
      >
        <Transition
          appear={true}
          show={true}
          enter="transition-opacity ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {children}
        </Transition>
      </div>
    </>
  );
}

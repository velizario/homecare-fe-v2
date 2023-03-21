import { Dispatch, Fragment, Ref, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MdOutlineFreeCancellation } from "react-icons/md";

type ModalProps = {
  title: string;
  description: string;
  btnPositive?: string;
  btnNegative?: string;
  confirmAction: Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  setModalOpen: Dispatch<React.SetStateAction<boolean>>;
};

const preventScroll = (e: WheelEvent) => {
  e.preventDefault();
  e.stopPropagation();
};

export default function Modal({
  title,
  description,
  btnPositive,
  btnNegative,
  confirmAction,
  isOpen,
  setModalOpen,
}: ModalProps) {
  useEffect(() => {
    if (isOpen) document.body.addEventListener("wheel", preventScroll, { passive: false });
    return () => document.body.removeEventListener("wheel", preventScroll);
  }, [isOpen]);
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="headless-dialog relative z-30 " onClose={() => setModalOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="flex w-full max-w-md transform flex-col items-center overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all">
                  <MdOutlineFreeCancellation className="mb-6 mt-2 h-14 w-14 self-center" />
                  <Dialog.Title as="h3" className="self-center text-lg font-medium leading-6 text-gray-900">
                    {title}
                  </Dialog.Title>
                  <div className="mt-4 flex ">
                    <p className="text-sm text-gray-500 ">{description}</p>
                  </div>

                  <div className="mt-6 flex w-full justify-evenly">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-amber-700 px-4 py-2 text-sm font-medium text-amber-100 hover:bg-amber-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        confirmAction(true);
                        setModalOpen(false);
                      }}
                    >
                      {btnPositive}
                    </button>

                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-blue-900 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => setModalOpen(false)}
                    >
                      {btnNegative}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

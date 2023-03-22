import { Dispatch, Fragment, Ref, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MdOutlineFreeCancellation } from "react-icons/md";
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";

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
        <Dialog as="div" className="hrelative z-10" onClose={() => setModalOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 z-30 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-0 z-30 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:p-6">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        {title}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">{description}</p>
                      </div>

                      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row gap-4">
                        <button
                          type="button"
                          className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:w-auto"
                          onClick={() => {
                            confirmAction(true);
                            setModalOpen(false);
                          }}
                        >
                          {btnPositive}
                        </button>

                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                          onClick={() => setModalOpen(false)}
                        >
                          {btnNegative}
                        </button>
                      </div>
                    </div>
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

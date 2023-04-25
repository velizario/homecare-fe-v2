import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon, InformationCircleIcon } from "@heroicons/react/20/solid";
import { Dispatch, Fragment, useEffect } from "react";
import classNames from "../helpers/classNames";

type ModalProps = {
  title: string;
  messageType: "info" | "alert";
  description: string;
  btnAckText?: string;
  btnCloseText?: string;
  confirmAction: Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  setModalOpen: Dispatch<React.SetStateAction<boolean>>;
};

const preventScroll = (e: WheelEvent) => {
  e.preventDefault();
  e.stopPropagation();
};

export default function Modal({
  messageType,
  title,
  description,
  btnAckText,
  btnCloseText,
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
            <div className="fixed inset-0 z-30 bg-gray-500 bg-opacity-75 transition-opacity" />
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:max-w-md sm:p-6">
                  <div className="sm:flex sm:items-start">
                    <div
                      className={classNames(
                        "mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10",
                        messageType === "alert" ? "bg-red-100" : "bg-indigo-100"
                      )}
                    >
                      {messageType === "alert" ? (
                        <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                      ) : (
                        <InformationCircleIcon className="h-6 w-6 text-indigo-600 " aria-hidden="true" />
                      )}
                    </div>
                    <div className="mt-2 text-center sm:ml-4 sm:text-left">
                      <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900">
                        {title}
                      </Dialog.Title>
                      <div className="mt-4">
                        <p className="text-sm font-medium text-gray-600">{description}</p>
                      </div>

                      <div className="w-full mt-6 gap-4 sm:flex sm:flex-row leading-relaxed">
                        <button
                          type="button"
                          className={classNames(
                            btnAckText
                              ? "inline-flex w-full  justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm"
                              : "hidden",
                            messageType === "alert"
                              ? "bg-red-600 hover:bg-red-500 "
                              : "bg-indigo-600 hover:bg-indigo-500"
                          )}
                          onClick={() => {
                            confirmAction(true);
                            setModalOpen(false);
                          }}
                        >
                          {btnAckText}
                        </button>

                        <button
                          type="button"
                          className="mt-3 inline-flex w-full max-w-[] justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0"
                          onClick={() => setModalOpen(false)}
                        >
                          {btnCloseText}
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

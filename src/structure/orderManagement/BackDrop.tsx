import { Transition } from "@headlessui/react";
import { useEffect, Fragment } from "react";
import classNames from "../../helpers/classNames";

type BackDropProps = {
  closeModal: () => void;
};

export default function BackDrop({ closeModal }: BackDropProps) {
  const dismissModal = (e: MouseEvent) => {
    console.log((e.target as HTMLElement).closest(".backdrop"));
    const clickedOutside = (e.target as HTMLElement).closest(".backdrop") !== null;
    if (clickedOutside) closeModal();
  };

  useEffect(() => {
    document.addEventListener("click", dismissModal);
    return () => {
      document.removeEventListener("click", dismissModal);
    };
  }, []);

  return (
    <Transition
      as={Fragment}
      appear={true}
      show={true}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-60"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-60"
      leaveTo="opacity-0"
    >

        <div className={classNames("backdrop fixed top-0 left-0 z-20 h-full w-full bg-black opacity-0")}></div>
      
    </Transition>
  );
}

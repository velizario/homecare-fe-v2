import { Transition } from "@headlessui/react";
import classNames from "../helpers/classNames";
import BackDrop from "./BackDrop";

interface ModalContainerProps {
  children: React.ReactNode;
  styles? : string;

}
export default function ModalContainer({ children, styles }: ModalContainerProps) {
  return (
    <Transition
      className={classNames("z-30 max-h-[85%] overscroll-contain rounded bg-white", styles || "")}
      appear={true}
      show={true}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {children}
    </Transition>
  );
}

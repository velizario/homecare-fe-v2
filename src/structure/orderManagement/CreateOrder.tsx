import { Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import classNames from "../../helpers/classNames";
import ModalContainer from "../../utilityComponents/ModalContainer";
import BackDrop from "./BackDrop";
import CreateOrderInput from "./CreateOrderInput";
import SelectFrequency from "./SelectFrequency";
import SelectService from "./SelectService";

interface CreateOrderProps {
  closeModal: () => void;
}

export default function CreateOrder({ closeModal }: CreateOrderProps) {
  const [service, setService] = useState<string>();
  const [orderStep, setOrderStep] = useState<number>(1);

  const setNextStep = () => setOrderStep((step) => step + 1);

  useEffect(() => console.log(orderStep), [orderStep]);

  return (
    <>
      {/* <Transition
        as={Fragment}
        appear={true}
        show={true}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-60"
        leaveTo="opacity-0"
      >
        <ModalContainer visible={orderStep === 2}>
            <CreateOrderInput setNextStep={setNextStep} />
          </ModalContainer>
      </Transition> */}
      <div className="fixed inset-0 z-30 flex items-center justify-center ">
        <BackDrop closeModal={closeModal} />

        {orderStep === 1 && (
          <ModalContainer>
            <SelectService setService={setService} setNextStep={setNextStep} />
          </ModalContainer>
        )}
        {orderStep === 2 && (
          <ModalContainer>
            <SelectFrequency setNextStep={setNextStep} />
          </ModalContainer>
        )}
        {orderStep === 3 && (
            <ModalContainer styles="max-w-[30rem]">
              <CreateOrderInput setNextStep={setNextStep} />
            </ModalContainer>
        )}
      </div>
    </>
  );
}

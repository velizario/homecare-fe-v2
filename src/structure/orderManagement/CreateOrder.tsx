import { useEffect, useState } from "react";
import ModalContainer from "../../utilityComponents/ModalContainer";
import CreateOrderInput from "./CreateOrderInput";
import SelectService from "./SelectService";

interface CreateOrderProps {
  closeModal: () => void;
}

export default function CreateOrder({ closeModal }: CreateOrderProps) {
  const [service, setService] = useState<string>();
  const [orderStep, setOrderStep] = useState<number>(1);

  const setNextStep = () => setOrderStep(step => step+1)

  useEffect(() => console.log(orderStep), [orderStep])

  return (
    <>
      <ModalContainer closeModal={closeModal}>
        {orderStep === 1 && <SelectService setService={setService} setNextStep={setNextStep} />}
        {orderStep === 2 && <CreateOrderInput setNextStep={setNextStep} />}
      </ModalContainer>
    </>
  );
}

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { fetchServiceTypeState } from "../../model/essentialsModel";
import { createOrder } from "../../model/orderModel";
import ModalContainer from "../../utilityComponents/ModalContainer";
import { toasted } from "../../utilityComponents/Toast";
import BackDrop from "../../utilityComponents/BackDrop";
import CleaningEntityInfo from "./CleaningEntityInfo";
import SelectFrequency from "./SelectFrequency";
import SelectService from "./SelectService";
import SelectTimeframe from "./SelectTimeframe";

interface CreateOrderProps {
  closeModal: () => void;
  vendorId: string;
}

export type CreateOrderForm = {
  serviceType: number;
  // additionalService: string[];
  visitFrequency: number;
  clientDayChoice: number[];
  clientHourChoice: number[];
  estateSize: number;
  districtName: number;
};

export default function CreateOrder({ closeModal, vendorId }: CreateOrderProps) {
  const [orderStep, setOrderStep] = useState<number>(1);

  const { watch, setValue } = useForm<CreateOrderForm>();

  const setNextStep = () => setOrderStep((step) => step + 1);

  useEffect(() => {
    if (orderStep === 5) {
      submitFormHandler(watch());
      closeModal();
    }
  }, [orderStep]);

  const submitFormHandler = async (data: CreateOrderForm) => {
    const resData = await createOrder(vendorId, data);
    toasted(`Заявката е изпратена! Можи да видите статуса й в административния панел`, "success");
  };

  return (
    <>
      <div className="fixed inset-0 z-30 flex items-center justify-center bg-white">
        <BackDrop closeModal={closeModal} />
        {
          {
            1: (
              <ModalContainer>
                <SelectService setValue={setValue} setNextStep={setNextStep} />
              </ModalContainer>
            ),
            2: (
              <ModalContainer>
                <SelectFrequency setValue={setValue} setNextStep={setNextStep} />
              </ModalContainer>
            ),
            3: (
              <ModalContainer styles="max-w-[40rem]">
                <SelectTimeframe setValue={setValue} setNextStep={setNextStep} />
              </ModalContainer>
            ),
            4: (
              <ModalContainer styles="max-w-[40rem]">
                <CleaningEntityInfo setValue={setValue} setNextStep={setNextStep} />
              </ModalContainer>
            ),
          }[orderStep]
        }
      </div>
    </>
  );
}

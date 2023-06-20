import { Transition } from "@headlessui/react";
import { ArrowLeftIcon, ChevronLeftIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import create from "zustand";
import classNames from "../../../helpers/classNames";
import { getOrder } from "../../../model/orderModel";
import { Order } from "../../../types/types";
import OrderDetails from "../orders/ManageOrder/OrderDetails";
import styles from "./MessagesOrderDetails.module.css";

let ValidationSchema = z.object({
  visitFrequency: z.object({ id: z.number(), value: z.string() }),
  districtName: z.object({ id: z.number(), value: z.string() }),
  estateSize: z.object({ id: z.number(), value: z.string() }),
  visitDay: z.object({ id: z.number(), value: z.string() }),
  visitHour: z.object({ id: z.number(), value: z.string() }),
  additionalInfo: z.string().optional().nullable(),
});

type TMessageOrderOpenState = {
  isOpen: boolean;
  setIsOpen : (state: boolean) => void;
}

export const messageOrderOpenState = create<TMessageOrderOpenState>((set) => ({
  isOpen: false,
  setIsOpen: (state) => set({ isOpen: state })
}));

export default function MessagesOrderDetails() {
  // const [isOpen, setIsOpen] = useState(false);
  const [isOpen, setIsOpen] = messageOrderOpenState(state => [state.isOpen, state.setIsOpen])
  const orderId = "59";

  const { data: orderData, isSuccess } = useQuery({
    queryKey: ["orders", orderId],
    queryFn: () => getOrder(orderId as string),
  });

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<Order>({
    resolver: zodResolver(ValidationSchema),
    defaultValues: {} as Order,
    values: orderData,
  });

  return (
    <div className="w-full flex flex-col basis-full self-stretch justify-self-stretch">
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          // toggleOrderDetails();
        }}
        className={classNames(
          "text-md flex w-full animate-[wiggle_1s_ease-in-out_infinite] items-center justify-between rounded-lg px-4 py-2 font-medium text-green-50 shadow-lg",
          styles.wave
        )}
      >
        <span>Попълни заявка</span>
        <ChevronUpIcon className={`${isOpen ? "rotate-180 transform" : ""} h-6 w-6 text-green-50`} />
      </button>
      <div className={classNames("h-full basis-full self-stretch justify-self-stretch grid transition-[grid-template-rows] duration-[700ms]", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
        <div className="overflow-hidden">
          <div className="p-2">{isSuccess && <OrderDetails editMode={true} control={control} register={register} orderData={orderData} />}</div>
        </div>
      </div>
    </div>
  );
}

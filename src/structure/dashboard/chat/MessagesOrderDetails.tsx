import { Transition } from "@headlessui/react";
import { ArrowLeftIcon, ChevronLeftIcon, ChevronUpIcon, EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import create from "zustand";
import classNames from "../../../helpers/classNames";
import { getOrder } from "../../../model/orderModel";
import { Order } from "../../../types/types";
import ButtonDefault from "../../../utilityComponents/CustomButton";
import OrderDetails from "../orders/ManageOrder/OrderDetails";
import ContextMenu from "./ContextMenu";
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
  setIsOpen: (state: boolean) => void;
};

export const messageOrderOpenState = create<TMessageOrderOpenState>((set) => ({
  isOpen: false,
  setIsOpen: (state) => set({ isOpen: state }),
}));

export default function MessagesOrderDetails() {
  // const [isOpen, setIsOpen] = useState(false);
  const [isOpen, setIsOpen] = messageOrderOpenState((state) => [state.isOpen, state.setIsOpen]);
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
    <div className="flex w-full basis-full flex-col self-stretch justify-self-stretch">
      <div className="flex flex-wrap gap-6">
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            // toggleOrderDetails();
          }}
          className={classNames(
            "text-md flex flex-grow basis-3/5 animate-[wiggle_1s_ease-in-out_infinite] items-center justify-between whitespace-nowrap rounded-lg px-4 py-2 font-medium text-green-50 shadow-lg",
            styles.wave
          )}
        >
          <span>Попълни заявка</span>
          <ChevronUpIcon className={`${isOpen ? "rotate-180 transform" : ""} h-6 w-6 text-green-50`} />
        </button>
        <div className="flex gap-2 flex-grow ">
          <ButtonDefault  category="secondary" className="bg-white hadow-md whitespace-nowrap ring-1 ring-third-500 transition-colors hover:bg-third-500 hover:text-white">
            Активирай поръчка
          </ButtonDefault>
          <ContextMenu target=".messages" className="flex cursor-pointer self-center text-transparent group-hover:text-gray-800">
            <ContextMenu.Button>
              <EllipsisVerticalIcon className="h-7 w-7 rounded-full p-1 text-black transition-colors hover:bg-gray-100" />
            </ContextMenu.Button>
            <ContextMenu.Content>
              <a className="block whitespace-nowrap cursor-pointer py-2 pl-4 pr-10 text-sm font-normal text-gray-900 hover:bg-gray-100">Детайли и управление</a>
              <a className="block whitespace-nowrap cursor-pointer py-2 pl-4 pr-10 text-sm font-normal text-gray-900 hover:bg-gray-100">Приключи поръчката</a>
              <a className="block whitespace-nowrap cursor-pointer py-2 pl-4 pr-10 text-sm font-normal text-red-900 hover:bg-gray-100">Анулиране</a>
            </ContextMenu.Content>
          </ContextMenu>
        </div>
      </div>
      <div
        className={classNames(
          "grid h-full basis-full self-stretch justify-self-stretch transition-[grid-template-rows] duration-[700ms]",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className="md:px-4">{isSuccess && <OrderDetails editMode={true} control={control} register={register} orderData={orderData} />}</div>
        </div>
      </div>
    </div>
  );
}

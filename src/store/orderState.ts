import create from "zustand";
import { persist } from "zustand/middleware";
import { Order } from "../model/orderModel";
import { storeLogger } from "./storeLogger";

type OrderState = {
    orderData: Order[];
    setOrderData: (data: Order[]) => void;
  };
  
  export const orderState = create<OrderState>()(
    storeLogger(
      persist(
        (set) => ({
          orderData: [] as Order[],
          setOrderData: (data) => set({ orderData: data }),
        }),
        {
          name: "order", // name of the item in the storage (must be unique)
        }
      )
    )
  );
  
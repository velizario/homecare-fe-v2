import create from "zustand";
import { persist } from "zustand/middleware";
import { Order } from "../types/types";
import { storeLogger } from "./storeLogger";

type OrderState = {
    orderData: Order[];
    updateOrderData: (data: Order[]) => void;
  };
  
  export const orderState = create<OrderState>()(
    storeLogger(
      persist(
        (set) => ({
          orderData: [] as Order[],
          updateOrderData: (data) => set({ orderData: data }),
        }),
        {
          name: "order", // name of the item in the storage (must be unique)
        }
      )
    )
  );
  
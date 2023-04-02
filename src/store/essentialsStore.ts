import create from "zustand";
import { persist } from "zustand/middleware";
import { storeLogger } from "./storeLogger";

type EssentialsStore = {
  serviceList: Map<string, string>;
};

export const essentialsStore = create<EssentialsStore>()(
  storeLogger(
    persist(
      () => ({
        serviceList: new Map(),
      }),
      {
        name: "essentials", // name of the item in the storage (must be unique)
      }
    )
  )
);

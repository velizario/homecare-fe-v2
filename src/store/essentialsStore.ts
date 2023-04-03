import create from "zustand";
import { persist } from "zustand/middleware";
import { EssentialsData } from "../types/types";
import { storeLogger } from "./storeLogger";

type EssentialsStore = {
    essentialData: EssentialsData;
};

export const essentialsStore = create<EssentialsStore>()(
  storeLogger(
    persist(
      () => ({
        essentialData: {} as EssentialsData,
      }),
      {
        name: "essentials", // name of the item in the storage (must be unique)
      }
    )
  )
);

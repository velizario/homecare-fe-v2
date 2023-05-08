import create from "zustand";
import { persist } from "zustand/middleware";
import { EssentialDataAll } from "../types/types";
import { storeLogger } from "./storeLogger";

type EssentialsState = {
    serviceTypes: EssentialDataAll[];
    districtNames: EssentialDataAll[];
    listServices: () => string[];
    listDistricts: () => string[];

};

export const essentialsStore = create<EssentialsState>()(
  storeLogger(
    // persist(
      (set, get) => ({
        serviceTypes: [] as EssentialDataAll[],
        districtNames: [] as EssentialDataAll[],
        listServices: () => get().serviceTypes.map(service => service.value),
        listDistricts: () => get().districtNames.map(district => district.value) 
      }),
    //   {
    //     name: "essentials", // name of the item in the storage (must be unique)
    //   }
    // )
  )
);

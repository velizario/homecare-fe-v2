import create from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../types/types";
import { storeLogger } from "./storeLogger";

type UserState = {
  isLoggedIn: boolean;
  setIsLoggedIn: (status: boolean) => void;
  userData: User;
  setUserData: (data: User) => void;
};

export const userState = create<UserState>()(
  storeLogger(
    // persist(
      (set) => ({
        isLoggedIn: false,
        userData: {} as User,
        setIsLoggedIn: (status) => set({ isLoggedIn: status }),
        setUserData: (data) => set({ userData: data }),
      }),
    //   {
    //     name: "user", // name of the item in the storage (must be unique)
    //   }
    // )
  )
);

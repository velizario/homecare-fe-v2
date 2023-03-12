import create, { StateCreator, StoreMutatorIdentifier } from "zustand";
import { User } from "../helpers/types";
import { persist, createJSONStorage } from "zustand/middleware";

type UserState = {
  isLoggedIn: boolean;
  setIsLoggedIn: (status: boolean) => void;
  userData: User;
  setUserData: (data: User) => void;
};

type Logger = <
  T extends unknown,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = []
>(
  f: StateCreator<T, Mps, Mcs>,
  name?: string
) => StateCreator<T, Mps, Mcs>;

type LoggerImpl = <T extends unknown>(
  f: StateCreator<T, [], []>,
  name?: string
) => StateCreator<T, [], []>;

const loggerImpl: LoggerImpl = (f, name) => (set, get, store) => {
  type T = ReturnType<typeof f>;
  const loggedSet: typeof set = (...a) => {
    set(...a);
    console.log(...(name ? [`${name}:`] : []), get());
  };
  store.setState = loggedSet;

  return f(loggedSet, get, store);
};

export const logger = loggerImpl as unknown as Logger;

export const userState = create<UserState>()(
    persist(
      (set) => ({
        isLoggedIn: false,
        userData: {} as User,
        setIsLoggedIn: (status) => set({ isLoggedIn: status }),
        setUserData: (data) => set({ userData: data }),
      }),
      {
        name: "food-storage", // name of the item in the storage (must be unique)
        // storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
      }
    )
);

// Exmaple on how to  store Zustand state in localStore.
// Useful when needed to keep state on page refresh e.g. auth data, shopping cart, etc.
import create, { StateCreator } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  id: string;
  name: string;
};

interface Store {
  users: User[];
  addUser: (user: User) => void;
  deleteUser: (userId: string) => void;
}

let store: StateCreator<Store, [], [], Store> = (set) => ({
  users: [],
  addUser: (user: User) => set((state) => ({ users: [...state.users, user] })),
  deleteUser: (userId: string) => set((state) => ({ users: state.users.filter((user) => user.id !== userId) })),
});

let storePersist = persist(store, { name: "user" });
export const useStore = create(storePersist);

import create from 'zustand'
import { UserType } from '../helpers/types'

type UserState = {
    roles: UserType[] ;
    addRoles: (role: UserType) => void;
    setRoles: (roles: UserType[]) => void;
    deleteRoles: () => void;
}

export const userState = create<UserState>((set) => ({
    roles: [],
    addRoles: (role) => set((state) => ({roles: [...state?.roles, role]})),
    setRoles: (roles) => set({roles: roles}),
    deleteRoles: () => set({roles: []})
}))


import create from 'zustand'

export type UserServices = "client" | "provider" | null
export type UserProviders = "private" | "company" | null

export const userServiceType = create<UserServices>(() => null)
export const userProviderType = create<UserProviders>(() => null )


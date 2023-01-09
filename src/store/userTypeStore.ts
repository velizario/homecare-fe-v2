import create from 'zustand'

export type UserServices = "client" | "provider"
export type UserProviders = "private" | "company"

export const userServiceType = create<"client" | "provider">(() => "client")
export const userProviderType = create<"private" | "company">(() => "private")


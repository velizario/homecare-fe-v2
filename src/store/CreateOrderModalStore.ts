import create from 'zustand'

export type UserProviders = "private" | "company" | null

export const inputModalOpened = create<boolean>(() => false)
export const setInputModalOpened = create<UserProviders>(() => null)


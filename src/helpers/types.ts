import { Client } from "../model/clientModel";
import { Vendor } from "../model/vendorModel";

export interface SelectionOption {
  id: string;
  name: string;
  description?: string;
}

export enum UserType {
  ADMIN,
  CLIENT,
  VENDOR_COMPANY,
  VENDOR_INDIVIDUAL,
}

type Required<T, K extends keyof T> = T & { [P in K]-?: T[P] }

export type WithRequired<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>> & Required<T, K>



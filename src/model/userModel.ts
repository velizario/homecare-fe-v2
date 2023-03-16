import { WithRequired } from "../helpers/types";
import { Client } from "./clientModel";
import { Vendor } from "./vendorModel";

export type User = WithRequired<Partial<Client> & Partial<Vendor>,"roles" | "id" | "createdAt" | "firstName" | "email" | "isSuspended" | "companyName">

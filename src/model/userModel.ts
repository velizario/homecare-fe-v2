import { requestToAPI } from "../helpers/helperFunctions";
import { ProfileForm } from "../structure/dashboard/account/profile/Profile";
import { Vendor } from "./vendorModel";

export enum UserType {
  ADMIN,
  CLIENT,
  VENDOR_COMPANY,
  VENDOR_INDIVIDUAL,
}

export interface User {
  id: string;
  createdAt: Date;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
  isSuspended: boolean;
  roles: UserType[];
  phone: string;
  client?: { userId: string; id: string; address: string; district: string; city: string };
  vendor?: Vendor
}


// endpoints = "userSignup" | "userEdit/:id" | "userLogin" | "userGet";

const sendRequest = async (endpoint: string, data?: {}) => {
  const resData = await requestToAPI(`users/${endpoint}`, "POST", data);
  if (resData.status === "success")
    localStorage.setItem("token", resData.token);

  return resData;
};

export const userDataRefresh = async () => {
  const res = await requestToAPI(`users/userGet`, "GET");
  return await res.data as User;
};

export const userSignup = async (data: {}) => sendRequest("userSignup", data);

export const userLogin = async (data: {}) => sendRequest("userLogin", data);

export const userEdit = async (data: ProfileForm) => {
  const resData = await requestToAPI(`users/${data.id}`, "PATCH", data);
  return await resData.data as User;
}


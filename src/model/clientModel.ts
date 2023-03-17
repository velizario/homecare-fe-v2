import { requestToAPI } from "../helpers/helperFunctions";
import { UserType } from "../helpers/types";
import { ProfileForm } from "../structure/dashboard/account/profile/Profile";
import { User } from "./userModel";

export interface Client {
  id: string;
  createdAt: Date;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
  isSuspended: boolean;
  roles: UserType[];
  phone: string;
  district: string;
  city: string;
  address: string;
}

// endpoints = "userSignup" | "userEdit/:id" | "userLogin" | "userGet";

const sendRequest = async (endpoint: string, data?: {}) => {
  const resData = await requestToAPI(`users/${endpoint}`, "POST", data);
  if (resData.status === "success") localStorage.setItem("token", resData.token);

  return resData;
};

export const userDataRefresh = async () => {
  const res = await requestToAPI(`users/userGet`, "GET");
  return (await res.data) as User;
};

export const userSignup = async (data: {}) => sendRequest("userSignup", data);

export const userLogin = async (data: {}) => sendRequest("userLogin", data);

export const userEdit = async (data: ProfileForm) => {
  const resData = await requestToAPI(`users/${data.id}`, "PATCH", data);
  // if (resData.status === 'success')
  return (await resData.data) as User;
};

export const userPasswordChange = async (data: { email: string; password: string }) => {
  const resData = await requestToAPI(`users/passwordChange`, "PATCH", data);
  // if (resData.status === 'success')
  return (await resData.data) as User;
};

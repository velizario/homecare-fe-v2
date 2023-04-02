import { requestToAPI } from "../helpers/helperFunctions";
import { ApiError, UserType } from "../types/types";
import { ProfileForm } from "../structure/dashboard/account/profile/Profile";
import { User } from "./userModel";
import { userState } from "../store/userState";

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

type HandleRequestData = {
  status: "fail" | "success" | "error";
  message: string;
  data: User;
  token: string;
};

const handleRequest = async (endpoint: string, method: string, data?: {}) => {
  const resData: HandleRequestData = await requestToAPI(`users/${endpoint}`, method, data);
  if (resData.status === "success") {
    localStorage.setItem("token", resData.token);
    userState.setState({ isLoggedIn: true, userData: resData.data });
  }

  if (resData.status === "fail" || resData.status === "error") {
    localStorage.setItem("token", "");
    userState.setState({ isLoggedIn: false, userData: {} as User });
  }
  return resData;
};

export const userSignup = async (data: {}) => {
  return await handleRequest("userSignup", "POST", data);
};

export const userLogin = async (data: {}) => {
  return await handleRequest("userLogin", "POST", data);
};

export const userDataRefresh = async () => {
  return await handleRequest(`userAuthenticate`, "GET");
};

export const userEdit = async (data: ProfileForm) => {
  const resData = await requestToAPI(`users`, "PATCH", data);
  // if (resData.status === 'success')
  return (await resData.data) as User;
};

export const userPasswordChange = async (data: { email: string; password: string }) => {
  const resData = await requestToAPI(`users/passwordChange`, "PATCH", data);
  if (resData.hasOwnProperty("message")) return resData as ApiError;
  return (await resData.data) as User;
};
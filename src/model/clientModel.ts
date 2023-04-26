import { requestToAPI } from "../helpers/helperFunctions";
import { ApiError, User, UserRole } from "../types/types";
import { userState } from "../store/userState";
import { ClientProfileForm } from "../structure/dashboard/account/profile/ProfileClient";
import { VendorProfileForm } from "../structure/dashboard/account/profile/ProfileVendor";

// export interface Client {
//   id: string;
//   createdAt: Date;
//   firstName: string;
//   lastName: string;
//   email: string;
//   imageUrl: string;
//   isSuspended: boolean;
//   roles: UserRole[];
//   phone: string;
//   district: string;
//   city: string;
//   address: string;
// }

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

export const updateUserData = async (data: ClientProfileForm | VendorProfileForm) => {
  const resData = await requestToAPI(`users`, "PATCH", data);
  // if (resData.status === 'success')
  return (await resData.data) as User;
};

export const userPasswordChange = async (data: { email: string; password: string }) => {
  const resData = await requestToAPI(`users/passwordChange`, "PATCH", data);
  if (resData.hasOwnProperty("message")) return resData as ApiError;
  return (await resData.data) as User;
};

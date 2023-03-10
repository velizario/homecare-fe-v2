import { requestToAPI } from "../helpers/helperFunctions";
import { UserType } from "../helpers/types";

type EndpointName = "userSignup" | "userEdit" | "userLogin";

const sendRequest = async (data: {}, endpoint: EndpointName) => {
  const resData = await requestToAPI(`users/${endpoint}`, "POST", data);

  if (resData.status === "success")
    localStorage.setItem("token", resData.token);

  return resData;
};

export const userSignup  = async (data: {}) => sendRequest(data, "userSignup");
export const userLogin  = async (data: {}) => sendRequest(data, "userLogin");
export const userEdit  = async (data: {}) => sendRequest(data, "userEdit");

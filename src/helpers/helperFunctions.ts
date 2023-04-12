import axios from "axios";
import { BACKEND_URL } from "./envVariables";

export const getToken = () => {
  const token = localStorage.getItem("token");
  const bearerString = token ? `Bearer ${token}` : null;
  return bearerString;
};

export const requestToAPI = async (addrPath: string, method: string, body = {}) => {
  const reqObject = {
    url: `${BACKEND_URL}/${addrPath}`,
    method: method,
    // cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken() || "",
    },
    // credentials: "include",
    data: JSON.stringify(body),
  };



  try {
    const resData = await axios(reqObject);
    console.log("Returned data from API:", resData.data);
    return resData.data;
  } catch (error) {
    console.log(error);
  }
};

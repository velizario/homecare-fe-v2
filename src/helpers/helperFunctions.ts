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

export const createFullName = (objectWithNames: { firstName: string; lastName: string }) => {
  return `${objectWithNames.firstName}${objectWithNames.lastName ? " " + objectWithNames.lastName : ""}`;
};

export function sortObjArrAsc<T extends Record<any, any> & { id: number }>(objectToSort: T[]): T[] {
  return [...objectToSort].sort((a, b) => a.id - b.id);
}

export function sortObjArrDesc<T extends Record<any, any> & { id: number }>(objectToSort: T[]): T[] {
  return [...objectToSort].sort((a, b) => b.id - a.id);
}


export function toggleFilterSelection(selectedId: number, selection: number[]) {
  return selection?.includes(selectedId) ? selection.filter((id) => id !== selectedId) : [...selection, selectedId];
}
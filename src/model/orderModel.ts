import { requestToAPI } from "../helpers/helperFunctions";
import { Order } from "../types/types";



export const createOrder = async (vendorId: string, data: any) => {
  const resData = await requestToAPI("orders/createOrder", "POST", {vendorId, ...data});
  return resData as Order;
};

export const getOrder = async (data: string) => {
  const resData = await requestToAPI(`orders/getOrder/${data}`, "GET");
  return resData.data as Order;
};

export const getAllOrders = async () => {
  const resData = await requestToAPI(`orders/getAllOrders`, "GET");
  return resData.data as Order[];
};

export const cancelOrder = async (orderId: number) => {
  const resData = await requestToAPI(`orders/cancelOrder/${orderId}`, "PATCH");
  return resData.data as Order[];
};

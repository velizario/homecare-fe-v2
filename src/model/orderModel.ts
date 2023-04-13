import { requestToAPI } from "../helpers/helperFunctions";
import { Order, OrderComment } from "../types/types";

export const createOrder = async (vendorId: string, data: any) => {
  const resData = await requestToAPI("orders/createOrder", "POST", { vendorId, ...data });
  return resData as Order;
};

export const updateOrder = async (data: any) => {
  console.log("Order data to update with: ", data);
  const resData = await requestToAPI("orders/updateOrder", "POST", data);
  return resData.data as Order;
};

export const getOrder = async (data: string) => {
  const resData = await requestToAPI(`orders/getOrder/${data}`, "GET");
  return resData.data as Order;
};


export const getAllOrders = async () => {
  const resData = await requestToAPI(`orders/getAllOrders`, "GET");
  // axios.get()
  return resData.data as Order[];
};

export const cancelOrder = async (orderId: number) => {
  const resData = await requestToAPI(`orders/cancelOrder/${orderId}`, "PATCH");
  return resData.data as Order[];
};

export const addOrderComment = async (orderData: any) => {
  const resData = await requestToAPI(`orders/addComment`, "POST", orderData);
  return resData.data as OrderComment;
};

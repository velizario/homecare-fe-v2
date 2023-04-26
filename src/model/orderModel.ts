import { requestToAPI } from "../helpers/helperFunctions";
import { Order, OrderComment, ORDER_STATUS } from "../types/types";

export const createOrder = async (vendorId: string, data: any) => {
  const resData = await requestToAPI("orders/createOrder", "POST", { vendorId, ...data });
  return resData as Order;
};

export const getOrder = async (data: string) => {
  const resData = await requestToAPI(`orders/getOrder/${data}`, "GET");
  return resData.data as Order;
};

export const updateOrder = async (data: any) => {
  console.log("Order data to update with: ", data);
  console.log({ ...data });
  const resData = await requestToAPI("orders/updateOrder", "POST", data);
  return resData.data as Order;
};

export const changeOrderStatus = async ({orderId, newStatus} : {orderId: number, newStatus: ORDER_STATUS}) => {
  const resData = await requestToAPI(`orders/changeOrderStatus/${orderId}`, "PATCH", { newStatus: newStatus });
  return resData.data as Order;
};

export const getAllOrders = async () => {
  const resData = await requestToAPI(`orders/getAllOrders`, "GET");
  return resData.data as Order[];
};

export const addOrderComment = async (orderData: any) => {
  const resData = await requestToAPI(`orders/addComment`, "POST", orderData);
  return resData.data as OrderComment;
};

import { requestToAPI } from "../helpers/helperFunctions";
import { orderState } from "../store/orderState";
import { Order, OrderComment, OrderEvent, ORDER_STATUS } from "../types/types";

export const createOrder = async (data: Partial<Order>) => {
  const resData = await requestToAPI("orders/createOrder", "POST", data );
  return resData as Order;
};

export const getOrder = async (data: string) => {
  const resData = await requestToAPI(`orders/getOrder/${data}`, "GET");
  return resData.data as Order;
};

export const updateOrder = async (data: Order) => {
  console.log("Order data to update with: ", data);
  console.log({ ...data });
  const resData = await requestToAPI("orders/updateOrder", "POST", data);
  return resData.data as Order;
};

export const changeOrderStatus = async ({orderId, newStatus} : {orderId: number, newStatus: ORDER_STATUS}) => {
  const resData = await requestToAPI(`orders/changeOrderStatus/${orderId}`, "PATCH", { newStatus: newStatus });
  return resData.data as Order;
};

export const fetchOrderState = async () => {
  const resData = await requestToAPI(`orders/getAllOrders`, "GET");
  orderState.setState({orderData : resData.data as Order[]})
};

export const addOrderComment = async (orderData: any) => {
  const resData = await requestToAPI(`orders/addComment`, "POST", orderData);
  return resData.data as OrderComment;
};

export const upsertOrderEvent = async (eventData: any) => {
  const resData = await requestToAPI(`orders/upsertEvent`, "POST", eventData);
  return resData.data as OrderEvent;
};

export const getOrderEvents = async (eventData: any) => {
  const resData = await requestToAPI(`orders/getEvent`, "GET", eventData);
  return resData.data as OrderEvent;
};

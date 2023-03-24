import { requestToAPI } from "../helpers/helperFunctions";
import { CreateOrderForm } from "../structure/orderManagement/CreateOrderInput";




export interface Order extends CreateOrderForm {
  id: string;
  clientName: string;
  clientImgUrl: string;
  vendorImgUrl: string;
  vendorName: string;
  status: string;
}

export const createOrder = async (data: any) => {
  const resData = await requestToAPI("orders/createOrder", "POST", data);
  return resData as Order;
};

export const getOrder = async (data: string) => {
  const resData = await requestToAPI(`orders/getOrder/${data}`, "GET");
  return resData.data as Order;
};

export const getAllOrders = async () => {
  const resData = await requestToAPI(`orders/getAllOrders`, "GET");
  console.log(resData.data);
  return resData.data as Order[];
};

export const cancelOrder = async (orderId: string) => {
  const resData = await requestToAPI(`orders/cancelOrder/${orderId}`, "PATCH");
  return resData.data as Order[];
};

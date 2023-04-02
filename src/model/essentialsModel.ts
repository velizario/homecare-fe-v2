import { requestToAPI } from "../helpers/helperFunctions";

export const fetchServices = async () => {
    console.log("Services yeeey start")
    const resData = await requestToAPI(`essentials/getServices`, "GET");
    console.log("Services yeeey", resData)
}
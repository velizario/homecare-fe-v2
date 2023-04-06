import { requestToAPI } from "../helpers/helperFunctions";
import { essentialsStore } from "../store/essentialsStore";
import { EssentialsDb, EssentialsStore } from "../types/types";

export const fetchServiceTypes = async () => {
  console.log("Services yeeey start");
  const res = (await requestToAPI(`essentials/getServiceTypes`, "GET")).data as EssentialsDb[];

  // Do I want an indexed object?
  // const serviceTypes = res.reduce((first, current) => {
  //   const { id, ...rest } = current;
  //   return { ...first, [id]: rest };
  // }, {} as EssentialsStore);

  // Do I want Object?
  // let serviceToObj = {} as {[key : string] : string} ;
  // services.forEach(service => {console.log(serviceToObj); serviceToObj[service.id] = service.serviceName})

  // Or I want Map?
  // let serviceMap = new Map(services.map(service => [service.id, service.serviceName]));

  essentialsStore.setState({ serviceTypes: res });
};

import { requestToAPI } from "../helpers/helperFunctions";
import { essentialsStore } from "../store/essentialsStore";
import { EssentialDataAll, EssentialDataServiceType } from "../types/types";

export const fetchServiceTypeState = async () => {
  const res = (await requestToAPI(`essentials/getServiceTypes`, "GET")).data as EssentialDataServiceType[];

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

export const fetchDistrictNames = async () => {
  const res = (await requestToAPI('essentials/getDistrictNames', "GET")).data as EssentialDataAll[]
  essentialsStore.setState({districtNames: res})
}

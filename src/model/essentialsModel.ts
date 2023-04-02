import { requestToAPI } from "../helpers/helperFunctions";
import { essentialsStore } from "../store/essentialsStore";

export const fetchServices = async () => {
    console.log("Services yeeey start")
    const resData = await requestToAPI(`essentials/getServices`, "GET")
    const services = resData.data  as {id: string, serviceName: string}[]

    
    // Do I want Object?
    // let serviceToObj = {} as {[key : string] : string} ;
    // services.forEach(service => {console.log(serviceToObj); serviceToObj[service.id] = service.serviceName})
    
    // Or I want Map?
    let serviceMap = new Map(services.map(service => [service.id, service.serviceName]));
    essentialsStore.setState({serviceList: serviceMap})
    
}
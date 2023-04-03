import { requestToAPI } from "../helpers/helperFunctions";
import { essentialsStore } from "../store/essentialsStore";
import { EssentialsData } from "../types/types";



export const fetchServices = async () => {
    console.log("Services yeeey start")
    const essentialData = (await requestToAPI(`essentials/getEssentialData`, "GET")).data as EssentialsData
    // const essentialDataState = Object.keys(resData).map((key)  => {
    //     return {[key] : new Map(resData[key as keyof EssentialsData].map(table => [table.id , table.value]))}
    // })
    
    // Do I want Object?
    // let serviceToObj = {} as {[key : string] : string} ;
    // services.forEach(service => {console.log(serviceToObj); serviceToObj[service.id] = service.serviceName})
    
    // Or I want Map?
    // let serviceMap = new Map(services.map(service => [service.id, service.serviceName]));
    essentialsStore.setState({essentialData})
    
}
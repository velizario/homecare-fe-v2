import { requestToAPI } from "../helpers/helperFunctions";

export interface Vendor {
  companyName: string;
  webSite: string;
  instagram: string;
  facebook: string;
  id: string;
  about: string;
}

export const getVendor = async (vendorId: string) => {
  const res = await requestToAPI(`vendors/${vendorId}`, "GET");
  return (await res.data) as Vendor;
};

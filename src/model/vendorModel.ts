import { requestToAPI } from "../helpers/helperFunctions";
import { Portfolio, PortfolioInputForm, ProfileInputForm, User, Vendor } from "../types/types";

// export interface Vendor {
//     id: string;
//     firstName: string;
//     lastName: string;
//     phone: string;
//     imageUrl: string;
//     companyName: string;
//     facebook: string;
//     instagram: string;
//     website: string;
//     about: string;
//     roles: UserRole[];
//     servedDistrict: District[];
//     isSuspended: boolean;
//     city: string;
// }

export const getVendor = async (vendorId: string) => {
  const res = await requestToAPI(`vendors/getVendor/${vendorId}`, "GET");
  return (await res.data) as Vendor;
};

export const getVendors = async () => {
  const res = await requestToAPI(`vendors/getVendors`, "GET");
  return (await res.data) as Vendor[];
};


export const updateVendorData = async (data: ProfileInputForm) => {
  const resData = await requestToAPI(`users`, "PATCH", data);
  // if (resData.status === 'success')
  return (await resData.data) as User;
};

export const updateVendorPortfolio = async (data: PortfolioInputForm) => {
  const resData = await requestToAPI('vendors/updatePortfolio', "PATCH", data)
  return (await resData.data) as Portfolio
}
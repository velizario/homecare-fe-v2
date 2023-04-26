import { requestToAPI } from "../helpers/helperFunctions";
import { ProfileInputForm } from "../structure/dashboard/account/profile/ProfileVendor";
import { User, Vendor } from "../types/types";

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
  const res = await requestToAPI(`vendors/${vendorId}`, "GET");
  return (await res.data) as Vendor;
};


export const updateVendorData = async (data: ProfileInputForm) => {
  const resData = await requestToAPI(`users`, "PATCH", data);
  // if (resData.status === 'success')
  return (await resData.data) as User;
};

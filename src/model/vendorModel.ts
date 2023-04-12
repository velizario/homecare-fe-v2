import { requestToAPI } from "../helpers/helperFunctions";
import { Vendor } from "../types/types";

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

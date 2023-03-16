import { requestToAPI } from "../helpers/helperFunctions";
import { UserType } from "../helpers/types";
import { District } from "../structure/dashboard/account/profile/ComboSelectBox";

export interface Vendor {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    imageUrl: string;
    companyName: string;
    facebook: string;
    instagram: string;
    website: string;
    about: string;
    roles: UserType[];
    servedDistrict: District[];
    isSuspended: boolean;
    city: string;
}

export const getVendor = async (vendorId: string) => {
  const res = await requestToAPI(`vendors/${vendorId}`, "GET");
  return (await res.data) as Vendor;
};

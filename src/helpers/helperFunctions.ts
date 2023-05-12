import axios from "axios";
import { format, parseJSON } from "date-fns";
import { bg } from "date-fns/locale";
import { SelectionOption } from "../types/types";
import { BACKEND_URL } from "./envVariables";

export const getToken = () => {
  const token = localStorage.getItem("token");
  const bearerString = token ? `Bearer ${token}` : null;
  return bearerString;
};

export const requestToAPI = async (addrPath: string, method: string, body = {}, fileUpload = false) => {
  const reqObject = {
    url: `${BACKEND_URL}/${addrPath}`,
    method: method,
    // cache: "no-cache",
    headers: {
      "Content-Type": fileUpload ? 'multipart/form-data' : "application/json",
      Authorization: getToken() || "",
    },
    // credentials: "include",
    data: fileUpload ? body : JSON.stringify(body),
  };

  try {
    const resData = await axios(reqObject);
    console.log("Returned data from API:", resData.data);
    return resData.data;
  } catch (error) {
    console.log(error);
  }
};


export const createFullName = (objectWithNames: { firstName: string; lastName: string }) => {
  return `${objectWithNames.firstName}${objectWithNames.lastName ? " " + objectWithNames.lastName : ""}`;
};

export function sortObjArrAsc<T extends Record<any, any> & { id: number }>(objectToSort: T[]): T[] {
  return [...objectToSort].sort((a, b) => a.id - b.id);
}

export function sortObjArrDesc<T extends Record<any, any> & { id: number }>(objectToSort: T[]): T[] {
  return [...objectToSort].sort((a, b) => b.id - a.id);
}

export function toggleFilterSelection(selectedItem: number | string, currentSelection: (number | string)[]) {
  return currentSelection?.includes(selectedItem) ? currentSelection.filter((item) => item !== selectedItem) : [...currentSelection, selectedItem];
}

export const toggleSelectionOption = (selectedItem: SelectionOption, selection: SelectionOption[]) => {
  const foundItemIndex = selection.findIndex((item) => item.id === selectedItem.id);
  if (foundItemIndex < 0) return [...selection, selectedItem];
  else {
    const newSelection = [...selection];
    newSelection.splice(foundItemIndex, 1);
    return newSelection;
  }
};

export const publicImage = (imgUrl: string) => `${BACKEND_URL}/users/public/${imgUrl || "defaultImage.png"}`;

export const publicPortfolioImage = (imgUrl: string) => `${BACKEND_URL}/users/public/${imgUrl || "placeholder-image.png"}`;

export const dateFormatted = (dateString: string | Date, dateFormat: string = "dd.MM.yyyy HH:mm") => {
  return format(parseJSON(dateString), dateFormat, { locale: bg });
};

// export function hydrateFormToUser(formData: Partial<ProfileInputForm & ProfileInputForm>) {
//   const {
//     firstName,
//     lastName,
//     about,
//     address,
//     city,
//     companyName,
//     district,
//     facebook,
//     instagram,
//     phone,
//     servedDistrict,
//     website,
//   } = formData;

//   const hydratedUser = {} as Partial<User>;
//   const hydratedVendor = {} as Partial<Vendor>
//   const hydratedClient = {} as Partial<Client>

//   address && (hydratedClient.address = address)
//   city && (hydratedClient.city = city)
//   district && (hydratedClient.district = district)

//   about && (hydratedVendor.about = about)
//   companyName && (hydratedVendor.companyName = companyName)
//   instagram && (hydratedVendor.instagram = instagram)
//   facebook && (hydratedVendor.facebook = facebook)
//   website && (hydratedVendor.website = website)
//   servedDistrict && (hydratedVendor.servedDistrict = servedDistrict)

//   firstName && (hydratedUser.firstName = firstName)
//   lastName && (hydratedUser.lastName = lastName)
//   phone && (hydratedUser.phone = phone)

//   hydratedUser.client = hydratedClient;

// }

export interface SelectionOption {
  id: string;
  name: string;
  description?: string;
}

export enum UserType {
  ADMIN,
  CLIENT,
  VENDOR_COMPANY,
  VENDOR_INDIVIDUAL,
}

export interface User {
  id: string;
  createdAt: Date;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
  isSuspended: boolean;
  roles: UserType[];
  phone: string;
  client?: { userId: string; id: string; address: string; district: string; city: string };
  vendor?: { companyName: string; webSite: string; instagram: string; facebook: string, id: string, about: string };
}

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
  id: string,
  createdAt: Date,
  firstName: string,
  lastName: string,
  email: string,
  imageUrl: string,
  isSuspended: boolean,
  roles: UserType[],
  client?: {userId: string, id: string}
  vendor?: {}
}
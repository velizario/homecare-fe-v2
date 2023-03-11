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

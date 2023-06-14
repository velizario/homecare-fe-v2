
export type EssentialDataAll = { id: number; value: string };
export type EssentialDataServiceType = { id: number; value: string; description?: string; imgUrl?: string };

export interface SelectionOption extends EssentialDataAll {}

export enum UserRole {
  ADMIN = 0,
  CLIENT,
  VENDOR_COMPANY,
  VENDOR_INDIVIDUAL,
}

type Required<T, K extends keyof T> = T & { [P in K]-?: T[P] };

export type WithRequired<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>> & Required<T, K>;

export type ApiError = {
  message: string;
  status: string;
};

export interface District {
  id: number;
  districtName: string;
}


export interface User {
  id: number
  serviceType: EssentialDataServiceType
  firstName: string
  lastName: string
  phone: string
  imageUrl: string
  email: string
  isSuspended: boolean
  roles: UserRole[]
  createdAt: string
  client: Client
  clientId: number
  vendor: Vendor
  vendorId: number
  orderComment: OrderComment
}

export interface Vendor {
  about: string
  companyName: string
  city: string
  facebook: string
  id: number
  instagram: string
  portfolio: Portfolio[]
  portfolioImage: PortfolioImage[]
  servedDistrict: District[]
  user: User
  website: string
  isAdhocEnabled: boolean;
  isSubscriptionEnabled: boolean;
}

export interface Client {
  id: number
  address: string
  city: string
  district: string
  user: User
}

export interface OrderComment {
  id: number;
  user: User;
  comment: string;
  createdAt: string;
}

export interface OrderEvent {
  id: string;
  date: Date;
  order: Order;
  orderId: number;
  status: ORDER_STATUS
  rating: number;
  feedback: string;
}

export enum OrderHistoryLogType {
  NEW = 1,
  OFFER,
  RESERVATION,
  ACTIVE,
  COMPLETE,
  CANCELLED,
  UPDATED
}

export enum ORDER_STATUS {
  NEW = 1,
  OFFER,
  RESERVATION,
  ACTIVE,
  COMPLETE,
  CANCELLED,
  PASSED,
}

export interface OrderHistory {
  id: number
  updateType: number
  createdAt: string
  user: User
}

export interface Order {
  id: number;
  additionalInfo: string;
  additionalService?: string[];
  client: Client
  clientId: number;
  clientDayChoice: EssentialDataAll[];
  clientHourChoice: EssentialDataAll[];
  createdAt: string;
  districtName: EssentialDataAll;
  estateSize: EssentialDataAll;
  event: OrderEvent[];
  orderComment: OrderComment[];
  orderHistory: OrderHistory[]
  orderStatus: EssentialDataAll;
  orderStatusId: number;
  serviceType: EssentialDataAll;
  vendor: Vendor
  vendorId: number;
  visitDay: EssentialDataAll;
  visitHour: EssentialDataAll;
  visitFrequency: EssentialDataAll;
  startDate: string
  endDate: string
}


export type ProfileInputForm = {
  // id: string;
  firstName: string;
  lastName: string;
  phone: string;
  companyName: string;
  facebook: string;
  instagram: string;
  website: string;
  about: string;
  servedDistrict: District[];
  district: string;
  city: string;
  address: string;
};

export type Portfolio = {
  service : EssentialDataServiceType;
  price: number
}

export type PortfolioImage = {
  id: number;
  imgUrl : string;
}


// export const areaSizes = new Map([
//   ["1", "0"],
//   ["2", "20"],
//   ["3", "40"],
//   ["4", "60"],
//   ["5", "80"],
//   ["6", "100"],
//   ["7", "120"],
//   ["8", "140"],
//   ["9", "160"],
//   ["10", "180"],
//   ["11", "200"],
// ]);

// export const services = new Map([
//   ["1", "Почистване на дома"],
//   ["2", "Почистване на офиси и магазини"],
//   ["3", "Основно почистване"],
//   ["4", "Следремонтно чистене"],
//   ["5", "Индустриално обслужване"],
//   ["6", "Пране на мека мебел"],
//   ["7", "Пране на мокети / килими"],
//   ["8", "Почистване на подови настилки"],
//   ["9", "Почистване на прозорци и витрини"],
// ]);

// export const servicesObj: Record<string, string> = {
//   "1": "Почистване на дома",
//   "2": "Почистване на офиси и магазини",
//   "3": "Основно почистване",
//   "4": "Следремонтно чистене",
//   "5": "Индустриално обслужване",
//   "6": "Пране на мека мебел",
//   "7": "Пране на мокети / килими",
//   "8": "Почистване на подови настилки",
//   "9": "Почистване на прозорци и витрини",
// };

// export const orderFrequency = new Map([
//   ["1", "еднократно"],
//   ["2", "седмично"],
//   ["3", "на 2 седмици"],
//   ["4", "на 4 седмици"],
// ]);

// export const OrderStatus = new Map([
//   ["1", "Нова"],
//   ["2", "Активна"],
//   ["3", "Завършена"],
//   ["4", "Анулирана"],
// ]);
import { Client } from "../model/clientModel";
import { Vendor } from "../model/vendorModel";

export type EssentialsData = {
  serviceTypes : {id: string, value: string}[], 
  visitFrequencies: {id: string, value: string}[], 
  visitDays : {id: string, value: string}[], 
  orderStatuses : {id: string, value: string}[], 
  visitHours : {id: string, value: string, daytime: "morning" | "afternoon"}[], 
  estateSizes : {id: string, value: string}[], 
  districtNames : {id: string, value: string}[]
}

export interface SelectionOption {
  id: string;
  value: string;
}

export enum UserType {
  ADMIN,
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

export const areaSizes = new Map([
  ["1", "0"],
  ["2", "20"],
  ["3", "40"],
  ["4", "60"],
  ["5", "80"],
  ["6", "100"],
  ["7", "120"],
  ["8", "140"],
  ["9", "160"],
  ["10", "180"],
  ["11", "200"],
]);

export const services = new Map([
  ["1", "Почистване на дома"],
  ["2", "Почистване на офиси и магазини"],
  ["3", "Основно почистване"],
  ["4", "Следремонтно чистене"],
  ["5", "Индустриално обслужване"],
  ["6", "Пране на мека мебел"],
  ["7", "Пране на мокети / килими"],
  ["8", "Почистване на подови настилки"],
  ["9", "Почистване на прозорци и витрини"],
]);

export const servicesObj:Record<string,string> = {
  "1": "Почистване на дома",
  "2": "Почистване на офиси и магазини",
  "3": "Основно почистване",
  "4": "Следремонтно чистене",
  "5": "Индустриално обслужване",
  "6": "Пране на мека мебел",
  "7": "Пране на мокети / килими",
  "8": "Почистване на подови настилки",
  "9": "Почистване на прозорци и витрини",
}

export const orderFrequency = new Map([
  ["1", "еднократно"],
  ["2", "седмично"],
  ["3", "на 2 седмици"],
  ["4", "на 4 седмици"],
]);

export const OrderStatus = new Map([
  ["1", "Нова"],
  ["2", "Активна"],
  ["3", "Завършена"],
  ["4", "Анулирана"],
]);

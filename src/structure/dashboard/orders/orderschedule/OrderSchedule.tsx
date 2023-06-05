import { useEffect } from "react";
import { DateRange } from "react-day-picker";
import create from "zustand";
import { fetchOrderState } from "../../../../model/orderModel";
import Filters from "../../../../utilityComponents/Filters";
import Modal from "../../../../utilityComponents/Modal";
import EventModal from "./EventModal";
import ScheduleCalendar from "./ScheduleCalendar";
import ScheduleList from "./ScheduleList";

type DateRangeStore = {
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
};

export const dateRangeStore = create<DateRangeStore>()((set) => ({
  dateRange: undefined,
  setDateRange: (range) => set({ dateRange: range }),
}));

export default function OrderSchedule() {
  return (
    <>
      <p className="mb-4 mt-4 text-sm text-gray-500 sm:col-span-6">График нещо събитията</p>
      <ScheduleCalendar />
      <ScheduleList />
    </>
  );
}

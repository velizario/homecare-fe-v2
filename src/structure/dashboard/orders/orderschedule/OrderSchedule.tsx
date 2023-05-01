import { useEffect } from "react";
import { DateRange } from "react-day-picker";
import create from "zustand";
import { fetchOrderState } from "../../../../model/orderModel";
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
  useEffect(() => {
    fetchOrderState();
  }, []);

  return (
    <div className="gap-6 sm:flex sm:flex-row-reverse sm:justify-end">
      <ScheduleCalendar />
      <ScheduleList />
    </div>
  );
}

import { add, eachDayOfInterval, nextFriday, nextMonday, nextSaturday, nextSunday, nextThursday, nextTuesday, nextWednesday } from "date-fns";
import { useEffect, useState } from "react";
import { orderState } from "../../../../store/orderState";
import DatePicker from "./DatePicker";

const dayToFn = {
  1: nextMonday,
  2: nextTuesday,
  3: nextWednesday,
  4: nextThursday,
  5: nextFriday,
  6: nextSaturday,
  7: nextSunday,
};

type TWeekDay = keyof typeof dayToFn;
const today = new Date();

const dateListFromWeekday = (weekDay: TWeekDay, startingDay: Date, frequency: number) => {
  const recurrenceEndDate = add(today, { days: 365 });
  const startingDate = dayToFn[weekDay](startingDay);
  const calculateEventDays = eachDayOfInterval({ start: startingDate, end: recurrenceEndDate }, { step: frequency*7 });
  return calculateEventDays;
};

export default function ScheduleCalendar() {
  const orderData = orderState((state) => state.orderData);
  const [eventDays, setEventDays] = useState<Date[]>([]);

  useEffect(() => {
    // ORder should have a starting day. For now I'm using today as starting day
    if (orderData.length < 1) return;
    const mapBookedDays = orderData.reduce((acc, order) => [...acc, ...dateListFromWeekday(order.visitDay.id as TWeekDay, today, order.visitFrequency.id)], [] as Date[]);
    setEventDays(mapBookedDays);
  }, [orderData]);

  return <div className="mt-10 p-6">{eventDays.length > 0 && <DatePicker bookedDays={eventDays} />}</div>;
}

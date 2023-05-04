import {
  add,
  eachDayOfInterval,
  endOfDay,
  endOfISOWeek,
  isThisMonth,
  lastDayOfMonth,
  nextFriday,
  nextMonday,
  nextSaturday,
  nextSunday,
  nextThursday,
  nextTuesday,
  nextWednesday,
  parse,
  setMonth,
  startOfISOWeek,
  startOfMonth,
} from "date-fns";
import { DateRange } from "react-day-picker";
import { fetchOrderState } from "../../../../model/orderModel";
import { orderState } from "../../../../store/orderState";
import { Order } from "../../../../types/types";

export const dayToFn = {
  1: nextMonday,
  2: nextTuesday,
  3: nextWednesday,
  4: nextThursday,
  5: nextFriday,
  6: nextSaturday,
  7: nextSunday,
};

type TWeekDay = keyof typeof dayToFn;
type Events = {
  orderId: number;
  eventDate: Date;
};

await fetchOrderState();
const orderData = orderState.getState().orderData;

// Prepare static data, using today as reference day

// const consolidatedObject = calendarDays.map((day) => ({ date: day, isCurrentMonth: isThisMonth(day) }));

// create a list of dates starting from the first (provided) 'weekDay' after the (provided) 'start' date, till 365 days after that
const dateListFromWeekday = (weekDay: TWeekDay, start: Date, frequency: number) => {
  const startDate = dayToFn[weekDay](start);
  const endDate = add(startDate, { days: 365 });
  const calculateEventDays = eachDayOfInterval({ start: startDate, end: endDate }, { step: frequency * 7 });
  return calculateEventDays;
};

// create list of events from dateListFromWeekDay and (provided) orderData
const createEvents = (orderData: Order[]) => {
  if (orderData.length < 1) return;
  const mapBookedDays = orderData
    .reduce((acc, order) => {
      if (!order.visitDay?.id) return acc;
      const orderEventsDates = dateListFromWeekday(order.visitDay.id as TWeekDay, today, order.visitFrequency.id);
      const ordersByDays = orderEventsDates.map((date) => ({ orderId: order.id, eventDate: parse(order.visitHour.value, "HH:mm", date) }));
      return [...acc, ...ordersByDays];
    }, [] as { orderId: number; eventDate: Date }[])
    .sort((a, b) => a.eventDate.getTime() - b.eventDate.getTime());
  return mapBookedDays;
};

// filters (provided) events by (provided) dateRange {from: ... , to: ...}
const filterEventsByRange = (events: Events[] | undefined, dateRange: DateRange) => {
  if (!events) return;
  const filteredEvents = events.filter((event) => {
    const afterStartDate = !dateRange?.from ? true : event.eventDate.getTime() >= dateRange.from.getTime();
    const beforeEndDate = !dateRange?.to ? true : event.eventDate.getTime() <= endOfDay(dateRange.to).getTime();
    return afterStartDate && beforeEndDate;
  });
  return filteredEvents;
};

const allEvents = createEvents(orderData);

// const eventsInRange = filterEventsByRange(allEvents, {from: calendarStartDay, to: calendarEndDay});

// 1 on click onto calendar -> create calendar view with events
const defineCalendarDays = (monthId: number) => {
  const curentMonthDate = setMonth(new Date(), monthId);
  const startDayOfMonth = startOfMonth(curentMonthDate);
  const endDayOfMonth = lastDayOfMonth(curentMonthDate);
  const calendarStartDay = startOfISOWeek(startDayOfMonth);
  const calendarEndDay = endOfISOWeek(endDayOfMonth);
  return eachDayOfInterval({ start: calendarStartDay, end: calendarEndDay });
};

const addEventsToCalendarDays = (orderData: Order[] | undefined, calendarDays: Date[]) => {
  if (!orderData || orderData.length < 1) return;

  const eventData = calendarDays.map( day => {

  })

  const mapBookedDays = orderData
    .reduce((acc, order) => {
      if (!order.visitDay?.id) return acc;
      const orderEventsDates = dateListFromWeekday(order.visitDay.id as TWeekDay, today, order.visitFrequency.id);
      const ordersByDays = orderEventsDates.map((date) => ({ orderId: order.id, eventDate: parse(order.visitHour.value, "HH:mm", date) }));
      return [...acc, ...ordersByDays];
    }, [] as { orderId: number; eventDate: Date }[])
    .sort((a, b) => a.eventDate.getTime() - b.eventDate.getTime());
  return mapBookedDays;
}
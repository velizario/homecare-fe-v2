import {
  add,
  addDays,
  eachDayOfInterval,
  endOfDay,
  endOfISOWeek,
  fromUnixTime,
  getUnixTime,
  isSameDay,
  isSameMonth,
  lastDayOfMonth,
  nextFriday,
  nextMonday,
  nextSaturday,
  nextSunday,
  nextThursday,
  nextTuesday,
  nextWednesday,
  parse,
  parseJSON,
  setMonth,
  startOfISOWeek,
  startOfMonth,
} from "date-fns";
import { DateRange } from "react-day-picker";
import { createFullName, dateFormatted } from "../../../../helpers/helperFunctions";
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

const calculateEventDays = (order: Order, range: { from: Date; to: Date }) => {
  // Calculate start date (bigger of order start date and passed start date) and end date (smaller of order end date and passed end date)
  // TODO: Consider empty order.startDate and order.endDate
  const startDate = fromUnixTime(Math.max(getUnixTime(parseJSON(order.startDate)), getUnixTime(range.from)));
  const endDate = !order.endDate ? range.to : fromUnixTime(Math.max(getUnixTime(parseJSON(order.endDate)), getUnixTime(range.to)));

  // move start date to the upcoming weekday defined in the order
  const startDateByWeekDay = dayToFn[order.visitDay.id as TWeekDay](startDate);

  // return array of service dates for the order
  return eachDayOfInterval({ start: startDateByWeekDay, end: endDate }, { step: order.visitFrequency.id * 7 });
};

const createOrdersEvents = (orderData: Order[], range: { from: Date; to: Date }) => {
  return orderData.reduce(
    (acc, order) => {
      if (!order.startDate) return acc;
      const eventDays = calculateEventDays(order, range);
      const eventsArray = eventDays.map((date) => ({ date: date, order: order }));
      return [...acc, ...eventsArray];
    },
    [] as {
      date: Date;
      order: Order;
    }[]
  );
};

export const defineCalendarRange = (monthId: number) => {
  const curentMonthDate = setMonth(new Date(), monthId);
  const startDayOfMonth = startOfMonth(curentMonthDate);
  // const endDayOfMonth = lastDayOfMonth(curentMonthDate);
  const calendarStartDay = startOfISOWeek(startDayOfMonth);
  // const calendarEndDay = endOfISOWeek(endDayOfMonth);
  return { from: calendarStartDay, to: addDays(calendarStartDay, 41) };
};

export const createCalendarSchedule = (orderData: Order[], monthId: number) => {
  const range = defineCalendarRange(monthId);
  const dateRange = eachDayOfInterval({ start: range.from, end: range.to });
  return dateRange.map((date) => {
    const ordersEvents = createOrdersEvents(orderData, range);
    const ordersByDate = ordersEvents
      .filter((event) => isSameDay(event.date, date))
      .map((event) => ({ id: event.order.id, type: event.order.serviceType.value, name: createFullName(event.order.client.user), location: event.order.districtName.value, time: event.order.visitHour.value, day: event.order.visitDay.value, href: `/dashboard/orders/${event.order.id}` }));
    const isCurrentMonth = isSameMonth(date, setMonth(new Date(), monthId));
    return { date: dateFormatted(date), isCurrentMonth: isCurrentMonth, isSelected: false, isToday: false, events: ordersByDate };
  });
};

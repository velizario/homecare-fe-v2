import { BACKEND_URL } from "../helpers/envVariables";

// TODO can I get rid of the static data since I already get it in the requests?


export const placeholderImage = `${BACKEND_URL}/users/public/common/public_placeholder_image.jpg"}`;

// if changed here, needs to be changed on the BE too
// if changed here, revise in 1. SelectFrequency.tsx  - frequencyOptions variables. 2. CalendarLogic - eachDayOfInterval (step)
export const visitFrequencySelections = [
  { id: 0, value: "Еднократно" },
  { id: 1, value: "Седмично" },
  { id: 2, value: "Двуседмично" },
];

// if changed here, needs to be changed on the BE too
export const weekDaySelections = [
  { id: 1, value: "Понеделник" },
  { id: 2, value: "Вторник" },
  { id: 3, value: "Сряда" },
  { id: 4, value: "Четвъртък" },
  { id: 5, value: "Петък" },
  { id: 6, value: "Събота" },
  { id: 7, value: "Неделя" },
];


// if changed here, needs to be changed on the BE too
export const hourDaySelections = [
  { id: 1, value: "08:00", daytime: "morning" },
  { id: 2, value: "08:30", daytime: "morning" },
  { id: 3, value: "09:00", daytime: "morning" },
  { id: 4, value: "10:00", daytime: "morning" },
  { id: 5, value: "10:30", daytime: "morning" },
  { id: 6, value: "11:00", daytime: "morning" },
  { id: 7, value: "11:30", daytime: "morning" },
  { id: 8, value: "12:00", daytime: "afternoon" },
  { id: 9, value: "12:30", daytime: "afternoon" },
  { id: 10, value: "13:00", daytime: "afternoon" },
  { id: 11, value: "13:30", daytime: "afternoon" },
  { id: 12, value: "14:00", daytime: "afternoon" },
  { id: 13, value: "14:30", daytime: "afternoon" },
  { id: 14, value: "15:00", daytime: "afternoon" },
  { id: 16, value: "15:30", daytime: "afternoon" },
  { id: 17, value: "16:00", daytime: "afternoon" },
  { id: 18, value: "16:30", daytime: "afternoon" },
  { id: 19, value: "17:00", daytime: "afternoon" },
  { id: 20, value: "17:30", daytime: "afternoon" },
  { id: 21, value: "18:00", daytime: "afternoon" },
];

// if changed here, needs to be changed on the BE too
export const estateSizeSelections = [
  { id: 1, value: "0" },
  { id: 2, value: "10" },
  { id: 3, value: "20" },
  { id: 4, value: "30" },
  { id: 5, value: "40" },
  { id: 6, value: "50" },
  { id: 7, value: "60" },
  { id: 8, value: "70" },
  { id: 9, value: "80" },
  { id: 10, value: "90" },
  { id: 11, value: "100" },
  { id: 12, value: "110" },
  { id: 13, value: "120" },
  { id: 14, value: "130" },
  { id: 15, value: "140" },
  { id: 16, value: "150" },
  { id: 17, value: "160" },
  { id: 18, value: "170" },
  { id: 19, value: "180" },
  { id: 20, value: "190" },
  { id: 21, value: "200" },
];
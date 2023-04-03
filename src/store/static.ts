import { SelectionOption } from "../types/types";

export const serviceTypeChoices = [
  {
    id: "1",
    title: "Почистване на дома",
    description: "Почистване на гъз, глава, и тем подобни",
    img: "https://topmopscleaning.com/wp-content/uploads/2021/04/keeping-a-house-clean.jpeg",
    additionalServices: [
      { id: "1", value: "Миене на печка" },
      { id: "4", value: "Миене на хладилник" },
      { id: "3", value: "Миене на тераса" },
      { id: "2", value: "Миене на прозорци" },
    ]
  },
  {
    id: "2",
    title: "Почистване на офиси и магазини",
    description: "Рязане на кабели и промиване с чист спирт",
    img: "https://nswcommercialcleaning.com.au/wp-content/uploads/2018/04/iStock-609094288.jpg",
    additionalServices: [
      { id: "1", value: "Миене на печка" },
      { id: "4", value: "Миене на хладилник" },
      { id: "3", value: "Миене на тераса" },
      { id: "2", value: "Миене на прозорци" },
    ]
  },
  {
    id: "3",
    title: "Основно почистване",
    description: "Рязане на кабели и промиване с чист спирт",
    img: "https://cdn-ffokf.nitrocdn.com/LFtvDxXrnvtNThwjbFdxUfsgQYSGUhUB/assets/images/optimized/rev-37403d5/wp-content/uploads/2023/03/house-dusting.png",
    additionalServices: [
      { id: "1", value: "Миене на печка" },
      { id: "4", value: "Миене на хладилник" },
      { id: "3", value: "Миене на тераса" },
      { id: "2", value: "Миене на прозорци" },
    ]
  },
  {
    id: "4",
    title: "Следремонтно чистене",
    description: "Рязане на кабели и промиване с чист спирт",
    img: "https://prohousekeepers.com/wp-content/uploads/2019/05/post-construction-cleanup.jpg",
    additionalServices: [
      { id: "1", value: "Миене на печка" },
      { id: "4", value: "Миене на хладилник" },
      { id: "3", value: "Миене на тераса" },
      { id: "2", value: "Миене на прозорци" },
    ]
  },
  {
    id: "5",
    title: "Индустриално обслужване",
    description: "Рязане на кабели и промиване с чист спирт",
    img: "https://www.service-techcorp.com/hs-fs/hubfs/Industrial_Cleaning.jpeg?width=863&name=Industrial_Cleaning.jpeg",
    additionalServices: [
      { id: "1", value: "Миене на печка" },
      { id: "4", value: "Миене на хладилник" },
      { id: "3", value: "Миене на тераса" },
      { id: "2", value: "Миене на прозорци" },
    ]
  },
  {
    id: "6",
    title: "Пране на мека мебел",
    description: "Почистване на фотьойли и изхвърляне на котки",
    img: "https://media.angi.com/s3fs-public/Man-professionally-cleaning-couch.jpg?impolicy=leadImage",
    additionalServices: [
      { id: "1", value: "Миене на печка" },
      { id: "4", value: "Миене на хладилник" },
      { id: "3", value: "Миене на тераса" },
      { id: "2", value: "Миене на прозорци" },
    ]
  },
  {
    id: "7",
    title: "Пране на мокети / килими",
    description: "Рязане на кабели и промиване с чист спирт",
    img: "https://aadvancedcarpetcleaning.com/wp-content/uploads/2021/07/carpet-cleaners.jpg",
    additionalServices: [
      { id: "1", value: "Миене на печка" },
      { id: "4", value: "Миене на хладилник" },
      { id: "3", value: "Миене на тераса" },
      { id: "2", value: "Миене на прозорци" },
    ]
  },
  {
    id: "8",
    title: "Почистване на подови настилки",
    description: "Рязане на кабели и промиване с чист спирт",
    img: "https://www.webstaurantstore.com/images/products/large/573058/2253417.jpg",
    additionalServices: [
      { id: "1", value: "Миене на печка" },
      { id: "4", value: "Миене на хладилник" },
      { id: "3", value: "Миене на тераса" },
      { id: "2", value: "Миене на прозорци" },
    ]
  },
  {
    id: "9",
    title: "Почистване на прозорци и витрини",
    description: "Рязане на кабели и промиване с чист спирт",
    img: "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/05/featured-image-window-cleaning.jpeg.jpg",
    additionalServices: [
      { id: "1", value: "Миене на печка" },
      { id: "2", value: "Миене на прозорци" },
      { id: "3", value: "Миене на тераса" },
      { id: "4", value: "Миене на хладилник" },
    ]
  },
];

export const serviceFrequency: SelectionOption[] = [
  { id: "1", value: "Еднократно" },
  { id: "2", value: "Седмично" },
  { id: "3", value: "Двуседмично" },
];


export const serviceDayChoices: SelectionOption[] = [
  { id: "1", value: "Понеделник" },
  { id: "2", value: "Вторник" },
  { id: "3", value: "Сряда" },
  { id: "4", value: "Четвъртък" },
  { id: "5", value: "Петък" },
  { id: "6", value: "Събота" },
  { id: "7", value: "Неделя" },
];

export const ServiceHourChoices = [
  { id: "1", value: "08:00", daytime: "morning" },
  { id: "2", value: "08:30", daytime: "morning" },
  { id: "3", value: "09:00", daytime: "morning" },
  { id: "4", value: "10:00", daytime: "morning" },
  { id: "5", value: "10:30", daytime: "morning" },
  { id: "6", value: "11:00", daytime: "morning" },
  { id: "7", value: "11:30", daytime: "morning" },
  { id: "8", value: "12:00", daytime: "afternoon" },
  { id: "9", value: "12:30", daytime: "afternoon" },
  { id: "10", value: "13:00", daytime: "afternoon" },
  { id: "11", value: "13:30", daytime: "afternoon" },
  { id: "12", value: "14:00", daytime: "afternoon" },
  { id: "13", value: "14:30", daytime: "afternoon" },
  { id: "14", value: "15:00", daytime: "afternoon" },
  { id: "16", value: "15:30", daytime: "afternoon" },
  { id: "17", value: "16:00", daytime: "afternoon" },
  { id: "18", value: "16:30", daytime: "afternoon" },
  { id: "19", value: "17:00", daytime: "afternoon" },
  { id: "20", value: "17:30", daytime: "afternoon" },
  { id: "21", value: "18:00", daytime: "afternoon" },
];

export const daytime = [
  { id: "1", daytime: "morning" },
  { id: "2", daytime: "morning" },
  { id: "3", daytime: "morning" },
  { id: "4", daytime: "morning" },
  { id: "5", daytime: "morning" },
  { id: "6", daytime: "morning" },
  { id: "7", daytime: "morning" },
  { id: "8", daytime: "morning" },
  { id: "9", daytime: "afternoon" },
  { id: "10", daytime: "afternoon" },
  { id: "11", daytime: "afternoon" },
  { id: "12", daytime: "afternoon" },
  { id: "13", daytime: "afternoon" },
  { id: "14", daytime: "afternoon" },
  { id: "16", daytime: "afternoon" },
  { id: "17", daytime: "afternoon" },
  { id: "18", daytime: "afternoon" },
  { id: "19", daytime: "afternoon" },
  { id: "20", daytime: "afternoon" },
  { id: "21", daytime: "afternoon" },
];


export const districtChoices: SelectionOption[] = [
  { id: "1", value: "Надежда 1" },
  { id: "2", value: "Дружба" },
  { id: "3", value: "Младост 1" },
  { id: "4", value: "Младост 2" },
  { id: "5", value: "Младост 3" },
  { id: "6", value: "Младост 4" },
  { id: "7", value: "Хладилника" },
  { id: "8", value: "Овча Купел" },
  { id: "9", value: "Витоша" },
  { id: "10", value: "Лозенец" },
  { id: "11", value: "Център" },
  { id: "12", value: "Бояна" },
  { id: "13", value: "Надежда 2" },
  { id: "14", value: "Надежда 3" },
  { id: "15", value: "Надежда 4" },
];

export const areaSizeChoices: SelectionOption[] = [
  { id: "1", value: "0" },
  { id: "2", value: "20" },
  { id: "3", value: "40" },
  { id: "4", value: "60" },
  { id: "5", value: "80" },
  { id: "6", value: "100" },
  { id: "7", value: "120" },
  { id: "8", value: "140" },
  { id: "9", value: "160" },
  { id: "10", value: "180" },
  { id: "11", value: "200" },
];
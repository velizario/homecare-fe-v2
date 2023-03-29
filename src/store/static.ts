import { SelectionOption } from "../types/types";

export const serviceTypeChoices = [
    {
      id: "1",
      title: "Почистване на дома",
      description: "Почистване на гъз, глава, и тем подобни",
      img: "https://topmopscleaning.com/wp-content/uploads/2021/04/keeping-a-house-clean.jpeg",
    },
    {
      id: "2",
      title: "Почистване на офиси и магазини",
      description: "Рязане на кабели и промиване с чист спирт",
      img: "https://nswcommercialcleaning.com.au/wp-content/uploads/2018/04/iStock-609094288.jpg",
    },
    {
      id: "3",
      title: "Основно почистване",
      description: "Рязане на кабели и промиване с чист спирт",
      img: "https://cdn-ffokf.nitrocdn.com/LFtvDxXrnvtNThwjbFdxUfsgQYSGUhUB/assets/images/optimized/rev-37403d5/wp-content/uploads/2023/03/house-dusting.png",
    },
    {
      id: "4",
      title: "Следремонтно чистене",
      description: "Рязане на кабели и промиване с чист спирт",
      img: "https://prohousekeepers.com/wp-content/uploads/2019/05/post-construction-cleanup.jpg",
    },
    {
      id: "5",
      title: "Индустриално обслужване",
      description: "Рязане на кабели и промиване с чист спирт",
      img: "https://www.service-techcorp.com/hs-fs/hubfs/Industrial_Cleaning.jpeg?width=863&name=Industrial_Cleaning.jpeg",
    },
    {
      id: "6",
      title: "Пране на мека мебел",
      description: "Почистване на фотьойли и изхвърляне на котки",
      img: "https://media.angi.com/s3fs-public/Man-professionally-cleaning-couch.jpg?impolicy=leadImage",
    },
    {
      id: "7",
      title: "Пране на мокети / килими",
      description: "Рязане на кабели и промиване с чист спирт",
      img: "https://aadvancedcarpetcleaning.com/wp-content/uploads/2021/07/carpet-cleaners.jpg",
    },
    {
      id: "8",
      title: "Почистване на подови настилки",
      description: "Рязане на кабели и промиване с чист спирт",
      img: "https://www.webstaurantstore.com/images/products/large/573058/2253417.jpg",
    },
    {
      id: "9",
      title: "Почистване на прозорци и витрини",
      description: "Рязане на кабели и промиване с чист спирт",
      img: "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/05/featured-image-window-cleaning.jpeg.jpg",
    },
  ];

 
const additionalServiceChoices: Record<string, SelectionOption[]> = {
  "1": [
    { id: "1", name: "Миене на печка" },
    { id: "4", name: "Миене на хладилник" },
    { id: "3", name: "Миене на тераса" },
    { id: "2", name: "Миене на прозорци" },
  ],
  "2": [
    { id: "1", name: "sdasdgasdgasdgasdg" },
    { id: "4", name: "sdasdgasdgasdgasdg" },
    { id: "3", name: "sdasdgasdgasdgasdg" },
    { id: "2", name: "sdasdgasdgasdgasdg" },
  ],
  "3": [
    { id: "1", name: "Миене на печка" },
    { id: "4", name: "Миене на хладилник" },
    { id: "3", name: "Миене на тераса" },
    { id: "2", name: "Миене на прозорци" },
  ],
  "4": [
    { id: "1", name: "Миене на печка" },
    { id: "4", name: "Миене на хладилник" },
    { id: "3", name: "Миене на тераса" },
    { id: "2", name: "Миене на прозорци" },
  ],
  "5": [
    { id: "1", name: "Миене на печка" },
    { id: "4", name: "Миене на хладилник" },
    { id: "3", name: "Миене на тераса" },
    { id: "2", name: "Миене на прозорци" },
  ],
};
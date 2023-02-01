import OrderItem from "./OrderItem";
import classNames from "../../../../helpers/classNames";
import ContextMenu from "../../../../utilityComponents/ContextMenu";
import Filters from "../../../../utilityComponents/Filters";
import { ClipboardDocumentCheckIcon, HomeIcon, UserIcon , MapPinIcon } from "@heroicons/react/24/outline";
import { ChevronRightIcon } from "@heroicons/react/20/solid";


const people = [
  {
    id: 1,
    name: "Lindsay Lohan",
    neighbourhood: "Кръстова Вада",
    services: "основно, гладене, прозорци, баня",
    type: "subscription",
    detals: "Апартамент",
  },
  {
    id: 2,
    name: "Lindsay Walton",
    neighbourhood: "Витоша",
    services: "основно, хладилник",
    type: "onetime",
    detals: "Апартамент",
  },
  {
    id: 3,
    name: "Lindsay Walton",
    neighbourhood: "Младост 4",
    services: "прозорци, баня",
    type: "subscription",
    detals: "Апартамент",
  },
  {
    id: 4,
    name: "Lindа сдфсдsay Walton",
    neighbourhood: "Надежда",
    services: "основно, гладене, прозорци",
    type: "onetime",
    detals: "Апартамент",
  },
  {
    id: 5,
    name: "Lindсд фсадфsay Walton",
    neighbourhood: "Изток",
    services: "основно, гладене",
    type: "onetime",
    detals: "Офис",
  },
  {
    id: 6,
    name: "сдф W alton",
    neighbourhood: "Кръстова Вада",
    services: "основно, прозорци",
    type: "onetime",
    detals: "Апартамент",
  },
  {
    id: 7,
    name: "Lindsay Walton",
    neighbourhood: "Полигона",
    services: "основно, печка",
    type: "subscription",
    detals: "Офис",
  },
  {
    id: 8,
    name: "Lindsay Walton",
    neighbourhood: "Дружба",
    services: "прозорци",
    type: "onetime",
    detals: "Офис",
  },
  {
    id: 9,
    name: "Linds ay Walton",
    neighbourhood: "Лозенец",
    services: "основно, гладене, прозорци",
    type: "subscription",
    detals: "Къща",
  },
  {
    id: 10,
    name: "Lindsay Walton",
    neighbourhood: "Манастирски Ливади",
    services: "основно, гладене, прозорци",
    type: "subscription",
    detals: "Офис",
  },
  {
    id: 11,
    name: "Lindsay Walton",
    neighbourhood: "Бояна",
    services: "основно",
    type: "onetime",
    detals: "Апартамент",
  },
  {
    id: 12,
    name: "Lindsay Walton",
    neighbourhood: "Малинова Долина",
    services: "под, баня",
    type: "onetime",
    detals: "Къща",
  },
  // More people...
];

export default function OrderlistGrid() {
  return (
    <div className="pt-4">
      <p className="sm:col-span-6 text-sm text-gray-500 mb-4">
        Списък със заявени, договорени и изпълнени поръчки.
      </p>
      <Filters />
      {/* Desktop view */}
      <div className="hidden md:flex flex-col gap-4">
        <div className="font-medium grid grid-cols-[1fr,1fr,1rem] md:grid-cols-[2.5rem,1fr,8rem,1fr,1fr,8rem,1.5rem] auto-rows-fr gap-y-10 px-5 rounded-lg h-12 bg-white py-1 ">
          <OrderItem>#</OrderItem>
          <OrderItem>Име</OrderItem>
          <OrderItem>Помещение</OrderItem>
          <OrderItem>Квартал</OrderItem>
          <OrderItem>Услуги</OrderItem>
          <OrderItem>Вид посещение</OrderItem>
        </div>
        {people.map((person) => {
          return (
            <div
              key={person.id}
              className="text-gray-800 grid grid-cols-[1fr,1fr,1.5rem] md:grid-cols-[2.5rem,1fr,8rem,1fr,1fr,8rem,1.5rem] auto-rows-fr gap-y-10 md:px-5 rounded-lg  border border-indigo-100 bg-white py-1 shadow-order transition-shadow hover:shadow-order-hover"
            >
              <OrderItem styles="md:block text-xs text-indigo-500 font-medium cursor-pointer hover:text-indigo-900">
                #{person.id}
              </OrderItem>
              <OrderItem>{person.name}</OrderItem>
              <OrderItem>{person.detals}</OrderItem>
              <OrderItem>{person.neighbourhood}</OrderItem>
              <OrderItem styles="text-xs whitespace-normal line-clamp-3">
                {person.services}
              </OrderItem>
              <OrderItem>
                {
                  <span
                    className={classNames(
                      person.type === "subscription"
                        ? "bg-green-100 text-green-800"
                        : "bg-purple-100 text-purple-800",
                      "inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium"
                    )}
                  >
                    {person.type === "onetime" ? "еднократно" : "абонамент"}
                  </span>
                }
              </OrderItem>
              <ContextMenu />
            </div>
          );
        })}
      </div>

      {/* Mobile view */}
      {/* <div className="flex md:hidden flex-col gap-4 bg-gray-100 -mx-2 ">
        {people.map((person) => {
          return (
            <ul key={person.id} className="bg-white flex [&_li:nth-child(even)]:bg-gray-50 flex-col shadow-md px-2 " >
              <li className="flex justify-between rounded-xl px-2">
                <OrderItem styles="font-medium text-indigo-900 text-lg flex flex-row line-clamp-none [display:flex] items-center gap-1"><UserIcon className="w-6 h-6" /><span>#{person.id}</span></OrderItem>
                <OrderItem styles="bg-green-100 text-green-800 inline-flex items-center rounded-full px-4 text-lg py-1 font-medium -mr-2">Активна</OrderItem> 
              </li>
              <li className="flex justify-between rounded-xl px-2">
                <OrderItem styles="text-gray-500">Клиент</OrderItem>
                <OrderItem styles="font-medium">{person.name}</OrderItem>
              </li>
              <li className="flex justify-between rounded-xl px-2  ">
                <OrderItem styles="text-gray-500">Тип</OrderItem>
                <OrderItem styles="overflow-visible font-medium">{person.type === "onetime" ? "Еднократно" : "Абонамент"}</OrderItem>
              </li>
              <li className="flex justify-between rounded-xl px-2">
                <OrderItem styles="text-gray-500">Квартал</OrderItem>
                <OrderItem styles="font-medium">{person.neighbourhood}</OrderItem>
              </li>
              <li className="flex justify-between rounded-xl px-2">
                <OrderItem styles="text-gray-500">Вид помещение</OrderItem>
                <OrderItem styles="font-medium">{person.detals}</OrderItem>
              </li>
              <li className="group flex justify-between rounded-xl px-2 cursor-pointer">
                <OrderItem styles="text-gray-500">Виж повече</OrderItem>
                <div className="flex gap-1 items-center ">
                  <ChevronRightIcon className="w-10 h-10 text-gray-600 group-hover:text-gray-900 transition-transform group-hover:translate-x-1" />
                </div>
              </li>
            </ul>
          )
        })}
      </div> */}
      {/* mobile list new card */}
      <div className="flex md:hidden flex-col gap-4 bg-gray-100 -mx-2">
        {people.map((person) => {
          return (
            <ul
              key={person.id}
              className="bg-white flex flex-col gap-5 py-5 shadow-md px-4"
            >
              <div className="flex">
                <li className="flex flex-1 gap-2">
                  <UserIcon className="w-5 h-5" />
                  <div className="flex flex-col ">
                    <p className="text-gray-500 text-sm">Клиент</p>
                    <p className="font-medium">{person.name}</p>
                  </div>
                </li>
                <li className="flex flex-1 gap-2">
                  <MapPinIcon className="w-5 h-5" />
                  <div className="flex flex-col ">
                    <p className="text-gray-500 text-sm">Квартал</p>
                    <p className="font-medium">
                      {person.neighbourhood}
                    </p>
                  </div>
                </li>
                {/* <p className="mr-3">#{person.id}</p> */}
              </div>
              {/* <div className="flex">
              </div> */}
              <div className="flex">
                <li className="flex flex-1 gap-2">
                  <ClipboardDocumentCheckIcon className="w-5 h-5" />
                  <div className="flex flex-col ">
                    <p className="text-gray-500 text-sm">Тип</p>
                    <p className="overflow-visible font-medium">
                      {person.type === "onetime" ? "Еднократно" : "Абонамент"}
                    </p>
                  </div>
                </li>
                <li className="flex flex-1 gap-2">
                  <HomeIcon className="w-5 h-5" />
                  <div className="flex flex-col ">
                    <p className="text-gray-500 text-sm">Вид помещение</p>
                    <p className="font-medium">{person.detals}</p>
                  </div>
                </li>
              </div>
              <div className="flex justify-between items-center">
                <li className="flex flex-col flex-1">
                  <p className="bg-green-100 ml-7 text-green-600 self-start items-center rounded-md px-3 py-0.5 font-medium">
                    Активна
                  </p>
                </li>
                <ChevronRightIcon className="w-10 h-10 text-gray-800" />
              </div>
            </ul>
          );
        })}
      </div>
    </div>
  );
}

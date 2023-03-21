import OrderItem from "./OrderItem";
import classNames from "../../../../helpers/classNames";
import ContextMenu from "../../../../utilityComponents/ContextMenu";
import Filters from "../../../../utilityComponents/Filters";
import { ClipboardDocumentCheckIcon, HomeIcon, UserIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { useEffect } from "react";
import { getAllOrders, getOrder } from "../../../../model/orderModel";
import { orderState } from "../../../../store/orderState";
import { areaSizes, orderFrequency, OrderStatus, services } from "../../../../types/types";
import { userState } from "../../../../store/userState";

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
  const [orderData, setOrderData] = orderState((state) => [state.orderData, state.setOrderData]);
  const [userRoles] = userState((state) => [state.userData.roles]);
  const fetchOrders = async () => {
    // const order = await getOrder("4");
    const orders = await getAllOrders();
    if (orders) setOrderData(orders);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="pt-4">
      <p className="mb-4 text-sm text-gray-500 sm:col-span-6">Списък със заявени, договорени и изпълнени поръчки.</p>
      {orderData.length > 0 && (
        <>
          <Filters />
          {/* Desktop view */}
          <div className="hidden flex-col gap-4 md:flex">
            <div className="grid h-12 auto-rows-fr grid-cols-[1fr,1fr,1rem] gap-y-10 rounded-lg bg-white px-5 py-1 font-medium md:grid-cols-[2.5rem,1fr,8rem,1fr,1fr,8rem,1.5rem] ">
              <OrderItem>#</OrderItem>
              <OrderItem>Име</OrderItem>
              <OrderItem>Размер на помещение</OrderItem>
              <OrderItem>Квартал</OrderItem>
              <OrderItem>Услуга</OrderItem>
              <OrderItem>Честота</OrderItem>
            </div>
            {orderData.sort((a, b) => Number(b.id) - Number(a.id)).map((order) => {
              return (
                <div
                  key={order.id}
                  className="grid auto-rows-fr grid-cols-[1fr,1fr,1.5rem] gap-y-10 rounded-lg border border-indigo-100 bg-white  py-1 text-gray-800 shadow-order transition-shadow hover:shadow-order-hover md:grid-cols-[2.5rem,1fr,8rem,1fr,1fr,8rem,1.5rem] md:px-5"
                >
                  <OrderItem styles="md:block text-xs text-indigo-500 font-medium cursor-pointer hover:text-indigo-900">
                    #{order.id}
                  </OrderItem>
                  <OrderItem>{userRoles.includes(1) ? order.clientName : order.vendorName}</OrderItem>
                  <OrderItem>{areaSizes.get(order.areaSize)}</OrderItem>
                  <OrderItem>{OrderStatus.get(order.status?.toString())}</OrderItem>
                  <OrderItem styles="text-xs whitespace-normal line-clamp-3">{services.get(order.service)}</OrderItem>
                  <OrderItem>
                    {
                      <span
                        className={classNames(
                          order.frequency === "subscription"
                            ? "bg-green-100 text-green-800"
                            : "bg-purple-100 text-purple-800",
                          "inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium"
                        )}
                      >
                        {orderFrequency.get(order.frequency.toString())}
                      </span>
                    }
                  </OrderItem>
                  <ContextMenu orderId={order.id} />
                </div>
              );
            })}
          </div>

          {/* Mobile view */}
          {/* <div className="flex md:hidden flex-col gap-4 bg-gray-100 -mx-2 ">
        {people.map((order) => {
          return (
            <ul key={order.id} className="bg-white flex [&_li:nth-child(even)]:bg-gray-50 flex-col shadow-md px-2 " >
              <li className="flex justify-between rounded-xl px-2">
                <OrderItem styles="font-medium text-indigo-900 text-lg flex flex-row line-clamp-none [display:flex] items-center gap-1"><UserIcon className="w-6 h-6" /><span>#{order.id}</span></OrderItem>
                <OrderItem styles="bg-green-100 text-green-800 inline-flex items-center rounded-full px-4 text-lg py-1 font-medium -mr-2">Активна</OrderItem> 
              </li>
              <li className="flex justify-between rounded-xl px-2">
                <OrderItem styles="text-gray-500">Клиент</OrderItem>
                <OrderItem styles="font-medium">{order.name}</OrderItem>
              </li>
              <li className="flex justify-between rounded-xl px-2  ">
                <OrderItem styles="text-gray-500">Тип</OrderItem>
                <OrderItem styles="overflow-visible font-medium">{order.type === "onetime" ? "Еднократно" : "Абонамент"}</OrderItem>
              </li>
              <li className="flex justify-between rounded-xl px-2">
                <OrderItem styles="text-gray-500">Квартал</OrderItem>
                <OrderItem styles="font-medium">{order.neighbourhood}</OrderItem>
              </li>
              <li className="flex justify-between rounded-xl px-2">
                <OrderItem styles="text-gray-500">Вид помещение</OrderItem>
                <OrderItem styles="font-medium">{order.detals}</OrderItem>
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
          <div className="-mx-2 flex flex-col gap-4 bg-gray-100 md:hidden">
            {people.map((order) => {
              return (
                <ul key={order.id} className="flex flex-col gap-5 bg-white py-5 px-4 shadow-md">
                  <div className="flex">
                    <li className="flex flex-1 gap-2">
                      <UserIcon className="h-5 w-5" />
                      <div className="flex flex-col ">
                        <p className="text-sm text-gray-500">Клиент</p>
                        <p className="font-medium">{order.name}</p>
                      </div>
                    </li>
                    <li className="flex flex-1 gap-2">
                      <MapPinIcon className="h-5 w-5" />
                      <div className="flex flex-col ">
                        <p className="text-sm text-gray-500">Квартал</p>
                        <p className="font-medium">{order.neighbourhood}</p>
                      </div>
                    </li>
                    {/* <p className="mr-3">#{order.id}</p> */}
                  </div>
                  {/* <div className="flex">
              </div> */}
                  <div className="flex">
                    <li className="flex flex-1 gap-2">
                      <ClipboardDocumentCheckIcon className="h-5 w-5" />
                      <div className="flex flex-col ">
                        <p className="text-sm text-gray-500">Тип</p>
                        <p className="overflow-visible font-medium">
                          {order.type === "onetime" ? "Еднократно" : "Абонамент"}
                        </p>
                      </div>
                    </li>
                    <li className="flex flex-1 gap-2">
                      <HomeIcon className="h-5 w-5" />
                      <div className="flex flex-col ">
                        <p className="text-sm text-gray-500">Размер на помещение</p>
                        <p className="font-medium">{order.detals}</p>
                      </div>
                    </li>
                  </div>
                  <div className="flex items-center justify-between">
                    <li className="flex flex-1 flex-col">
                      <p className="ml-7 items-center self-start rounded-md bg-green-100 px-3 py-0.5 font-medium text-green-600">
                        Активна
                      </p>
                    </li>
                    <ChevronRightIcon className="h-10 w-10 text-gray-800" />
                  </div>
                </ul>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

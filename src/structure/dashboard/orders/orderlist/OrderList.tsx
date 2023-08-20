import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { ClipboardDocumentCheckIcon, HomeIcon, MapPinIcon, UserIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { createFullName, sortObjArrDesc } from "../../../../helpers/helperFunctions";
import { fetchOrderState } from "../../../../model/orderModel";
import { orderState } from "../../../../store/orderState";
import { userState } from "../../../../store/userState";
import { Order } from "../../../../types/types";
import ContextMenu from "../../../../utilityComponents/ContextMenu";
import Filters from "../../../../utilityComponents/Filters";
import OrderItem from "./OrderItem";

export default function OrderList() {
  const [orderData] = orderState((state) => [state.orderData]);
  const [userRoles] = userState((state) => [state.userData.roles]);


  useEffect(() => {
    fetchOrderState();
  }, []);

  return (
    <div className="pt-4">
      {orderData.length > 0 && (
        <>
          <p className="mb-4 text-sm text-gray-500 sm:col-span-6">
            Списък със заявени, договорени и изпълнени поръчки.
          </p>
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
            {sortObjArrDesc(orderData).map((order: Order) => {
              return (
                <div
                  key={order.id}
                  className="grid auto-rows-fr grid-cols-[1fr,1fr,1.5rem] gap-y-10 rounded-lg border border-indigo-100 bg-white  py-1 text-gray-800 shadow-order transition-shadow hover:shadow-order-hover md:grid-cols-[2.5rem,1fr,8rem,1fr,1fr,8rem,1.5rem] md:px-5"
                >
                  <OrderItem styles="md:block text-xs text-indigo-500 font-medium cursor-pointer hover:text-indigo-900">
                    #{order.id}
                  </OrderItem>
                  <OrderItem>{createFullName(userRoles.includes(1) ? order.client.user : order.vendor.user)}</OrderItem>
                  <OrderItem>{order.estateSize.value}</OrderItem>
                  <OrderItem>{order.orderStatus.value}</OrderItem>
                  <OrderItem styles="text-xs whitespace-normal line-clamp-3">{order.serviceType.value}</OrderItem>
                  <OrderItem>
                    {
                      <span className="inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium">
                        {order.visitFrequency.value}
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
            {orderData.map((order: Order) => {
              return (
                <ul key={order.id} className="flex flex-col gap-5 bg-white py-5 px-4 shadow-md">
                  <div className="flex">
                    <li className="flex flex-1 gap-2">
                      <UserIcon className="h-5 w-5" />
                      <div className="flex flex-col ">
                        <p className="text-sm text-gray-500">Клиент</p>
                        <p className="font-medium">{createFullName(userRoles.includes(1) ? order.client.user : order.vendor.user)}</p>
                      </div>
                    </li>
                    <li className="flex flex-1 gap-2">
                      <MapPinIcon className="h-5 w-5" />
                      <div className="flex flex-col ">
                        <p className="text-sm text-gray-500">Квартал</p>
                        <p className="font-medium">{order.districtName.value}</p>
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
                        <p className="overflow-visible font-medium">{order.visitFrequency.value}</p>
                      </div>
                    </li>
                    <li className="flex flex-1 gap-2">
                      <HomeIcon className="h-5 w-5" />
                      <div className="flex flex-col ">
                        <p className="text-sm text-gray-500">Размер на помещение</p>
                        <p className="font-medium">{order.estateSize.value}</p>
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

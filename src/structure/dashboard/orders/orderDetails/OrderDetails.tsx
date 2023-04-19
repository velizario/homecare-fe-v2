import { Transition } from "@headlessui/react";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format, parseJSON } from "date-fns";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classNames from "../../../../helpers/classNames";
import { BACKEND_URL } from "../../../../helpers/envVariables";
import { createFullName } from "../../../../helpers/helperFunctions";
import { addOrderComment, getOrder, updateOrder } from "../../../../model/orderModel";
import { essentialsStore } from "../../../../store/essentialsStore";
import {
  estateSizeSelections,
  hourDaySelections,
  visitFrequencySelections,
  weekDaySelections,
} from "../../../../store/static";
import { userState } from "../../../../store/userState";
import { Order, ORDER_STATUS, SelectionOption } from "../../../../types/types";
import ComboSingleSelect from "../../../../utilityComponents/ComboSingleSelect";
import StatusBadge from "../../../../utilityComponents/StatusBadge";
import { toasted } from "../../../../utilityComponents/Toast";
import SelectionDropdown from "./SelectionDropdown";
import OrderComments from "./OrderComments";
import OrderTimeline from "./OrderTimeline";

const attachments = [
  { name: "resume_front_end_developer.pdf", href: "#" },
  { name: "coverletter_front_end_developer.pdf", href: "#" },
];

type OrderDetailsProps = {
  //   isShowing: boolean;
};

export default function OrderDetails({}: OrderDetailsProps) {
  const { orderId } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [orderDataChanged, setOrderDataChanged] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState<SelectionOption | null>(null);
  const [selectedEstateSize, setSelectedEstateSize] = useState<SelectionOption | null>(null);
  const [selectedAdditionalInfo, setSelectedAdditionalInfo] = useState<string | null>(null);
  const [selectedVisitFrequency, setSelectedVisitFrequency] = useState<SelectionOption | null>(null);
  const [selectedVisitDay, setSelectedVisitDay] = useState<SelectionOption | null>(null);
  const [selectedVisitHour, setSelectedVisitHour] = useState<SelectionOption | null>(null);
  const [districtNames] = essentialsStore((essentials) => [essentials.districtNames]);
  const [userData] = userState((state) => [state.userData]);
  const queryClient = useQueryClient();

  const isVendor = Boolean(userData.vendorId);

  const setInitialFormValues = (data: Order) => {
    setSelectedDistrict(data.districtName || null);
    setSelectedEstateSize(data.estateSize || null);
    setSelectedVisitFrequency(data.visitFrequency || null);
    setSelectedAdditionalInfo(data.additionalInfo || null);
    setSelectedVisitDay(data.visitDay || null);
    setSelectedVisitHour(data.visitHour || null);
  };

  const handleOrderUpdate = async () => {
    const updatedOrder = {
      ...orderData,
      districtName: selectedDistrict,
      estateSize: selectedEstateSize,
      visitFrequency: selectedVisitFrequency,
      visitDay: selectedVisitDay,
      visitHour: selectedVisitHour,
      additionalInfo: selectedAdditionalInfo,
    };
    updateOrderMutation.mutate(updatedOrder);
  };

  const {
    data: orderData,
    error,
    status: orderDataIn,
  } = useQuery({
    queryKey: ["orders", orderId],
    queryFn: () => getOrder(orderId as string),
    onSuccess: setInitialFormValues,
  });

  const addCommentMutation = useMutation({
    mutationFn: addOrderComment,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["orders", orderId], { exact: true });
      queryClient.setQueryData(["orders", orderId], (oldData: Order | undefined) => {
        if (!oldData) return oldData;
        const { orderComment } = oldData;
        orderComment.push({ ...data, user: userData });
        return { ...oldData, orderComment };
      });
    },
  });

  const updateOrderMutation = useMutation({
    mutationFn: updateOrder,
    onSuccess: (data) => {
      console.log(data);
      queryClient.setQueryData(["orders", orderId], data);
      queryClient.invalidateQueries(["orders", orderId], { exact: true });
      setEditMode(false);
      setOrderDataChanged(false);
      console.log("Edit mode disabled");
      toasted("Информацията е променена успешно.");
      // invalidation doesnt work for some reason witht he history property and OrderTimeline component
    },
  });

  const addComment = async (commentText: string) => {
    const orderComment = { user: { id: userData.id }, comment: commentText, order: { id: orderId } };
    addCommentMutation.mutate(orderComment);
  };

  const toggleEditMode = () => {
    setEditMode((mode) => !mode);
  };

  useEffect(() => {
    console.log(editMode);
  }, [editMode]);

  useEffect(() => {
    const isChanged =
      selectedDistrict?.value !== orderData?.districtName.value ||
      selectedEstateSize?.value !== orderData?.estateSize.value ||
      selectedVisitFrequency?.value !== orderData?.visitFrequency.value ||
      selectedAdditionalInfo !== orderData?.additionalInfo ||
      selectedVisitDay !== orderData?.visitDay ||
      selectedVisitHour !== orderData?.visitHour;
    setOrderDataChanged(isChanged);
    console.log("is changed? ", isChanged);
  }, [
    selectedDistrict,
    selectedEstateSize,
    selectedVisitFrequency,
    selectedAdditionalInfo,
    selectedVisitDay,
    selectedVisitHour,
  ]);

  //   TODO: Order should be reported differently whether it is looked by vendor or user
  return (
    <div className="min-h-screen">
      <Transition
        appear={true}
        show={true}
        enter="transition-opacity duration-150"
        enterFrom="opacity-0 translate-x-full"
        enterTo="opacity-100 translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leaveFrom="opacity-100 translate-x-0"
        leaveTo="opacity-0 translate-x-full"
      >
        {orderDataIn === "success" && (
          <div className="min-h-full">
            <main className="py-10">
              {/* Page header */}
              <div className="mx-auto max-w-3xl px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 xl:max-w-7xl xl:px-8">
                <div className="flex items-center space-x-5">
                  <div>
                    <div className="text-2xl font-bold text-gray-900 ">{orderData.serviceType.value}</div>
                    <p className="mt-2 block text-sm font-medium leading-6 text-gray-900">
                      Създадена:{" "}
                      <time dateTime={orderData.createdAt} className="whitespace-nowrap">
                        {format(parseJSON(orderData.createdAt), "dd MMM yyyy")}
                      </time>
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      orderDataChanged ? handleOrderUpdate() : toggleEditMode();
                    }}
                    className={classNames(
                      "mt-4 inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 md:mt-0",
                      orderData.orderStatus.id === ORDER_STATUS.CANCELLED
                        ? "pointer-events-none text-gray-400"
                        : orderDataChanged
                        ? "cursor-pointer bg-blue-600 text-white hover:bg-blue-500"
                        : "text-gray-900 shadow-sm"
                    )}
                  >
                    {`${orderDataChanged ? "Запиши промените" : "Редактирай"}`}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      orderDataChanged ? handleOrderUpdate() : toggleEditMode();
                    }}
                    className={classNames(
                      "mt-4 inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 md:mt-0",
                      orderData.orderStatus.id === ORDER_STATUS.CANCELLED
                        ? "pointer-events-none text-gray-400"
                        : "cursor-pointer bg-blue-600 text-white hover:bg-blue-500"
                    )}
                  >
                    Потвърди и изпрати
                  </button>
                </div>
              </div>

              <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 xl:max-w-7xl xl:grid-flow-col-dense xl:grid-cols-3">
                <div className="space-y-6 xl:col-span-2 xl:col-start-1">
                  {/* Description list*/}
                  <section aria-labelledby="applicant-information-title">
                    <div className="bg-white shadow sm:rounded-lg">
                      <div className="flex  flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6">
                        <div className="flex items-center space-x-5">
                          <div className="flex-shrink-0">
                            <div className="relative">
                              <img
                                className="h-16 w-16 rounded-full"
                                src={`${BACKEND_URL}/users/public/${
                                  orderData.vendor.user.imageUrl || "defaultImage.png"
                                }`}
                                alt=""
                              />
                              <span className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true" />
                            </div>
                          </div>
                          <div>
                            <h1 className="text-lg font-semibold text-gray-900">
                              {createFullName(orderData.vendor.user)}
                            </h1>
                          </div>
                        </div>
                        <StatusBadge label="Нова">{orderData.orderStatus.value}</StatusBadge>
                      </div>
                      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                        <dl className="grid grid-cols-1  gap-x-4 gap-y-8 sm:grid-cols-[5fr_3fr]">
                          <div className="sm:col-span-1">
                            <dt className="block text-sm font-medium leading-6 text-gray-900">Услуга</dt>
                            <dd className="mt-1 text-base font-semibold text-gray-900">
                              <p className="w-full rounded-md border-0 bg-gray-50 py-1.5 pl-3 pr-10 text-gray-600  sm:text-sm sm:leading-6">
                                {orderData.serviceType.value}
                              </p>
                            </dd>
                          </div>
                          <div className="sm:col-span-1">
                            <dt className="block text-sm font-medium leading-6 text-gray-900">Честота</dt>
                            <dd className="mt-1 text-base font-semibold text-gray-900">
                              <ComboSingleSelect
                                disabled={!editMode}
                                selections={visitFrequencySelections}
                                selected={selectedVisitFrequency}
                                setSelected={setSelectedVisitFrequency}
                              />
                            </dd>
                          </div>
                          <div className="sm:col-span-1">
                            <dt className="block text-sm font-medium leading-6 text-gray-900">Ден</dt>
                            <dd className="mt-1 text-base font-semibold text-gray-900">
                              <SelectionDropdown
                                selections={weekDaySelections}
                                disabled={!editMode}
                                selected={selectedVisitDay}
                                validOptions={orderData.clientDayChoice}
                                setSelected={setSelectedVisitDay}
                                selectClass="daySelect"
                              />
                            </dd>
                          </div>
                          <div className="sm:col-span-1">
                            <dt className="block text-sm font-medium leading-6 text-gray-900">Час</dt>
                            <dd className="mt-1 text-base font-semibold text-gray-900">
                              <SelectionDropdown
                                selections={hourDaySelections}
                                disabled={!editMode}
                                selected={selectedVisitHour}
                                validOptions={orderData.clientHourChoice}
                                setSelected={setSelectedVisitHour}
                                selectClass="hourSelect"
                              />
                            </dd>
                          </div>
                          <div className="sm:col-span-1">
                            <dt className="block text-sm font-medium leading-6 text-gray-900">Квартал</dt>
                            <dd className="mt-1 text-base font-semibold text-gray-900">
                              <ComboSingleSelect
                                disabled={!editMode}
                                selections={districtNames}
                                selected={selectedDistrict}
                                setSelected={setSelectedDistrict}
                              />
                            </dd>
                          </div>
                          <div className="sm:col-span-1">
                            <dt className="block text-sm font-medium leading-6 text-gray-900">Размер, кв.м.</dt>
                            <dd className="mt-1 text-base font-semibold text-gray-900">
                              <ComboSingleSelect
                                disabled={!editMode}
                                selections={estateSizeSelections}
                                selected={selectedEstateSize}
                                setSelected={setSelectedEstateSize}
                              />
                            </dd>
                          </div>
                          <div className="sm:col-span-2">
                            <dt className="block text-sm font-medium leading-6 text-gray-900">
                              Допълнителна информация
                            </dt>
                            <textarea
                              id="comment"
                              name="comment"
                              rows={3}
                              disabled={!editMode}
                              className={classNames(
                                !editMode
                                  ? "bg-gray-50 text-gray-600"
                                  : "bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600",
                                "w-full rounded-md border-0 py-1.5 pl-3 pr-10  sm:text-sm sm:leading-6"
                              )}
                              // className="block w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:py-1.5 sm:text-sm sm:leading-6"
                              placeholder={`${editMode ? "Добави коментар" : ""}`}
                              value={selectedAdditionalInfo || ""}
                              onChange={(e) => setSelectedAdditionalInfo(e.target.value)}
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <dt className="block text-sm font-medium leading-6 text-gray-900">Прикачени файлове</dt>
                            <dd className="mt-1 text-base font-semibold text-gray-900">
                              <ul role="list" className="divide-y divide-gray-200 rounded-md border border-gray-200">
                                {attachments.map((attachment) => (
                                  <li
                                    key={attachment.name}
                                    className="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
                                  >
                                    <div className="flex w-0 flex-1 items-center">
                                      <PaperClipIcon
                                        className="h-5 w-5 flex-shrink-0 text-gray-400"
                                        aria-hidden="true"
                                      />
                                      <span className="ml-2 w-0 flex-1 truncate">{attachment.name}</span>
                                    </div>
                                    <div className="ml-4 flex-shrink-0">
                                      <a
                                        href={attachment.href}
                                        className="font-medium text-blue-600 hover:text-blue-500"
                                      >
                                        Изтегли
                                      </a>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </dd>
                          </div>
                        </dl>
                      </div>
                      <div>
                        <a
                          onClick={handleOrderUpdate}
                          className={classNames(
                            "block px-4 py-4 text-center text-sm font-medium sm:rounded-b-lg",
                            orderDataChanged
                              ? "cursor-pointer bg-blue-600 text-white hover:bg-blue-500"
                              : editMode
                              ? "pointer-events-none bg-gray-50 text-gray-500"
                              : "hidden"
                          )}
                        >
                          Запиши промените
                        </a>
                      </div>
                    </div>
                  </section>
                  <OrderComments orderComment={orderData.orderComment} addComment={addComment} />
                </div>
                <OrderTimeline orderHistory={orderData.orderHistory} />
              </div>
            </main>
          </div>
        )}
      </Transition>
    </div>
  );
}

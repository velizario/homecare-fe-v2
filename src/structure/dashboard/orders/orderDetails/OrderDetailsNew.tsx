import { Transition } from "@headlessui/react";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format, parseJSON } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import classNames from "../../../../helpers/classNames";
import { BACKEND_URL } from "../../../../helpers/envVariables";
import { createFullName } from "../../../../helpers/helperFunctions";
import { addOrderComment, changeOrderStatus, getOrder, updateOrder } from "../../../../model/orderModel";
import { essentialsStore } from "../../../../store/essentialsStore";
import { estateSizeSelections, hourDaySelections, visitFrequencySelections, weekDaySelections } from "../../../../store/static";
import { userState } from "../../../../store/userState";
import { Order, ORDER_STATUS, SelectionOption } from "../../../../types/types";
import CustomButton from "../../../../utilityComponents/CustomButton";
import ComboSingleSelectOld from "../../../../utilityComponents/ComboSingleSelectOld";
import Modal from "../../../../utilityComponents/Modal";
import StatusBadge from "../../../../utilityComponents/StatusBadge";
import { toasted } from "../../../../utilityComponents/Toast";
import OrderComments from "./OrderComments";
import OrderTimeline from "./OrderTimeline";
import SelectionDropdown from "./SelectionDropdown";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ComboSingleSelect from "../../../../utilityComponents/ComboSingleSelect";
import DropdownSingleSelect from "../../../../utilityComponents/DropdownSingleSelect";

// const handleOrderUpdate = async () => {
//   const updatedOrder = {
//     id: Number(orderId),
//     districtName: selectedDistrict,
//     estateSize: selectedEstateSize,
//     visitFrequency: selectedVisitFrequency,
//     visitDay: selectedVisitDay,
//     visitHour: selectedVisitHour,
//     additionalInfo: selectedAdditionalInfo,
//   };
//   updateOrderMutation.mutate(updatedOrder);
// };

const formTemplate = {
  visitFrequency: { name: "visitFrequency", label: "Честота" },
  districtName: { name: "districtName", label: "Район" },
  estateSize: { name: "estateSize", label: "Площ на имота, кв.м." },
  visitDay: { name: "visitDay", label: "Ден на посещение" },
  visitHour: { name: "visitHour", label: "Час на посещение" },
  additionalInfo: { name: "additionalInfo", label: "Допълнителна информация" },
};

const attachments = [
  { name: "resume_front_end_developer.pdf", href: "#" },
  { name: "coverletter_front_end_developer.pdf", href: "#" },
];

type OrderDetailsProps = {
  //   isShowing: boolean;
};

export default function OrderDetails({}: OrderDetailsProps) {
  // TODO: handle wrong params for order - fetch order and return error if not found
  // TODO see how I can optimize the page with useReducer
  const { orderId } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  // const [selectedDistrict, setSelectedDistrict] = useState<SelectionOption | null>(null);
  // const [selectedEstateSize, setSelectedEstateSize] = useState<SelectionOption | null>(null);
  // const [selectedAdditionalInfo, setSelectedAdditionalInfo] = useState<string | null>(null);
  // const [selectedVisitFrequency, setSelectedVisitFrequency] = useState<SelectionOption | null>(null);
  // const [selectedVisitDay, setSelectedVisitDay] = useState<SelectionOption | null>(null);
  // const [selectedVisitHour, setSelectedVisitHour] = useState<SelectionOption | null>(null);
  const [districtNames] = essentialsStore((essentials) => [essentials.districtNames]);
  // TODO I might not need userData if I pull the order details together with the user data from the BE
  const [userData] = userState((state) => [state.userData]);
  const queryClient = useQueryClient();
  const orderDataRef = useRef<HTMLDivElement>(null);

  // const setInitialFormValues = (data: Order) => {
  //   setSelectedDistrict(data.districtName || null);
  //   setSelectedEstateSize(data.estateSize || null);
  //   setSelectedVisitFrequency(data.visitFrequency || null);
  //   setSelectedAdditionalInfo(data.additionalInfo || null);
  //   setSelectedVisitDay(data.visitDay || null);
  //   setSelectedVisitHour(data.visitHour || null);
  // };

  const {
    data: orderData,
    error,
    status: orderDataIn,
  } = useQuery({
    queryKey: ["orders", orderId],
    queryFn: () => getOrder(orderId as string),
    // onSuccess: setInitialFormValues,
  });

  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = useForm<Order>({
    // resolver: zodResolver(ValidationSchema),
    defaultValues: {},
    values: orderData,
  });

  const addCommentMutation = useMutation({
    mutationFn: addOrderComment,
    onSuccess: (newComment) => {
      queryClient.setQueryData(["orders", orderId], (oldData: Order | undefined) => {
        if (!oldData) return;
        const { orderComment } = oldData;
        orderComment.push({ ...newComment, user: userData });
        return { ...oldData, orderComment };
        // return { ...oldData, orderComment : [...oldData.orderComment, {...newComment, user: userData}] };
      });
      queryClient.invalidateQueries(["orders", orderId], { exact: true });
    },
  });

  const addComment = async (commentText: string) => {
    const orderComment = { user: { id: userData.id }, comment: commentText, order: { id: orderId } };
    addCommentMutation.mutate(orderComment);
  };

  const updateOrderMutation = useMutation({
    mutationFn: updateOrder,
    onSuccess: (data) => {
      queryClient.setQueryData(["orders", orderId], data);
      queryClient.invalidateQueries(["orders", orderId], { exact: true });
      setEditMode(false);
      // setOrderDataChanged(false);
      toasted("Информацията е променена успешно.");
    },
  });

  const changeStatusMutation = useMutation({
    mutationFn: changeOrderStatus,
    onSuccess: (data) => {
      console.log("changed order", data);
      queryClient.setQueryData(["orders", orderId], data);
      // queryClient.invalidateQueries(["orders", orderId], { exact: true });
      toasted("Статусът на поръчката е променен успешно.");
    },
  });

  const changeStatus = (newStatus: ORDER_STATUS) => {
    if (!orderId) return;
    changeStatusMutation.mutate({ orderId: Number(orderId), newStatus: newStatus });
  };

  const toggleEditMode = () => {
    setEditMode((mode) => {
      if (!mode) orderDataRef.current?.scrollIntoView({ behavior: "smooth" });
      return !mode;
    });
  };

  // useEffect(() => {
  //   const isChanged =
  //     selectedDistrict?.value !== orderData?.districtName.value ||
  //     selectedEstateSize?.value !== orderData?.estateSize.value ||
  //     selectedVisitFrequency?.value !== orderData?.visitFrequency.value ||
  //     selectedAdditionalInfo !== orderData?.additionalInfo ||
  //     selectedVisitDay !== orderData?.visitDay ||
  //     selectedVisitHour !== orderData?.visitHour;
  //   setOrderDataChanged(isChanged);
  // }, [selectedDistrict, selectedEstateSize, selectedVisitFrequency, selectedAdditionalInfo, selectedVisitDay, selectedVisitHour]);

  //   TODO: Order should be reported differently whether it is looked by vendor or user
  return (
    <form className="min-h-screen">
      <Modal
        messageType="info"
        title={orderData?.orderStatusId === ORDER_STATUS.RESERVATION ? "Потвърждение на резервация" : "Изпращане оферта към клиента"}
        description={
          "bla"
          // TODO implement validation and here we would have error state to use
          // selectedVisitDay && selectedVisitHour
          //   ? orderData?.orderStatusId === ORDER_STATUS.RESERVATION
          //     ? "След потвърждаване на резервацията, започва изпълнението на поръчката според уговорените условия."
          //     : "След потвърждаване, офертата ще бъде изпратена към клиента за одобрение."
          //   : "Попълнете всички данни за да изпратим конкретно предложение към клиента"
        }
        // btnAckText={selectedVisitDay && selectedVisitHour ? "Потвърди" : undefined}
        btnCloseText="Затвори"
        confirmAction={() => changeStatus(orderData?.orderStatusId === ORDER_STATUS.RESERVATION ? ORDER_STATUS.ACTIVE : ORDER_STATUS.OFFER)}
        isOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
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
                  {/* send button for vendors */}

                  <CustomButton
                    category={"primary"}
                    disabled={
                      orderData.orderStatus.id === ORDER_STATUS.CANCELLED ||
                      orderData.orderStatus.id === ORDER_STATUS.OFFER ||
                      orderData.orderStatus.id === ORDER_STATUS.ACTIVE ||
                      editMode
                    }
                    onClick={() => setModalOpen(true)}
                  >
                    {orderData.orderStatusId === ORDER_STATUS.RESERVATION ? "Потвърди резервация" : "Изпрати оферта"}
                  </CustomButton>

                  <CustomButton
                    category={isDirty ? "primary" : "secondary"}
                    disabled={orderData.orderStatus.id === ORDER_STATUS.CANCELLED || orderData.orderStatus.id === ORDER_STATUS.ACTIVE}
                    onClick={() => {
                      isDirty ? handleSubmit((formData) => updateOrderMutation.mutate(formData)) : toggleEditMode();
                    }}
                  >
                    {`${isDirty ? "Запиши промените" : "Редактирай"}`}
                  </CustomButton>
                </div>
              </div>

              <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 xl:max-w-7xl xl:grid-flow-col-dense xl:grid-cols-3">
                <div className="space-y-6 xl:col-span-2 xl:col-start-1">
                  {/* Description list*/}
                  <section aria-labelledby="applicant-information-title">
                    <div className="bg-white shadow sm:rounded-lg">
                      <div ref={orderDataRef} className="flex flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6">
                        <div className="flex items-center space-x-5">
                          <div className="flex-shrink-0">
                            <div className="relative">
                              <img
                                className="h-16 w-16 rounded-full"
                                src={`${BACKEND_URL}/users/public/${orderData.vendor.user.imageUrl || "defaultImage.png"}`}
                                alt=""
                              />
                              <span className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true" />
                            </div>
                          </div>
                          <div>
                            <h1 className="text-lg font-semibold text-gray-900">{createFullName(orderData.vendor.user)}</h1>
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
                              <DropdownSingleSelect
                                {...formTemplate.visitFrequency}
                                disabled={!editMode}
                                options={visitFrequencySelections}
                                control={control}
                              />
                            </dd>
                          </div>
                          <div className="sm:col-span-1">
                            <dt className="block text-sm font-medium leading-6 text-gray-900">Ден</dt>
                            <dd className="mt-1 text-base font-semibold text-gray-900">
                              <DropdownSingleSelect
                                {...formTemplate.visitDay}
                                validOptions={orderData.clientDayChoice}
                                disabled={!editMode}
                                options={weekDaySelections}
                                control={control}
                              />
                            </dd>
                          </div>
                          <div className="sm:col-span-1">
                            <dt className="block text-sm font-medium leading-6 text-gray-900">Час</dt>
                            <dd className="mt-1 text-base font-semibold text-gray-900">
                              <DropdownSingleSelect
                                {...formTemplate.visitHour}
                                validOptions={orderData.clientHourChoice}
                                disabled={!editMode}
                                options={hourDaySelections}
                                control={control}
                              />
                            </dd>
                          </div>
                          <div className="sm:col-span-1">
                            <dt className="block text-sm font-medium leading-6 text-gray-900">Квартал</dt>
                            <dd className="mt-1 text-base font-semibold text-gray-900">
                              <ComboSingleSelect {...formTemplate.districtName} disabled={!editMode} options={districtNames} control={control} />
                            </dd>
                          </div>
                          <div className="sm:col-span-1">
                            <dt className="block text-sm font-medium leading-6 text-gray-900">Размер, кв.м.</dt>
                            <dd className="mt-1 text-base font-semibold text-gray-900">
                              <ComboSingleSelect {...formTemplate.estateSize} disabled={!editMode} options={estateSizeSelections} control={control} />
                            </dd>
                          </div>
                          <div className="sm:col-span-2">
                            <dt className="block text-sm font-medium leading-6 text-gray-900">Допълнителна информация</dt>
                            <textarea
                              id="comment"
                              {...register("additionalInfo")}
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
                              // value={selectedAdditionalInfo || ""}
                              // onChange={(e) => setSelectedAdditionalInfo(e.target.value)}
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <dt className="block text-sm font-medium leading-6 text-gray-900">Прикачени файлове</dt>
                            <dd className="mt-1 text-base font-semibold text-gray-900">
                              <ul role="list" className="divide-y divide-gray-200 rounded-md border border-gray-200">
                                {attachments.map((attachment) => (
                                  <li key={attachment.name} className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                                    <div className="flex w-0 flex-1 items-center">
                                      <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                      <span className="ml-2 w-0 flex-1 truncate">{attachment.name}</span>
                                    </div>
                                    <div className="ml-4 flex-shrink-0">
                                      <a href={attachment.href} className="font-medium text-blue-600 hover:text-blue-500">
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
                          onClick={handleSubmit((formData) => updateOrderMutation.mutate(formData))}
                          className={classNames(
                            "block px-4 py-4 text-center text-sm font-medium sm:rounded-b-lg",
                            isDirty
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
    </form>
  );
}

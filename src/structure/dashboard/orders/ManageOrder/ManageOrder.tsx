import { Transition } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { parseJSON } from "date-fns";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from "zod";
import classNames from "../../../../helpers/classNames";
import { createFullName, dateFormatted, portfolioImage } from "../../../../helpers/helperFunctions";
import { addOrderComment, changeOrderStatus, getOrder, updateOrder } from "../../../../model/orderModel";
import { userState } from "../../../../store/userState";
import { Order, ORDER_STATUS } from "../../../../types/types";
import CustomButton from "../../../../utilityComponents/CustomButton";
import ModalAction from "../../../../utilityComponents/ModalAction";
import StatusBadge from "../../../../utilityComponents/StatusBadge";
import { toasted } from "../../../../utilityComponents/Toast";
import OrderComments from "./OrderComments";
import OrderDetails from "./OrderDetails";
import OrderTimeline from "./OrderTimeline";


let ValidationSchema = z.object({
  visitFrequency: z.object({ id: z.number(), value: z.string() }),
  districtName: z.object({ id: z.number(), value: z.string() }),
  estateSize: z.object({ id: z.number(), value: z.string() }),
  visitDay: z.object({ id: z.number(), value: z.string() }),
  visitHour: z.object({ id: z.number(), value: z.string() }),
  additionalInfo: z.string().optional().nullable(),
});


// Export as reusable components stuff like comments, file extract, etc

export default function ManageOrder() {
  // TODO: handle wrong address param for order - /orders/<orderId> - fetch order and return error if not found
  const { orderId } = useParams();

  const [editMode, setEditMode] = useState(false);
  // TODO Export modal as reusable component, can I do it without useState?
  const [modalOpen, setModalOpen] = useState(false);

  const [userData] = userState((state) => [state.userData]);

  const queryClient = useQueryClient();
  const orderDataRef = useRef<HTMLDivElement>(null);

  const { data: orderData, isSuccess } = useQuery({
    queryKey: ["orders", orderId],
    queryFn: () => getOrder(orderId as string),
  });
  
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<Order>({
    resolver: zodResolver(ValidationSchema),
    defaultValues: {} as Order,
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
      // if (!mode) orderDataRef.current?.scrollIntoView({ behavior: "smooth" });
      return !mode;
    });
  };

  //   TODO: Order should be reported differently whether it is looked by vendor or user
  return (
    <div className="min-h-screen">
      <ModalAction
        messageType="info"
        title={orderData?.orderStatusId === ORDER_STATUS.RESERVATION ? "Потвърждение на резервация" : "Изпращане оферта към клиента"}
        description={
          !isValid
            ? "Попълнете всички данни за да изпратим конкретно предложение към клиента"
            : "След потвърждаване на резервацията, започва изпълнението на поръчката според уговорените условия."
        }
        btnAckText={errors ? "Потвърди" : undefined}
        btnCloseText="Затвори"
        confirmAction={() => changeStatus(ORDER_STATUS.ACTIVE)}
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
        {isSuccess && (
          <div className="min-h-full">
            <main className="py-10">
              {/* Page header */}
              <div className="items-start px-4 sm:px-6 md:flex md:justify-between md:px-0">
                <div className="flex items-center space-x-5">
                  <div className="mb-6">
                    <p className="text-2xl font-bold text-gray-900 ">{orderData.serviceType.value}</p>
                    <p className="block text-sm font-medium leading-6 text-gray-900">
                      Създадена:{" "}
                      <time dateTime={orderData.createdAt} className="whitespace-nowrap">
                        {dateFormatted(orderData.createdAt)}
                      </time>
                    </p>
                  </div>
                </div>
                <div className="flex w-fit flex-wrap justify-between gap-4 md:justify-start">
                  {editMode && (
                    <CustomButton
                      category="secondary"
                      disabled={false}
                      onClick={() => {
                        setEditMode(false);
                        reset();
                      }}
                    >
                      Откажи
                    </CustomButton>
                  )}

                  {!editMode && (
                    <CustomButton
                      category="secondary"
                      disabled={orderData.orderStatus.id === ORDER_STATUS.CANCELLED || orderData.orderStatus.id === ORDER_STATUS.ACTIVE}
                      onClick={toggleEditMode}
                    >
                      Редактирай
                    </CustomButton>
                  )}

                  {editMode && (
                    <CustomButton
                      disabled={!isDirty}
                      category="primary"
                      onClick={handleSubmit((formData) => updateOrderMutation.mutate({ ...orderData, ...formData }))}
                    >
                      Запиши промените
                    </CustomButton>
                  )}
                  {!editMode && (
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
                      Потвърди резервация
                    </CustomButton>
                  )}
                </div>
              </div>

              <div className="mx-auto mt-2 grid grid-cols-1 gap-6 xl:grid-flow-col-dense xl:grid-cols-3">
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
                                src={portfolioImage(orderData.vendor.user.imageUrl)}
                                alt=""
                              />
                              <span className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true" />
                            </div>
                          </div>
                          <div>
                            <h1 className="text-lg font-semibold text-gray-900">{createFullName(orderData.vendor.user)}</h1>
                          </div>
                        </div>
                        <StatusBadge  orderDate={parseJSON(orderData.startDate)} label={orderData.orderStatus.value}>{orderData.orderStatus.value}</StatusBadge>
                      </div>
                        <OrderDetails editMode={editMode} register={register} control={control} orderData={orderData}/>
                      <div>
                        <a
                          onClick={handleSubmit((formData) => updateOrderMutation.mutate({ ...orderData, ...formData }))}
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
    </div>
  );
}

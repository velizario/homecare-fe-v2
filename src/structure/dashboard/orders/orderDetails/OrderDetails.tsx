import { Transition } from "@headlessui/react";
import { CheckIcon, HandThumbUpIcon, InformationCircleIcon, PaperClipIcon, UserIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import classNames from "../../../../helpers/classNames";
import { BACKEND_URL } from "../../../../helpers/envVariables";
import { getOrder, Order } from "../../../../model/orderModel";
import { essentialsStore } from "../../../../store/essentialsStore";
import { areaSizes, orderFrequency, OrderStatus, servicesObj } from "../../../../types/types";
import Badge from "../../../../utilityComponents/Badge";

const user = {
  name: "Whitney Francis",
  email: "whitney@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
};

const attachments = [
  { name: "resume_front_end_developer.pdf", href: "#" },
  { name: "coverletter_front_end_developer.pdf", href: "#" },
];
const eventTypes = {
  applied: { icon: UserIcon, bgColorClass: "bg-gray-400" },
  advanced: { icon: HandThumbUpIcon, bgColorClass: "bg-blue-500" },
  completed: { icon: CheckIcon, bgColorClass: "bg-green-500" },
};
const timeline = [
  {
    id: 1,
    type: eventTypes.applied,
    content: "Създадена от",
    target: "Велизар Стоянов",
    date: "Септ 20",
    datetime: "2020-09-20",
  },
  {
    id: 2,
    type: eventTypes.advanced,
    content: "Променена от",
    target: "Velizar Stoyanov",
    date: "Септ 22",
    datetime: "2020-09-22",
  },
  {
    id: 3,
    type: eventTypes.completed,
    content: "Потвърдена от",
    target: "Велизар Стоянов",
    date: "Септ 28",
    datetime: "2020-09-28",
  },
  {
    id: 4,
    type: eventTypes.advanced,
    content: "Променена от",
    target: "Велизар Стоянов",
    date: "Септ 30",
    datetime: "2020-09-30",
  },
  {
    id: 5,
    type: eventTypes.completed,
    content: "Анулирана от",
    target: "Велизар Стоянов",
    date: "Окт 4",
    datetime: "2020-10-04",
  },
];
const comments = [
  {
    id: 1,
    name: "Leslie Alexander",
    date: "4d ago",
    imageId: "1494790108377-be9c29b29330",
    body: "Ducimus quas delectus ad maxime totam doloribus reiciendis ex. Tempore dolorem maiores. Similique voluptatibus tempore non ut.",
  },
  {
    id: 2,
    name: "Michael Foster",
    date: "4d ago",
    imageId: "1519244703995-f4e0f30006d5",
    body: "Et ut autem. Voluptatem eum dolores sint necessitatibus quos. Quis eum qui dolorem accusantium voluptas voluptatem ipsum. Quo facere iusto quia accusamus veniam id explicabo et aut.",
  },
  {
    id: 3,
    name: "Dries Vincent",
    date: "4d ago",
    imageId: "1506794778202-cad84cf45f1d",
    body: "Expedita consequatur sit ea voluptas quo ipsam recusandae. Ab sint et voluptatem repudiandae voluptatem et eveniet. Nihil quas consequatur autem. Perferendis rerum et.",
  },
];

type OrderDetailsProps = {
  //   isShowing: boolean;
};

export default function OrderDetails({}: OrderDetailsProps) {
  const [isShowing, setIsShowing] = useState(false);
  const [orderData, setOrderData] = useState<Order>();
  const { orderId } = useParams();

  const essentialData = essentialsStore((store) => store.essentialData);

  const fetchOrder = async () => {
    console.log("!!!!", orderId);
    if (!orderId) {
      // TODO expose the error to the user
      console.log("Order not found!");
      return;
    }
    const order = await getOrder(orderId);
    if (!order) {
      // TODO expose the error to the user
      console.log("Order not found!");
      return;
    }
    setOrderData(order);
  };

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  useEffect(() => {
    setIsShowing(true);
  }, [orderData]);

  //   TODO: Order should be reported differently whether it is looked by vendor or user
  return (
    <div className="min-h-screen">
      <Transition
        show={isShowing}
        enter="transition-opacity duration-150"
        enterFrom="opacity-0 translate-x-full"
        enterTo="opacity-100 translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leaveFrom="opacity-100 translate-x-0"
        leaveTo="opacity-0 translate-x-full"
      >
        {orderData && (
          <div className="min-h-full">
            <main className="py-10">
              {/* Page header */}
              <div className="mx-auto max-w-3xl px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
                <div className="flex items-center space-x-5">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <img
                        className="h-16 w-16 rounded-full"
                        src={`${BACKEND_URL}/users/public/${orderData.vendorImgUrl || "defaultImage.png"}`}
                        alt=""
                      />
                      <span className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true" />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{orderData?.vendorName}</h1>
                    <p className="text-sm font-medium text-gray-500">
                      Създадена: <time dateTime="2020-08-25">25 Януари, 2023 г.</time>
                    </p>
                  </div>
                </div>
                <div className="justify-stretch mt-6 flex flex-col-reverse space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-y-0 sm:space-x-3 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Редактирай
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    Потвърди
                  </button>
                </div>
              </div>

              <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2 lg:col-start-1">
                  {/* Description list*/}
                  <section aria-labelledby="applicant-information-title">
                    <div className="bg-white shadow sm:rounded-lg">
                      <div className="flex items-start justify-between px-4 py-5 sm:px-6">
                        <div>
                          <h2 id="applicant-information-title" className="text-lg font-medium leading-6 text-gray-900">
                            Информация за поръчката
                          </h2>
                          <p className="mt-1 max-w-2xl text-sm text-gray-500">
                            Създадена: <time dateTime="2023-01-25">25 Януари, 2023 г.</time>
                          </p>
                        </div>
                        <Badge styles="text-yellow-800 bg-yellow-50 font-medium text-base">
                          {essentialData.orderStatuses.find((item) => item.id == orderData.status.toString())?.value}
                        </Badge>
                      </div>
                      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                          <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">Услуга</dt>
                            <dd className="mt-1 text-base font-semibold text-gray-900">
                              {essentialData.serviceTypes.find((item) => item.id === orderData.service)?.value}
                            </dd>
                          </div>
                          <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">Честота</dt>
                            <dd className="mt-1 text-base font-semibold text-gray-900">
                              {essentialData.visitFrequencies.find((item) => item.id === orderData.frequency.toString())?.value}
                            </dd>
                          </div>
                          <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">Квартал</dt>
                            <dd className="mt-1 text-base font-semibold text-gray-900">
                              {essentialData.districtNames.find((item) => item.id === orderData.district)?.value}
                            </dd>
                          </div>
                          <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">Размер</dt>
                            <dd className="mt-1 text-base font-semibold text-gray-900">
                              {essentialData.estateSizes.find((item) => item.value === orderData.areaSize)?.value} кв.
                            </dd>
                          </div>
                          <div className="sm:col-span-2">
                            <dt className="text-sm font-medium text-gray-500">Коментар</dt>
                            <dd className="mt-1 text-base font-semibold text-gray-900">
                              Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
                            </dd>
                          </div>
                          <div className="sm:col-span-2">
                            <dt className="text-sm font-medium text-gray-500">Прикачени файлове</dt>
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
                          href="#"
                          className="block bg-gray-50 px-4 py-4 text-center text-sm font-medium text-gray-500 hover:text-gray-700 sm:rounded-b-lg"
                        >
                          Някакво действие?
                        </a>
                      </div>
                    </div>
                  </section>

                  {/* Comments*/}
                  <section aria-labelledby="notes-title">
                    <div className="bg-white shadow sm:overflow-hidden sm:rounded-lg">
                      <div className="divide-y divide-gray-200">
                        <div className="px-4 py-5 sm:px-6">
                          <h2 id="notes-title" className="text-lg font-medium text-gray-900">
                            Коментари
                          </h2>
                        </div>
                        <div className="px-4 py-6 sm:px-6">
                          <ul role="list" className="space-y-8">
                            {comments.map((comment) => (
                              <li key={comment.id}>
                                <div className="flex space-x-3">
                                  <div className="flex-shrink-0">
                                    <img
                                      className="h-10 w-10 rounded-full"
                                      src={`https://images.unsplash.com/photo-${comment.imageId}?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`}
                                      alt=""
                                    />
                                  </div>
                                  <div>
                                    <div className="text-sm">
                                      <a href="#" className="font-medium text-gray-900">
                                        {comment.name}
                                      </a>
                                    </div>
                                    <div className="mt-1 text-sm text-gray-700">
                                      <p>{comment.body}</p>
                                    </div>
                                    <div className="mt-2 space-x-2 text-sm">
                                      <span className="font-medium text-gray-500">{comment.date}</span>{" "}
                                      <span className="font-medium text-gray-500">&middot;</span>{" "}
                                      <button type="button" className="font-medium text-gray-900">
                                        Reply
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-6 sm:px-6">
                        <div className="flex space-x-3">
                          <div className="flex-shrink-0">
                            <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <form action="#">
                              <div>
                                <label htmlFor="comment" className="sr-only">
                                  About
                                </label>
                                <textarea
                                  id="comment"
                                  name="comment"
                                  rows={3}
                                  className="block w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:py-1.5 sm:text-sm sm:leading-6"
                                  placeholder="Add a note"
                                  defaultValue={""}
                                />
                              </div>
                              <div className="mt-3 flex items-center justify-between gap-4">
                                <div className="inline-flex items-start space-x-2 text-sm text-gray-500">
                                  <InformationCircleIcon
                                    className="-mr-1 h-5 w-5 flex-shrink-0 pb-0.5 text-gray-400"
                                    aria-hidden="true"
                                  />
                                  <p>
                                    Записки по поръчката. За чат, отиди{" "}
                                    <Link to="/dashboard/chat" className="font-medium text-gray-900">
                                      тук
                                    </Link>
                                  </p>
                                </div>
                                <button
                                  type="submit"
                                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                >
                                  Добави коментар
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>

                <section aria-labelledby="timeline-title" className="lg:col-span-1 lg:col-start-3">
                  <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
                    <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
                      История
                    </h2>

                    {/* Activity Feed */}
                    <div className="mt-6 flow-root">
                      <ul role="list" className="-mb-8">
                        {timeline.map((item, itemIdx) => (
                          <li key={item.id}>
                            <div className="relative pb-8">
                              {itemIdx !== timeline.length - 1 ? (
                                <span
                                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                  aria-hidden="true"
                                />
                              ) : null}
                              <div className="relative flex space-x-3">
                                <div>
                                  <span
                                    className={classNames(
                                      item.type.bgColorClass,
                                      "flex h-8 w-8 items-center justify-center rounded-full ring-8 ring-white"
                                    )}
                                  >
                                    <item.type.icon className="h-5 w-5 text-white" aria-hidden="true" />
                                  </span>
                                </div>
                                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                  <div>
                                    <p className="text-sm text-gray-500">
                                      {item.content}{" "}
                                      <a href="#" className="font-medium text-gray-900">
                                        {item.target}
                                      </a>
                                    </p>
                                  </div>
                                  <div className="whitespace-nowrap text-right text-sm text-gray-500">
                                    <time dateTime={item.datetime}>{item.date}</time>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="justify-stretch mt-6 flex flex-col">
                      <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                      >
                        Действие?
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            </main>
          </div>
        )}
      </Transition>
      )
    </div>
  );
}

import { Dispatch, Fragment, MouseEventHandler, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { cancelOrder, getAllOrders } from "../model/orderModel";
import { orderState } from "../store/orderState";
import Modal from "./Modal";
import { Link } from "react-router-dom";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type ContextMenuProps = {
  orderId: number;
};

export default function ContextMenu({ orderId }: ContextMenuProps) {
  const updateOrderData = orderState((state) => state.updateOrderData);
  const [modalOpen, setModalOpen] = useState(false);
  const [userConfirmed, setUserConfirmed] = useState(false);
  const [orderAnullment, setOrderAnullment] = useState(false);

  useEffect(() => {
    if (userConfirmed && orderAnullment) {
      callCancelOrder();
      setUserConfirmed(false);
      setOrderAnullment(false);
    }
  }, [userConfirmed, orderAnullment]);

  const callCancelOrder = async () => {
    if (!orderAnullment) return;
    await cancelOrder(orderId);
    const orders = await getAllOrders();
    if (orders) updateOrderData(orders);
  };

  const handleCancelOrder: MouseEventHandler<HTMLAnchorElement> = async (e) => {
    const orderId = e.currentTarget.dataset.id;
    if (!orderId) return;
    setOrderAnullment(true);
    setModalOpen(true);
  };

  return (
    <Menu as="div" className="relative hidden w-min items-center justify-center text-left md:flex">
      <Modal
        messageType="alert"
        title="Прекратяване на поръчка"
        description="Прекратяването приключва отношенията клиент-доставчик. Сигурни ли сте, че искате да продължите?"
        btnAckText="Прекратяване"
        btnCloseText="Затвори"
        confirmAction={setUserConfirmed}
        isOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
      <div>
        <Menu.Button className="flex items-center rounded-full  text-gray-600 hover:text-gray-600 focus:outline-none ">
          <span className="sr-only">Open options</span>
          <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute  right-0 top-full z-20 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to={`/dashboard/orders/${orderId}`}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block cursor-pointer px-4 py-2 text-sm"
                  )}
                >
                  Редактиране
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  onClick={handleCancelOrder}
                  data-id={orderId}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block cursor-pointer px-4 py-2 text-sm"
                  )}
                >
                  Анулиране
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block cursor-pointer px-4 py-2 text-sm"
                  )}
                >
                  License
                </a>
              )}
            </Menu.Item>
            <form method="POST" action="#">
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="submit"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block w-full cursor-pointer px-4 py-2 text-left text-sm"
                    )}
                  >
                    Sign out
                  </button>
                )}
              </Menu.Item>
            </form>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

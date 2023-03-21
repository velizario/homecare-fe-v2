import { Fragment, MouseEventHandler, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { cancelOrder, getAllOrders } from "../model/orderModel";
import { orderState } from "../store/orderState";
import Modal from "./Modal";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type ContextMenuProps = {
  orderId: string;
};

export default function ContextMenu({ orderId }: ContextMenuProps) {
  const setOrderData = orderState((state) => state.setOrderData);
  const [modalOpen, setModalOpen] = useState(false);
  const [userConfirmed, setUserConfirmed] = useState(false);
  const [cancelOrderId, setCancelOrderId] = useState<string | undefined>();

  useEffect(() => {
    if (userConfirmed && cancelOrderId) {
      callCancelOrder();
      setUserConfirmed(false);
      setCancelOrderId(undefined)
    }
  }, [userConfirmed, cancelOrderId]);

  const callCancelOrder = async () => {
    if (!cancelOrderId) return;
    await cancelOrder(cancelOrderId);
    const orders = await getAllOrders();
    if (orders) setOrderData(orders);
  };

  const handleCancelOrder: MouseEventHandler<HTMLAnchorElement> = async (e) => {
    const orderId = e.currentTarget.dataset.id;
    if (!orderId) return;
    setCancelOrderId(orderId);
    setModalOpen(true);
  };

  return (
    <Menu as="div" className="relative hidden w-min items-center justify-center text-left md:flex">
      <Modal
        title="Прекратяване на поръчка"
        description="Прекратяването приключва отношенията клиент-доставчи. Сигурни ли сте, че искате да продължите?"
        btnPositive="Прекратяване"
        btnNegative="Затвори"
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
                <a
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block cursor-pointer px-4 py-2 text-sm"
                  )}
                >
                  Редактиране
                </a>
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

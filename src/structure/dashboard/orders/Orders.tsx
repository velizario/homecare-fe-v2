import { Route, Routes, useLocation } from "react-router-dom";
import { orderState } from "../../../store/orderState";
import TabsMenu from "../../../utilityComponents/TabsMenu";
import OrderDetailsNew from "./orderDetails/OrderDetailsNew";
import OrderlistGrid from "./orderlist/OrderlistGrid";
import OrderSchedule from "./orderschedule/OrderSchedule";

const tabs = [
  { id: 1, name: "График", href: "/dashboard/orders/schedule" },
  { id: 2, name: "Списък", href: "/dashboard/orders/list" },
];

export default function Orders() {
  const location = useLocation();
  const orders = orderState((state) => state.orderData);

  const defaultTab = tabs.find((tab) => tab.href.includes(location.pathname))?.name;
  return (
    <div className="">
      <TabsMenu tabs={tabs} defaultTab={defaultTab ?? "График"} />
      <Routes>
        <Route path="/" element={<OrderSchedule />} />
        <Route path="schedule" element={<OrderSchedule />} />
        <Route path="list" element={<OrderlistGrid />} />
        <Route path=":orderId" element={<OrderDetailsNew />} />
      </Routes>
    </div>
  );
}

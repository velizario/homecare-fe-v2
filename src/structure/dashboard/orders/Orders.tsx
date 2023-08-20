import { Route, Routes, useLocation } from "react-router-dom";
import TabsMenu from "../../../utilityComponents/TabsMenu";
import OrderDetails from "./ManageOrder/ManageOrder";
import OrderList from "./orderlist/OrderList";
import OrderSchedule from "./orderschedule/OrderSchedule";
import RequestList from "./requests/RequestList";

const tabs = [
  { id: 1, name: "Заявени", href: "/dashboard/orders/requests" },
  { id: 2, name: "Активни", href: "/dashboard/orders/list" },
  { id: 3, name: "График", href: "/dashboard/orders/schedule" },
];

export default function Orders() {
  const location = useLocation();

  const defaultTab = tabs.find((tab) => tab.href.includes(location.pathname))?.name;
  return (
    <div className="">
      <TabsMenu tabs={tabs} defaultTab={defaultTab ?? "График"} />
      <Routes>
        <Route path="/" element={<OrderSchedule />} />
        <Route path="schedule" element={<OrderSchedule />} />
        <Route path="list" element={<OrderList />} />
        <Route path="requests" element={<RequestList />} />
        <Route path=":orderId" element={<OrderDetails />} />
      </Routes>
    </div>
  );
}

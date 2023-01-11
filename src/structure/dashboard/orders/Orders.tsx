import { Route, Routes } from "react-router-dom";
import TabsMenu from "../../../utilityComponents/TabsMenu";
import OrderList from "./orderlist/Orderlist";
import OrderlistGrid from "./orderlist/OrderlistGrid";
import OrderlistNew from "./orderlist/OrderlistNew";
import OrderSchedule from "./orderschedule/OrderSchedule";

const tabs = [
    { id: 1, name: 'График', href: '#/dashboard/orders/schedule' },
    { id: 2, name: 'Списък', href: '#/dashboard/orders/list' },
]

export default function Orders() {
    return (
        <div className="md:px-6 lg:px-8">
            <TabsMenu tabs={tabs} defaultTab={"График"} />
            <Routes>
                <Route path="/" element={<OrderSchedule/>}/>
                <Route path="schedule" element={<OrderSchedule />} />
                <Route path="list" element={<OrderlistGrid />} />
            </Routes>
        </div>
    )
}
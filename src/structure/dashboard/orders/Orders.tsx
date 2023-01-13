import { Route, Routes, useLocation } from "react-router-dom";
import TabsMenu from "../../../utilityComponents/TabsMenu";
import OrderlistGrid from "./orderlist/OrderlistGrid";
import OrderSchedule from "./orderschedule/OrderSchedule";

const tabs = [
    { id: 1, name: 'График', href: '#/dashboard/orders/schedule' },
    { id: 2, name: 'Списък', href: '#/dashboard/orders/list' },
]

export default function Orders() {
    let location = useLocation();

    const defaultTab = tabs.find(tab => tab.href.includes(location.pathname))?.name
    return (
        <div className="px-2 md:px-6 lg:px-8">
            <TabsMenu tabs={tabs} defaultTab={defaultTab || "График"} />
            <Routes>
                <Route path="/" element={<OrderSchedule/>}/>
                <Route path="schedule" element={<OrderSchedule />} />
                <Route path="list" element={<OrderlistGrid />} />
            </Routes>
        </div>
    )
}
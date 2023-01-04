import TabsMenu from "../../../utilityComponents/TabsMenu";
import OrderList from "./Orderlist";

const tabs = [
    { id: 1, name: 'Заявени', href: '#/dashboard/orders' },
    { id: 2, name: 'Планирани', href: '#/dashboard/orders' },
    { id: 3, name: 'Завършени', href: '#/dashboard/orders' },
  ]

export default function Orders() {
    return (
        <div className="px-4 md:px-6 lg:px-8">
            <TabsMenu tabs={tabs} activeTab={1} />
            <OrderList />
        </div>
    )
}
import TabsMenu from "../../../utilityComponents/TabsMenu";
import OrderList from "./Orderlist";

export default function Orders() {
    return (
        <div className="px-4 md:px-6 lg:px-8">
            <TabsMenu />
            <OrderList />
        </div>
    )
}
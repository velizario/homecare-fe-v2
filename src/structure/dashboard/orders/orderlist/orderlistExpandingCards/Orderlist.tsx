import { useState } from "react";
import { orderState } from "../../../../../store/orderState";
import { Order } from "../../../../../types/types";
import OrderDetails from "./OrderDetails";


export default function Orderslist() {
    const orders = orderState(state => state.orderData)
    return (
        <>
            <div className="space-y-4">
                {orders.map(order => {
                    return (
                        <OrderDetails key={order.id} order={order} />
                    )
                })}
            </div>
        </>
    )
}
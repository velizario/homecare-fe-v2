import OrderDetails from "./OrderDetails";

export interface Order {
    id: number
    date: string;
    time: string;
    name: string;
    imageUrl:
    string;
    location: string;
}

export const orders: Order[] = [
    {
        id: 1,
        date: '29 януари',
        time: '12:00 - 16:00',
        name: 'Стоян Пеканов',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        location: 'Кръстова Вада',
    },
    {
        id: 2,
        date: '29 януари',
        time: '08:00 - 12:00',
        name: 'Велизар Максимов Стоянов',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        location: 'Хладилника',
    },
]

export default function Orderslist() {


    return (
        <>
            <h3 className="mb-2 font-semibold text-gray-700">29 Януари</h3>
            <div className="space-y-4">
                {orders.map(order => {
                    return (
                        <OrderDetails order={order} />
                    )
                })}
            </div>
        </>
    )
}
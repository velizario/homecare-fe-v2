import { ChevronRightIcon, ClockIcon, MapPinIcon } from "@heroicons/react/24/outline";

export const orders = [
    {
        id: 1,
        date: '29 януари',
        time: '5:00 часа',
        name: 'Стоян Пеканов',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        location: 'Хладилника',
    },
    {
        id: 2,
        date: '29 януари',
        time: '5:00 часа',
        name: 'Стоян Пеканов',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        location: 'Хладилника',
    },
]

export default function Orderslist() {
    return (
        <>
            <h3 className="mb-2 font-semibold text-gray-600">29 Януари</h3>
            <div className="space-y-4">
                {orders.map(order => {
                    return (
                        <div className="flex gap-2 cursor-pointer items-center hover:bg-indigo-50 hover:transition-all ring-1 ring-indigo-50  relative w-full shadow-md shadow-indigo-50 rounded-md p-4 md:gap-4 md:pl-6 pr-1 overflow-hidden">
                            <div className="absolute left-0 h-full w-2 bg-indigo-200"></div>
                            <img className="h-12 w-12 rounded-full self-start" src={order.imageUrl} alt="" />
                            <div className="flex flex-col gap-2">
                                <h3 className="text-base font-medium">{order.name}</h3>
                                <div className="flex flex-row gap-2 text-gray-500">
                                    <ClockIcon className="h-5 w-5" />
                                    <p className="text-sm font-medium">{order.time}</p> 
                                </div>
                                <div className="flex flex-row gap-2 text-gray-500">
                                    <MapPinIcon className="h-5 w-5" />
                                    <p className="text-sm font-medium">{order.location}</p>
                                </div>
                            </div>
                            <ChevronRightIcon className='w-5 h-5 relative mr-0 ml-auto' />
                        </div>
                    )
                })}
            </div>
        </>
    )
}
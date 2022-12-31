import { Transition } from '@headlessui/react'
import { ClockIcon, MapPinIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useState } from 'react'
import { Order } from './Orderlist';

interface OrderDetailsProps {
    order: Order;
}

export default function OrderDetails({ order }: OrderDetailsProps) {

    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <div onClick={() => setIsExpanded((isExpanded) => !isExpanded)} className="relative ring-1 ring-indigo-50 w-full shadow-order  rounded-md overflow-hidden">
            <div className="absolute left-0 h-full w-2 bg-indigo-200 "></div>
            <div className="flex cursor-pointer items-center hover:bg-indigo-50 hover:transition-colors gap-4 p-4 pl-6 pr-2">
                <img className="h-12 w-12 rounded-full self-start flex-shrink-0 " src={order.imageUrl} alt="" />
                <div className="flex flex-col gap-2 overflow-clip">
                    <h3 className="text-base font-medium break-words">{order.name}</h3>
                    <div className="flex flex-row gap-2 text-gray-500">
                        <ClockIcon className="h-5 w-5" />
                        <p className="text-sm font-medium">{order.time}</p>
                    </div>
                    <div className="flex flex-row gap-2 text-gray-500">
                        <MapPinIcon className="h-5 w-5" />
                        <p className="text-sm font-medium">{order.location}</p>
                    </div>
                </div>
                <ChevronRightIcon className='h-4 w-4 flex-shrink-0 relative mr-0 ml-auto' />
            </div>
            <div className="ml-6 mr-4 overflow-hidden">
                <Transition
                    show={isExpanded}
                    enter="transition-all ease duration-200"
                    enterTo='opacity-100 max-h-96 py-4'
                    enterFrom="opacity-0 max-h-0"

                    leave="transition-all ease duration-200"
                    leaveTo="opacity-0 max-h-0"
                    leaveFrom="opacity-100 max-h-96 py-4"
                >
                    <p>I will appear and disappear.</p>
                    <p>I will appear and disappear.</p>
                    <p>I will appear and disappear.</p>
                    <p>I will appear and disappear.</p>
                    <p>I will appear and disappear.</p>
                </Transition>
            </div>
        </div>
    )
}
import { Transition } from '@headlessui/react'
import { ClockIcon, MapPinIcon, ChatBubbleBottomCenterTextIcon, CalendarIcon, ListBulletIcon, HomeIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { useState } from 'react'
import classNames from '../../../../../helpers/classNames';
import { Order } from '../../../../../types/types';

interface OrderDetailsProps {
    order: Order;
}

export default function OrderDetails({ order }: OrderDetailsProps) {

    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <div className="relative ring-1 ring-indigo-50 w-full max-w-xl shadow-order hover:shadow-order-hover hover:transition-shadow  rounded-md overflow-hidden">
            {/* Order summary */}
            {/* <div className="absolute top-0 bottom-0 left-0 h-full w-2 bg-indigo-200 z-20"></div> */}
            <div onClick={() => { setIsExpanded((isExpanded) => !isExpanded); }} className="relative z-30 flex flex-col gap-3 p-3 pb-4 pl-5 pr-7 cursor-pointer ">
                <div className={classNames(" absolute bottom-0 left-6 right-4 bg-gray-200 h-px ", !isExpanded ? 'hidden' : "")}></div>
                <div className="flex gap-3 rounded-2xl">
                    <div className="flex flex-row gap-1 text-gray-500 items-center">
                        <ClockIcon className="h-5 w-5" />
                        {/* <p className="text-xs font-normal">{order.time}</p> */}
                    </div>
                    <div className="flex flex-row gap-1 text-gray-500 items-center">
                        <MapPinIcon className="h-5 w-5" />
                        <p className="text-xs font-normal ">{order.districtName.value}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 ">
                    <img className="h-12 w-12 rounded-full self-start flex-shrink-0 " src={order.vendorImgUrl} alt="" />
                    <div>
                        <h3 className="text-sm font-medium break-words text-gray-700">{order.vendorName}</h3>
                        <span className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-normal text-indigo-800">
                            Планирана
                        </span>
                    </div>
                </div>
                <ChevronDownIcon className={classNames("p-1  text-blue-700 cursor-pointer h-6 w-6 rounded-full flex-shrink-0 z-1 absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 transition-all duration-200 rotate-0", isExpanded ? '-rotate-180' : "" )} />
            </div>
            {/* Order details */}
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
                    <div className='mb-4 rounded-lg'>
                        <div className="flex gap-1 items-center text-gray-500 mb-0.5">
                            <ClockIcon className="h-4 w-4" />
                            <p className="text-xs font-normal">Дата и час:</p>
                        </div>
                        <p className="pl-5 text-sm text-gray-700 font-medium">Понеделник, 29 ноември <br></br> 12:00 - 16:00 часа</p>
                    </div>
                    <div className='mb-4 rounded-lg'>
                        <div className="flex gap-1 items-center text-gray-500 mb-0.5">
                            <MapPinIcon className="h-4 w-4" />
                            <p className="text-xs font-normal">Адрес:</p>
                        </div>
                        <p className="pl-5 text-sm text-gray-700 font-medium">кв. Витоша, ул. Константин Петканов 25, ет. 3, ап. 25</p>
                    </div>
                    <div className='mb-4 rounded-lg'>
                        <div className="flex gap-1 items-center text-gray-500 mb-0.5">
                            <HomeIcon className="h-4 w-4" />
                            <p className="text-xs font-normal">Вид помещение:</p>
                        </div>
                        <p className="pl-5 text-sm text-gray-700 font-medium">Дом</p>
                    </div>
                    <div className='mb-4 rounded-lg'>
                        <div className="flex gap-1 items-center text-gray-500 mb-0.5">
                            <CalendarIcon className="h-4 w-4" />
                            <p className="text-xs font-normal">Тип посещение:</p>
                        </div>
                        <p className="pl-5 text-sm text-gray-700 font-medium">Абонамент</p>
                    </div>
                    <div className='mb-4 rounded-lg'>
                        <div className="flex gap-1 items-center text-gray-500 mb-0.5">
                            <ListBulletIcon className="h-4 w-4" />
                            <p className="text-xs font-normal">Включени слуги:</p>
                        </div>
                        <p className="pl-5 text-sm text-gray-700 font-medium">Основно почистване, хладилник, прозорци</p>
                    </div>

                    <div className="flex justify-between mt-4 ">
                        <button
                            type="button"
                            className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-2.5 py-1.5 text-xs font-medium leading-4 text-white shadow-sm hover:bg-blue-700 "
                        >
                            <ChatBubbleBottomCenterTextIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                            Към съобщения
                        </button>
                        <button
                            type="button"
                            onClick={() => { setIsExpanded((isExpanded) => !isExpanded); }}
                            className="inline-flex items-center rounded   bg-white px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900"
                        >
                            Затвори
                        </button>
                    </div>

                </Transition>
            </div>
        </div>
    )
}
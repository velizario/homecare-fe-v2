import { BellIcon, CalendarIcon, ChatBubbleBottomCenterIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import Badge from "../../utilityComponents/Badge";
import RatingCard from "../../utilityComponents/RatingCard";
import SingleRating from "../../utilityComponents/SingleRating";

export default function CardVendor() {
    return (
        <div className="bg-gradient-to-b max-w-xl from-fuchsia-50 to-indigo-300">
            <div className="pt-4 flex justify-between items-center px-6">
                <ChevronLeftIcon className="h-6 w-6"></ChevronLeftIcon>
                <p className="font-medium text-gray-600">Профил</p>
                <BellIcon className="h-6 w-6"></BellIcon>
            </div>

            <div className="mt-36 flex flex-col bg-white rounded-t-3xl px-6">
                <div className="flex gap-6 justify-between -mt-28">
                    <div className="flex flex-col gap-3 w-[60%]">
                        <img
                            className="inline-block [aspect-ratio:_1_/_1] w-full rounded-md object-cover"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                        />
                        <h2 className="font-medium text-lg text-gray-800">Велизар Стоянов</h2>
                    </div>
                    <div className="flex flex-col gap-[22px] whitespace-nowrap w-[40%]">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center rounded gap-2 border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            <ChatBubbleBottomCenterIcon className="h-5 w-5"></ChatBubbleBottomCenterIcon>Свържете се
                        </button>
                        <button
                            type="button"
                            className="inline-flex items-center justify-center gap-2 rounded border border-gray-300 px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-opacity-30 hover:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            <CalendarIcon className="h-5 w-5"></CalendarIcon>Заявете час
                        </button>
                        <div className="flex flex-col items-center gap-1 mt-5">
                            <SingleRating></SingleRating>
                            <p className="text-xs font-medium text-gray-600 underline underline-offset-2">(52 ревюта)</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-around my-6">
                    <div className="flex flex-col items-center">
                        <p className="text-xs text-gray-500">Клиенти</p>
                        <p className="text-gray-700 font-semibold">10</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="text-xs text-gray-500">Поръчки</p>
                        <p className="text-gray-700 font-semibold">20</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="text-xs text-gray-500">Оценка</p>
                        <p className="text-gray-700 font-semibold">4.5</p>
                    </div>
                </div>
                <div className="flex gap-2 flex-wrap mb-5">
                    <Badge styles="bg-indigo-100 text-indigo-800">Основно</Badge>
                    <Badge styles="bg-indigo-100 text-indigo-800">Мека мебел</Badge>
                    <Badge styles="text-gray-400 font-light">Прозорци</Badge>
                    <Badge styles="text-gray-400 font-light">Собствени материали</Badge>
                    <Badge styles="bg-indigo-100 text-indigo-800">Абонамент</Badge>
                    <Badge styles="bg-indigo-100 text-indigo-800">Еднократно</Badge>
                </div>
                <p className="text-left text-sm text-gray-600">Suspendisse dictum mi ac lacinia dignissim. Proin arcu felis, vulputate a velit non, dapibus dignissim neque. Aliquam erat volutpat. Integer eu magna placerat, volutpat metus nec, gravida sapien. Sed nec dapibus dolor, id aliquet dolor. Vestibulum bibendum lobortis enim sit amet ullamcorper.</p>
                <RatingCard/>
            </div>
        </div>
    )
}
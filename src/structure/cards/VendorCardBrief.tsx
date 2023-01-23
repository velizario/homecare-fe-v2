import { StarIcon } from "@heroicons/react/20/solid";
import classNames from "../../helpers/classNames";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { useRef } from "react";

const userRating = 5;

export default function VendorCardBrief() {
    const tagsRef = useRef<null | HTMLDivElement>(null)
    return (
        <div>
            <div className="p-4 bg-white border-b-2 gap-x-2 sm:gap-x-4 grid grid-cols-[min-content_1fr] ">
                {/* photo */}
                <div className="w-20 sm:w-48 col-start-1 row-start-1 row-span-2 drop-shadow-xl">
                    <img
                        className="[aspect-ratio:_1_/_1] w-full object-cover rounded-sm clip-path-photo "
                        src="https://st1.photogallery.ind.sh/wp-content/uploads/indiacom/zozibini-tunzi-top-20-most-beautiful-women-in-the-world-2022-202003-1655117381.jpg"
                        alt=""
                    />
                </div>
                {/* base info and rating */}
                <div className="flex flex-col col-start-2">
                    <h2 className="text-lg font-medium font-serif -mt-1.5">Даниа Бързакова</h2>
                    <p className="text-gray-400 text-sm">София</p>
                    <div className="flex items-end gap-1 mt-1">
                        <span className="text-sm text-yellow-400 font-medium">4.8</span>
                        <div className="flex mb-0.5">
                            {[0, 1, 2, 3, 4, 5].map((rating) => (
                                <StarIcon
                                    key={rating}
                                    className={classNames(
                                        userRating > rating ? "text-yellow-400" : "text-gray-200",
                                        "h-5 w-5 flex-shrink-0"
                                    )}
                                    aria-hidden="true"
                                />
                            ))}
                        </div>
                        <p className="text-sm text-gray-400 cursor-pointer">
                            (<span className="underline underline-offset-2 text-indigo-600">52</span>
                            )
                        </p>
                    </div>
                </div>
                {/* about */}
                <div className="mt-4 col-start-1 row-start-3 col-span-2">
                    <p className="text-gray-800 text-sm leading-normal line-clamp-4">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
                </div>
                {/* prices */}
                <div className="flex flex-col gap-1 mt-3 sm:col-start-2 col-start-1 col-span-2 sm:col-span-1 row-start-4 sm:row-start-2">
                    <div className="flex gap-1 justify-between border-b pb-1 mb-1">
                        <p className="text-xs text-gray-400">Вид почистване</p>
                        <p className="text-gray-400 text-xs whitespace-nowrap">Цена от</p>
                    </div>
                    <div className="flex gap-1 justify-between">
                        <p className="text-gray-800 text-sm">Еднократно</p>
                        <p className="text-gray-800 text-sm font-semibold whitespace-nowrap">20 лв/ч</p>
                    </div>
                    <div className="flex gap-1 justify-between">
                        <p className="text-gray-800 text-sm">Абонаментно</p>
                        <p className="text-gray-800 text-sm font-semibold whitespace-nowrap">15 лв/ч</p>
                    </div>
                    <div className="flex gap-1 justify-between">
                        <p className="text-gray-800 text-sm">Основно</p>
                        <p className="text-gray-800 text-sm font-semibold whitespace-nowrap">50 лв/ч</p>
                    </div>
                    <div className="flex gap-1 justify-between -mt-1 ml-0.5">
                        <p className="text-gray-800 text-xs">...</p>
                    </div>
                </div>
                {/* more info */}
                <div className="flex items-center text-indigo-600 col-span-2 mt-1">
                    <p className="text-sm font-serif">Още информация и услуги</p>
                    <ChevronRightIcon className="h-5 w-5 mt-0.5"></ChevronRightIcon>
                </div>
            </div>
        </div>
    )
}

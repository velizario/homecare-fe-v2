import SingleRating from "../SingleRating";
import PortfolioTags from "../PortfolioTags";
import { StarIcon } from "@heroicons/react/20/solid";
import classNames from "../../../helpers/classNames";
import ShortInfo from "../ShortInfo";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useRef } from "react";

const userRating = 4;


export default function VendorCardBrief() {

    const tagsRef = useRef<null | HTMLDivElement>(null)

    return (
        <div className="px-2 py-2 bg-white">
            <div className="flex gap-4">
                <div className="max-w-[5rem]">
                    <img
                        className="[aspect-ratio:_1_/_1] w-full rounded-full object-cover"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                    />
                </div>
                <div>
                    <h2 className="font-medium text-gray-800 mt-2">Велизар Стоянов</h2>
                    <div className="flex items-center mt-1">
                        {[0, 1, 2, 3, 4].map((rating) => (
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
                    <p className="text-xs font-medium text-gray-600 underline underline-offset-2 mt-1 cursor-pointer">
                        (52 ревюта)
                    </p>

                </div>
            </div>
            <div className="flex items-center mt-2">
                <div className="button-wrapper button-wrapper-left relative">
                    <ChevronLeftIcon onClick={() => tagsRef.current!.scrollBy({ left: -250, top: 0, behavior: "smooth" })} className="h-9 w-9 p-1 cursor-pointer text-gray-500"></ChevronLeftIcon>
                </div>
                <div ref={tagsRef} className="hidden-scrollbar w-full overflow-scroll">
                    <div className="w-max">
                        <PortfolioTags />
                    </div>
                </div>
                <div className="button-wrapper button-wrapper-right relative">
                    <ChevronRightIcon onClick={() => tagsRef.current!.scrollBy({ left: 250, top: 0, behavior: "smooth" })} className="h-9 w-9 p-1 cursor-pointer text-gray-500"></ChevronRightIcon>
                </div>
            </div>
            <ShortInfo />
        </div>
    )
}
// Снимка
// Име
// Ревюта
// портфолио услуги
// Брой поръчки

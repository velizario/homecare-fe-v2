import { StarIcon } from "@heroicons/react/20/solid";
import classNames from "../../helpers/classNames";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { useRef } from "react";
import { Link } from "react-router-dom";
import VendorPrices from "./VendorPrices";

const userRating = 5;

export default function VendorCard() {
    const tagsRef = useRef<null | HTMLDivElement>(null)
    return (
        <div>
            <div className="shadow-order hover:shadow-order-hover p-4 bg-white rounded-md gap-x-2 sm:gap-x-4 grid grid-cols-[min-content_1fr]">
                {/* photo */}
                <div className="w-20 sm:w-48 col-start-1 row-start-1 sm:row-span-2 drop-shadow-xl">
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
                {/* more info */}
                {/* prices */}
                <VendorPrices />
                <Link
                    to="/vendor-card-full"
                    className="col-start-1 col-span-2 order-last row-start-[10]"
                >
                    <div className="flex items-center text-indigo-600 mt-1">
                        <p className="text-sm font-serif">Още информация и услуги</p>
                        <ChevronRightIcon className="h-5 w-5 mt-0.5"></ChevronRightIcon>
                    </div>
                </Link>
            </div>
        </div>
    )
}

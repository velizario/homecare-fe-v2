import {
    BellIcon,
    ChevronLeftIcon,
} from "@heroicons/react/24/outline";
import Perks from "./Perks";
import RatingCard from "../../utilityComponents/RatingCard";
import SingleRating from "./SingleRating";
import PortfolioTags from "./PortfolioTags";
import ContactButtons from "./ContactButtons";
import DetailedInfo from "./DetailedInfo";
import ShortInfo from "./ShortInfo";
import { Link } from "react-router-dom";
import Header from "../header/Header";
import { useState } from "react";
import VendorPrices from "./VendorPrices";

export default function VendorCardFull() {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <>
            <Header setSidebarOpen={setSidebarOpen} />
            {/* Mobile */}
            <div className="bg-gradient-to-b m-auto from-fuchsia-50 to-indigo-300">
                <div className="pt-4 flex justify-between items-center px-4  text-gray-600">
                    <Link to="/vendor-card">
                        <ChevronLeftIcon className="h-6 w-6"></ChevronLeftIcon>
                    </Link>
                    <p className="font-medium">Профил</p>
                    <BellIcon className="h-6 w-6"></BellIcon>
                </div>
                <div className="mt-36 flex flex-col bg-white justify-center rounded-t-3xl px-4 gap-6">
                    <div className="flex flex-col items-center">
                        <div className="flex flex-col -mt-28 max-w-[10rem]">
                            <img
                                className="[aspect-ratio:_1_/_1] w-full rounded-md object-cover"
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                            />
                        </div>
                        <h2 className="font-bold text-xl text-gray-900 mt-2 text-center tracking-tight">Велизар saf asf Стоянов</h2>
                        <p className="text-sm text-gray-400 self-center">София</p>
                        <SingleRating />
                    </div>
                    <Perks />
                    <VendorPrices />
                    <ContactButtons />
                    <div className="">
                        <h2 className="text-xl font-bold tracking-tight text-gray-900">
                            За мен
                        </h2>
                        <DetailedInfo />
                    </div>
                    <div className="border-t pt-6">
                        <h2 className="text-xl font-bold tracking-tight text-gray-900">
                            Портфолио
                        </h2>
                        <PortfolioTags />
                    </div>
                    <ShortInfo />
                    <RatingCard />
                </div>
            </div>

            {/* Larger screen */}
            <div className="grid sm:grid-cols-[1fr_2fr] gap-x-3 md:gap-x-6 lg:gap-x-9 max-w-5xl m-auto sm:p-8 bg-white">
                <div className="sm:col-start-1 [grid-row:1/10] bg-gradient-to-b sm:min-w-[13rem] sm:max-w-xs from-fuchsia-50 to-indigo-300 sm:bg-none">
                    {/* navigation */}
                    <div className="sm:hidden pt-4 flex justify-between items-center px-4 text-gray-600">
                        <Link to="/vendor-card">
                            <ChevronLeftIcon className="h-6 w-6"></ChevronLeftIcon>
                        </Link>
                        <p className="font-medium">Профил</p>
                        <BellIcon className="h-6 w-6"></BellIcon>
                    </div>
                    <div className="border-r flex flex-col mt-36 sm:mt-0 px-4 sm:px-0 bg-white rounded-t-3xl gap-8">

                        {/* Name, town, photo, rating */}
                        <div className="flex flex-col">
                            <div className="flex flex-col max-w-[10rem] w-full self-center sm:self-auto -mt-28 sm:mt-0 sm:max-w-full">
                                <img
                                    className="[aspect-ratio:_1_/_1] w-full rounded-md object-cover"
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt=""
                                />
                            </div>
                            <div className="px-3 md:px-5 flex flex-col items-center">
                                <h2 className="font-bold text-xl text-gray-900 mt-2 text-center tracking-tight">Велизар saf asf Стоянов</h2>
                                <p className="text-sm text-gray-400 self-center">София</p>
                                <SingleRating />
                            </div>
                        </div>

                        {/* Perks */}
                        <div className="sm:px-3 md:px-5">
                            <Perks />
                        </div>

                        {/* Contact Buttons */}
                        <div className="sm:px-3 md:px-5">
                            <ContactButtons />
                        </div>

                        {/* Portfolio */}
                        <div className="sm:px-3 md:px-5">
                            <h2 className="text-xl font-semibold tracking-tight text-gray-700 mb-4">
                                Портфолио
                            </h2>
                            <PortfolioTags />
                        </div>
                    </div>
                </div>
                {/* right column */}
                <div className="col-start-1 sm:col-start-2 px-4 sm:px-0 mt-8 sm:mt-0 order-1 sm:order-1">
                    <h2 className="text-xl font-semibold tracking-tight text-gray-700 mb-2">
                        За мен
                    </h2>
                    <DetailedInfo />
                </div>

                <div className="col-start-1 sm:col-start-2 px-4 sm:px-0 mt-8 order-2 sm:order-2">
                    <h2 className="text-xl font-semibold tracking-tight text-gray-700 mb-2">
                        Цени
                    </h2>
                    <VendorPrices />
                </div>

                <div className="col-start-1 sm:col-start-2 px-4 sm:px-0 mt-8 order-3 sm:order-3">
                    <h2 className="text-xl font-semibold tracking-tight text-gray-700 mb-3">
                        Статистика
                    </h2>
                    <ShortInfo />
                </div>

                <div className="col-start-1 sm:col-start-2 px-4 sm:px-0 mt-8 order-4 sm:order-4">
                    <h2 className="text-xl font-semibold tracking-tight text-gray-700 mb-2">
                        Ревюта от клиенти
                    </h2>
                    <RatingCard />
                </div>
            </div>
        </>
    );
}

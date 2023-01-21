import {
    BellIcon,
    CalendarIcon,
    ChatBubbleBottomCenterIcon,
    ChevronLeftIcon,
} from "@heroicons/react/24/outline";
import Badge from "../../utilityComponents/Badge";
import Perks from "./Perks";
import RatingCard from "../../utilityComponents/RatingCard";
import SingleRating from "./SingleRating";
import PortfolioTags from "./PortfolioTags";
import ContactButtons from "./ContactButtons";
import DetailedInfo from "./DetailedInfo";
import ShortInfo from "./ShortInfo";
import Tooltip from "./Tooltip";

export default function VendorCard() {
    return (
        <div className="bg-gradient-to-b max-w-2xl from-fuchsia-50 to-indigo-300">
            <div className="pt-4 flex justify-between items-center px-4  text-gray-600">
                <ChevronLeftIcon className="h-6 w-6"></ChevronLeftIcon>
                <p className="font-medium">Профил</p>
                <BellIcon className="h-6 w-6"></BellIcon>
            </div>


            <div className="mt-36 flex flex-col bg-white justify-center rounded-t-3xl px-4 gap-6">
                <div className="flex flex-col -mt-28 self-center max-w-[10rem]">
                    <SingleRating />

                </div>

                <Perks />
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
    );
}

import {
    BellIcon,
    CalendarIcon,
    ChatBubbleBottomCenterIcon,
    ChevronLeftIcon,
} from "@heroicons/react/24/outline";
import Badge from "../../utilityComponents/Badge";
import Perks from "./Perks";
import RatingCard from "../../utilityComponents/RatingCard";
import SingleRating from "../../utilityComponents/SingleRating";
import PortfolioTags from "./PortfolioTags";
import ContactButtons from "./ContactButtons";
import DetailedInfo from "./DetailedInfo";
import ShortInfo from "./ShortInfo";
import Tooltip from "./Tooltip";

export default function CardVendor() {
    return (
        <div className="bg-gradient-to-b max-w-2xl from-fuchsia-50 to-indigo-300">
            <div className="pt-4 flex justify-between items-center px-4  text-gray-600">
                <ChevronLeftIcon className="h-6 w-6"></ChevronLeftIcon>
                <p className="font-medium">Профил</p>
                <BellIcon className="h-6 w-6"></BellIcon>
            </div>


            <div className="mt-36 flex flex-col bg-white justify-center rounded-t-3xl px-4 gap-8">
                <SingleRating />

                <Perks />
                <ContactButtons />
                <DetailedInfo />
                <PortfolioTags />
                <ShortInfo />
                <RatingCard />
            </div>
        </div>
    );
}

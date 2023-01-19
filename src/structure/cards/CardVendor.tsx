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
        <div className="flex gap-4 -mt-28 justify-center flex-wrap">
          <SingleRating />
        </div>

        <div className="flex flex-col gap-1 ">
          <Perks />
        </div>
        <div className="flex flex-col gap-[22px] whitespace-nowrap w-full flex-1 ">
          <ContactButtons />
        </div>

      
        <div className="">
          <DetailedInfo />
        </div>

        <div className="flex gap-3 flex-wrap ">
          <PortfolioTags />
        </div>

        <div className="flex justify-between">
          <ShortInfo />
        </div>
        <RatingCard />
      </div>
    </div>
  );
}

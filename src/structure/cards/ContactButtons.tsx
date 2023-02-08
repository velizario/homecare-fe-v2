import {
    ChatBubbleBottomCenterIcon,
    CalendarIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

interface ContactButtonProps {
    openInputModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ContactButtons({ openInputModal }: ContactButtonProps) {
    return (
        <div className="flex w-full flex-1 flex-col gap-[22px] whitespace-nowrap ">
            <button
                type="button"
                onClick={(e) => {e.stopPropagation(); openInputModal(true)}}
                className="inline-flex items-center justify-center gap-2 rounded border border-transparent bg-indigo-600 px-2.5 py-3 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                <CalendarIcon className="h-5 w-5"></CalendarIcon>
                Запази час
            </button>
            <Link
                to="/dashboard/chat"
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded border border-gray-300 px-2.5 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-white hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                <ChatBubbleBottomCenterIcon className="h-5 w-5 flex-shrink-0"></ChatBubbleBottomCenterIcon>
                Свържи се
            </Link>
        </div>
    );
}

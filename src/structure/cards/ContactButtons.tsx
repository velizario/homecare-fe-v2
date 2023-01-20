import {
  ChatBubbleBottomCenterIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";

export default function ContactButtons() {
  return (
    <div className="flex flex-col gap-[22px] whitespace-nowrap w-full flex-1 ">
      <button
        type="button"
        className="inline-flex items-center justify-center rounded gap-2 border border-transparent bg-indigo-600 px-2.5 py-3 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <CalendarIcon className="h-5 w-5"></CalendarIcon>
        Запази час
      </button>
      <button
        type="button"
        className="inline-flex items-center justify-center gap-2 rounded border border-gray-300 px-2.5 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-opacity-30 hover:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <ChatBubbleBottomCenterIcon className="h-5 w-5 flex-shrink-0"></ChatBubbleBottomCenterIcon>
        Свържи се
      </button>
    </div>
  );
}

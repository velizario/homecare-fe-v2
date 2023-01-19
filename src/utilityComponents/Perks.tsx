import { BoltIcon, ChartBarIcon, ShieldCheckIcon, SparklesIcon } from "@heroicons/react/24/outline";

export default function Perks () {
    return (
        <div className="flex gap-2 pt-6 justify-evenly flex-shrink-1">
            <BoltIcon className="h-[34px] w-[34px] p-1.5 shadow-order shadow-indigo-300 rounded-full bg-indigo-50 text-indigo-700"></BoltIcon>
            <SparklesIcon className="h-[34px] w-[34px] p-1.5  shadow-order shadow-indigo-300 rounded-full bg-indigo-50 text-indigo-700"></SparklesIcon>
            <ShieldCheckIcon className="h-[34px] w-[34px] p-1.5  rounded-full bg-gray-50 text-gray-300"></ShieldCheckIcon>
            <ChartBarIcon className="h-[34px] w-[34px] p-1.5  shadow-order shadow-indigo-300 rounded-full bg-indigo-50 text-indigo-700"></ChartBarIcon>
        </div>
    )
}
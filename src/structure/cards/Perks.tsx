import {
  BoltIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import Tooltip from "./Tooltip";

export default function Perks() {
  return (
    <div className="flex gap-2 justify-evenly flex-shrink-1">
      <Tooltip tooltipText="Отговаря бързо">
        <BoltIcon className="h-[40px] w-[40px] p-1.5 shadow-sm shadow-indigo-200 rounded-full bg-indigo-50 text-indigo-700"></BoltIcon>
      </Tooltip>
      <Tooltip tooltipText="Висока оценка">
        <div className="drop-shadow-sm">
          <div className="clip-path-perks">
            <SparklesIcon className="h-[40px] w-[40px] p-1.5  shadow-indigo-200  bg-indigo-50 text-indigo-700 "></SparklesIcon>
          </div>
        </div>
      </Tooltip>
      <Tooltip tooltipText="Потвърден профил">
        <div className="drop-shadow-sm">
          <div className="clip-path-perks">
            <ShieldCheckIcon className="h-[40px] w-[40px] p-1.5 bg-gray-50 text-gray-300"></ShieldCheckIcon>
          </div>
        </div>
      </Tooltip>
      <Tooltip tooltipText="Старо куче">
        <div className="drop-shadow-md">
          <div className="clip-path-perks">
            <ChartBarIcon className="h-[40px] w-[40px] p-1.5  shadow-indigo-200  bg-indigo-50 text-indigo-700"></ChartBarIcon>
          </div>
        </div>
      </Tooltip>
    </div>
  );
}

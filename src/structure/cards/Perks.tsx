import {
  BoltIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import Tooltip from "./Tooltip";

export default function Perks() {
  return (
    <div className="flex gap-6 justify-center">
      <Tooltip tooltipText="Отговаря бързо">
        <div className="drop-shadow-sm">
          <div className="clip-path-perks">
            <BoltIcon className="h-[35px] w-[35px] p-1.5 bg-indigo-50 text-indigo-600"></BoltIcon>
          </div>
        </div>
      </Tooltip>
      <Tooltip tooltipText="Висока оценка">
        <div className="drop-shadow-sm">
          <div className="clip-path-perks">
            <SparklesIcon className="h-[35px] w-[35px] p-1.5  bg-indigo-50 text-indigo-600 "></SparklesIcon>
          </div>
        </div>
      </Tooltip>
      <Tooltip tooltipText="Потвърден профил" styles="text-gray-400 bg-gray-100">
        <div className="drop-shadow-sm">
          <div className="clip-path-perks">
            <ShieldCheckIcon className="h-[35px] w-[35px] p-1.5 bg-gray-50 text-gray-300"></ShieldCheckIcon>
          </div>
        </div>
      </Tooltip>
      <Tooltip tooltipText="Старо куче">
        <div className="drop-shadow-sm">
          <div className="clip-path-perks">
            <ChartBarIcon className="h-[35px] w-[35px] p-1.5  bg-indigo-50 text-indigo-600"></ChartBarIcon>
          </div>
        </div>
      </Tooltip>
    </div>
  );
}

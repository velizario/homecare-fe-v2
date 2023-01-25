import Tooltip from "./Tooltip";

export default function ShortInfo() {
  return (
    <div className="flex justify-between md:justify-start md:gap-20">
      <Tooltip tooltipText="Брой уникални клиенти">
        <div className="rounded-full bg-gradient-to-r p-[2px] from-indigo-200 via-sky-200 to-indigo-500 shadow-md">
          <div className="flex flex-col items-center bg-white justify-center h-[70px] w-[70px] rounded-full">
            <p className="text-xs text-gray-500">Клиенти</p>
            <p className="text-gray-700 font-semibold">5</p>
          </div>
        </div>
      </Tooltip>
      {/* <Tooltip tooltipText="Брой уникални клиенти">
        <div className="flex flex-col items-center justify-center h-[75px] w-[75px] border-2 border-indigo-50 shadow-md rounded-full">
          <p className="text-xs text-gray-500">Клиенти</p>
          <p className="text-gray-700 font-semibold">5</p>
        </div>
      </Tooltip> */}
      <Tooltip tooltipText="Брой уникални клиенти">
        <div className="rounded-full bg-gradient-to-r p-[2px] from-indigo-200 via-sky-200 to-indigo-500 shadow-md">
          <div className="flex flex-col items-center bg-white justify-center h-[70px] w-[70px] rounded-full">
            <p className="text-xs text-gray-500">Поръчки</p>
            <p className="text-gray-700 font-semibold">120</p>
          </div>
        </div>
      </Tooltip>
      <Tooltip tooltipText="Брой уникални клиенти">
        <div className="rounded-full bg-gradient-to-r p-[2px] from-indigo-200 via-sky-200 to-indigo-500 shadow-md">
          <div className="flex flex-col items-center bg-white justify-center h-[70px] w-[70px] rounded-full">
            <p className="text-xs text-gray-500">Оценка</p>
            <p className="text-gray-700 font-semibold">4.5</p>
          </div>
        </div>
      </Tooltip>
    </div>
  );
}

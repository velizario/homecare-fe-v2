export default function VendorPrices() {
    return (
        <div>
            <div className="flex flex-col gap-1 mt-3 sm:col-start-2 col-start-1 col-span-2 sm:col-span-1 row-start-4 sm:row-start-2">
                <div className="flex gap-1 justify-between border-b pb-1 mb-1">
                    <p className="text-xs text-gray-400">Вид почистване</p>
                    <p className="text-gray-400 text-xs whitespace-nowrap">Цена от</p>
                </div>
                <div className="flex gap-1 justify-between">
                    <p className="text-gray-800 text-sm">Еднократно</p>
                    <p className="w-full border-b border-dotted relative inline-block bottom-[0.3rem]"></p>
                    <p className="text-gray-800 text-sm font-semibold whitespace-nowrap">20 лв/ч</p>
                </div>
                <div className="flex gap-1 justify-between">
                    <p className="text-gray-800 text-sm">Абонаментно</p>
                    <p className="w-full border-b border-dotted relative inline-block bottom-[0.3rem]"></p>
                    <p className="text-gray-800 text-sm font-semibold whitespace-nowrap">15 лв/ч</p>
                </div>
                <div className="flex gap-1 justify-between">
                    <p className="text-gray-800 text-sm">Основно</p>
                    <p className="w-full border-b border-dotted relative inline-block bottom-[0.3rem]"></p>
                    <p className="text-gray-800 text-sm font-semibold whitespace-nowrap">50 лв/ч</p>
                </div>
                <div className="flex gap-1 justify-between">
                    <p className="text-gray-800 text-sm">Дивани</p>
                    <p className="w-full border-b border-dotted relative inline-block bottom-[0.3rem]"></p>
                    <p className="text-gray-800 text-sm font-semibold whitespace-nowrap">25 лв</p>
                </div>

            </div>
        </div>
    )
}
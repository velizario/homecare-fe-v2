import { userState } from "../../store/userState";
import { Portfolio } from "../../types/types";

type VendorPricesProps = {
  portfolio: Portfolio[];
};

export default function VendorPrices({ portfolio }: VendorPricesProps) {
  return (
    <div className="col-span-2 col-start-1 row-start-4 mt-3 flex flex-col gap-1 sm:col-span-1 sm:col-start-2 sm:row-start-2">
      <div className="mb-1 flex justify-between gap-1 border-b  border-dotted pb-1">
        <p className="text-xs text-gray-400">Вид почистване</p>
        <p className="whitespace-nowrap text-xs text-gray-400">Цена от</p>
      </div>
      {portfolio.length > 0 &&
        portfolio.map((item) => (
          <div key={item.service.id} className="flex justify-between gap-1">
            <p className="text-sm text-gray-800">{item.service.value}</p>
            <p className="relative bottom-[0.3rem] inline-block border-b border-dotted"></p>
            <p className="whitespace-nowrap text-sm font-semibold text-gray-800">{item.price} лв/час</p>
          </div>
        ))}
      {/* <p className="-mt-1 text-xs text-gray-600">........</p> */}
    </div>
  );
}

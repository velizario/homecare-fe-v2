import { StarIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import classNames from "../../helpers/classNames";
import { Link } from "react-router-dom";
import VendorPrices from "./VendorPrices";
import { Vendor } from "../../types/types";
import { createFullName, publicImage } from "../../helpers/helperFunctions";

const userRating = 5;

type TVendorCard = {
  vendor: Vendor;
};

export default function VendorCard({ vendor }: TVendorCard) {
  return (
    <div>
      <div className="grid grid-cols-[min-content_1fr] gap-x-2 rounded-md bg-white p-4 shadow-order hover:shadow-order-hover sm:gap-x-4">
        {/* photo */}
        <div className="col-start-1 row-start-1 flex w-20 items-center justify-center drop-shadow-xl sm:row-span-2 sm:w-48">
          <img
            className={classNames("clip-path-photo rounded-md  [aspect-ratio:_1_/_1]", !vendor.user.imageUrl ? "h-1/2 w-auto" : "w-full h-full object-cover")}
            src={publicImage(vendor.user.imageUrl)}
            alt=""
          />
        </div>
        {/* base info and rating */}
        <div className="col-start-2 flex flex-col">
          <h2 className="-mt-1.5 font-serif text-lg font-medium">{createFullName(vendor.user)}</h2>
          <p className="text-sm text-gray-400">София</p>
          <div className="mt-1 flex items-end gap-1">
            <span className="text-sm font-medium text-yellow-400">4.8</span>
            <div className="mb-0.5 flex">
              {[0, 1, 2, 3, 4, 5].map((rating) => (
                <StarIcon
                  key={rating}
                  className={classNames(userRating > rating ? "text-yellow-400" : "text-gray-200", "h-5 w-5 flex-shrink-0")}
                  aria-hidden="true"
                />
              ))}
            </div>
            <p className="cursor-pointer text-sm text-gray-400">
              (<span className="text-indigo-600 underline underline-offset-2">52</span>)
            </p>
          </div>
        </div>
        {/* about */}
        <div className="col-span-2 col-start-1 row-start-3 mt-4">
          <p className="line-clamp-4 text-sm leading-normal text-gray-800">{vendor.about}</p>
        </div>
        {/* more info */}
        {/* prices */}
        <VendorPrices />
        <Link to={`/vendor-card/${vendor.id}`} className="order-last col-span-2 col-start-1 row-start-[10]">
          <div className="mt-1 flex items-center text-indigo-600">
            <p className="font-serif text-sm">Още информация и услуги</p>
            <ChevronRightIcon className="mt-0.5 h-5 w-5"></ChevronRightIcon>
          </div>
        </Link>
      </div>
    </div>
  );
}

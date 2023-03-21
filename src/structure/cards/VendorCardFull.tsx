import Perks from "./Perks";
import RatingCard from "../../utilityComponents/RatingCard";
import SingleRating from "./SingleRating";
import PortfolioTags from "./PortfolioTags";
import ContactButtons from "./ContactButtons";
import DetailedInfo from "./DetailedInfo";
import { useEffect, useState } from "react";
import VendorPrices from "./VendorPrices";
import CreateOrder from "../searchOrders/CreateOrder";
import { BACKEND_URL } from "../../helpers/envVariables";
import { getVendor, Vendor } from "../../model/vendorModel";
import classNames from "../../helpers/classNames";

export default function VendorCardFull({ vendorId }: { vendorId: string }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // TODO do something with this var
  // console.log(sidebarOpen);

  const [inputModalOpened, setInputModalOpened] = useState(false);
  const [vendor, setVendor] = useState<Vendor>();

  const fetchVendorData = async () => {
    const vendorData = await getVendor(vendorId);
    setVendor(vendorData);
  };

  useEffect(() => {
    fetchVendorData();
  }, []);

  return (
    <>
      {vendor && (
        <>
          <CreateOrder
            inputModalOpened={inputModalOpened}
            openInputModal={setInputModalOpened}
          />
          {/* Larger screen */}
          <div className="mx-auto grid max-w-5xl gap-x-3 bg-white sm:grid-cols-[1fr_2fr] sm:px-4 md:gap-x-6 lg:gap-x-9">
            <div className="bg-gradient-to-b from-fuchsia-50 to-indigo-300 [grid-row:1/10] sm:col-start-1 sm:min-w-[13rem] sm:max-w-xs sm:bg-none">
              <div className="mt-36 flex flex-col gap-8 rounded-t-3xl border-r bg-white px-4 sm:mt-0 sm:px-0">
                {/* Name, town, photo, rating */}
                <div className="flex flex-col">
                  <div className="-mt-28 flex w-full min-h-[10rem] flex-col self-center sm:mt-0 sm:max-w-full sm:self-auto items-center justify-center">
                    <img
                      className={classNames("w-full rounded-md object-cover [aspect-ratio:_1_/_1]", (!vendor.imageUrl) ? "w-14 h-14" : "")}
                      src={`${BACKEND_URL}/users/public/${
                        vendor.imageUrl || "defaultImage.png"
                      }`}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col items-center px-3 md:px-5">
                    <h2 className="mt-2 text-center text-xl font-bold tracking-tight text-gray-900">
                      {vendor.firstName} {vendor.lastName}
                    </h2>
                    <p className="self-center text-sm text-gray-400">{vendor.city}</p>
                    <SingleRating />
                  </div>
                </div>

                {/* Perks */}
                <div className="sm:px-3 md:px-5">
                  <Perks />
                </div>

                {/* Contact Buttons */}
                <div className="sm:px-3 md:px-5">
                  <ContactButtons openInputModal={setInputModalOpened} />
                </div>

                {/* Portfolio */}
                <div className="sm:px-3 md:px-5">
                  <h2 className="mb-4 text-xl font-semibold tracking-tight text-gray-700">
                    Портфолио
                  </h2>
                  <PortfolioTags />
                </div>

                <div className="sm:px-3 md:px-5">
                  <h2 className="mb-4 text-xl font-semibold tracking-tight text-gray-700">
                    Контакти
                  </h2>
                  <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2"><img className="h-6 w-6" src="https://img.icons8.com/3d-plastilina/69/null/instagram-new--v1.png"/> <p className="text-sm">{vendor.instagram}</p></div>
                  <div className="flex items-center gap-2"><img className="h-6 w-6" src="https://img.icons8.com/external-justicon-lineal-color-justicon/64/null/external-facebook-social-media-justicon-lineal-color-justicon.png"/> <p className="text-sm">{vendor.facebook}</p></div>
                  <div className="flex items-center gap-2"><img className="h-6 w-6" src="https://img.icons8.com/external-line-vectorslab/68/null/external-Www-business-office-supplies-line-vectorslab.png"/> <p className="text-sm">{vendor.website}</p></div>
                  </div>
                </div>
              </div>
            </div>
            {/* right column */}
            <div className="order-1 col-start-1 mt-8 px-4 sm:order-1 sm:col-start-2 sm:mt-0 sm:px-0">
              <h2 className="mb-2 text-xl font-semibold tracking-tight text-gray-700">
                За мен
              </h2>
              <DetailedInfo about={vendor.about} />
            </div>

            <div className="order-2 col-start-1 mt-8 px-4 sm:order-2 sm:col-start-2 sm:px-0">
              <h2 className="mb-2 text-xl font-semibold tracking-tight text-gray-700">
                Цени
              </h2>
              <VendorPrices />
            </div>

            <div className="order-3 col-start-1 mt-8 px-4 sm:order-3 sm:col-start-2 sm:px-0">
              <h2 className="mb-3 text-xl font-semibold tracking-tight text-gray-700">
                Статистика
              </h2>
            </div>

            <div className="order-4 col-start-1 mt-8 px-4 sm:order-4 sm:col-start-2 sm:px-0">
              <h2 className="mb-2 text-xl font-semibold tracking-tight text-gray-700">
                Ревюта от клиенти
              </h2>
              <RatingCard />
            </div>
          </div>
        </>
      )}
    </>
  );
}

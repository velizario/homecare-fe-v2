import { LightGallery } from "lightgallery/lightgallery";
import React from "react";
import { publicPortfolioImage, sortObjArrAsc } from "../../helpers/helperFunctions";
import { PortfolioImage } from "../../types/types";

type VendorPortfolioImagesProps = {
  images: PortfolioImage[];
  galleryControl: LightGallery;
};

export default function VendorPortfolioImages({ images, galleryControl }: VendorPortfolioImagesProps) {
  return (
    <>
      <div className="order-2 col-start-1 mt-8 px-4 sm:order-2 sm:col-start-2 sm:px-0">
        <h2 className="mb-2 text-xl font-semibold tracking-tight text-gray-700">Портфолио</h2>
        <div className=" order-3 mt-4 grid w-[calc(100%-3rem)] grid-cols-[repeat(auto-fill,minmax(6rem,1fr))] gap-y-8">
          {sortObjArrAsc(images).map((image, index) => (
            <div
              onClick={() => galleryControl.openGallery(index)}
              key={image.id}
              className="group relative inline-flex h-[10rem] w-full min-w-[10rem] flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-gray-300 shadow-[-15px_5px_10px_-5px_rgba(0,0,0,0.3)] transition-all hover:-translate-y-2 hover:shadow-[-5px_-0px_15px_0px_rgba(39,42,181,1)]"
            >
              <img src={publicPortfolioImage(image.imgUrl)} alt={image.imgUrl} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

import { InitDetail } from "lightgallery/lg-events";
import { GalleryItem } from "lightgallery/lg-utils";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import LightGallery from "lightgallery/react";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { publicPortfolioImage, sortObjArrAsc } from "../helpers/helperFunctions";
import { PortfolioImage } from "../types/types";
import { LightGallery as TLightGallery } from "lightgallery/lightgallery";

type ImageGalleryProps = {
  images: PortfolioImage[];
};

export default function ImageGallery({ images }: ImageGalleryProps) {
  const galleryRef = useRef<TLightGallery | null>(null);
  const imageGallery = images.map(
    (image) => ({ src: publicPortfolioImage(image.imgUrl), thumb: publicPortfolioImage(image.imgUrl), subHtml: image.imgUrl } as GalleryItem)
  );

  const onInit = useCallback((detail: InitDetail) => {
    detail && (galleryRef.current = detail.instance);
  }, []);

  return (
    <>
      <LightGallery dynamic={true} dynamicEl={imageGallery} onInit={onInit} speed={500} plugins={[lgThumbnail, lgZoom]}></LightGallery>
      <div className=" order-3 mt-4 grid w-[calc(100%-3rem)] grid-cols-[repeat(auto-fill,minmax(6rem,1fr))] gap-y-8">
        {sortObjArrAsc(images).map((image, index) => (
          <div
            onClick={() => galleryRef.current?.openGallery(index)}
            key={image.id}
            className="group relative inline-flex h-[10rem] w-full min-w-[10rem] flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-gray-300 shadow-[-15px_5px_10px_-5px_rgba(0,0,0,0.3)] transition-all hover:-translate-y-2 hover:shadow-[-5px_-0px_15px_0px_rgba(39,42,181,1)]"
          >
            <img src={publicPortfolioImage(image.imgUrl)} alt={image.imgUrl} className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
    </>
  );
}

import { InitDetail } from "lightgallery/lg-events";
import { GalleryItem } from "lightgallery/lg-utils";
import { LightGallery as TLightGallery } from "lightgallery/lightgallery";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import LightGallery from "lightgallery/react";
import { useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { publicPortfolioImage, sortObjArrAsc } from "../helpers/helperFunctions";
import { PortfolioImage } from "../types/types";

type ImageGalleryProps = {
  images: PortfolioImage[];
};

export default function ImageGallery({ images }: ImageGalleryProps) {
  // const galleryRef = useRef<TLightGallery | null>(null);
  let galleryControl: TLightGallery;

  const imageGallery = images.map(
    (image) => ({ src: publicPortfolioImage(image.imgUrl), thumb: publicPortfolioImage(image.imgUrl), subHtml: image.imgUrl } as GalleryItem)
  );

  const onInit = useCallback((detail: InitDetail) => {
    galleryControl = detail.instance;
    // detail && (galleryRef.current = detail.instance);
  }, []);

  return (
    <>
      {createPortal(
        <LightGallery dynamic={true} dynamicEl={imageGallery} onInit={onInit} speed={500} plugins={[lgThumbnail, lgZoom]}></LightGallery>,
        document.body
      )}
      {sortObjArrAsc(images).map((image, index) => (
        <div
          onClick={() => galleryControl?.openGallery(index)}
          key={image.id}
          className="group relative inline-flex h-[10rem] w-full min-w-[10rem] flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-gray-300 shadow-[-15px_5px_10px_-5px_rgba(0,0,0,0.3)] transition-all hover:-translate-y-2 hover:shadow-[-5px_-0px_15px_0px_rgba(39,42,181,1)]"
        >
          <img src={publicPortfolioImage(image.imgUrl)} alt={image.imgUrl} className="h-full w-full object-cover" />
        </div>
      ))}
    </>
  );
}

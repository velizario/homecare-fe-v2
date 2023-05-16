import { InitDetail } from "lightgallery/lg-events";
import { GalleryItem } from "lightgallery/lg-utils";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import LightGallery from "lightgallery/react";
import React, { useCallback, useEffect, useRef } from "react";
import { publicPortfolioImage } from "../helpers/helperFunctions";
import { PortfolioImage } from "../types/types";

type ImageGalleryComponentProps = {
  images: PortfolioImage[];
  galleryRef: React.MutableRefObject<any>;
};

export default function ImageGalleryComponent({ galleryRef, images }: ImageGalleryComponentProps) {
  const imageGallery = images.map(
    (image) => ({ src: publicPortfolioImage(image.imgUrl), thumb: publicPortfolioImage(image.imgUrl), subHtml: image.imgUrl } as GalleryItem)
  );

  const onInit = useCallback((detail: InitDetail) => {
    if (detail) {
      galleryRef.current = detail.instance;
    }
  }, []);

  useEffect(() => {
    galleryRef.current?.refresh();
  }, [images]);

  return (
    <div>
      <LightGallery
        dynamic={true}
        dynamicEl={imageGallery}
        onInit={onInit}
        // selector=".galleryImage"
        speed={500}
        plugins={[lgThumbnail, lgZoom]}
      ></LightGallery>
    </div>
  );
}

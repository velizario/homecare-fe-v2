import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import { PortfolioImage } from "../types/types";
import { publicImage } from "../helpers/helperFunctions";

type ImageGalleryProps = {
  images: PortfolioImage[];
};

export default function ImageGallery({ images }: ImageGalleryProps) {
  return (
    images && (
      <LightGallery speed={500} plugins={[lgThumbnail, lgZoom]}>
        {images.map((image) => (
          <a href={publicImage(image.imgUrl)}>
            <img src={publicImage(image.imgUrl)} alt={image.imgUrl} />
          </a>
        ))}
      </LightGallery>
    )
  );
}

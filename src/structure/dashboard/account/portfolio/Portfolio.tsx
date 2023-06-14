import { CameraIcon, TrashIcon } from "@heroicons/react/24/outline";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lightgallery.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import classNames from "../../../../helpers/classNames";
import { portfolioImage, sortObjArrAsc } from "../../../../helpers/helperFunctions";
import { useUpload } from "../../../../helpers/UploadImage";
import { deletePortfolioImage } from "../../../../model/vendorModel";
import { placeholderImage } from "../../../../store/static";
import { userState } from "../../../../store/userState";
import { PortfolioImage } from "../../../../types/types";

export default function Portfolio() {
  const { setUpload, status } = useUpload();

  const [userData, setUserData] = userState((state) => [state.userData, state.setUserData]);
  const images = userData?.vendor?.portfolioImage;

  console.log(userData);
  const submitHandler = async (image: PortfolioImage) => {
    const resData = await deletePortfolioImage(image);
    if (!resData) {
      console.log("Apperror in Portfolio.tsx - could not update Images");
      return;
    }
    const editedUser = { ...userData, vendor: { ...userData.vendor, portfolioImage: resData } };
    setUserData(editedUser);
  };

  return (
    <div className="mt-4 max-w-7xl">
      <p className="text-sm text-gray-500">Тук можете да добавите снимки от работата ви (максимум 12 снимки)</p>
      <div className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(14rem,1fr))] gap-x-6 gap-y-8">
        <div
          className={classNames(
            "group relative col-span-1 flex h-[10rem] items-center justify-center overflow-hidden rounded-xl bg-gray-50  ring-1 transition-colors hover:ring-2",
            images?.length > 12 ? "pointer-events-none opacity-30" : null
          )}
        >
          <div className="relative h-6 w-6 text-gray-500 transition-colors group-hover:text-gray-700">
            <p className="absolute -right-1 -top-4 text-2xl">+</p>
            <CameraIcon />
          </div>
          <input
            title="Добави снимка"
            type="file"
            multiple
            name="myFile"
            onChange={setUpload}
            accept="image/*"
            className="absolute inset-0 cursor-pointer opacity-0 [&::file-selector-button]:hidden"
          />
        </div>

        {images?.length > 0 &&
          sortObjArrAsc(images).map((image, index) => (
            <a
              href={portfolioImage(image.imgUrl)}
              target="_blank"
              key={image.id}
              className="group relative inline-flex h-[10rem] w-full min-w-[12rem]  flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-gray-50 ring-1 transition-colors hover:ring-2"
            >
              {/* <img src={portfolioImage(image.imgUrl)} alt={image.imgUrl} className="h-full w-full object-cover" /> */}
              <LazyLoadImage
                className="h-full w-full object-cover"
                placeholderSrc={placeholderImage}
                alt={portfolioImage(image.imgUrl)}
                effect="blur"
                // height={image.height}
                src={portfolioImage(image.imgUrl)} // use normal <img> attributes as props
                // width={image.width}
              />
              <button
                className="absolute"
                data-id={image.id}
                onClick={(e) => {
                  e.preventDefault();
                  submitHandler(image);
                }}
              >
                <TrashIcon className="h-9 w-9 rounded-full bg-gray-100 stroke-2 p-2 text-gray-600 opacity-0 transition-all hover:bg-white hover:text-gray-800 group-hover:opacity-100" />
              </button>
            </a>
          ))}
      </div>
    </div>
  );
}

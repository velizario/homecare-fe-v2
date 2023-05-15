import { ChangeEvent, useState } from "react";
import { fetchUserState } from "../model/clientModel";
import { userState } from "../store/userState";
import { requestToAPI } from "./helperFunctions";

export const useUpload = () => {
  const [status, setStatus] = useState({ error: "", isUploading: false });
  const userData = userState.getState().userData;

  const setError = (errorText: string) => setStatus({ error: errorText, isUploading: false });

  const setUploading = (uploading: boolean) => setStatus({ error: "", isUploading: uploading && true });

  const setUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setError("Няма избран файл");
      return;
    }

    const userImages = Object.values(e.target.files);
    const regex = new RegExp(/[^\s]+(.*?).(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/);
    const asyncArr = [] as (() => Promise<any>)[];

    const newImages = userImages.filter(
      // removes repeating images with the existing ones and removes non-image files
      (image) => userData.vendor.portfolioImage.findIndex((dbImage) => dbImage.imgUrl === image.name) === -1 && regex.test(image.name)
    );
    if (newImages.length === 0) return;
    // limits size to 12 when combined with existing images
    newImages.splice(12 - userData.vendor.portfolioImage.length)
    console.log(newImages.length)

    setUploading(true);
    newImages.forEach(async (image) => {
      const fileList = new FormData();
      fileList.append(`uploadCandidate`, image, image.name);
      asyncArr.push(async () => await requestToAPI("vendors/upload", "POST", fileList, true));
    });

    const promiseArray = asyncArr.map((arr) => arr()).flat();
    await Promise.all(promiseArray);
    setUploading(false);

    fetchUserState();
  };

  return { setUpload, status };
};

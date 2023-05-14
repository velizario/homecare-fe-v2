import { ChangeEvent, useState } from "react";
import { requestToAPI } from "./helperFunctions";
import { userState } from "../store/userState";
import { User, Vendor } from "../types/types";
import { fetchUserState } from "../model/clientModel";

export const useUpload = () => {
  const [status, setStatus] = useState({ error: "", isUploading: false });
  const [userData, setUserData] = userState((state) => [state.userData, state.setUserData]);

  const setError = (errorText: string) => setStatus({ error: errorText, isUploading: false });

  const setUploading = (uploading: boolean) => setStatus({ error: "", isUploading: uploading && true });

  const setUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setError("Няма избран файл");
      return;
    }

    const userImages = Object.values(e.target.files);

    let regex = new RegExp(/[^\s]+(.*?).(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/);
    
    setUploading(true);
    userImages.forEach(async (image) => {
      const fileList = new FormData();
      if (!regex.test(image.name)) {
        e.target.value = "";
        setError("Избери валидно изображение (jpg/png/gif)");
        return;
      }
      fileList.append(`uploadCandidate`, image, image.name);
      const fileUpload = await requestToAPI("vendors/upload", "POST", fileList, true);


      console.log(fileUpload)
      if (fileUpload.status !== "success" ) setError(fileUpload.data)
       else setUserData({...userData, vendor: {...userData.vendor, ...fileUpload.data as Vendor}})

    });


    setUploading(false);

  };

  return { setUpload, status };
};

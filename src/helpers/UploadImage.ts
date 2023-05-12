import { ChangeEvent, useState } from "react";
import { requestToAPI } from "./helperFunctions";
import { userState } from "../store/userState";
import { User } from "../types/types";

export const useUpload = () => {
  const [status, setStatus] = useState({ error: "", isUploading: false});
  const setUserData = userState((state) => state.setUserData);

  const setError = (errorText: string) => setStatus({ error: errorText, isUploading: false});

  const setUploading = (uploading: boolean) => setStatus({ error: "", isUploading: (uploading && true)})

  const setUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setError("Няма избран файл");
      return;
    }
    const userImage = e.target.files[0];

    // Check if file has image extension
    let regex = new RegExp(/[^\s]+(.*?).(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/);
    if (!regex.test(userImage.name)) {
      e.target.value = "";
      setError("Избери валидно изображение (jpg/png/gif)");
      return;
    }

    // const file = e.target.files[0]
    const file = new FormData();
    file.append("file", userImage, userImage.name);
    setUploading(true);
    const fileUpload = await requestToAPI("users/upload", "POST", file, true);

    if (fileUpload.status !== "success") setError(fileUpload.data);
    else {
      setUserData(fileUpload.data as User);
      setUploading(false)
    }
  };

  return { setUpload, status };
};

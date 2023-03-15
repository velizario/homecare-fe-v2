import { ChangeEvent, useEffect, useState } from "react";
import loadingImage from "../../../../assets/loading.gif";
import { getToken } from "../../../../helpers/helperFunctions";
import { userDataRefresh } from "../../../../model/userModel";
import { userState } from "../../../../store/userState";

export default function ProfilePhoto() {
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const setUserData = userState((state) => state.setUserData);
  const imageUrl = userState((state) => state.userData.imageUrl);

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const userImage = e.target.files[0];

    // Check if file has image extension
    let regex = new RegExp(/[^\s]+(.*?).(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/);
    if (!regex.test(userImage.name)) {
      e.target.value = "";
      setImageUploadError(true);
      return;
    }

    setImageUploadError(false);

    // const file = e.target.files[0]
    const file = new FormData();
    file.append("file", userImage, userImage.name);

    setUploadingImage(true);
    fetch(`${import.meta.env.VITE_BACKEND_URL}/users/upload`, {
      method: "POST",
      headers: {
        Authorization: getToken() || "",
      },
      body: file,
    })
      .then(async (res) => {
        const newUser = await userDataRefresh();
        setUserData(newUser);
        return res.json();
      })
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    setUploadingImage(false);
  }, [imageUrl]);

  return (
    <>
      <div className="sm:col-span-6">
        <label htmlFor="photo" className="flex text-sm text-gray-900">
          Снимка
          {uploadingImage && (
            <img src={loadingImage} className="ml-4 h-5 w-5"></img>
          )}
        </label>
        <div className="mt-1 flex items-center">
          <img
            className="inline-block h-12 w-12 rounded-full"
            src={`${import.meta.env.VITE_BACKEND_URL}/users/public/${imageUrl || "defaultImage.png"}`}
            alt=""
          />
          <div className="ml-4 flex items-center">
            <div className="relative flex cursor-pointer items-center rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm hover:bg-gray-50">
              <label
                htmlFor="user-photo"
                className="pointer-events-none relative text-sm text-gray-900"
              >
                {/* //TODO bug - sticks above the mobile menu */}
                <span>Смени</span>
                <span className="sr-only"> user photo</span>
              </label>
              <input
                type="file"
                name="myFile"
                onChange={handleUpload}
                accept="image/*"
                className="absolute inset-0 h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0"
              />
            </div>

            <button
              type="button"
              className="ml-3 rounded-md border border-transparent bg-transparent py-2 px-3 text-sm text-gray-900 hover:text-gray-700 focus:border-gray-300 "
            >
              Премахни
            </button>
          </div>
        </div>

        <p className="h-1 text-xs text-red-700">
          {imageUploadError
            ? "Изберете валидно изображение (jpg/png/gif)"
            : " "}
        </p>
      </div>
    </>
  );
}

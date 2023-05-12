import { useEffect, useState } from "react";
import loadingImage from "../../../../assets/loading.gif";
import { BACKEND_URL } from "../../../../helpers/envVariables";
import { userState } from "../../../../store/userState";
import { useUpload } from "../../../../helpers/UploadImage";

export default function ProfilePhoto() {
  const imageUrl = userState((state) => state.userData.imageUrl);
  const { setUpload, status } = useUpload();

  return (
    <>
      <div className="sm:col-span-6">
        <label htmlFor="photo" className="flex text-sm text-gray-900">
          Снимка
          {status.isUploading  && <img src={loadingImage} className="ml-4 h-5 w-5"></img>}
        </label>
        <div className="mt-1 flex items-center">
          <img className="inline-block h-12 w-12 rounded-full" src={`${BACKEND_URL}/users/public/${imageUrl || "defaultImage.png"}`} alt="" />
          <div className="ml-4 flex items-center">
            <div className="relative flex cursor-pointer items-center rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm hover:bg-gray-50">
              <label htmlFor="user-photo" className="pointer-events-none relative text-sm text-gray-900">
                {/* //TODO bug - sticks above the mobile menu */}
                <span>Смени</span>
                <span className="sr-only"> user photo</span>
              </label>
              <input
                type="file"
                name="myFile"
                onChange={setUpload}
                accept="image/*"
                className="absolute inset-0 h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0"
              />
            </div>

            <button
              type="button"
              className="ml-3 rounded-md border border-transparent bg-transparent px-3 py-2 text-sm text-gray-900 hover:text-gray-700 focus:border-gray-300 "
            >
              Премахни
            </button>
          </div>
        </div>

        <p className="h-1 text-xs text-red-700">{status.error}</p>
      </div>
    </>
  );
}

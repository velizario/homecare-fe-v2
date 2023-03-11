import { useEffect, useState } from "react";
import { UserType } from "../../../../helpers/types";
import InputField from "../../../../utilityComponents/InputField";
import ComboSelectBox from "./ComboSelectBox";
import InputFieldProfileToggler from "./InputFieldProfileToggler";
import ProfileAbout from "./ProfileAbout";
import ProfilePhoto from "./ProfilePhoto";
import RegionSelection from "./RegionSelection";

const profileInputValues = {
  firstName: {
    scope: [UserType.CLIENT, UserType.VENDOR_INDIVIDUAL],
    className: "sm:col-span-3",
    name: "first-name",
    id: "first-name",
    label: "Име*",
    autoComplete: "given-name",
  },
  lastName: {
    scope: [UserType.CLIENT, UserType.VENDOR_INDIVIDUAL],
    className: "sm:col-span-3",
    name: "last-name",
    id: "last-name",
    label: "Фамилия*",
    autoComplete: "family-name",
  },
  companyName: {
    scope: [UserType.VENDOR_COMPANY],
    className: "sm:col-span-6",
    name: "company",
    id: "company",
    label: "Име на фирма*",
  },
  url: {
    scope: [UserType.VENDOR_COMPANY, UserType.VENDOR_INDIVIDUAL],
    className: "sm:col-span-3",
    name: "url",
    id: "url",
    label: "Уеб сайт",
  },
  facebook: {
    scope: [UserType.VENDOR_COMPANY, UserType.VENDOR_INDIVIDUAL],
    className: "sm:col-span-3",
    name: "facebook",
    id: "facebook",
    label: "Фейсбук",
  },
  phone: {
    scope: [UserType.VENDOR_COMPANY, UserType.VENDOR_INDIVIDUAL, UserType.CLIENT],
    className: "sm:col-span-3",
    name: "phone-number",
    id: "phone-number",
    label: "Телефонен номер*",
    autoComplete: "tel",
  },
};

export default function Profile() {

  const [scrolledPosition, setScrolledPosition] = useState<number | null>(null)

  window.addEventListener("scroll", () => { setScrolledPosition(window.scrollY); });


  useEffect(() => {
    console.log(scrolledPosition)
  }, [scrolledPosition])


  return (
    <>
      <div className="flex-1 py-4 px-4 md:px-6 lg:px-8">
        <form className="space-y-8 max-w-3xl">
          <p className="text-sm text-gray-500">
            Информацията ще бъде използвана за да съставим вашата &quot;Визитка&quot;.
          </p>
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
            <ProfilePhoto />
            <InputFieldProfileToggler scope={profileInputValues.firstName.scope}><InputField {...profileInputValues.firstName} /></InputFieldProfileToggler>
            <InputFieldProfileToggler scope={profileInputValues.lastName.scope}><InputField {...profileInputValues.lastName} /></InputFieldProfileToggler>
            <InputFieldProfileToggler scope={profileInputValues.companyName.scope}><InputField {...profileInputValues.companyName} /></InputFieldProfileToggler>
            <InputFieldProfileToggler scope={[UserType.VENDOR_COMPANY, UserType.VENDOR_INDIVIDUAL, UserType.CLIENT]}><ProfileAbout /></InputFieldProfileToggler>
            <InputFieldProfileToggler scope={profileInputValues.facebook.scope}><InputField {...profileInputValues.facebook} /></InputFieldProfileToggler>
            <InputFieldProfileToggler scope={profileInputValues.url.scope}><InputField {...profileInputValues.url} /></InputFieldProfileToggler>
            <InputFieldProfileToggler scope={profileInputValues.phone.scope}><InputField {...profileInputValues.phone} /></InputFieldProfileToggler>
            <InputFieldProfileToggler scope={[UserType.CLIENT]}><RegionSelection /></InputFieldProfileToggler>
            <InputFieldProfileToggler scope={[UserType.VENDOR_COMPANY, UserType.VENDOR_INDIVIDUAL]}><ComboSelectBox /></InputFieldProfileToggler>
          </div>
          <div className="flex justify-end pt-8 gap-4">
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 "
            >
              Запиши
            </button>
            <button
              type="button"
              className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-900 shadow-sm hover:bg-gray-50 "
            >
              Отмени
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

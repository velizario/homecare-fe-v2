import { useEffect, useState } from "react";
import InputField from "../../../../utilityComponents/InputField";
import ComboSelectBox from "./ComboSelectBox";
import InputFieldProfileToggler from "./InputFieldProfile";
import ProfileAbout from "./ProfileAbout";
import ProfilePhoto from "./ProfilePhoto";
import RegionSelection from "./RegionSelection";
import UserTypeSelection from "./UserTypeSelection";



const profileInputValues = {
  firstName: {
    scope: "provider-private, client",
    className: "sm:col-span-3",
    name: "first-name",
    id: "first-name",
    label: "Име*",
    autoComplete: "given-name",
  },
  lastName: {
    scope: "provider-private, client",
    className: "sm:col-span-3",
    name: "last-name",
    id: "last-name",
    label: "Фамилия*",
    autoComplete: "family-name",
  },
  companyName: {
    scope: "provider-company",
    className: "sm:col-span-6",
    name: "company",
    id: "company",
    label: "Име на фирма*",
  },
  url: {
    scope: "provider-private, provider-company",
    className: "sm:col-span-3",
    name: "url",
    id: "url",
    label: "Уеб сайт",
  },
  facebook: {
    scope: "provider-private, provider-company",
    className: "sm:col-span-3",
    name: "facebook",
    id: "facebook",
    label: "Фейсбук",
  },
  phone: {
    scope: "client, provider-private, provider-company",
    className: "sm:col-span-3",
    name: "phone-number",
    id: "phone-number",
    label: "Телефонен номер*",
    autoComplete: "tel",
  },
};


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}



export default function Profile() {

  const [scrolledPosition, setScrolledPosition] = useState<number | null>(null)

  window.addEventListener("scroll", () => setScrolledPosition(window.scrollY));


  useEffect(() => {
    console.log(scrolledPosition)
  }, [scrolledPosition])


  return (
    <>
      <div className="flex-1 py-4 px-4 md:px-6 lg:px-8">
        <form className="space-y-8 max-w-3xl">
          <p className="text-sm text-gray-500">
            Информацията ще бъде използвана за да съставим вашата "Визитка".
          </p>
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
            <UserTypeSelection />
            <ProfilePhoto />
            <InputFieldProfileToggler children={<InputField {...profileInputValues.firstName} />} scope={profileInputValues.firstName.scope} />
            <InputFieldProfileToggler children={<InputField {...profileInputValues.lastName} />} scope={profileInputValues.lastName.scope} />
            <InputFieldProfileToggler children={<InputField {...profileInputValues.companyName} />} scope={profileInputValues.companyName.scope} />
            <InputFieldProfileToggler children={<ProfileAbout />} scope="client, provider-private, provider-company" />
            <InputFieldProfileToggler children={<InputField {...profileInputValues.facebook} />} scope={profileInputValues.facebook.scope} />
            <InputFieldProfileToggler children={<InputField {...profileInputValues.url} />} scope={profileInputValues.url.scope} />
            <InputFieldProfileToggler children={<InputField {...profileInputValues.phone} />} scope={profileInputValues.phone.scope} />
            <InputFieldProfileToggler children={<RegionSelection />} scope="client" />
            <InputFieldProfileToggler children={<ComboSelectBox />} scope="provider-private, provider-company" />
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

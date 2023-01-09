import { userServiceType, userProviderType } from "../../../../store/userTypeStore";
import InputFieldProfile from "./InputFieldProfile";
import ProfilePhoto from "./ProfilePhoto";
import UserTypeSelection from "./UserTypeSelection";

export interface InputFieldProfileType {
    scope: string;
    className: string;
    name: string;
    id: string;
    label: string;
    autoComplete?: string,
}


const ProfileInputValues = {
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


  return (
    <>
      <div className="flex-1 py-4 px-4 md:px-6 lg:px-8">
        <form className="space-y-8 divide-y max-w-3xl">
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
            <div className="sm:col-span-6">
              <p className="text-sm text-blue-gray-500">
                Информацията ще бъде използвана за да съставим вашата "Визитка".
              </p>
            </div>
            <UserTypeSelection />
            <ProfilePhoto />
            <InputFieldProfile {...ProfileInputValues.firstName}/>
            <InputFieldProfile {...ProfileInputValues.lastName} />
            <InputFieldProfile {...ProfileInputValues.companyName} />


            <div className="sm:col-span-6">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-blue-gray-900"
              >
                Няколко думи за Вас*
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  className="block w-full rounded-md border-blue-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm overflow-y-scroll md:overflow-y-auto"
                  defaultValue={""}
                />
              </div>
            </div>

            <InputFieldProfile {...ProfileInputValues.facebook} />
            <InputFieldProfile {...ProfileInputValues.url} />


            <InputFieldProfile {...ProfileInputValues.phone} />

            <div className="sm:col-span-3">
              <label
                htmlFor="country"
                className="block text-sm font-medium text-blue-gray-900"
              >
                Квартал/Район
              </label>
              <select
                id="country"
                name="country"
                autoComplete="country-name"
                className="mt-1 block w-full rounded-md border-blue-gray-300 text-blue-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option />
                <option>United States</option>
                <option>Canada</option>
                <option>Mexico</option>
              </select>
            </div>

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
              className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-blue-gray-900 shadow-sm hover:bg-blue-gray-50 "
            >
              Отмени
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

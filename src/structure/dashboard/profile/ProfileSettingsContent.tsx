import InputField from "./InputField";
import ProfilePhoto from "./ProfilePhoto";
import UserTypeSelection from "./UserTypeSelection";

const ProfileInputValues = {
  firstName: {
    colSpan: "sm:col-span-3",
    name: "first-name",
    id: "first-name",
    label: "Име*",
    autoComplete: "given-name",
  },
  lastName: {
    colSpan: "sm:col-span-3",
    name: "last-name",
    id: "last-name",
    label: "Фамилия*",
    autoComplete: "family-name",
  },
  companyName: {
    colSpan: "sm:col-span-6",
    name: "company",
    id: "company",
    label: "Име на фирма",
  },
  url: {
    colSpan: "sm:col-span-3",
    name: "url",
    id: "url",
    label: "Уеб сайт",
  },
  facebook: {
    colSpan: "sm:col-span-3",
    name: "facebook",
    id: "facebook",
    label: "Фейсбук",
  },
  email: {
    colSpan: "sm:col-span-3",
    name: "email-address",
    id: "email-address",
    label: "Имейл адрес",
    autoComplete: "email",
  },
  phone: {
    colSpan: "sm:col-span-3",
    name: "phone-number",
    id: "phone-number",
    label: "Телефонен номер",
    autoComplete: "tel",
  },

};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ProfileSettingsContent() {
  return (
    <>
      <div className="flex-1 py-4 px-4 md:px-6 lg:px-8">
        <form className="divide-y-blue-gray-200 space-y-8 divide-y max-w-3xl">
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
            <div className="sm:col-span-6">
              <p className="mt-1 text-sm text-blue-gray-500">
                Информацията ще бъде използвана за да съставим вашата "Визитка".
              </p>
            </div>
            <UserTypeSelection/>
            <ProfilePhoto />
            <InputField {...ProfileInputValues.firstName} />
            <InputField {...ProfileInputValues.lastName} />
            <InputField {...ProfileInputValues.companyName} />


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

            <InputField {...ProfileInputValues.facebook} />
            <InputField {...ProfileInputValues.url} />
          </div>
          <div className="grid grid-cols-1 gap-y-6 pt-8 sm:grid-cols-6 sm:gap-x-6">
            <div className="sm:col-span-6">
              <h2 className="text-xl font-medium text-blue-gray-900">
                Акаунт
              </h2>
              <p className="mt-1 text-sm text-blue-gray-500">
                Информацията не е публично достъпна.
              </p>
            </div>

            <InputField {...ProfileInputValues.email} />
            <InputField {...ProfileInputValues.phone} />

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


            <p className="text-sm text-blue-gray-500 sm:col-span-6">
              This account was created on{" "}
              <time dateTime="2017-01-05T20:35:40">
                January 5, 2017, 8:35:40 PM
              </time>
              .
            </p>
          </div>

          <div className="flex justify-end pt-8">
            <button
              type="button"
              className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-blue-gray-900 shadow-sm hover:bg-blue-gray-50 "
            >
              Отмени
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 "
            >
              Запиши
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

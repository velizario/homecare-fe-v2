import InputField from "../../../../utilityComponents/InputField";


const ProfileInputValues = {
  email: {
    className: "sm:col-span-6",
    name: "email-address",
    id: "email-address",
    label: "Имейл адрес",
    autoComplete: "email",
  },
  password: {
    className: "col-start-1 sm:col-end-7",
    name: "password",
    id: "password",
    label: "Парола",
  },
  passwordConfirm: {
    className: "col-start-1 sm:col-end-7",
    name: "passwordConfirm",
    id: "passwordConfirm",
    label: "Потвърди парола",
  },

};

export default function Security() {
  return (
    <>
      <div className="flex-1 py-4 px-4 md:px-6 lg:px-8">
        <form className="space-y-8 divide-y max-w-3xl">

          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
            <p className="sm:col-span-6 text-sm text-gray-500">
              Промяна на мейл, парола и т.н.
            </p>

            <InputField {...ProfileInputValues.email} />
            <InputField {...ProfileInputValues.password} />
            <InputField {...ProfileInputValues.passwordConfirm} />

          </div>

          <div className="flex justify-end gap-4 pt-8">
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

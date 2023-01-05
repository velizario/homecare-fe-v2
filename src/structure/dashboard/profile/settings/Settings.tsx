export default function Settings() {
  return (
    <div className="flex-1 py-4 px-4 md:px-6 lg:px-8">
      <form className="divide-y-blue-gray-200 space-y-8 max-w-3xl">
        <p className="sm:col-span-6 text-sm text-blue-gray-500">
          Промяна на мейл, парола и т.н.
        </p>
        <div className="gap-y-6 sm:gap-x-6">
          <div className="">
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
          <p className="text-sm text-blue-gray-500">
            This account was created on{" "}
            <time dateTime="2017-01-05T20:35:40">
              January 5, 2017, 8:35:40 PM
            </time>
            .
          </p>
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
            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-blue-gray-900 shadow-sm hover:bg-blue-gray-50 "
          >
            Отмени
          </button>
        </div>
      </form>
    </div>
  )
}
import InputField from "./InputField";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ProfileSettingsContent() {
  return (
    <>
      <div className="flex-1 xl:overflow-y-auto">
        <div className="max-w-3xl px-4 sm:px-6 lg:px-8">
          <form className="divide-y-blue-gray-200 mt-6 space-y-8 divide-y">
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
              <div className="sm:col-span-6">
                <h2 className="text-xl font-medium text-blue-gray-900">
                  Profile
                </h2>
                <p className="mt-1 text-sm text-blue-gray-500">
                  This information will be displayed publicly so be careful what
                  you share.
                </p>
              </div>

              <InputField
                colSpan="sm:col-span-3"
                name="first-name"
                id="first-name"
                label="First name"
                autoComplete="given-name"
              />

              <InputField
                colSpan="sm:col-span-3"
                name="last-name"
                id="last-name"
                label="Last name"
                autoComplete="family-name"
              />

              <InputField
                colSpan="sm:col-span-6"
                name="username"
                id="username"
                label="Username"
                autoComplete="username"
                defaultValue="lisamarie"
              />

              <div className="sm:col-span-6">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-blue-gray-900"
                >
                  Description
                </label>
                <div className="mt-1">
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    className="block w-full rounded-md border-blue-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    defaultValue={""}
                  />
                </div>
                <p className="mt-3 text-sm text-blue-gray-500">
                  Brief description for your profile. URLs are hyperlinked.
                </p>
              </div>

              <InputField
                colSpan="sm:col-span-6"
                name="url"
                id="url"
                label="URL"
              />
            </div>

            <div className="grid grid-cols-1 gap-y-6 pt-8 sm:grid-cols-6 sm:gap-x-6">
              <div className="sm:col-span-6">
                <h2 className="text-xl font-medium text-blue-gray-900">
                  Personal Information
                </h2>
                <p className="mt-1 text-sm text-blue-gray-500">
                  This information will be displayed publicly so be careful what
                  you share.
                </p>
              </div>

              <InputField
                colSpan="sm:col-span-3"
                name="email-address"
                id="email-address"
                label="Email address"
                autoComplete="email"
              />

              <InputField
                colSpan="sm:col-span-3"
                name="phone-number"
                id="phone-number"
                label="Phone number"
                autoComplete="tel"
              />

              <div className="sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-blue-gray-900"
                >
                  Country
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

              <InputField
                colSpan="sm:col-span-3"
                name="language"
                id="language"
                label="Language"
              />

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
                className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-blue-gray-900 shadow-sm hover:bg-blue-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

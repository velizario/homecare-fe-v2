export default function ProfilePhoto() {
  return (
    <>
      <div className="sm:col-span-6">
        <label
          htmlFor="photo"
          className="block text-sm font-medium text-blue-gray-900"
        >
          Снимка
        </label>
        <div className="mt-1 flex items-center">
          <img
            className="inline-block h-12 w-12 rounded-full"
            src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80"
            alt=""
          />
          <div className="ml-4 flex">
            <div className="relative flex cursor-pointer items-center rounded-md border border-blue-gray-300 bg-white py-2 px-3 shadow-sm hover:bg-blue-gray-50">
              <label
                htmlFor="user-photo"
                className="pointer-events-none relative text-sm font-medium text-blue-gray-900"
              >
                {/* //TODO bug - sticks above the mobile menu */}
                <span>Смени</span>
                <span className="sr-only"> user photo</span>
              </label>
              <input
                id="user-photo"
                name="user-photo"
                type="file"
                className="absolute inset-0 h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0"
              />
            </div>
            <button
              type="button"
              className="ml-3 rounded-md border border-transparent bg-transparent py-2 px-3 text-sm font-medium text-blue-gray-900 hover:text-blue-gray-700 focus:border-blue-gray-300 "
            >
              Премахни
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

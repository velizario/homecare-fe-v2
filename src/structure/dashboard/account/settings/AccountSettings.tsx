export default function AccountSettings() {
  return (
    <fieldset className="space-y-5 flex-1 py-4 ">
      <p className="sm:col-span-6 text-sm text-gray-500">
        Настройки на изглед, нотификации и т.н.
      </p>
      <legend className="sr-only">Notifications</legend>
      <div className="relative flex items-start">
        <div className="flex h-5 items-center">
          <input
            id="comments"
            aria-describedby="comments-description"
            name="comments"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 "
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="comments" className="font-medium text-gray-700">
            Получавайте известия по Вайбър
          </label>
          <p id="comments-description" className="text-gray-500">
            При потвърждаване и промяна на поръчки, ще получавате съобщения във вайбър като допълнение към съобщенията ви в сайта
          </p>
        </div>
      </div>
      <div className="relative flex items-start">
        <div className="flex h-5 items-center">
          <input
            id="candidates"
            aria-describedby="candidates-description"
            name="candidates"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 "
            
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="candidates" className="font-medium text-gray-700">
            Candidates
          </label>
          <p id="candidates-description" className="text-gray-500">
            Get notified when a candidate applies for a job.
          </p>
        </div>
      </div>
      <div className="relative flex items-start">
        <div className="flex h-5 items-center">
          <input
            id="offers"
            aria-describedby="offers-description"
            name="offers"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 "
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="offers" className="font-medium text-gray-700">
            Offers
          </label>
          <p id="offers-description" className="text-gray-500">
            Get notified when a candidate accepts or rejects an offer.
          </p>
        </div>
      </div>
    </fieldset>
  )
}

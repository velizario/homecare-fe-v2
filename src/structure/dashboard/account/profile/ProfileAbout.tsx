export default function ProfileAbout() {
    return (
        <div className="sm:col-span-6">
            <label
                htmlFor="description"
                className="block text-sm font-normal text-gray-900"
            >
                Няколко думи за Вас*
            </label>
            <div className="mt-1">
                <textarea
                    id="description"
                    name="description"
                    rows={4}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm overflow-y-scroll md:overflow-y-auto"
                    defaultValue={""}
                />
            </div>
        </div>
    )
}
export default function RegionSelection() {
    return (
        <div className="sm:col-span-3">
            <label
                htmlFor="country"
                className="block text-sm text-gray-900"
            >
                Квартал/Район
            </label>
            <select
                id="country"
                name="country"
                autoComplete="country-name"
                className="mt-1 block w-full rounded-md border-gray-300 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
                <option />
                <option>United States</option>
                <option>Canada</option>
                <option>Mexico</option>
            </select>
        </div>
    )
}
export default function RangeSlider () {
    return (
        <div className="max-w-md">
        <input
            type="range"
            list="tickmarks"
            defaultValue="50"
            min="0"
            max="200"
            className="w-full cursor-pointer"
            step={10}
        />
        <datalist id="tickmarks" className="flex justify-between w-full">
            <option className="w-6 text-sm -rotate-45" value="0" label="0"></option>
            <option className="w-6 text-sm -rotate-45" value="20" label="20"></option>
            <option className="w-6 text-sm -rotate-45" value="40" label="40"></option>
            <option className="w-6 text-sm -rotate-45" value="60" label="60"></option>
            <option className="w-6 text-sm -rotate-45" value="80" label="80"></option>
            <option className="w-6 text-sm -rotate-45" value="100" label="100"></option>
            <option className="w-6 text-sm -rotate-45" value="120" label="120"></option>
            <option className="w-6 text-sm -rotate-45" value="140" label="140"></option>
            <option className="w-6 text-sm -rotate-45" value="160" label="160"></option>
            <option className="w-6 text-sm -rotate-45" value="180" label="180"></option>
            <option className="w-6 text-sm -rotate-45" value="200" label="200"></option>
        </datalist>
    </div>
    )
}
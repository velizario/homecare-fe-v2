import classNames from "../../helpers/classNames";

interface RangeSliderProps {
    options: string[];
    activeArea: string;
    onChange: (id: string) => void;
    styles?: string;
}



export default function RangeSlider({
    options,
    activeArea,
    onChange,
    styles,
}: RangeSliderProps) {
    return (
        <div className={classNames("mt-1", styles ?? "")}>
            <div className="flex justify-end whitespace-nowrap rounded px-2 text-lg font-semibold leading-7 text-indigo-600">
                <span>{activeArea}</span>&nbsp;кв.км
            </div>
            <input
                type="range"
                list="steplist"
                value={activeArea}
                onChange={(e) => onChange((e.target as HTMLInputElement).value)}
                min="0"
                max="200"
                className="w-full cursor-pointer px-1"
                step={10}
            />
            <datalist
                id="steplist"
                className="-mt-2.5 flex w-full justify-between "
            >
                {options.map((option) => {
                    return (
                        <div
                            key={option}
                            className="flex flex-col items-center justify-center"
                        >
                            <span className="mb-1 h-1.5 w-0 border-l border-gray-400"></span>
                            <option
                                className="w-6 -rotate-45 text-sm"
                                value={option}
                                label={option}
                            />
                        </div>
                    );
                })}
            </datalist>
        </div>
    );
}

export { };


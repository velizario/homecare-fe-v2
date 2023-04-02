import { useEffect, useRef } from "react";
import classNames from "../../helpers/classNames";
import { SelectionOption } from "../../types/types";

interface RangeSliderProps {
    options: SelectionOption[];
    activeArea: string;
    onClick: (id: string) => void;
    styles?: string;
}

export default function RangeSlider({
    options,
    activeArea,
    onClick,
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
                onChange={(e) => onClick((e.target as HTMLInputElement).value)}
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
                            key={option.value}
                            className="flex flex-col items-center justify-center"
                        >
                            <span className="mb-1 h-1.5 w-0 border-l border-gray-400"></span>
                            <option
                                className="w-6 -rotate-45 text-sm"
                                value={option.value}
                                label={option.value}
                            />
                        </div>
                    );
                })}
            </datalist>
        </div>
    );
}

export {};

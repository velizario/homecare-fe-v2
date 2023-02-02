import classNames from "../../helpers/classNames";
import { SelectionOption } from "../../helpers/types";

interface RangeSliderProps {
    options: SelectionOption[];
    activeId: string | undefined;
    onClick: (id: string) => void;
    styles?: string;
}

export default function RangeSlider({
    options,
    activeId,
    onClick,
    styles,
}: RangeSliderProps) {
    return (
        <div className={classNames("mt-3", styles ?? "")}>
            <input
                type="range"
                list="tickmarks"
                value={activeId}
                onChange={(e) => onClick((e.target as HTMLInputElement).value)}
                min="0"
                max="200"
                className="w-full cursor-pointer"
                step={10}
            />
            <datalist id="tickmarks" className="flex w-full justify-between">
                {options.map((option) => {
                    return (
                        <option
                            key={option.id}
                            className="w-6 -rotate-45 text-sm"
                            value={option.name}
                            label={option.name}
                        />
                    );
                })}
            </datalist>
        </div>
    );
}

export {};

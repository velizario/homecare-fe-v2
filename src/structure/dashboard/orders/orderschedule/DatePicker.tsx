import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import classNames from "../../../../helpers/classNames";
import "./DatePicker.css";
import styles from "./DatePicker.module.css";
import { dateRangeStore } from "./OrderSchedule";

const pastMonth = new Date();

// const bookedDays = [new Date(2023, 3, 4), new Date(2023, 3, 9), new Date(2023, 3, 15), new Date(2023, 3, 16), new Date(2023, 3, 17)];
// const bookedStyle = { color: 'blue', fontWeight: "600" };

interface DatePickerProps {
  bookedDays?: Date[];
  close?: (focusableElement?: HTMLElement | React.MutableRefObject<HTMLElement | null> | undefined) => void;
}

export default function DatePicker({ bookedDays, close }: DatePickerProps) {
  // const [range, setRange] = useState<DateRange | undefined>();

  const [dateRange, setDateRange] = dateRangeStore((store) => [store.dateRange, store.setDateRange]);

  // let footer = <p>Please pick the first day.</p>;
  // if (range?.from) {
  //   if (!range.to) {
  //     footer = <p>{format(range.from, 'PPP')}</p>;
  //   } else if (range.to) {
  //     footer = (
  //       <p>
  //         {format(range.from, 'PPP')}–{format(range.to, 'PPP')}
  //       </p>
  //     );
  //   }
  // }

  return (
    <div className="flex flex-col gap-2 lg:col-start-8 lg:col-end-13 lg:row-start-1">
      <DayPicker
        mode="range"
        defaultMonth={pastMonth}
        selected={dateRange}
        onSelect={setDateRange}
        modifiers={{ booked: bookedDays || [] }}
        // modifiersStyles={{ booked: styles.styler }}
        modifiersClassNames={{ booked: styles.styler }}
        showOutsideDays
      />

      <div className="flex justify-between">
        {/* <button
          type="button"
          onClick={() => {close && close(); }}
          disabled={(dateRange?.from) == null}
          className="inline-flex disabled:text-gray-400  rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:[&:not(:disabled)]:bg-gray-50 focus:outline-none"
        >
          Избери
        </button> */}
        <button
          type="button"
          onClick={() => setDateRange({ from: undefined, to: undefined })}
          disabled={dateRange?.from == null}
          className={classNames(
            "inline-flex items-center rounded border border-transparent bg-white px-2.5 py-1.5 text-xs font-medium text-gray-400 focus:outline-none [&:not(:disabled)]:border-gray-300  [&:not(:disabled)]:text-gray-800 hover:[&:not(:disabled)]:bg-gray-50"
          )}
        >
          Изчисти
        </button>
      </div>
      <div className="text-xs text-gray-600 mt-2">
        {dateRange?.from && <p>Начална дата: <span className="font-medium text-gray-800">{dateRange.from.toDateString()}</span> </p>}
        {dateRange?.to && <p className="mt-1">Крайна дата: <span className="font-medium text-gray-800">{dateRange.to.toDateString()}</span> </p>}
      </div>
    </div>
  );
}

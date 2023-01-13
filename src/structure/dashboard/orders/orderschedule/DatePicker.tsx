import { useState } from 'react';
import 'react-day-picker/dist/style.css';
import './DatePicker.css'
import { addDays, format } from 'date-fns';
import { DateRange, DayPicker } from 'react-day-picker';

const pastMonth = new Date();

interface DatePickerProps {
  close: (focusableElement?: HTMLElement | React.MutableRefObject<HTMLElement | null> | undefined) => void
}

export default function DatePicker({ close }: DatePickerProps) {

  const [range, setRange] = useState<DateRange | undefined>();

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
    <div className='flex flex-col lg:col-start-8 lg:col-end-13 lg:row-start-1 gap-2'>
      <DayPicker
        mode="range"
        defaultMonth={pastMonth}
        selected={range}
        onSelect={setRange}

      />
      <div className="flex justify-between pl-2">
        <button
          type="button"
          onClick={() => close()}
          disabled={!range?.from}
          className="inline-flex disabled:text-gray-400 items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:[&:not(:disabled)]:bg-gray-50 focus:outline-none"
        >
          Избери
        </button>
        <button
          type="button"
          disabled={!range?.from}
          className="inline-flex items-center rounded  border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-500 hover:[&:not(:disabled)]:text-indigo-500 focus:outline-none"
        >
          Изчисти
        </button>
      </div>
    </div>
  );
}
import { useState } from 'react';
import 'react-day-picker/dist/style.css';
import './DatePicker.css'
import { addDays, format } from 'date-fns';
import { DateRange, DayPicker } from 'react-day-picker';

const pastMonth = new Date(2020, 10, 15);

export default function App() {
  const defaultSelected: DateRange = {
    from: pastMonth,
    to: addDays(pastMonth, 4)
  };
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);

  let footer = <p>Please pick the first day.</p>;
  if (range?.from) {
    if (!range.to) {
      footer = <p>{format(range.from, 'PPP')}</p>;
    } else if (range.to) {
      footer = (
        <p>
          {format(range.from, 'PPP')}–{format(range.to, 'PPP')}
        </p>
      );
    }
  }

  return (
    <div className='mt-10 text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-9 '>
      <DayPicker
        mode="range"
        defaultMonth={pastMonth}
        selected={range}
        footer={footer}
        onSelect={setRange}
      />
    </div>
  );
}
import moment from 'jalali-moment';
import { useState } from 'react';
import persian from 'react-date-object/calendars/persian';
import persianFa from 'react-date-object/locales/persian_fa';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import useSettings from '../../hooks/useSettings';

export default function SelectDate({ setFromPersianDate, setToPersianDate }) {
  // const [date, setDate] = useState(new Date().toLocaleDateString('fa-IR'));
  const now = moment();
  const startOfMonth = moment(now).startOf('jMonth')
  const endOfMonth = moment(now).endOf('jMonth');
  const { themeMode } = useSettings();
  const [date, setDate] = useState([
    new DateObject({ calendar: persian, date: startOfMonth.toDate() }),
    new DateObject({ calendar: persian, date: endOfMonth.toDate() }),
  ]);

  return (
    <>
      <div className="w-full">
        <DatePicker
          style={{ backgroundColor: themeMode === 'light' ? 'white' : '#161c24' }}
          containerStyle={{
            width: '100%',
          }}
          calendarPosition="bottom-right"
          range
          dateSeparator=" تا "
          inputClass="outline-none border rounded-lg w-full h-14 px-3"
          locale={persianFa}
          calendar={persian}
          value={date}
          onChange={(event, { validatedValue }) => {
            setDate(event);
            setFromPersianDate(validatedValue[0]);
            setToPersianDate(validatedValue[1] ? validatedValue[1] : validatedValue[0]);
            console.log(date[0].format());
            
          }}
          placeholder="تاریخ پذیرش"
        />
      </div>
    </>
  );
}

import { useState } from 'react';
import persian from 'react-date-object/calendars/persian';
import persianFa from 'react-date-object/locales/persian_fa';
import { IoIosClose } from 'react-icons/io';
import DatePicker from 'react-multi-date-picker';
import useSettings from '../../hooks/useSettings';

export default function InputDate({ setFromPersianDate, setToPersianDate, setAlignment, dataPri, setDataPri }) {
  const [date, setDate] = useState(dataPri);

  const { themeMode } = useSettings();

  return (
    <>
      <div className=" relative">
        <DatePicker
          style={{ backgroundColor: themeMode === 'light' ? 'white' : '#161c24' }}
          range
          dateSeparator=" تا "
          inputClass="outline-none border rounded-lg w-full h-14 px-3"
          locale={persianFa}
          calendar={persian}
          value={date}
          onChange={(event, { validatedValue }) => {
            setAlignment(-1);
            setDate(event);
            setDataPri(event);
            setFromPersianDate(validatedValue[0]);
            setToPersianDate(validatedValue[1] ? validatedValue[1] : validatedValue[0]);
          }}
          placeholder="تاریخ پذیرش"
        />
      </div>
    </>
  );
}

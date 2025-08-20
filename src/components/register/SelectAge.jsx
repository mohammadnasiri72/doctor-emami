import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import persian from 'react-date-object/calendars/persian';
import persianFa from 'react-date-object/locales/persian_fa';
import DatePicker from 'react-multi-date-picker';
import useSettings from '../../hooks/useSettings';

export default function SelectAge({ setDateOfBirthFaPatient }) {
  const [valYear, setValYear] = useState('');
  const [mount, setMount] = useState('');
  const [numMount, setNumMount] = useState('');
  const [numYear, setNumYear] = useState('');
  const [valDay, setValDay] = useState('');

  const { themeMode} = useSettings();

  useEffect(() => {
    if (numMount && numYear && valDay) {
      setDateOfBirthFaPatient(`${numYear}/${numMount}/${valDay}`);
    }
  }, [numYear, numMount, valDay]);

  // const converter = (text) => text.replace(/[٠-٩۰-۹]/g, (a) => a.charCodeAt(0));

  function toEnglishNumber(strNum, name) {
    const pn = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const en = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    let cache = strNum;
    for (let i = 0; i < 10; i += 1) {
      const regexFa = new RegExp(pn[i], 'g');
      cache = cache.replace(regexFa, en[i]);
    }
    return cache;
  }

  return (
    <>
      <div className="px-5">
        <div className="border rounded-xl px-5 lg:w-2/3 w-full mx-auto text-start mt-4 py-2">
          <h3 className="mb-2">تاریخ تولد :</h3>
          <div className=" flex sm:flex-row flex-col items-center justify-around">
            {/* select years */}
            <div>
              <DatePicker
              style={{backgroundColor: themeMode==='light' ? 'white' : '#161c24' , color:themeMode==='light'? 'black':'white'}}
                inputClass="outline-none border rounded-lg lg:w-20 sm:w-32 w-56 sm:mt-0 mt-3 h-14 px-3"
                onlyYearPicker
                calendar={persian}
                locale={persianFa}
                calendarPosition="bottom-right"
                placeholder="سال"
                value={valYear}
                onChange={(e) => {
                  setValYear(e);
                  setNumYear(toEnglishNumber(e.format()) * 1);
                }}
              />
            </div>
            {/* select mount */}
            <div>
              <DatePicker
              style={{backgroundColor: themeMode==='light' ? 'white' : '#161c24' , color:themeMode==='light'? 'black':'white'}}
                inputClass="outline-none border rounded-lg lg:w-20 sm:w-32 w-56 sm:mt-0 mt-3 h-14 px-3"
                onlyMonthPicker
                format="MMMM"
                calendar={persian}
                locale={persianFa}
                calendarPosition="bottom-right"
                placeholder="ماه"
                hideYear
                value={mount}
                onChange={(e) => {
                  setMount(e);
                  setNumMount(toEnglishNumber(e.format('MM')) * 1);
                }}
              />
            </div>
            {/* select day */}
            <div className="sm:mt-0 mt-3">
              <FormControl className="lg:w-20 sm:w-32 w-56 ">
                <InputLabel id="demo-simple-select-label">روز</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={valDay}
                  label="روز"
                  onChange={(e) => setValDay(e.target.value)}
                >
                  {new Array(numMount < 7 ? 31 : 30).fill('').map((e, i) => (
                    <MenuItem key={i} value={i + 1}>
                      {i + 1}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

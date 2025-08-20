import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useEffect, useState } from 'react';
import persian from 'react-date-object/calendars/persian';
import persianFa from 'react-date-object/locales/persian_fa';
import DatePicker from 'react-multi-date-picker';
import ModalSelectOneTime from './ModalSelectOneTime';
import ModalSelectTime from './ModalSelectTime';
import useSettings from '../../hooks/useSettings';

export default function SelectTimeReserve({
  setIsLoading,
  valDoctor,
  setValDoctor,
  setYear,
  setMount,
  setNumberMoon,
  setFlag,
  doctors,
  mount,
  date
}) {
  const [valMoon, setValMoon] = useState(new Date());
  const [valYear, setValYear] = useState(new Date());

  const { themeMode } = useSettings();

 

  // const converter = (text) => text.replace(/[٠-٩۰-۹]/g, (a) => a.charCodeAt(0) & 15);
  function converter(strNum, name) {
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
      <div className="flex flex-wrap justify-between">
        <div className="lg:w-1/2 w-full flex sm:flex-nowrap flex-wrap">
          {/* select doctor */}
          <div className="flex items-center w-96">
            <div className="px-4 w-full" dir="rtl">
              <FormControl color="primary" className="w-full">
                <InputLabel color="primary" className="px-2" id="demo-simple-select-label">
                  لیست پزشکان
                </InputLabel>
                <Select
                  onChange={(e) => setValDoctor(e.target.value)}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="لیست پزشکان"
                  color="primary"
                  value={valDoctor}
                >
                  {doctors.map((d) => (
                    <MenuItem key={d.doctorId} value={d.doctorId}>
                      {d.firstName} {d.lastName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className='flex sm:pr-0 pr-5 sm:mt-0 mt-5'>
            {/* select year */}
            <div>
              <DatePicker
              
              style={{backgroundColor:themeMode==='light'?'white':'#161c24'}}
                inputClass="outline-none border rounded-lg w-20 h-14 px-3"
                onlyYearPicker
                calendar={persian}
                locale={persianFa}
                calendarPosition="bottom-right"
                placeholder="سال"
                value={valYear}
                onChange={(e) => {
                  setValYear(e);
                  setYear(converter(e.format('YYYY')) * 1);
                }}
              />
            </div>
            {/* select mount */}
            <div className="pr-2">
              <DatePicker
              style={{backgroundColor:themeMode==='light'?'white':'#161c24'}}
                inputClass="outline-none border rounded-lg w-28 h-14 px-3"
                onlyMonthPicker
                format="MMMM"
                calendar={persian}
                locale={persianFa}
                calendarPosition="bottom-right"
                placeholder="ماه"
                hideYear
                value={valMoon}
                onChange={(e) => {
                  setValMoon(e);
                  setMount(converter(e.format('MM')) * 1);
                  setNumberMoon(converter(e.format('MM')) * 1);
                }}
              />
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 w-full flex pl-10 lg:justify-end lg:pr-0 pr-5 lg:mt-0 mt-5">
          <div>
            <ModalSelectTime
              setIsLoading={setIsLoading}
              setFlag={setFlag}
              doctors={doctors}
              valDoctor={valDoctor}
              setValDoctor={setValDoctor}
              valMoon={valMoon}
              valYearSelect={valYear}
              mountt={mount}
            />
          </div>
          <div className="px-2">
            <ModalSelectOneTime
              setIsLoading={setIsLoading}
              setFlag={setFlag}
              doctors={doctors}
              valDoctor={valDoctor}
              setValDoctor={setValDoctor}
              dateOne={date}
            />
          </div>
        </div>
      </div>
    </>
  );
}

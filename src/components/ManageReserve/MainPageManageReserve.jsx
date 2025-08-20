import { useEffect, useState } from 'react';
import axios from 'axios';
import SelectTimeReserve from './SelectTimeReserve';
import SimpleBackdrop from '../backdrop';
import BoxTimeReserve from './BoxTimeReserve';
import { mainDomain } from '../../utils/mainDomain';

export default function MainPageManageReserve() {
  const [isLoading, setIsLoading] = useState(false);
  const [valDoctor, setValDoctor] = useState([]);
  const [year, setYear] = useState('');
  const [mount, setMount] = useState('');
  const [numberMoon, setNumberMoon] = useState(0);
  const [flag, setFlag] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState('');
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

  // get list doctors
  useEffect(() => {
    axios
      .get(`${mainDomain}/api/Doctor/GetList`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setDoctors(res.data);
        setValDoctor(res.data[0].doctorId);
      })
      .catch((err) => {});
  }, []);

  // set mounth & set years
  useEffect(() => {
    setNumberMoon(
      converter(
        new Date()
          .toLocaleDateString('fa-IR')
          .slice(
            new Date().toLocaleDateString('fa-IR').indexOf('/') + 1,
            new Date().toLocaleDateString('fa-IR').lastIndexOf('/')
          )
      ) * 1
    );
    setMount(
      converter(
        new Date()
          .toLocaleDateString('fa-IR')
          .slice(
            new Date().toLocaleDateString('fa-IR').indexOf('/') + 1,
            new Date().toLocaleDateString('fa-IR').lastIndexOf('/')
          )
      ) * 1
    );
    setYear(
      converter(new Date().toLocaleDateString('fa-IR').slice(0, new Date().toLocaleDateString('fa-IR').indexOf('/'))) *
        1
    );
  }, []);

  return (
    <>
      <SelectTimeReserve
        setIsLoading={setIsLoading}
        valDoctor={valDoctor}
        setValDoctor={setValDoctor}
        setNumberMoon={setNumberMoon}
        setYear={setYear}
        setMount={setMount}
        setFlag={setFlag}
        doctors={doctors}
        mount={mount}
        date={date}
      />
      <hr className="mt-3" />
      <BoxTimeReserve
        moon={mount}
        year={year}
        valDoctor={valDoctor}
        setValDoctor={setValDoctor}
        numberMoon={numberMoon}
        setIsLoading={setIsLoading}
        flag={flag}
        setFlag={setFlag}
        doctors={doctors}
        date={date}
        setDate={setDate}
      />
      {isLoading && <SimpleBackdrop />}
    </>
  );
}

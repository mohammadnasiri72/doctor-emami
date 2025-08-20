import axios from 'axios';
import React, { useEffect, useState } from 'react';
import InputExpertise from './InputExpertise';
import InputSelectDoctor from './InputSelectDoctor';
import BoxDateReserve from './BoxDateReserve';
import BoxSelectDate from './BoxSelectDate';
import { mainDomain } from '../../utils/mainDomain';
import SimpleBackdrop from '../backdrop';

export default function Reserve({ setPageState , account , setFlagNotif}) {
  const [expertises, setExpertises] = useState([]);
  const [expertise, setExpertise] = useState('همه');
  const [doctors, setDoctors] = useState([]);
  const [doctor, setDoctor] = useState('');
  const [dates, setDates] = useState([]);
  // const [isBackdrop, setIsBackdrop] = useState(false);
  const [dateReserved, setDateReserved] = useState('');
  const [isLoading , setIsLoading] = useState(false)
  useEffect(() => {
    setIsLoading(true)
    axios
      .get(`${mainDomain}/api/BasicInfo/Specialization/GetList`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setIsLoading(false)
        setExpertises(res.data);
      })
      .catch((err) => {
        setIsLoading(false)
      });
  }, []);
  
  useEffect(() => {
    setIsLoading(true)
    axios
      .get(`${mainDomain}/api/Doctor/GetList`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setIsLoading(false)
        setDoctors(res.data);
        setDoctor(res.data[0].doctorId);
      })
      .catch((err) => {
        setIsLoading(false)
      });
  }, []);


  return (
    <>
      <div className="flex justify-center items-center flex-wrap">
        <div className="sm:w-1/2 w-full px-5">
          <InputExpertise expertises={expertises} expertise={expertise} setExpertise={setExpertise} />
        </div>
        <div className="sm:w-1/2 w-full px-5 mt-5 sm:mt-0">
          <InputSelectDoctor doctors={doctors} expertise={expertise} doctor={doctor} setDoctor={setDoctor} />
        </div>
      </div>
      <div className="flex justify-center flex-wrap">
        <div className="lg:w-1/5 w-full p-3 border mt-3 rounded-md">
          <BoxDateReserve
            doctorId={doctor}
            setDates={setDates}
            setIsLoading={setIsLoading}
            setDateReserved={setDateReserved}
          />
        </div>
        <div className="lg:w-4/5 w-full mt-3 lg:px-3">
          <BoxSelectDate
            doctor={doctors.find((e) => e.doctorId === doctor)}
            dates={dates}
            setIsLoading={setIsLoading}
            dateReserved={dateReserved}
            account={account}
            setPageState={setPageState}
            isLoading={isLoading}
            setFlagNotif={setFlagNotif}
          />
        </div>
      </div>
      {
        isLoading &&
        <SimpleBackdrop />
      }
    </>
  );
}

import { Skeleton, Stack } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { mainDomain } from '../../utils/mainDomain';
import SimpleBackdrop from '../backdrop';

export default function HomePagePatient({ account }) {
  const [date, setDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [reserveList, setReserveList] = useState([]);

  const navigate = useNavigate();

  // get last date visit
  useEffect(() => {
    axios
      .get(`${mainDomain}/api/Appointment/GetListPaged`, {
        params: {
          typeId: 1,
          patientNationalId: account.nationalId,
          doctorMedicalSystemId: -1,
          statusId: 4,
          pageSize: 1,
          pageIndex: 1,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        if (res.data.items[0].appointmentDateFA) {
          setDate(res.data.items[0].appointmentDateFA);
        }
      })
      .catch((err) => {});
  }, []);

  // get time & date reserve
  useEffect(() => {
    if (account.userId) {
      setIsLoading(true);
      axios
        .get(`${mainDomain}/api/Reservation/GetList`, {
          params: {
            patientUserId: account.userId,
            statusId: 1,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setIsLoading(false);
          setReserveList(res.data);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  }, [account]);

  // go to counseling page
  const goToViewReserve = () => {
    navigate('/dashboard/viewReservation');
  };

  // go to counseling page
  const goTosicknessList = () => {
    navigate('/dashboard/sicknessList');
  };

  // go to reserv page
  const goToReserve = () => {
    navigate('/dashboard/reserve');
  };

  // go to counseling page
  const goToCounseling = () => {
    navigate('/dashboard/counseling');
  };

  return (
    <>
      <div className="flex flex-wrap py-10 px-2">
        <div className="sm:w-5/12 w-full">
          <img className="min-h-60" src="/images/home.png" alt="" />
        </div>
        <div className="text-start mt-4 sm:w-7/12 w-full">
          { (
            <div>
              <p>
                بیمار گرامی آقای {account.firstName} {account.lastName}
              </p>
              {isLoading && (
                <div className="w-full">
                  <Skeleton height={100} animation="wave" />
                </div>
              )}
              {date && !isLoading && <p className="font-semibold mt-2">آخرین ویزیت شما در تاریخ {date} بوده است</p>}
              {!date && !isLoading && <p className="font-semibold mt-2">از اینکه به جمع ما پیوستید از شما ممنونیم</p>}
              {isLoading && (
                <div>
                  <div className="w-full">
                    <Skeleton height={100} animation="wave" />
                  </div>
                </div>
              )}
            </div>
          )}

          {reserveList.length > 0 && !isLoading && (
            <div className="flex items-center justify-start mt-5 border p-2 border-[#135a5d] bg-[#efeadf] rounded-lg">
              <img src="/images/ic-1.png" alt="" />
              <p className="px-1 font-semibold text-[#135a5d] ">
                وقت آتی شما برای تاریخ {reserveList[0].reservationTimeDateFA} ساعت{' '}
                {reserveList[0].reservationTimeFromTime.slice(0, 5)} می باشد
              </p>
            </div>
          )}
          {reserveList.length === 0 && !isLoading && (
            <div className="flex items-center justify-start mt-5 border p-2 border-[#135a5d] bg-[#efeadf] rounded-lg">
              <img src="/images/ic-1.png" alt="" />
              <p className="px-1 font-semibold text-[#135a5d] ">شما نوبت رزرو شده ای ندارید!</p>
            </div>
          )}
          <div className="flex flex-wrap px-5 sm:mt-10 mt-0">
            <div className="flex items-center md:w-1/2 w-full md:mt-0 mt-5 ">
              <div className="bg-emerald-500 p-2 rounded-md">
                <img src="/images/ic-4.png" alt="" />
              </div>
              <Stack
                onClick={goToReserve}
                className="px-2 font-semibold cursor-pointer duration-300 hover:text-emerald-500"
              >
                نوبت دهی اینترنتی
              </Stack>
            </div>
            <div className="flex items-center md:w-1/2 w-full md:mt-0 mt-5">
              <div className="bg-emerald-500 p-2 rounded-md">
                <img src="/images/ic-5.png" alt="" />
              </div>
              <Stack
                onClick={goToCounseling}
                className="px-2 font-semibold cursor-pointer duration-300 hover:text-emerald-500"
              >
                ویزیت آنلاین
              </Stack>
            </div>
          </div>
          <div className="flex flex-wrap px-5 mt-5">
            <div className="flex items-center md:w-1/2 w-full">
              <div className="bg-emerald-500 p-2 rounded-md">
                <img src="/images/ic-2.png" alt="" />
              </div>
              <Stack
                onClick={goToViewReserve}
                className="px-2 font-semibold cursor-pointer duration-300 hover:text-emerald-500"
              >
                نوبت های من
              </Stack>
            </div>
            <div className="flex items-center md:w-1/2 w-full md:mt-0 mt-5">
              <div className="bg-emerald-500 p-2 rounded-md">
                <img src="/images/ic-3.png" alt="" />
              </div>
              <Stack
                onClick={goTosicknessList}
                className="px-2 font-semibold cursor-pointer duration-300 hover:text-emerald-500"
              >
                سابقه بیماری‌ها
              </Stack>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import Swal from 'sweetalert2';
import React, { useContext } from 'react';
import { Button, Skeleton } from '@mui/material';
import { useNavigate } from 'react-router';
import axios from 'axios';
import SimpleBackdrop from '../backdrop';
// import { Account } from '../../pages/_app';
import { mainDomain } from '../../utils/mainDomain';

export default function BoxSelectDate({ dates, dateReserved, setIsLoading, doctor, setPageState, account , isLoading , setFlagNotif}) {
  // import sweet alert-2
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });

  const navigate = useNavigate();

 
  const setTimeHandler = (e) => {
    Swal.fire({
      title: 'ثبت نوبت',
      text: `شما تاریخ ${dateReserved} و زمان ${e.fromTime.slice(0,5)} تا ${e.toTime.slice(0,5)} را برای ${doctor.firstName} ${doctor.lastName} انتخاب کردید`,

      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: '#d33',
      cancelButtonText: 'انصراف',
      confirmButtonText: 'تایید',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        const reserveData = {
          patientUserId: account.userId,
          reservationTimeId: e.reservationTimeId,
          description: e.description,
        };
        axios
          .post(`${mainDomain}/api/Reservation/Add`, reserveData, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
          .then((res) => {
            setIsLoading(false);
            setFlagNotif((e)=>!e)
            Toast.fire({
              icon: 'success',
              text: 'درخواست شما با موفقیت ثبت شد',
            });

            if (setPageState) {
              setPageState(4);
            } else {
              navigate('/dashboard/viewReservation');
            }
          })
          .catch((err) => {
            setIsLoading(false);
            Toast.fire({
              icon: 'error',
              text: err.response ? err.response.data : 'خطای شبکه',
            });
          });
      }
    });
  };
  return (
    <>
      <div className="lg:h-[85vh] border p-3 rounded-md overflow-auto flex flex-wrap justify-center">
        <div className="w-full">
          <div className="sticky top-0 left-0 right-0 w-full  mb-4 z-50">
            <h3 className="font-semibold">
              {dates.length !== 0 ? 'لطفا زمان مد نظرتان را انتخاب کنید' : 'تاریخی تعریف نشده است'}
            </h3>
          </div>

          <div className="flex flex-wrap w-full">
            {dates.length > 0 &&
              dates.map((date) => (
                <div key={date.reservationTimeId} className="p-3 md:w-1/5 sm:w-1/4 w-1/3 flex">
                  <Button
                    disabled={!date.isActive}
                    sx={{
                      py: 1,
                      boxShadow: 'none',
                      backgroundColor: date.isActive ? 'rgb(20 184 166)' : 'rgb(203 213 225)',
                      '&:hover': {
                        backgroundColor: 'rgb(13 148 136)',
                      },
                    }}
                    className="p-3 w-full bg-teal-600 rounded-md duration-300  text-white"
                    onClick={() => {
                      setTimeHandler(date);
                    }}
                    value={date.fromTime}
                    variant="contained"
                  >
                    {date.fromTime.slice(0, 5)}
                  </Button>
                </div>
              ))}
            {dates.length === 0 && isLoading &&(
              <div className="w-full">
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

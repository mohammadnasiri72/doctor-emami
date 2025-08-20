import { Button, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { IoCalendarOutline } from 'react-icons/io5';
import { MdOutlineAccessTime } from 'react-icons/md';
import Swal from 'sweetalert2';
import { mainDomain } from '../../utils/mainDomain';

export default function MyReserveBox({ list, doctor, setFlag, setIsLoading, setPageState }) {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });



  const [loading, setLoading] = useState(false)



  const deleteReservationHandler = () => {
    const reservationIdData = new FormData();
    reservationIdData.append('reservationId', list.reservationId);
    Swal.fire({
      title: 'حذف نوبت',
      text: 'آیا از ثبت درخواست خود مطمئن هستید؟',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: 'green',
      cancelButtonText: 'انصراف',
      confirmButtonText: 'حذف نوبت',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        axios
          .post(`${mainDomain}/api/Reservation/Delete`, reservationIdData, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
          .then((res) => {
            setIsLoading(false);
            setFlag((e) => !e);
            Toast.fire({
              icon: 'success',
              text: `نوبت ${setPageState ? 'بیمار' : 'شما'} با موفقیت حذف شد`,
            });
          })
          .catch((err) => {
            setIsLoading(false);
            Toast.fire({
              icon: 'success',
              text: err.response ? err.response.data : 'خطای شبکه',
            });
          });
      }
    });
  };


  const redirectWithToken = (token, targetUrl) => {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = targetUrl;
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'token';
    input.value = token;
    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();
  };

  const goToDargahBank = () => {
    setLoading(true);
    axios
      .get(`${mainDomain}/api/Ipg/PayReservation`, {
        params: {
          reservationId: list.reservationId,
          bank: 'saman',
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setLoading(false);
        redirectWithToken(res.data.form[0].value, res.data.url)
      })
      .catch((err) => {
        setLoading(false);
        Toast.fire({
          icon: 'error',
          text: err.response.data,
        });
      });
  }
  return (
    <>
      <div className='flex sm:flex-nowrap flex-wrap '>
        <div className='sm:w-1/2 w-full'>
          <div className="flex flex-wrap items-center">
            <div className="sm:w-1/2 w-1/4 flex justify-center p-2">
              <div className="w-full lg:w-1/2 sm:w-3/4 border rounded-full cursor-pointer ">
                {
                  doctor?.avatar &&
                  <img className="w-full h-full rounded-full" src={mainDomain + doctor?.avatar} alt="" />
                }
              </div>
            </div>
            <div className="sm:w-1/2 w-3/4 text-start pr-2 relative">
            {
              list.statusId === 3 &&
              <div className='flex justify-end sm:hidden'>
                <span className=' text-xs rounded-full bg-yellow-100 text-yellow-600 border border-yellow-600 px-2 py-1 cursor-default select-none '>
                  در انتظار پرداخت
                </span>
              </div>
            }
            {
              list.statusId === 1 &&
              <div className='flex justify-end sm:hidden'>
                <span className=' text-xs rounded-full bg-emerald-100 text-emerald-600 border border-emerald-600 px-2 py-1 cursor-default select-none '>
                  فعال
                </span>
              </div>
            }
              <p className=" font-semibold whitespace-nowrap">
                {doctor?.firstName} {doctor?.lastName}
              </p>
              <p className="mt-5 font-semibold text-sm sm:text-lg">{doctor?.specialization}</p>
              <div className=" mt-10">
                <div className="flex items-center">
                  <IoCalendarOutline className='text-[#777] text-2xl' />
                  <p className="px-2 text-lg font-semibold">{list.reservationTimeDateFA}</p>
                </div>
                <div className="flex items-center text-xl mt-2">
                  <MdOutlineAccessTime className='text-[#777] text-2xl' />
                  <p className="px-2 whitespace-nowrap text-lg font-semibold">
                    {list.reservationTimeFromTime.slice(0, 5)} الی {list.reservationTimeToTime.slice(0, 5)}
                  </p>
                </div>
              </div>
              {
                list.statusId === 3 &&
                <div className="text-start overflow-hidden mt-5 gap-2 sm:flex hidden">
                  <Button
                    size='small'
                    sx={{
                      py: 1,
                      boxShadow: 'none',
                      fontSize: 12,
                      color: 'white',
                      backgroundColor: 'rgb(248 113 113)',
                      '&:hover': {
                        backgroundColor: 'rgb(220 38 38)',
                      },
                    }}
                    className="rounded-md duration-300 mt-2 whitespace-nowrap"
                    onClick={deleteReservationHandler}
                    variant="contained"
                  >
                    حذف نوبت
                  </Button>
                  <Button
                    size='small'
                    sx={{
                      py: 1,
                      boxShadow: 'none',
                      fontSize: 12,
                      color: 'white',
                      backgroundColor: 'rgb(16 185 129)',
                      '&:hover': {
                        backgroundColor: ' rgb(5 150 105)',
                      },
                    }}
                    className="rounded-md duration-300 mt-2 whitespace-nowrap"
                    onClick={goToDargahBank}
                    variant="contained"
                  >
                    پرداخت
                    {
                      loading &&
                      <CircularProgress size="15px" color="inherit" />
                    }
                  </Button>
                </div>
              }
            </div>


          </div>
        </div>
        {
          list.statusId === 3 &&
          <div className="sm:w-1/2 w-full text-start px-2">
            <p className=" font-semibold text-emerald-600">
              مراجعه‌کننده‌ی عزیز،
            </p>
            <p className="text-sm font-semibold mt-5 text-justify">
              با سپاس از اعتماد شما، به اطلاع می‌رسد مبلغ بیعانه‌ای که به صورت آنلاین جهت رزرو وقت پرداخت می‌شود، صرفاً به منظور قطعی شدن زمان ویزیت شماست.          </p>
            <p className="text-sm font-extrabold text-red-500 mt-5 text-justify">
              لطفا توجه بفرمایید که پس از پرداخت و ثبت نهایی نوبت، به دلیل اختصاص وقت و برنامه‌ریزی انجام‌شده، مبلغ بیعانه قابل استرداد نخواهد بود.
            </p>
            <p className="text-sm font-semibold mt-5 text-justify">
              شما حداکثر 2 ساعت زمان دارید تا پرداخت و نهایی شدن نوبت ثبت شده را انجام دهید. بعد از گذشت این زمان چنانچه پرداخت انجام نشود درخواست شما به صورت خودکار حذف خواهد شد.
            </p>
            <p className="text-sm font-semibold mt-5 text-justify">
              از همراهی شما سپاسگزاریم.
            </p>
            {
              list.statusId === 3 &&
              <div className="text-start overflow-hidden mt-5 gap-2 sm:hidden flex ">
                <Button
                  size='large'
                  sx={{
                    py: 1,
                    boxShadow: 'none',
                    fontSize: 12,
                    color: 'white',
                    backgroundColor: 'rgb(248 113 113)',
                    '&:hover': {
                      backgroundColor: 'rgb(220 38 38)',
                    },
                  }}
                  className="rounded-md duration-300 mt-2 whitespace-nowrap"
                  onClick={deleteReservationHandler}
                  variant="contained"
                >
                  حذف نوبت
                </Button>
                <Button
                  size='large'
                  sx={{
                    py: 1,
                    boxShadow: 'none',
                    fontSize: 12,
                    color: 'white',
                    backgroundColor: 'rgb(16 185 129)',
                    '&:hover': {
                      backgroundColor: ' rgb(5 150 105)',
                    },
                  }}
                  className="rounded-md duration-300 mt-2 whitespace-nowrap"
                  onClick={goToDargahBank}
                  variant="contained"
                >
                  پرداخت
                  {
                    loading &&
                    <CircularProgress size="15px" color="inherit" />
                  }
                </Button>
              </div>
            }
          </div>
        }
      </div>


    </>
  );
}

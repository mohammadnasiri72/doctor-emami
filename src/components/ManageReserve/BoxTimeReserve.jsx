import styled from '@emotion/styled';
import {
  Checkbox,
  FormControlLabel,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  tooltipClasses,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import farvardin from 'farvardin';
import { FaTrashCan } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import { mainDomain } from '../../utils/mainDomain';
import CheckBoxOne from './CheckBoxOne';
import ModalEditOneTime from './ModalEditOneTime';
import ModalSelectOneTime from './ModalSelectOneTime';
import useSettings from '../../hooks/useSettings';

export default function BoxTimeReserve({
  moon,
  year,
  valDoctor,
  numberMoon,
  setIsLoading,
  flag,
  setFlag,
  doctors,
  setValDoctor,
  date,
  setDate,
}) {
  const [listDay, setListDay] = useState([]);
  const [listDaySelect, setListDaySelect] = useState([]);
  const [listTime, setListTime] = useState([]);
  const [alignment, setAlignment] = useState('');

  const [listTurnChecked, setListTurnChecked] = useState([]);
  const [isDisableCheckBoxAll, setIsDisableCheckBoxAll] = useState(false);
  const [day, setDay] = useState('');
  const [nameDay, setNameDay] = useState('');
  const [dayAssumption, setDayAssumption] = useState('');
  const [nameDayAssumption, setNameDayAssumption] = useState('');

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

  useEffect(() => {
    setDate(converter(new Date().toLocaleDateString('fa-IR')));
  }, []);
  useEffect(() => {
    setListTurnChecked([]);
    // setDay(Number(date.slice(date.lastIndexOf('/') + 1)));
  }, [date]);

  useEffect(() => {
    setDayAssumption('');
  }, [moon, year]);

  useEffect(() => {
    setDay(
      Number(
        converter(
          new Date().toLocaleDateString('fa-IR').slice(new Date().toLocaleDateString('fa-IR').lastIndexOf('/') + 1)
        )
      )
    );
    setTimeout(() => {
      setDayAssumption(
        Number(
          converter(
            new Date().toLocaleDateString('fa-IR').slice(new Date().toLocaleDateString('fa-IR').lastIndexOf('/') + 1)
          )
        )
      );
    }, 200);
  }, []);

  // style tooltip
  const CustomWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 500,
      fontSize: 20,
    },
  });

  // import sweet alert-2
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });

  // change day
  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  useEffect(() => {
    if (year && moon && day) {
      const myDate = new Date();
      const myArrDate = farvardin.solarToGregorian(year, moon, day);
      myDate.setFullYear(myArrDate[0], myArrDate[1] - 1, myArrDate[2]);
      switch (myDate.getDay()) {
        case 0:
          setNameDay('یکشنبه');
          break;
        case 1:
          setNameDay('دوشنبه');
          break;
        case 2:
          setNameDay('سه‌شنبه');
          break;
        case 3:
          setNameDay('چهارشنبه');
          break;
        case 4:
          setNameDay('پنجشنبه');
          break;
        case 5:
          setNameDay('جمعه');
          break;
        case 6:
          setNameDay('شنبه');
          break;

        default:
          break;
      }
    }
  }, [year, moon, day]);

  useEffect(() => {
    if (year && moon && dayAssumption) {
      const myDate = new Date();
      const myArrDate = farvardin.solarToGregorian(year, moon, dayAssumption);
      myDate.setFullYear(myArrDate[0], myArrDate[1] - 1, myArrDate[2]);
      switch (myDate.getDay()) {
        case 0:
          setNameDayAssumption('یکشنبه');
          break;
        case 1:
          setNameDayAssumption('دوشنبه');
          break;
        case 2:
          setNameDayAssumption('سه‌شنبه');
          break;
        case 3:
          setNameDayAssumption('چهارشنبه');
          break;
        case 4:
          setNameDayAssumption('پنجشنبه');
          break;
        case 5:
          setNameDayAssumption('جمعه');
          break;
        case 6:
          setNameDayAssumption('شنبه');
          break;

        default:
          break;
      }
    }
  }, [year, moon, dayAssumption]);

  // get list day selected
  useEffect(() => {
    const arr = new Array(numberMoon < 7 ? 31 : 30).fill(false);
    arr.map((e, i) => {
      listDay.map((ev) => {
        if (i + 1 === Number(ev.dateFa.slice(ev.dateFa.lastIndexOf('/') + 1))) {
          arr[i] = true;
        }
        return true;
      });
      return true;
    });

    setListDaySelect(arr);
  }, [listDay]);

  // get day reserve
  useEffect(() => {
    if (moon && year && valDoctor) {
      setIsLoading(true);
      axios
        .get(`${mainDomain}/api/ReservationTime/GetList`, {
          params: {
            doctorId: valDoctor,
            dateFa: `${year}/${moon}/00`,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setListDay(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
        });
    }
  }, [moon, year, valDoctor, flag]);

  // get list time
  useEffect(() => {
    if (date.trim()) {
      setIsLoading(true);
      axios
        .get(`${mainDomain}/api/ReservationTime/GetList`, {
          params: {
            doctorId: valDoctor,
            dateFa: date,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setListTime(res.data[0]?.reservationTimes ? res.data[0].reservationTimes : []);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
        });
    }
  }, [date, flag, valDoctor]);

  //  delete one time
  const deleteTimeHandler = (e) => {
    Swal.fire({
      title: 'حذف زمان پذیرش',
      text: 'آیا از حذف زمان پذیرش مطمئن هستید؟',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: 'green',
      cancelButtonText: 'انصراف',
      confirmButtonText: 'حذف ',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        const data = new FormData();
        data.append('reservationTimeId', e.reservationTimeId);
        axios
          .post(`${mainDomain}/api/ReservationTime/Delete`, data, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
          .then((res) => {
            setFlag((e) => !e);
            setListTurnChecked([]);
            Toast.fire({
              icon: 'success',
              text: 'زمان پذیرش با موفقیت حذف شد',
            });
            setIsLoading(false);
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

  // delete all time
  const deleteAllTimeHandler = () => {
    Swal.fire({
      title: 'حذف زمان پذیرش',
      text: 'آیا از حذف موارد انتخاب شده مطمئن هستید؟',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: 'green',
      cancelButtonText: 'انصراف',
      confirmButtonText: 'حذف ',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        const data = new FormData();
        listTurnChecked.map((ev) => {
          data.append('reservationTimesId', ev);
          return true;
        });
        axios
          .post(`${mainDomain}/api/ReservationTime/DeleteRange`, data, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
          .then((res) => {
            setFlag((e) => !e);
            setListTurnChecked([]);
            Toast.fire({
              icon: 'success',
              text: 'زمان های پذیرش با موفقیت حذف شد',
            });
            setIsLoading(false);
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

  // set disable checkbox
  useEffect(() => {
    if (listTime.length > 0) {
      setIsDisableCheckBoxAll(false);
      listTime.map((e) => {
        if (e.isExpired) {
          setIsDisableCheckBoxAll(true);
        }
        return true;
      });
    } else {
      setIsDisableCheckBoxAll(true);
    }
  }, [listTime]);

  return (
    <>
      <div className="flex flex-wrap sm:flex-nowrap mt-3">
        <div className="sm:w-1/4 w-full min-w-72">
          <div className="h-[80vh] border rounded-lg overflow-auto p-3  pb-10 ">
            <p>
              تاریخ {year}/{moon}
            </p>
            <div className="flex flex-wrap">
              <ToggleButtonGroup
                sx={{ border: 'none' }}
                className="flex flex-wrap"
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
              >
                {listDaySelect.map((e, i) => (
                  <div key={i} className="mt-7 flex w-1/3 px-2">
                    <CustomWidthTooltip sx={{ fontSize: 45 }} title={nameDay}>
                      <ToggleButton
                        sx={{
                          fontSize: '20px',
                          backgroundColor: e ? 'rgb(100 116 139)' : 'rgb(241 245 249)',
                          color: e ? 'white' : '#0005',

                          '&:hover': {
                            backgroundColor: 'rgb(148 163 184)',
                          },
                          '&.Mui-selected , &.Mui-selected:hover': {
                            backgroundColor: 'rgb(15 23 42)',
                            color: 'yellowgreen',
                          },
                        }}
                        // color="primary"
                        onMouseEnter={() => {
                          setDay(i + 1);
                        }}
                        onClick={() => {
                          setDate(`${year}/${moon}/${i + 1}`);
                          setNameDayAssumption(nameDay);
                          setDayAssumption(i + 1);
                        }}
                        className="w-20 h-14 border duration-300"
                        value={i + 1}
                        selected={i + 1 === dayAssumption}
                      >
                        {i + 1}
                      </ToggleButton>
                    </CustomWidthTooltip>
                  </div>
                ))}
              </ToggleButtonGroup>
            </div>
          </div>
        </div>
        <div className="sm:w-3/4 w-full px-5 h-[80vh] border rounded-lg overflow-auto sm:mt-0 mt-3">
          <div className="flex flex-wrap py-4">
            <div style={{backgroundColor: themeMode==='light'? 'rgb(241 245 249)':'#212b36'}} className="w-full bg-slate-100 flex justify-between items-center px-5 py-2">
              <FormControlLabel
                onChange={() => {
                  if (listTurnChecked.length === listTime.length && listTurnChecked.length !== 0) {
                    setListTurnChecked([]);
                  } else {
                    const arr = [];
                    listTime.map((e) => {
                      arr.push(e.reservationTimeId);
                      return true;
                    });
                    setListTurnChecked(arr);
                  }
                }}
                control={
                  <Checkbox
                    disabled={isDisableCheckBoxAll}
                    size="large"
                    checked={listTurnChecked.length === listTime.length && listTurnChecked.length !== 0}
                    indeterminate={listTurnChecked.length < listTime.length && listTurnChecked.length !== 0}
                  />
                }
                label={''}
                className="whitespace-nowrap"
              />
              <p className="w-full text-2xl font-semibold">
                {' '}
                {nameDayAssumption} {date}
              </p>
              <Tooltip title="حذف">
                <IconButton
                  onClick={deleteAllTimeHandler}
                  className="w-10 h-10"
                  disabled={listTurnChecked.length === 0}
                >
                  <FaTrashCan
                    style={{ color: listTurnChecked.length === 0 ? '' : 'rgb(248 113 113)' }}
                    className="cursor-pointer text-2xl"
                  />
                </IconButton>
              </Tooltip>
            </div>

            {listTime.map((e) => (
              <div className="lg:w-1/3 md:w-1/2 w-full px-2 mt-5 relative" key={e.reservationTimeId}>
                <div
                  style={{ opacity: e.remainingCapacity === 0 ? '0.5' : '1' , backgroundColor: themeMode==='light'? 'rgb(226 232 240)':'#212b36' , color: themeMode==='light'?'' : 'white'}}
                  className="rounded-md px-2 w-full duration-300 flex flex-col justify-center items-center"
                >
                  <span className="text-xl font-semibold">
                    {e.toTime.slice(0, 5)} - {e.fromTime.slice(0, 5)}
                  </span>
                  <div>
                    <span>ظرفیت: </span>
                    <span>
                      {e.remainingCapacity}/{e.capacity}
                    </span>
                  </div>
                  <div className='flex justify-between items-center w-full'>
                  <Tooltip title="حذف">
                      <IconButton disabled={e.isExpired} onClick={() => deleteTimeHandler(e)}>
                        <FaTrashCan
                          style={{ color: e.isExpired ? '' : 'rgb(248 113 113)' }}
                          className="cursor-pointer text-2xl"
                        />
                      </IconButton>
                    </Tooltip>
                    <span>{e.isActive ? 'فعال' : 'غیرفعال'}</span>
                    <ModalEditOneTime setIsLoading={setIsLoading} setFlag={setFlag} e={e} />
                  </div>
                 
                  <div className="absolute top-0 -left-4">
                    <CheckBoxOne
                      e={e}
                      listTime={listTime}
                      listTurnChecked={listTurnChecked}
                      setListTurnChecked={setListTurnChecked}
                    />
                  </div>
                </div>
              </div>
            ))}
            {listTime.length === 0 && (
              <div className="w-full mt-3">
                <p className="text-center text-2xl font-semibold ">برای این تاریخ زمانی در نظر گرفته نشده است</p>
                <div className="mt-3">
                  <ModalSelectOneTime
                    setIsLoading={setIsLoading}
                    setFlag={setFlag}
                    doctors={doctors}
                    valDoctor={valDoctor}
                    setValDoctor={setValDoctor}
                    date={date}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

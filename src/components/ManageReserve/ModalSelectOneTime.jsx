import {
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IoCloseSharp } from 'react-icons/io5';
import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';
import persian from 'react-date-object/calendars/persian';
import persianFa from 'react-date-object/locales/persian_fa';
import DatePicker from 'react-multi-date-picker';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import Swal from 'sweetalert2';
import { mainDomain } from '../../utils/mainDomain';

export default function ModalSelectOneTime({ setIsLoading, setFlag, doctors, valDoctor, setValDoctor, date, dateOne }) {
  const [open, setOpen] = useState(false);

  const [valTimeStart, setValTimeStart] = useState('');
  const [valTimeEnd, setValTimeEnd] = useState('');
  const [capacity, setCapacity] = useState(1);
  const [valDate, setValDate] = useState(new Date().toLocaleDateString('fa-IR'));
  const [isActive, setIsActive] = useState(true);

  // import sweet alert-2
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });

  useEffect(() => {
    if (date) {
      setValDate(date);
    }
    if (dateOne) {
      setValDate(dateOne);
    }
  }, [date, dateOne]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // set one time
  const saveTimeHandler = () => {
    if (valTimeStart && valTimeEnd) {
      setIsLoading(true);
      const data = {
        doctorId: valDoctor,
        date: valDate,
        fromTime: `${valTimeStart.format()}:00`,
        toTime: `${valTimeEnd.format()}:00`,
        capacity,
        statusId: isActive ? 1 : 0,
      };
      axios
        .post(`${mainDomain}/api/ReservationTime/Add`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          handleClose();
          setFlag((e) => !e);
          Toast.fire({
            icon: 'success',
            text: 'زمان پذیرش با موفقیت ثبت شد',
            customClass: {
              container: 'toast-modal',
            },
          });
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          Toast.fire({
            icon: 'error',
            text: err.response ? err.response.data : 'خطای شبکه',
            customClass: {
              container: 'toast-modal',
            },
          });
        });
    } else if (!valTimeStart) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا زمان شروع را وارد کنید',
        customClass: {
          container: 'toast-modal',
        },
      });
    } else if (!valTimeEnd) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا زمان پایان را وارد کنید',
        customClass: {
          container: 'toast-modal',
        },
      });
    }
  };

  return (
    <>
      <Button
        sx={{
          py: 2,
          boxShadow: 'none',
          backgroundColor: 'rgb(16 185 129)',
          '&:hover': {
            backgroundColor: 'rgb(5 150 105)',
          },
        }}
        onClick={handleClickOpen}
        className="bg-green-500 px-5 py-2 rounded-md text-white hover:text-green-600 duration-300 font-semibold"
      >
        {date ? 'افزودن نوبت در این تاریخ' : 'افزودن روزانه'}
      </Button>
      <Dialog
        sx={{ '& .MuiDialog-paper': { minHeight: 455 } }}
        fullWidth
        maxWidth="md"
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>انتخاب تاریخ</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <IoCloseSharp />
        </IconButton>
        <DialogContent>
          <div className="flex flex-wrap">
            {/* select doctors */}
            <div className="flex items-center md:w-1/3 sm:w-1/2 w-full">
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
            {/* select date */}
            <div className="md:w-1/3 sm:w-1/2 w-full flex items-center sm:mt-0 mt-3">
              <p className="px-2 whitespace-nowrap">تاریخ :</p>
              <DatePicker
                children
                inputClass="border w-full rounded-lg h-14 px-3"
                calendar={persian}
                locale={persianFa}
                calendarPosition="bottom-right"
                onChange={(event) => {
                  setValDate(event.format());
                }}
                value={valDate}
                placeholder="تاریخ"
              />
            </div>
           
          </div>
          <div className="flex flex-wrap">
            {/* select from time */}
            <div className="w-60  mt-5 flex items-center ">
              <p className="px-2 whitespace-nowrap">از ساعت:</p>
              <DatePicker
                children
                inputClass="border w-full rounded-lg h-14 px-3"
                disableDayPicker
                format="HH:mm"
                plugins={[<TimePicker hideSeconds key={valTimeStart} />]}
                calendarPosition="bottom-right"
                onChange={(event) => {
                  setValTimeStart(event);
                }}
                value={valTimeStart}
                placeholder="ساعت شروع"
              />
            </div>
            {/* select end time */}
            <div className="w-60  mt-5 flex items-center ">
              <p className="px-2 whitespace-nowrap">تا ساعت:</p>
              <DatePicker
                children
                inputClass="border w-full rounded-lg h-14 px-3"
                disableDayPicker
                format="HH:mm"
                plugins={[<TimePicker hideSeconds key={valTimeStart} />]}
                calendarPosition="bottom-right"
                onChange={(event) => {
                  setValTimeEnd(event);
                }}
                value={valTimeEnd}
                placeholder="ساعت پایان"
              />
            </div>
          </div>
          <div className="flex items-center">
            {/* select capacity */}
            <div className="w-60 mt-5 flex items-center" dir="rtl">
              <p className="px-2 whitespace-nowrap">ظرفیت:</p>
              <TextField
                InputProps={{
                  endAdornment: <InputAdornment position="end">نفر</InputAdornment>,
                }}
                onChange={(e) => setCapacity(e.target.value)}
                className=" text-end duration-300"
                id="outlined-multiline-flexible"
                label=""
                multiline
                dir="rtl"
                value={capacity}
                maxRows={4}
              />
            </div>
             {/* select active */}
             <div className="pr-5 mt-2">
              <FormControlLabel
                value={isActive}
                onChange={() => setIsActive(!isActive)}
                control={<Switch checked={isActive} />}
                label={isActive ? 'فعال' : 'غیر فعال'}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              py: 2,
              color: 'white',
              boxShadow: 'none',
              backgroundColor: 'rgb(16 185 129)',
              '&:hover': {
                backgroundColor: 'rgb(5 150 105)',
              },
            }}
            onClick={saveTimeHandler}
          >
            ذخیره تغیرات
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

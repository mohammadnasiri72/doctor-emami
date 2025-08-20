import { Button, Paper, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { mainDomain } from '../../utils/mainDomain';
import SelectAbroadLogin from './SelectAbroadLogin';
import Page from '../Page';
import useSettings from '../../hooks/useSettings';

export default function MobileLoginPageOne({
  mobileNumber,
  setMobileNumber,
  setIsValiedMobile,
  abroad,
  setAbroad,
  setIsLoading,
}) {
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


  const paternMobile = /^09[0|1|2|3|9][0-9]{8}$/;
  const btnNextRef = useRef(null);
  const inpNumMob = useRef(null);

  const { themeMode} = useSettings();

  // useEffect(() => {
  //   if (mobileNumber.match(paternMobile)) {
  //     btnNextRef.current.focus();
  //   }
  // }, [mobileNumber]);

  // import sweet alert-2
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });

  // swt color input mobile
  let colorMobile;
  if (mobileNumber.match(paternMobile)) {
    colorMobile = 'success';
  } else if (mobileNumber.length === 0) {
    colorMobile = 'primary';
  } else {
    colorMobile = 'error';
  }

  // send number mobile
  const sendData = () => {
    if (mobileNumber.match(paternMobile)) {
      setIsLoading(true);
      const mobileNumberData = new FormData();
      mobileNumberData.append('mobileNumber', mobileNumber);
      axios
        .post(`${mainDomain}/api/Authenticate/SendOtp`, mobileNumberData)
        .then(() => {
          setIsLoading(false);
          setIsValiedMobile(true);
          Toast.fire({
            icon: 'success',
            text: 'لطفا کد 6 رقمی ارسال شده را وارد کنید',
          });
        })
        .catch((err) => {
          setIsLoading(false);
          Toast.fire({
            icon: 'error',
            text: err.response ? err.response?.data : 'خطای شبکه',
          });
        });
    } else {
      Toast.fire({
        icon: 'error',
        text: 'لطفا شماره موبایل خود را به درستی وارد کنید',
      });
    }
  };

  return (
    <>
      <Paper
      sx={{backgroundColor: themeMode==='light'?'rgb(241 245 249)' : '#161c24'}}
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            btnNextRef.current.click();
          }
        }}
      >
        <h2 className="text-3xl">صفحه ورود</h2>
        <SelectAbroadLogin abroad={abroad} setAbroad={setAbroad} />
        <div className="px-5 lg:w-2/3 w-full mx-auto mt-5">
          <TextField
          type='number'
            autoFocus
            onChange={(e) =>{
              setMobileNumber(toEnglishNumber(e.target.value))
            } }
            value={mobileNumber}
            className="w-full text-white"
            id="outlined-basic"
            label={'شماره موبایل'}
            ref={inpNumMob}
            color={colorMobile}
            maxRows={1}
            // InputProps={{className:'textfield-style'}}
          />
          <div>
            <div className=" mt-4">
              <Button
                ref={btnNextRef}
                sx={{
                  py: 1,
                  fontSize: 20,
                  backgroundColor: 'rgb(16 185 129)',
                  '&:hover': {
                    backgroundColor: 'rgb(5 150 105)',
                  },
                }}
                onClick={sendData}
                className="rounded-md w-full text-white mt-5 duration-300"
                variant="contained"
              >
                مرحله بعد
              </Button>
            </div>
            <div className="flex justify-start mt-4 ">
              {/* <Button
                size="medium"
                sx={{
                  py: 1,
                  fontSize: 16,
                  backgroundColor: 'rgb(20 184 166)',
                  '&:hover': {
                    backgroundColor: 'rgb(13 148 136)',
                  },
                }}
                className="rounded-md  text-white mt-5 duration-300"
                variant="contained"
              >
                <Link to={'/register'}>ساخت حساب جدید</Link>
              </Button> */}
              <p className='pl-3'>حساب کاربری ندارید؟ </p>
              <Link className='text-teal-500 hover:text-teal-600 duration-300 font-semibold' to={'/register'}>ثبت نام کنید</Link>
            </div>
          </div>
        </div>
      </Paper>
    </>
  );
}

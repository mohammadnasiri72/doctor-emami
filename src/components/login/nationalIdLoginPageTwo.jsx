import React, { useRef, useState } from 'react';
import { Button, IconButton, Tooltip } from '@mui/material';
import { IoMdArrowRoundForward } from 'react-icons/io';
import axios from 'axios';
import Swal from 'sweetalert2';
import InputEmailLogin from './inputEmailLogin';
import { mainDomain } from '../../utils/mainDomain';
import Page from '../Page';

export default function NationalIdLoginPageTwo({ setForgotPassword, setIsLoading }) {
  const paternEmail = /[a-zA-Z0-9.-]+@[a-z-]+\.[a-z]{2,3}/;
  const [email, setEmail] = useState('');

  const inpPassRef = useRef(null)

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });

  const url = '/api/Authenticate/ResetPassword'
  const emailData = new FormData();
  emailData.append('email', email);
  const resetPasswordHandler = () => {
    if (email.match(paternEmail)) {
      setIsLoading(true);
      axios
        .post(mainDomain + url , emailData)
        .then((res) => {
          setIsLoading(false);
          if (res.status === 200) {
            setForgotPassword(false);
            Toast.fire({
              icon: 'success',
              text: 'رمز عبور جدید به ایمیل شما ارسال شد',
            });
          }
        })
        .catch((err) => {
          setIsLoading(false);
          Toast.fire({
            icon: 'error',
            text: err.response ? err.response.data : 'خطای شبکه',
          });
        });
    } else {
      Toast.fire({
        icon: 'error',
        text: 'لطفا ایمیل خود را به درستی وارد کنید',
      });
    }
  };

  return (
    <>
     <Page onKeyDown={(e)=>{
      if (e.keyCode === 13) {
        inpPassRef.current.click()
      }
     }}>
     <div>
        <div className="text-start">
         
          <Tooltip title="مرحله قبل">
          <IconButton onClick={() => setForgotPassword(false)}>
            <IoMdArrowRoundForward className="text-3xl" />
          </IconButton>
        </Tooltip>
        </div>
        <h3 className="mt-2">لطفا ایمیل خود را جهت بازیابی رمز عبور وارد کنید</h3>
      </div>
      <InputEmailLogin setEmail={setEmail} email={email} />
      <div className="px-5 mt-5 lg:w-2/3 w-full mx-auto">
        
        <Button
        ref={inpPassRef}
              sx={{
                py: 1,
                fontSize: 20,
                backgroundColor: 'rgb(16 185 129)',
                '&:hover': {
                  backgroundColor: 'rgb(5 150 105)',
                },
              }}
              onClick={resetPasswordHandler}
              className="rounded-md w-full text-white mt-5 duration-300"
              variant="contained"
            >
               بازگردانی رمز عبور
            </Button>
      </div>
     </Page>
    </>
  );
}

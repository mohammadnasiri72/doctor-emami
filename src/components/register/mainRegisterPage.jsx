import { Button, Paper } from '@mui/material';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useSettings from '../../hooks/useSettings';
import { mainDomain } from '../../utils/mainDomain';
import SelectTourist from './SelectTourist';
import InputMobilEmail from './inputMobil_Email';
import InputNationalId from './inputNationalId';
import SelectAbroad from './selectAbroad';
import InputNationalPassport from './InputNationalPassport';

export default function MainRegisterPage({ setIsRegister, setRegisterModel, setIsLoading, setPageState }) {
  const [abroad, setAbroad] = useState(false);
  const [nationalId, setNationalId] = useState('');
  // const [nationalPassport, setNationalPassport] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [isTourist, setIsTourist] = useState(false);

  const paternNationalId = /^[0-9]{10}$/;
  const paternMobile = /^09[0|1|2|3|9][0-9]{8}$/;
  const paternEmail = /[a-zA-Z0-9.-]+@[a-z-]+\.[a-z]{2,3}/;

  const inpNextRef = useRef(null);

  const { themeMode } = useSettings();

  useEffect(()=>{
    if (abroad) {
      setIsTourist(false)
    }
  },[abroad])

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });

  // register patient
  const submitForm = () => {
    const registerModel = {
      nationalId,
      abroad,
      mobile,
      email,
      foreignNational:isTourist
    };
    if (((nationalId.match(paternNationalId) && !isTourist) || (nationalId.length>3 && isTourist)) && (mobile.match(paternMobile) || email.match(paternEmail))) {
      setIsLoading(true);
      setRegisterModel(registerModel);
      axios
        .post(`${mainDomain}/api/Patient/PreRegister`, registerModel)
        .then(() => {
          setIsLoading(false);
          setIsRegister(true);
          Toast.fire({
            icon: 'success',
            text: 'کد ارسال شد لطفا اطلاعات خود را تکمیل کنید',
            customClass: {
              container: 'toast-modal',
            },
          });
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
    }
    if (!abroad && !mobile.match(paternMobile)) {
      Toast.fire({
        icon: 'error',
        text: ' شماره موبایل نا معتبر است',
        customClass: {
          container: 'toast-modal',
        },
      });
    }
    if (abroad && !email.match(paternEmail)) {
      Toast.fire({
        icon: 'error',
        text: ' ایمیل نا معتبر است',
        customClass: {
          container: 'toast-modal',
        },
      });
    }
    if (!nationalId.match(paternNationalId) && !isTourist) {
      Toast.fire({
        icon: 'error',
        title: 'کد ملی نامعتبر است',
        customClass: {
          container: 'toast-modal',
        },
      });
    }
    if (nationalId.length<=3 && isTourist) {
      Toast.fire({
        icon: 'error',
        title: 'کد اتباع / شماره پاسپورت نامعتبر است',
        customClass: {
          container: 'toast-modal',
        },
      });
    }
  };

  return (
    <>
      <Paper
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            inpNextRef.current.click();
          }
        }}
        className="flex justify-center items-center min-h-screen"
      >
        <div
          style={{ backgroundColor: themeMode === 'light' ? 'rgb(241 245 249)' : '#161c24' }}
          className={
            setPageState
              ? 'bg-slate-100 w-full p-3 shadow-lg rounded-lg min-h-screen'
              : 'lg:w-1/2 w-full bg-slate-100 p-3 shadow-lg rounded-lg min-h-screen'
          }
        >
          <div className="flex justify-center">
            <img src={'/favicon/lgo.png'} alt="logo" />
          </div>
          <h1 className="text-3xl mt-4">ثبت نام بیمار</h1>
          <div className="flex justify-center items-center">
            <SelectAbroad abroad={abroad} setAbroad={setAbroad} setMobile={setMobile} setEmail={setEmail} />
            {!abroad && (
              <SelectTourist
                isTourist={isTourist}
                setIsTourist={setIsTourist}
                setMobile={setMobile}
                setEmail={setEmail}
              />
            )}
            
          </div>
          {!isTourist && <InputNationalId nationalId={nationalId} setNationalId={setNationalId} />}
          {isTourist && (
            <InputNationalPassport nationalPassport={nationalId} setNationalPassport={setNationalId} />
          )}
          <InputMobilEmail abroad={abroad} email={email} setEmail={setEmail} mobile={mobile} setMobile={setMobile} />
          <div className="flex justify-center">
            <div className="px-3 mt-10 lg:w-2/3 w-full mx-auto ">
              <Button
                ref={inpNextRef}
                sx={{
                  py: 1,
                  fontSize: 20,
                  backgroundColor: 'rgb(16 185 129)',
                  '&:hover': {
                    backgroundColor: 'rgb(5 150 105)',
                  },
                }}
                className="bg-blue-400 rounded-md text-white duration-300 w-full"
                onClick={submitForm}
                variant="contained"
              >
                مرحله بعد
              </Button>
            </div>
          </div>
          {!setPageState && (
            <div className="px-3 mt-5 flex justify-start lg:w-2/3 w-full mx-auto">
              {/* <Button
                size="medium"
                className="px-5 py-2 rounded-md text-white duration-300"
                sx={{
                  py: 1,
                  fontSize: 16,
                  backgroundColor: 'rgb(20 184 166)',
                  '&:hover': {
                    backgroundColor: 'rgb(13 148 136)',
                  },
                }}
                variant="contained"
              >
                <Link to={'/login'}>قبلا حساب ساخته ام</Link>
              </Button> */}
              <p className="pl-3">قبلا ثبت نام کرده اید؟ </p>
              <Link className="text-teal-500 hover:text-teal-600 duration-300 font-semibold" to={'/login'}>
                وارد شوید
              </Link>
            </div>
          )}
          {setPageState && (
            <div className="px-3 mt-5 text-start lg:w-2/3 w-full mx-auto">
              <Button
                sx={{
                  py: 1,
                  fontSize: 16,
                  backgroundColor: 'rgb(20 184 166)',
                  '&:hover': {
                    backgroundColor: 'rgb(13 148 136)',
                  },
                }}
                className="rounded-md duration-300 mt-2"
                onClick={() => setPageState(0)}
                variant="contained"
              >
                <FaArrowRight className="text-white" />
                <span className="px-2 text-white">برگشت به صفحه قبل</span>
              </Button>
            </div>
          )}
        </div>
        {!setPageState && (
          <div className="lg:w-1/2 w-0 h-screen bg-login bg-cover bg-no-repeat bg-[#0005] bg-blend-multiply opacity-90" />
        )}
      </Paper>
    </>
  );
}

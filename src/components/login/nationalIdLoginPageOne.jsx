import { Button, Typography } from '@mui/material';
import axios from 'axios';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { mainDomain } from '../../utils/mainDomain';
import InputNationalIdLogin from './InputNationalIdLogin';
import SelectAbroadLogin from './SelectAbroadLogin';
import InputPasswordLogin from './inputPasswordLogin';
import Page from '../Page';

export default function NationalIdLoginPageOne({ abroad, setAbroad, setIsLoading, setForgotPassword , setAccount}) {
  const navigate = useNavigate();
  const paternNationalId = /^[0-9]{10}$/;
  const loginRef = useRef(null);

  // import sweet alert-2
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });

  const url = '/api/Authenticate/Login';
  const [nationalId, setNationalId] = useState('');
  const [password, setPassword] = useState('');
  const [isfocusInpMobile, setIsfocusInpMobile] = useState(false);

  const loginHandler = () => {
    const data = {
      userName: nationalId,
      password,
    };
    if (nationalId.match(paternNationalId) && password.length >= 6) {
      setIsLoading(true);
      axios
        .post(`${mainDomain}/api/Authenticate/Login`, data)
        .then((res) => {
          setIsLoading(false);
          if (res.status === 200) {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userId', res.data.userId);
            localStorage.setItem('refreshToken', res.data.refreshToken);
            localStorage.setItem('roles', res.data.roles);
            localStorage.setItem('expiration', res.data.expiration);

            let role = localStorage.getItem('roles') ? localStorage.getItem('roles') : 'patient';
            if (role.includes('Doctor')) {
              role = 'Doctor';
            } else if (role.includes('Staff')) {
              role = 'Staff';
            }
            if (localStorage.getItem('token')) {
              axios
                .get(`${mainDomain}/api/${role}/Get`, {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                  },
                })
                .then((res) => {
                  if (res.status === 200) {
                    setAccount(res.data);
                    Toast.fire({
                      icon: 'success',
                      text: 'با موفقیت وارد شدید',
                    });
                    setTimeout(() => {
                      navigate('/');
                    }, 1000);
                  } else {
                    navigate('/login');
                  }
                })
                .catch(() => {
                  if (url.pathname.includes('/dashboard')) {
                    navigate('/login');
                  }
                });
            }
            
          }
          
        })
        .catch((err) => {
          setIsLoading(false);
          Toast.fire({
            icon: 'error',
            text: err.response ? err.response.data : 'خطای شبکه',
          });
        });
    } else if (!nationalId.match(paternNationalId)) {
      Toast.fire({
        icon: 'error',
        text: 'نام کاربری صحیح نیست',
      });
    } else if (password.length < 6) {
      Toast.fire({
        icon: 'error',
        text: 'رمز عبور صحیح نیست (رمز عبور باید بزرگتر از 6 رقم باشد)',
      });
    }
  };

  return (
    <>
      <Page
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            loginRef.current.click();
          }
        }}
      >
        <h2 className="text-3xl">صفحه ورود</h2>
        <SelectAbroadLogin abroad={abroad} setAbroad={setAbroad} />
        <InputNationalIdLogin
          nationalId={nationalId}
          setNationalId={setNationalId}
          setIsfocusInpMobile={setIsfocusInpMobile}
        />
        <InputPasswordLogin password={password} setPassword={setPassword} isfocusInpMobile={isfocusInpMobile} />
        <div className="flex px-5 mt-5 mx-auto lg:w-2/3 w-full">
          <div className="w-full">
            {/* <Button className="w-full px-5 py-2 rounded-md bg-green-500 hover:bg-green-600 duration-300 text-white" onClick={loginHandler} variant="contained">ورود</Button> */}
            <Button
              ref={loginRef}
              sx={{
                py: 1,
                fontSize: 20,
                backgroundColor: 'rgb(16 185 129)',
                '&:hover': {
                  backgroundColor: 'rgb(5 150 105)',
                },
              }}
              onClick={loginHandler}
              className="rounded-md w-full text-white mt-5 duration-300"
              variant="contained"
            >
              ورود
            </Button>
          </div>
        </div>
        <div className="px-5 text-start mt-4 lg:w-2/3 w-full mx-auto">
          <div>
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
              onClick={() => setForgotPassword(true)}
              className="rounded-md  text-white mt-5 duration-300"
              variant="contained"
            >
              فراموشی رمز عبور
            </Button> */}
            <Typography
              sx={{ fontWeight: 'bold' }}
              className="cursor-pointer text-emerald-500 hover:text-emerald-600 duration-300"
              onClick={() => setForgotPassword(true)}
            >
              رمز عبور خود را فراموش کرده‌ام!
            </Typography>
          </div>
          <div className="mt-4 flex justify-start">
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
            <p className="pl-3">حساب کاربری ندارید؟ </p>
            <Link className="text-teal-500 hover:text-teal-600 duration-300 font-semibold" to={'/register'}>
              ثبت نام کنید
            </Link>
          </div>
          {/* <button
          onClick={() => setForgotPassword(true)}
          className="px-5 py-2 rounded-md bg-blue-500 hover:bg-blue-600 duration-300 text-white"
        >
          
        </button> */}
        </div>
        <div className="text-start px-2">
          {/* <button
          onClick={() => {
            route.replace('/register');
          }}
          className="bg-slate-700 px-5 py-2 rounded-md text-white duration-300 hover:bg-slate-800"
        >
          
        </button> */}
        </div>
      </Page>
    </>
  );
}

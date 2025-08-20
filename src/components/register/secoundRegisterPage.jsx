import { Button, IconButton, Tooltip } from '@mui/material';
import axios from 'axios';
import { useRef, useState } from 'react';
import { IoMdArrowRoundForward } from 'react-icons/io';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { mainDomain } from '../../utils/mainDomain';
import Page from '../Page';
import SelectAge from './SelectAge';
import InputFillCode from './fillCode';
import InputLastName from './inputLName';
import InputName from './inputName';
import InputPassword from './inputPassword';
import InputTimer from './inputTimer';
import SelectGender from './selectGender';

export default function SecoundRegisterPage({
  registerModel,
  setIsRegister,
  setIsLoading,
  pageState,
  setPageState,
  pageStateReception,
  setPageStateReception,
  setAccount,
}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('m');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [dateOfBirthFaPatient, setDateOfBirthFaPatient] = useState('');

  const navigate = useNavigate();
  const url = '/api/Patient/Register';

  const btnSubmit = useRef(null);

  // const paternPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });

  // register patient
  const submitHandler = (e) => {
    e.preventDefault();
    registerModel.firstName = firstName;
    registerModel.lastName = lastName;
    registerModel.gender = gender;
    registerModel.password = password;
    registerModel.code = code;
    registerModel.dateOfBirthFa = dateOfBirthFaPatient;
    if (
      firstName.length > 2 &&
      lastName.length > 2 &&
      gender.length !== 0 &&
      code.length === 6 &&
      dateOfBirthFaPatient.length !== 0 &&
      (registerModel.abroad === false || password.length >= 6)
    ) {
      setIsLoading(true);
      axios
        .post(mainDomain + url, registerModel)
        .then((response) => {
          setIsLoading(false);
          if (!pageState && !pageStateReception) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.userId);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            localStorage.setItem('roles', response.data.roles);
            localStorage.setItem('expiration', response.data.expiration);

            axios
              .get(`${mainDomain}/api/patient/Get`, {
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
                    navigate('/dashboard');
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
          } else {
            Toast.fire({
              icon: 'success',
              text: 'ثبت نام بیمار با موفقیت انجام شد',
              customClass: {
                container: 'toast-modal',
              },
            });
            if (!pageState) {
              setPageStateReception(1);
            }
            if (!pageStateReception) {
              setPageState(0);
            }
            setIsRegister(false);
          }
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
    } else if (firstName.length <= 2) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا نام خود را به درستی وارد کنید(نام باید بیشتر از دو حرف باشد)',
        customClass: {
          container: 'toast-modal',
        },
      });
    } else if (lastName.length < 2) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا نام خانوادگی خود را به درستی وارد کنید(نام خانوادگی باید بیشتر از دو حرف باشد)',
        customClass: {
          container: 'toast-modal',
        },
      });
    } else if (gender.length === 0) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا جنسیت خود را به درستی وارد کنید(جنسیت نمیتواند خالی باشد)',
        customClass: {
          container: 'toast-modal',
        },
      });
    } else if (dateOfBirthFaPatient.length === 0) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا تاریخ تولد را به وارد کنید',
        customClass: {
          container: 'toast-modal',
        },
      });
    } else if (registerModel.abroad === true && password.length < 6) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا پسورد خود را به درستی وارد کنید(پسورد باید بیشتر از 5 رقم باشد)',
        customClass: {
          container: 'toast-modal',
        },
      });
    } else if (code.length !== 6) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا کد ارسال شده را به درستی وارد کنید(کد ارسال شده باید 6 رقم باشد)',
        customClass: {
          container: 'toast-modal',
        },
      });
    }
  };

  return (
    <>
      <Page
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            btnSubmit.current.click();
          }
        }}
        className="flex justify-center items-center min-h-screen"
      >
        <div
          className={
            setPageState
              ? 'w-full p-3 shadow-lg rounded-lg min-h-screen'
              : 'lg:w-1/2 w-full p-3 shadow-lg rounded-lg min-h-screen'
          }
        >
          <div className="flex justify-center">
            <img src={'/favicon/lgo.png'} alt="" />
          </div>
          <div className="text-start px-5">
            <Tooltip title="مرحله قبل">
              <IconButton
                onClick={() => {
                  setIsRegister(false);
                }}
              >
                <IoMdArrowRoundForward className="text-3xl" />
              </IconButton>
            </Tooltip>
          </div>

          <div className=" mt-5">
            <InputName firstName={firstName} setFirstName={setFirstName} />
            <InputLastName lastName={lastName} setLastName={setLastName} />
            <SelectGender gender={gender} setGender={setGender} />
            <SelectAge setDateOfBirthFaPatient={setDateOfBirthFaPatient} />
            {registerModel.abroad && <InputPassword setPassword={setPassword} password={password} />}
            <InputFillCode setCode={setCode} />
            <div className="px-5 mx-auto lg:w-2/3 w-full mt-4">
              <div className="px-2 rounded-md flex items-center">
                <Button
                  sx={{
                    py: 1,
                    fontSize: 20,
                    backgroundColor: 'rgb(16 185 129)',
                    '&:hover': {
                      backgroundColor: 'rgb(5 150 105)',
                    },
                  }}
                  className="w-full text-white px-5 py-2"
                  onClick={submitHandler}
                  ref={btnSubmit}
                  variant="contained"
                >
                  تایید
                </Button>
              </div>
            </div>
            <div className="text-start px-5 mx-auto lg:w-2/3 w-full mt-3 text-xs">
              <InputTimer registerModel={registerModel} setIsLoading={setIsLoading} />
            </div>
          </div>
        </div>
        {!setPageState && (
          <div className="lg:w-1/2 w-0 h-screen bg-login bg-cover bg-no-repeat bg-[#0005] bg-blend-multiply opacity-90" />
        )}
      </Page>
    </>
  );
}

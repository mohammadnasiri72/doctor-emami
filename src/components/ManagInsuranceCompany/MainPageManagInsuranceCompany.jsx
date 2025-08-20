import { Button, FormControlLabel, Switch, TextField } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import TableManageInsurance from './TableManageInsurance';
import SimpleBackdrop from '../backdrop';
import { mainDomain } from '../../utils/mainDomain';

export default function MainPageManagInsuranceCompany() {
  const [nameInsurance, setNameInsurance] = useState('');
  const [descInsurance, setDescInsurance] = useState('');
  const [isActive, setisActive] = useState(true);
  const [flag, setFlag] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // import sweet alert-2
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });

  //   set new insurance
  const setInsuranceHandler = () => {
    if (nameInsurance.length === 0) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا عنوان بیمه را وارد کنید',
      });
    } else {
      setIsLoading(true);
      const data = {
        name: nameInsurance,
        description: descInsurance,
        isActive,
      };
      axios
        .post(`${mainDomain}/api/InsuranceCompany/Add`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setIsLoading(false);
          setFlag((e) => !e);
          setNameInsurance('');
          setDescInsurance('');
          setisActive(true);
          Toast.fire({
            icon: 'success',
            text: 'بیمه با موفقیت ثبت شد',
          });
        })
        .catch((err) => {
          setIsLoading(false);
          Toast.fire({
            icon: 'error',
            text: err.response ? err.response.data : 'خطای شبکه',
          });
        });
    }
  };

  return (
    <>
      <div className="relative">
        <div className="flex flex-wrap justify-start">
          <div className=' sm:w-1/3 w-full'>
            <TextField
              onChange={(e) => setNameInsurance(e.target.value)}
              className=" text-end duration-300 w-full"
              id="outlined-multiline-flexible"
              label="عنوان بیمه"
              multiline
              dir="rtl"
              value={nameInsurance}
              maxRows={4}
            />
          </div>
          <div className="sm:pr-2 sm:w-1/2 w-full sm:mt-0 mt-3">
            <TextField
              onChange={(e) => setDescInsurance(e.target.value)}
              className=" text-end duration-300 w-full"
              id="outlined-multiline-flexible"
              label="توضیحات"
              multiline
              dir="rtl"
              value={descInsurance}
              maxRows={4}
            />
          </div>
          <div className="pr-5 mt-1 w-1/6 ">
            <FormControlLabel
              value={isActive}
              onChange={() => setisActive(!isActive)}
              control={<Switch checked={isActive} />}
              label={isActive ? 'فعال' : 'غیر فعال'}
            />
          </div>
        </div>
        <div className="text-start mt-4">
          <Button
           sx={{
            boxShadow: 'none',
            backgroundColor: 'rgb(16 185 129)',
            '&:hover': {
              backgroundColor: 'rgb(5 150 105)',
            },
          }}
            onClick={setInsuranceHandler}
            className="px-5 py-4 rounded-md bg-green-500 text-white hover:bg-green-600 duration-300"
          >
            ثبت
          </Button>
        </div>
        <div className="mt-4">
          <TableManageInsurance flag={flag} setIsLoading={setIsLoading} setFlag={setFlag} isLoading={isLoading}/>
        </div>
      </div>
      {isLoading && <SimpleBackdrop />}
    </>
  );
}

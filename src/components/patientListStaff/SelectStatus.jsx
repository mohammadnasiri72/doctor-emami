import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import React, { useEffect, useState } from 'react';
import { mainDomain } from '../../utils/mainDomain';

export default function SelectStatus({pat , setIsLoading , statusList}) {
 
  const [valStatus, setValStatus] = useState('');

  // import sweet alert-2
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });

  useEffect(()=>{
    setValStatus(pat.statusId)
  },[pat])


  const changeStatusHandler = (e)=>{
    Swal.fire({
        title: 'تغییر وضعیت بیمار',
        text: 'آیا از ثبت درخواست خود مطمئن هستید؟',
        showCancelButton: true,
        confirmButtonColor: 'green',
        cancelButtonColor: '#d33',
        cancelButtonText: 'انصراف',
        confirmButtonText: 'تایید',
      }).then((result) => {
        
        if (result.isConfirmed) {
          setIsLoading(true)
            const data = {
              patientId:pat.patientId,
              patientStatus: e.target.value,
            }
            axios.post(`${mainDomain}/api/Patient/Status/Update` , data ,{
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            })
            .then((res)=>{
              setValStatus(e.target.value)
              setIsLoading(false)
              Toast.fire({
                icon: 'success',
                text: 'وضعیت بیمار با موفقیت تغییر کرد',
              });
            })
            .catch((err)=>{
              setIsLoading(false)
              Toast.fire({
                icon: 'error',
                text: err.response ? err.response?.data : 'خطای شبکه',
              });
            })

       
        }
      });
  }
  return (
    <>
      <div className="" dir="rtl">
        <FormControl color="primary">
          <InputLabel color="primary" className="px-2" id="demo-simple-select-label">
            وضعیت
          </InputLabel>
          <Select
          size='small'
            className="w-28"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={valStatus}
            label="وضعیت"
            color="primary"
            onChange={changeStatusHandler}
          >
            {statusList.map((e, i) => (
              <MenuItem key={i} value={i+100}>
                {e}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </>
  );
}

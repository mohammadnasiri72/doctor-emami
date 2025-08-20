import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persianFa from 'react-date-object/locales/persian_fa';
import Swal from 'sweetalert2';
import { mainDomain } from '../../utils/mainDomain';
import SimpleBackdrop from '../backdrop';
import InputCoverageAmount from './InputCoverageAmount';
import useSettings from '../../hooks/useSettings';

export default function AddInsurance({ userSelected, setShowAddInsurance, setFlag }) {
  const [userInsurance, setUserInsurance] = useState([]);
  const [valInsurance, setValInsurance] = useState('');
  const [policyNumber, setPolicyNumber] = useState('');
  const [coverageType, setCoverageType] = useState('');
  const [coverageAmount, setCoverageAmount] = useState('');
  const [startDateFa, setStartDateFa] = useState('');
  const [endDateFa, setEndDateFa] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { themeMode } = useSettings();


  const datePicStart = useRef();

  const datePicEnd = useRef();

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });

  useEffect(() => {
    if (userSelected.nationalId) {
      axios
        .get(`${mainDomain}/api/InsuranceCompany/GetList`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setUserInsurance(res.data);
          setValInsurance(res.data[0].insuranceCompanyId);
        })
        .catch((err) => {});
    }
  }, [userSelected]);

  const setInsuranceHandler = () => {
    if (!startDateFa || !endDateFa) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا تاریخ بیمه را وارد کنید',
        customClass:{
          container: 'toast-modal'
        }
      });
      
    }
    if (!coverageAmount) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا درصد پوشش بیمه را وارد کنید',
        customClass:{
          container: 'toast-modal'
        }
      });
    }
    if (!coverageType) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا نوع پوشش بیمه را وارد کنید',
        customClass:{
          container: 'toast-modal'
        }
      });
    }
    if (!policyNumber) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا شماره بیمه را وارد کنید',
        customClass:{
          container: 'toast-modal'
        }
      });
    }
    if (coverageAmount && coverageType && policyNumber && startDateFa && endDateFa) {
      setIsLoading(true);
      const data = {
        insuranceCompanyId: valInsurance,
        patientId: userSelected.patientId,
        policyNumber: policyNumber.toString(),
        coverageType,
        coverageAmount,
        startDateFa,
        endDateFa,
      };
      axios
        .post(`${mainDomain}/api/Insurance/Add`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setIsLoading(false);
          Toast.fire({
            icon: 'success',
            text: 'بیمه با موفقیت ثبت شد',
            customClass:{
              container: 'toast-modal'
            }
          });
          setShowAddInsurance(false);
          setFlag((e) => !e);
        })
        .catch((err) => {
          setIsLoading(false);
        });
    }
  };
  return (
    <>
      <div className="w-full">
        <FormControl color="primary" className="w-full">
          <InputLabel color="primary" className="px-2" id="demo-simple-select-label">
            انتخاب بیمه
          </InputLabel>
          <Select
            onChange={(e) => setValInsurance(e.target.value)}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="انتخاب بیمه"
            color="primary"
            value={valInsurance}
          >
            {userInsurance.length > 0 &&
              userInsurance.map((e, i) => (
                <MenuItem value={e.insuranceCompanyId} key={e.insuranceCompanyId}>
                  <span>{e.name}</span>
                </MenuItem>
              ))}
            {userInsurance.length === 0 && (
              <MenuItem disabled>
                <span>لیست بیمه های بیمار خالی است</span>
              </MenuItem>
            )}
          </Select>
        </FormControl>
      </div>
      <div className=" text-start mt-3" dir="rtl">
        <TextField
          onChange={(e) => {
            if (Number(e.target.value)) {
              setPolicyNumber(Number(e.target.value));
            } else if (!e.target.value) {
              setPolicyNumber('');
            } else {
              setPolicyNumber(policyNumber);
            }
          }}
          className="w-full text-end"
          id="outlined-multiline-flexible"
          label="شماره بیمه"
          multiline
          dir="rtl"
          value={policyNumber}
          maxRows={4}
        />
      </div>
      <div className=" text-start mt-3" dir="rtl">
        <TextField
          onChange={(e) => setCoverageType(e.target.value)}
          className="w-full text-end"
          id="outlined-multiline-flexible"
          label="نوع پوشش بیمه"
          multiline
          dir="rtl"
          value={coverageType}
          maxRows={4}
        />
      </div>
      <div className=" text-start mt-3" dir="rtl">
        {/* <TextField
          onChange={(e) => {
            if (Number(e.target.value) >= 0 && Number(e.target.value) <= 100) {
              setCoverageAmount(e.target.value);
            } else if (!e.target.value) {
              setCoverageAmount('');
            } else {
              setCoverageAmount(coverageAmount);
            }
          }}
          className="w-full text-end"
          id="outlined-multiline-flexible"
          label="درصد پوشش بیمه(از صفر تا صد)"
          multiline
          dir="rtl"
          value={coverageAmount}
          maxRows={4}
        /> */}
        <InputCoverageAmount setCoverageAmount={setCoverageAmount}/>
      </div>
      <div className="flex">
        <div className="mt-4 w-1/2 px-1">
          <DatePicker
          style={{backgroundColor:themeMode==='light'?'white':'#161c24'}}
            ref={datePicStart}
            inputClass="outline-none border rounded-lg w-full h-14 px-3"
            locale={persianFa}
            calendar={persian}
            value={startDateFa}
            onChange={(event) => {
              setStartDateFa(event.format());
            }}
            placeholder="تاریخ شروع بیمه"
          />
        </div>
        <div className="mt-4 w-1/2 px-1">
          <DatePicker
          style={{backgroundColor:themeMode==='light'?'white':'#161c24'}}
            ref={datePicEnd}
            inputClass="outline-none border rounded-lg w-full h-14 px-3"
            locale={persianFa}
            calendar={persian}
            onChange={(event) => {
              setEndDateFa(event.format());
            }}
            value={endDateFa}
            placeholder="تاریخ اتمام بیمه"
          />
        </div>
      </div>
      <div className="mt-4">
        <Button
          sx={{
            py: 1,
            boxShadow: 'none',
            color: 'white',
            backgroundColor: 'rgb(16 185 129)',
            '&:hover': {
              backgroundColor: 'rgb(5 150 105)',
            },
          }}
          onClick={setInsuranceHandler}
          className="bg-green-500 text-white px-5 py-2 rounded-md duration-300 hover:bg-green-600"
        >
          ثبت درخواست
        </Button>
      </div>
      {isLoading && <SimpleBackdrop />}
    </>
  );
}

import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { mainDomain } from '../../utils/mainDomain';

export default function InputDoctorSelect({ pageStateReception, setDoctorId, doctorId , setDoctorMedicalSystemId , setAlignment}) {
  const [doctors, setDoctors] = useState([]);
  const [valSelect, setValSelect] = useState(-1);
  useEffect(() => {
    axios
      .get(`${mainDomain}/api/Doctor/GetList`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setDoctors(res.data);
        
        setValSelect(res.data[0]);
        setDoctorId(res.data[0].doctorId);
        setDoctorMedicalSystemId(res.data[0].medicalSystemId);
      })
      .catch((err) => {});
  }, [pageStateReception]);
  return (
    <>
      <div className='sm:px-2' dir="rtl">
        <FormControl color="primary" className="w-full">
          <InputLabel color="primary" className="px-2" id="demo-simple-select-label">
            {pageStateReception === 0 && 'لیست پزشکان'}
            {pageStateReception === 1 && 'انتخاب پزشک'}
          </InputLabel>
          <Select
            onChange={(e) => {
              setAlignment(-1)
              setValSelect(e.target.value)
              setDoctorId(e.target.value.doctorId)
              setDoctorMedicalSystemId(e.target.value.medicalSystemId? e.target.value.medicalSystemId :-1)
            } }
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label={pageStateReception === 0 ? 'لیست پزشکان' : 'انتخاب پزشک'}
            color="primary"
            value={valSelect}
          >
            {/* {expertise === 'همه' &&
                doctors.map((d) => (
                    <MenuItem key={d.doctorId} value={d.doctorId}>
                    {d.firstName} {d.lastName}
                    </MenuItem>
                    ))}
                    {expertise !== 'همه' &&
                    doctors
                    .filter((e) => e.specialization === expertise)
                    .map((d) => (
                        <MenuItem key={d.doctorId} value={d.doctorId}>
                        {d.firstName} {d.lastName}
                        </MenuItem>
                    ))} */}
            {/* <MenuItem value={-1}>همه</MenuItem> */}
            {doctors.map((e, i) => (
              <MenuItem value={e} key={i}>
                {e.firstName} {e.lastName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </>
  );
}

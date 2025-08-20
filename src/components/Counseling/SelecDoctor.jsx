import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { mainDomain } from '../../utils/mainDomain';

export default function SelecDoctor({ expertise , valDoctor , setValDoctor ,setNameDoctor}) {
  const [doctors, setDoctors] = useState([]);
  
  useEffect(() => {
    axios
      .get(`${mainDomain}/api/Doctor/GetList`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setDoctors(res.data);
        setValDoctor(res.data[0])
        setNameDoctor(`${res.data[0].firstName} ${res.data[0].lastName}`)
        
      })
      .catch((err) => {});
  }, []);
  return (
    <>
      <div className=" mx-auto flex items-center mt-5">
        <div className="px-4 w-full" dir="rtl">
          <FormControl color="primary" className="w-full">
            <InputLabel color="primary" className="px-2" id="demo-simple-select-label">
              لیست پزشکان
            </InputLabel>
            <Select
              onChange={(e) => {
                setValDoctor(e.target.value)
                setNameDoctor(`${e.target.value.firstName} ${e.target.value.lastName}`)
              }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="لیست پزشکان"
              color="primary"
              value={valDoctor}
            >
              {expertise === 'همه' &&
                doctors.map((d) => (
                  <MenuItem key={d.doctorId} value={d}>
                    {d.firstName} {d.lastName}
                  </MenuItem>
                ))}
              {expertise !== 'همه' &&
                doctors
                  .filter((e) => e.specialization === expertise)
                  .map((d) => (
                    <MenuItem key={d.doctorId} value={d}>
                      {d.firstName} {d.lastName}
                    </MenuItem>
                  ))}
            </Select>
          </FormControl>
        </div>
      </div>
    </>
  );
}

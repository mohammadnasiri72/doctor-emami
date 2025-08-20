import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { mainDomain } from '../../utils/mainDomain';

export default function SelectExpertises({expertise , setExpertise}) {
  const [expertises, setExpertises] = useState([]);
 
  useEffect(() => {
    axios
      .get(`${mainDomain}/api/BasicInfo/Specialization/GetList`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setExpertises(res.data);
      })
      .catch((err) => {});
  }, []);
  return (
    <>
      <div className=" mx-auto flex items-center mt-5">
        <div className="px-4 w-full" dir="rtl">
          <FormControl color="primary" className="w-full">
            <InputLabel color="primary" className="px-2" id="demo-simple-select-label">
              لیست تخصص ها
            </InputLabel>
            <Select
              onChange={(e) => setExpertise(e.target.value)}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="لیست تخصص ها"
              color="primary"
              value={expertise}
            >
              <MenuItem value="همه">
                <em>همه</em>
              </MenuItem>
              {expertises.map((e) => (
                <MenuItem key={e.itemId} value={e.name}>
                  {e.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
    </>
  );
}

import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { mainDomain } from '../../utils/mainDomain';

export default function InputCondition({conditionVal , setConditionVal}) {
  const [conditionList, setConditionList] = useState([]);
  useEffect(() => {
    axios
      .get(`${mainDomain}/api/Appointment/GetStatusList`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        
        setConditionList(Object.values(res.data));
      })
      .catch((err) => {});
  }, []);
  return (
    <>
      <div className="w-36 pr-4">
        <FormControl color="primary" className="w-full">
          <InputLabel color="primary" className="px-2" id="demo-simple-select-label">
            وضعیت
          </InputLabel>
          <Select
            onChange={(e) => setConditionVal(e.target.value)}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="وضعیت"
            color="primary"
            value={conditionVal}
          >
            <MenuItem value={-1}>
              <span>همه</span>
            </MenuItem>
            {conditionList.map((e, i) => (
              <MenuItem value={i+1} key={i}><span>{e}</span></MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </>
  );
}

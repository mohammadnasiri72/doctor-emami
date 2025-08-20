import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { mainDomain } from '../../utils/mainDomain';

export default function InputTypeReception({ valType, setValType, editeUser }) {
  useEffect(() => {
    if (editeUser?.type) {
      setValType(editeUser.typeId);
    }
  }, [editeUser]);
  const [typeReception, setTypeReception] = useState([]);
  useEffect(() => {
    axios
      .get(`${mainDomain}/api/Appointment/GetTypeList`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setTypeReception(res.data);
      })
      .catch((err) => {});
  }, []);
  return (
    <>
      <div className="w-full">
        <FormControl color="primary" className="w-full">
          <InputLabel color="primary" className="px-2" id="demo-simple-select-label">
            نوع پذیرش
          </InputLabel>
          <Select
            onChange={(e) => setValType(e.target.value)}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="نوع پذیرش"
            color="primary"
            value={valType}
          >
            {[typeReception[1], typeReception[2]].map((e, i) => (
              <MenuItem value={i + 1} key={i + 1}>
                {e}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </>
  );
}

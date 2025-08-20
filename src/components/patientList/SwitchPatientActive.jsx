import { FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, TextField } from '@mui/material';
import React from 'react';

export default function SwitchPatientActive({ isPatientActive, setIsPatientActive }) {
  return (
    <>
      <FormControl color="primary" className='w-full'>
        <InputLabel color="primary" className="px-2" id="demo-simple-select-label">
          وضعیت بیماری
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={isPatientActive}
          label="وضعیت بیماری"
          color="primary"
          onChange={(e) => setIsPatientActive(e.target.value)}
          InputProps={{ className: 'textfield-style'}}
          
        >
          <MenuItem value={'true'}>درگیر</MenuItem>
          <MenuItem value={'false'}>بهبود یافته</MenuItem>
        </Select>
      </FormControl>
      
    </>
  );
}

import { FormControlLabel, InputLabel, Switch } from '@mui/material';
import React from 'react';

export default function SelectTourist({isTourist,setIsTourist,setMobile,setEmail}) {
  return (
    <>
     
      <div className="pr-5 mt-1">
            <FormControlLabel
              value={isTourist}
              onChange={() => {
                setIsTourist(!isTourist)
                setMobile('')
                setEmail('')
              }}
              control={<Switch checked={isTourist} />}
              label={'اتباع هستم'}
            />
          </div>
    </>
  );
}

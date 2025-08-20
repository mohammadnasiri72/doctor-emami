import { TextField } from '@mui/material';
import React, { useEffect, useRef } from 'react';

export default function InputLastNameProfileUpdate({ setLastName, lastName, focusInputLName, setScrollTopInpLName }) {
  const inpLName = useRef(null)
  
  useEffect(()=>{
    setScrollTopInpLName(inpLName.current.offsetTop)
  },[inpLName])

  let color = '';
  if (lastName.length > 2) {
    color = 'success';
  } else if (lastName.length === 0 && !focusInputLName) {
    color = 'primary';
  }else if (lastName.length === 0 && focusInputLName) {
    color = 'error';
  } else {
    color = 'error';
  }
  return (
    <>
      <div className="sm:w-1/2 w-full mx-auto mt-4 px-5">
        <TextField
        ref={inpLName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full"
          id="outlined-multiline-flexible"
          label="نام خانوادگی"
          multiline
          value={lastName}
          maxRows={4}
          color={color}
        />
      </div>
    </>
  );
}

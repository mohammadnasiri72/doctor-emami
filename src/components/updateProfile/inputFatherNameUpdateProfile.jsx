import { TextField } from '@mui/material';
import React, { useEffect, useRef } from 'react';

export default function InputFatherNameUpdateProfile({
  setFatherName,
  fatherName,
  focusInputFatherName,
  setScrollTopInpFatherName,
}) {
const inpFatherName = useRef(null)
  useEffect(()=>{
    setScrollTopInpFatherName(inpFatherName.current.offsetTop)
  },[inpFatherName])

  let color = '';
  if (fatherName?.length > 2) {
    color = 'success';
  } else if (fatherName?.length === 0 && !focusInputFatherName) {
    color = 'primary';
  }else if (fatherName?.length === 0 && focusInputFatherName) {
    color = 'error';
  } else {
    color = 'error';
  }
  return (
    <>
      <div className="sm:w-1/2 w-full mx-auto mt-6 px-5">
        <TextField
        ref={inpFatherName}
        focused={focusInputFatherName}
          onChange={(e) => setFatherName(e.target.value)}
          className="w-full"
          id="outlined-multiline-flexible"
          label="نام پدر"
          multiline
          value={fatherName}
          maxRows={4}
          color={color}
        />
      </div>
    </>
  );
}

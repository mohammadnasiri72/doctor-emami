import { TextField } from '@mui/material';
import React, { useEffect, useRef } from 'react';

export default function InputTelUpdateProfile({ tel, setTel }) {
  return (
    <>
      <div className="sm:w-1/2 w-full mx-auto mt-6 px-5">
        <TextField
          onChange={(e) => setTel(e.target.value)}
          className="w-full"
          id="outlined-multiline-flexible"
          label="تلفن ثابت(اختیاری)"
          multiline
          value={tel}
          maxRows={4}
        />
      </div>
    </>
  );
}

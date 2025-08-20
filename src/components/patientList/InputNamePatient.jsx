import { TextField } from '@mui/material';
import React, { useEffect, useRef } from 'react';

export default function InputNamePatient({patientName , setPatientName}) {

  
  return (
    <>
      <div className=" text-start" dir="rtl">
        <TextField
          onChange={(e) => setPatientName(e.target.value)}
          className="w-full text-end"
          id="outlined-multiline-flexible"
          label="عنوان بیماری یا عارضه"
          multiline
          dir="rtl"
          value={patientName}
          maxRows={4}
        />
      </div>
    </>
  );
}

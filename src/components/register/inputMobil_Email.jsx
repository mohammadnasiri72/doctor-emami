import { TextField } from '@mui/material';
import { useRef } from 'react';

export default function InputMobilEmail({
  abroad,
  email,
  setEmail,
  mobile,
  setMobile,
}) {
  const paternMobile = /^09[0|1|2|3|9][0-9]{8}$/;
  const paternEmail = /[a-zA-Z0-9.-]+@[a-z-]+\.[a-z]{2,3}/;
  const inputRef = useRef(null);
 
  let colorEmailOrMobile = '';
  if (abroad) {
    if (email.match(paternEmail)) {
      colorEmailOrMobile = 'success';
    } else if (email.length === 0) {
      colorEmailOrMobile = 'primary';
    } else {
      colorEmailOrMobile = 'error';
    }
  } else if (mobile.match(paternMobile)) {
    colorEmailOrMobile = 'success';
  } else if (mobile.length === 0) {
    colorEmailOrMobile = 'primary';
  } else {
    colorEmailOrMobile = 'error';
  }

  return (
    <>
      <div className="px-5 lg:w-2/3 w-full mx-auto mt-4">
        <div className="mt-2">
          <TextField
            ref={inputRef}
            onChange={(e) => (abroad === false ? `${setMobile(e.target.value)}` : `${setEmail(e.target.value)}`)}
            value={abroad ? email : mobile}
            className="w-full"
            type={abroad ? 'text':'number'}
            label={abroad ? 'ایمیل' : 'شماره موبایل'}
            color={colorEmailOrMobile}
            maxRows={4}
          />
        </div>
      </div>
    </>
  );
}

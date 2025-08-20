import { TextField } from '@mui/material';
import React from 'react';

export default function InputPasswordLogin({ password, setPassword , isfocusInpMobile}) {
   

  return (
    <>
      <div className="mt-4 px-5 mx-auto lg:w-2/3 w-full">
        <TextField
        inputRef={input => input && isfocusInpMobile && input.focus()}
          className="w-full"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          id="outlined-password-input"
          label="رمز عبور"
          type="password"
          value={password}
          autoComplete='new-password'
          // InputProps={{className:'textfield-style'}}
        />
      </div>
    </>
  );
}

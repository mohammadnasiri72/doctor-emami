import { TextField } from '@mui/material';
import React, { useEffect, useRef } from 'react';

export default function TextareaAddressUpdateProfile({
  setAddress,
  address,
  focusInputAddress,
  setScrollTopInpAddress,
}) {
  const inpAddress = useRef(null)
  useEffect(()=>{
    setScrollTopInpAddress(inpAddress.current.offsetTop)
  },[inpAddress])

  return (
    <>
      {/* <div className="px-5 mt-3">
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="outline-none border w-full h-36 p-2"
          placeholder="آدرس محل سکونت"
        />
      </div> */}
      <div className=" mt-6 px-5">
        <TextField
        focused={focusInputAddress}
        ref={inpAddress}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full"
          id="outlined-multiline-flexible"
          label="آدرس محل سکونت"
          multiline
          value={address}
          minRows={4}
          color={(!address && focusInputAddress) ? 'error':'primary'}
        />
      </div>
    </>
  );
}

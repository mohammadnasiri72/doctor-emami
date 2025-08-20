import { TextField } from '@mui/material';
import React, { useEffect, useRef } from 'react';

export default function InputNameUpdateProfile({ name , setName , setWidth , focusInputName , setScrollTopInpName}) {
  const inpName = useRef(null)

  useEffect(()=>{
    setScrollTopInpName(inpName.current.offsetTop)
  },[inpName])
  
  window.addEventListener("resize", ()=>{
    if (inpName.current) {
      setWidth(inpName.current.clientWidth);
    }
  })
  useEffect(()=>{
    if (inpName.current) {
      setWidth(inpName.current.clientWidth);
    }
    
  },[inpName , setWidth])
 
  let color = ''
  if (name.length > 2) {
    color = 'success'
  }else if (name.length === 0 && !focusInputName) {
    color = 'primary'
  }else if (name.length === 0 && focusInputName) {
    color='error'
    
  }else{
    color = 'error'
  }
  
 
  return (
    <>
      <div className="sm:w-1/2 w-full mx-auto mt-4 px-5">
        <TextField
        focused={focusInputName}
        ref={inpName}
          onChange={(e) => setName(e.target.value)}
          className="w-full"
          id="outlined-multiline-flexible"
          label="نام"
          multiline
          value={name}
          maxRows={4}
          color={color}
        />
      </div>
    </>
  );
}

import { TextField } from '@mui/material'
import React from 'react'

export default function InputAge({setAge , age}) {
  return (
    <>
    <div className=" text-start" dir="rtl">
        <TextField
          onChange={(e) => {
            setAge(e.target.value)
          }}
          className="w-full text-end"
          id="outlined-multiline-flexible"
          label="سن ابتلا"
          dir="rtl"
          type='number'
          value={age}
        />
      </div>
    </>
  )
}

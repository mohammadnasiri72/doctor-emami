import { TextField } from '@mui/material'

export default function InputMobileRelative({mobileRelative , setMobileRelative}) {
    
  return (
    <>
    <div className="mt-3 px-5">
        <TextField
          onChange={(e) => setMobileRelative(e.target.value)}
          className="w-full"
          id="outlined-multiline-flexible"
          label="شماره موبایل همراه"
          multiline
          value={mobileRelative}
          maxRows={4}
        />
      </div>
    </>
  )
}

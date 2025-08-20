import { TextField } from '@mui/material'

export default function InputRelative({relative , setRelative}) {
    
  return (
    <>
    <div className="mt-3 px-5">
        <TextField
          onChange={(e) => setRelative(e.target.value)}
          className="w-full"
          id="outlined-multiline-flexible"
          label="نسبت با بیمار"
          multiline
          value={relative}
          maxRows={4}
        />
      </div>
    </>
  )
}

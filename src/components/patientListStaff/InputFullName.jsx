import { TextField } from '@mui/material'

export default function InputFullName({fullName , setFullName}) {
    
  return (
    <>
    <div className="mt-3 px-5">
        <TextField
          onChange={(e) => setFullName(e.target.value)}
          className="w-full"
          id="outlined-multiline-flexible"
          label="نام و نام خانوادگی همراه"
          multiline
          value={fullName}
          maxRows={4}
        />
      </div>
    </>
  )
}

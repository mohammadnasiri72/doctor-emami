import { TextField } from '@mui/material'

export default function InputAddress({addressRelative , setAddressRelative}) {
    
  return (
    <>
    <div className="mt-3 px-5">
        <TextField
          onChange={(e) => setAddressRelative(e.target.value)}
          className="w-full"
          id="outlined-multiline-flexible"
          label="آدرس همراه"
          multiline
          value={addressRelative}
          minRows={2}
          maxRows={4}
        />
      </div>
    </>
  )
}

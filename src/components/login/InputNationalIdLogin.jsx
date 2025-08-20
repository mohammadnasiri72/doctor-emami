import { TextField } from '@mui/material';
import { useEffect } from 'react';
import useSettings from '../../hooks/useSettings';

export default function InputNationalIdLogin({ nationalId, setNationalId , setIsfocusInpMobile}) {
  const{themeDirection} = useSettings()
  const paternNationalId = /^[0-9]{10}$/;
  useEffect(()=>{
    if (nationalId.match(paternNationalId)) {
      setIsfocusInpMobile(true)
    }
  },[nationalId])
  
  let colorNationId = '';
  if (nationalId.match(paternNationalId)) {
    colorNationId = 'success';
  } else if (nationalId.length === 0) {
    colorNationId = 'primary';
  } else {
    colorNationId = 'error';
  }
  
  return (
    <>
      <div className="px-5 mx-auto lg:w-2/3 w-full mt-4">
        
            <div className="mt-2" dir={themeDirection}>
              <TextField
              type='number'
              autoFocus
                className="w-full"
                onChange={(e) => setNationalId(e.target.value)}
                id="outlined-multiline-flexible"
                label="نام کاربری (کد ملی)"
                multiline
                value={nationalId}
                color={colorNationId}
                maxRows={4}
                // InputProps={{className:'textfield-style'}}
              />
            </div>
          
      </div>
    </>
  );
}

import { TextField } from '@mui/material';

export default function InputLastName({lastName , setLastName}) {
  let colorLName = '';
  if (lastName.length > 2) {
    colorLName = 'success';
  } else if (lastName.length === 0) {
    colorLName = 'primary';
  } else {
    colorLName = 'error';
  }
  
  return (
    <>
      <div className="px-5 mx-auto mt-4 lg:w-2/3 w-full">
        
            <div className="mt-2 text-start" dir="rtl">
              <TextField
              // eslint-disable-next-line jsx-a11y/tabindex-no-positive
                onChange={(e) => setLastName(e.target.value)}
                className="w-full text-end pl-20"
                id="outlined-multiline-flexible"
                label="نام خانوادگی"
                dir="rtl"
                maxRows={4}
                color={colorLName}
                // InputProps={{className:'textfield-style'}}
              />
            </div>
          
      </div>
    </>
  );
}

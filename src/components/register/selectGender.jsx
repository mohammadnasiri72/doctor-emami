import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function SelectGender({ gender, setGender }) {
  
  return (
    <>
      <div className="px-5 lg:w-2/3 w-full mx-auto mt-4 flex items-center">
        {/* <h3 className="text-start">جنسیت:</h3> */}
            <div className="" dir="rtl">
              <FormControl color="primary">
                <InputLabel color="primary" className="px-2" id="demo-simple-select-label">
                  جنسیت
                </InputLabel>
                <Select
                // eslint-disable-next-line jsx-a11y/tabindex-no-positive
                className='w-36'
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={gender}
                  label="جنسیت"
                  color="primary"
                  onChange={(e) => setGender(e.target.value)}
                  InputProps={{className:'textfield-style'}}
                >
                  <MenuItem value="m">مرد</MenuItem>
                  <MenuItem value="f">زن</MenuItem>
                </Select>
              </FormControl>
            </div>
      </div>
    </>
  );
}

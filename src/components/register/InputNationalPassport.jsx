import { TextField } from '@mui/material';
import useSettings from '../../hooks/useSettings';

export default function InputNationalPassport({ nationalPassport, setNationalPassport }) {
  const { themeDirection } = useSettings();
//   const paternNationalId = /^[0-9]{10}$/;
  let colorNationId = '';
  if (nationalPassport.length>3) {
    colorNationId = 'success';
  } else if (nationalPassport.length === 0) {
    colorNationId = 'primary';
  } else {
    colorNationId = 'error';
  }

  return (
    <>
      <div className="px-5 lg:w-2/3 w-full mx-auto mt-4">
        <div className="mt-2" dir={themeDirection}>
          <TextField
          type='number'
            autoFocus
            className="w-full"
            onChange={(e) => setNationalPassport(e.target.value)}
            id="outlined-multiline-flexible"
            label="کد اتباع / شماره پاسپورت"
            value={nationalPassport}
            color={colorNationId}
            maxRows={4}
          />
        </div>
      </div>
    </>
  );
}

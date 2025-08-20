import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function SelectDoctor({ doctorId, setDoctorId, doctors }) {
  return (
    <>
      <div className="w-full" dir="rtl">
        <FormControl color="primary" className="w-full">
          <InputLabel color="primary" className="px-2" id="demo-simple-select-label">
            لیست پزشکان
          </InputLabel>
          <Select
            onChange={(e) => setDoctorId(e.target.value)}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label={'لیست پزشکان'}
            color="primary"
            value={doctorId}
          >
            <MenuItem value={-1}>
                همه
              </MenuItem>
            {doctors.map((e, i) => (
              <MenuItem value={e.doctorId} key={i}>
                {e.firstName} {e.lastName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </>
  );
}

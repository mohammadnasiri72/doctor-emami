import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function InputSelectDoctor({ doctors, expertise, doctor, setDoctor }) {
  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">انتخاب دکتر</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={doctor}
          label="انتخاب دکتر"
          onChange={(e) => setDoctor(e.target.value)}
        >
          {expertise !== 'همه' &&
            doctors
              .filter((doctor) => doctor.specialization === expertise)
              .map((doctor) => (
                <MenuItem key={doctor.doctorId} value={doctor.doctorId}>
                  {doctor.firstName} {doctor.lastName}
                </MenuItem>
              ))}
          {expertise === 'همه' &&
            doctors.map((doctor) => (
              <MenuItem key={doctor.doctorId} value={doctor.doctorId}>
                {doctor.firstName} {doctor.lastName}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </>
  );
}

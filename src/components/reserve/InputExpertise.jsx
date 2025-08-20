import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function InputExpertise({expertises , expertise , setExpertise}) {
  
  
    
  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">لیست تخصص ها</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={expertise}
          label="لیست تخصص ها"
          onChange={(e) => setExpertise(e.target.value)}
        >
            <MenuItem value="همه">
            <em>همه</em>
          </MenuItem>
          {expertises.map((expertise) => (
            <MenuItem key={expertise.itemId} value={expertise.name}>
              {expertise.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}

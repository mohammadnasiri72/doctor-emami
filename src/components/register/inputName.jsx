import { TextField } from '@mui/material';

export default function InputName({ firstName, setFirstName }) {
  let colorName = '';
  if (firstName.length > 2) {
    colorName = 'success';
  } else if (firstName.length === 0) {
    colorName = 'primary';
  } else {
    colorName = 'error';
  }

  return (
    <>
      <div className="px-5 mx-auto mt-4 lg:w-2/3 w-full">
        <TextField
        autoFocus
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full"
          id="outlined-multiline-flexible"
          label="نام"
          maxRows={4}
          color={colorName}
        />
      </div>
    </>
  );
}

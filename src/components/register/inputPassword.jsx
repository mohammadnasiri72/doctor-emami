import { TextField } from '@mui/material';

export default function InputPassword({ password, setPassword }) {
  return (
    <>
      <div className="mt-4 mx-auto px-5 lg:w-2/3 w-full">
        <TextField
        tabIndex='0'
          onChange={(event) => {
            event.preventDefault();
            setPassword(event.target.value);
          }}
          className="w-full"
          id="outlined-password-input"
          label="پسورد"
          type="password"
          value={password}
          autoComplete='new-password'
          // InputProps={{ className: 'textfield-style' }}
        />
      </div>
    </>
  );
}

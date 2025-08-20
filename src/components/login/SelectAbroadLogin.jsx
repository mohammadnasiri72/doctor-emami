import { FormControlLabel, Switch } from '@mui/material';

export default function SelectAbroadLogin({ abroad, setAbroad }) {
  return (
    <>
      {/* <div className="flex justify-center mt-5">
        <div className="px-3 flex items-center">
          <input
            className="cursor-pointer"
            onChange={() => {
              setAbroad(false);
            }}
            checked={abroad === false}
            name="location"
            id="ir"
            type="radio"
          />
          <InputLabel className="cursor-pointer px-2" htmlFor="ir">
            ساکن ایران هستم
          </InputLabel>
        </div>
        <div className="px-3 flex items-center">
          <input
            className="cursor-pointer"
            onChange={() => {
              setAbroad(true);
            }}
            checked={abroad === true}
            name="location"
            id="en"
            type="radio"
          />
          <InputLabel className="cursor-pointer px-2" htmlFor="en">
            ساکن ایران نیستم
          </InputLabel>
        </div>
      </div> */}
      <div className="pr-5 mt-1">
            <FormControlLabel
              value={abroad}
              onChange={() => setAbroad(!abroad)}
              control={<Switch checked={!abroad} />}
              label={'ساکن ایران'}
            />
          </div>
    </>
  );
}

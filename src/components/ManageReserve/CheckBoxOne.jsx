import { Checkbox, FormControlLabel } from '@mui/material';
import React, { useEffect, useState } from 'react';

export default function CheckBoxOne({ e, listTime, listTurnChecked, setListTurnChecked }) {
  const [valCheckBox, setValCheckBox] = useState(false);

  useEffect(() => {
    if (listTurnChecked.length === listTime.length && listTurnChecked.length !== 0) {
      setValCheckBox(true);
    }
    if (listTurnChecked.length === 0) {
      setValCheckBox(false);
    }
  }, [listTurnChecked, listTime]);

  return (
    <>
      <div>
        <FormControlLabel
          onChange={() => {
            if (listTurnChecked.includes(e.reservationTimeId)) {
              setListTurnChecked(listTurnChecked.filter((ev) => ev !== e.reservationTimeId));
              setValCheckBox(false);
            } else {
              setListTurnChecked([...listTurnChecked, e.reservationTimeId]);
              setValCheckBox(true);
            }
          }}
          control={<Checkbox disabled={e.isExpired} size="medium" checked={valCheckBox} />}
        />
      </div>
    </>
  );
}

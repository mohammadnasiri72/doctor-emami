import { Checkbox, FormControlLabel } from '@mui/material';
import React, { useEffect, useState } from 'react';

export default function CheckBoxHandler({ e, changConditionHandler, medicalRecord, disabledChechBox, userSelected }) {
  const [value, setValue] = useState(false);
  useEffect(() => {
    if (userSelected) {
      setValue(false);
    }
  }, [userSelected]);

  useEffect(() => {
    medicalRecord.map((ev) => {
      setValue(false);
      if (e.itemId === ev.medicalItemId) {
        setValue(true);
      }
      return true;
    });
  }, [medicalRecord]);
  return (
    <>
      <div className="px-2">
        <FormControlLabel
          onChange={() => {
            changConditionHandler(e);
            setValue(!value);
          }}
          control={<Checkbox checked={value} disabled={disabledChechBox} />}
          label={e.name}
          value={e.itemId}
        />
      </div>
    </>
  );
}

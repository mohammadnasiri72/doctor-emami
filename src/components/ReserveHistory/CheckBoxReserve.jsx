import { Checkbox, FormControlLabel } from '@mui/material';
import React, { useEffect, useState } from 'react';

export default function CheckBoxReserve({
  listReserveChecked,
  setListReserveChecked,
  e,
  listReserveHistory,
  statusId,
}) {
  const [valCeckBox, setValCeckBox] = useState(false);

  useEffect(() => {
    if (
      listReserveChecked.length ===
        listReserveHistory.filter((ev) => (statusId >= 0 ? ev.statusId === statusId : ev)).length &&
      listReserveChecked.length !== 0
    ) {
      setValCeckBox(true);
    }
    if (listReserveChecked.length === 0) {
      setValCeckBox(false);
    }
    if (listReserveChecked.length !== 0 && listReserveChecked.length !==
      listReserveHistory.filter((ev) => (statusId >= 0 ? ev.statusId === statusId : ev)).length) {
        setValCeckBox(false);
        listReserveChecked.map((ev)=>{
          if (ev.reservationId === e.reservationId) {
            setValCeckBox(true);
          }
          return true
        })
    }
  }, [listReserveChecked, listReserveHistory , statusId]);

 
  
  return (
    <>
      <FormControlLabel
        className="absolute right-2 top-0"
        control={
          <Checkbox
            onChange={() => {
              if (listReserveChecked.includes(e)) {
                setListReserveChecked(listReserveChecked.filter((ev) => ev.reservationId !== e.reservationId));
                setValCeckBox(false);
              } else {
                setListReserveChecked([...listReserveChecked, e]);
                setValCeckBox(true);
              }
            }}
            checked={valCeckBox}
          />
        }
      />
    </>
  );
}

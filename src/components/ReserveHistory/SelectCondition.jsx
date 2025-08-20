import { Button } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { mainDomain } from '../../utils/mainDomain';
import ToggleButtonCondition from './ToggleButtonCondition';

export default function SelectCondition({ setStatusId, listReserveHistory, statusList, setFlag }) {
  const [focus, setFocus] = useState(true);

  return (
    <>
      <div className="mt-3 rounded-md border p-2 flex flex-wrap justify-center items-center">
        <ToggleButtonCondition
          listReserveHistory={listReserveHistory}
          setStatusId={setStatusId}
          setFocus={setFocus}
          focus={focus}
          statusList={statusList}
          setFlag={setFlag}
        />
      </div>
    </>
  );
}

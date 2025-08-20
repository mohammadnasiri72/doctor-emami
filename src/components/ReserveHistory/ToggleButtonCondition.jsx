/* eslint-disable no-nested-ternary */
import { Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import React, { useState } from 'react';

export default function ToggleButtonCondition({ listReserveHistory, setStatusId, statusList, setFlag }) {
  const [alignment, setAlignment] = useState(-1);

  const handleAlignment = (event, newAlignment) => {    
    setFlag((e) => !e);
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  return (
    <>
      <Stack className="w-full ">
        <ToggleButtonGroup
          className="flex flex-wrap justify-around"
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
        >
          <ToggleButton
            onClick={() => setStatusId(-1)}
            color="info"
            // style={{ backgroundColor: focus ? 'rgb(226 232 240)' : 'transparent' }}
            className="focus:bg-slate-200 lg:w-1/5 sm:w-1/3 w-full m-0"
            value={-1}
            aria-label="left aligned"
          >
            <div className="px-2">
              <span>همه</span>
            </div>
            <span className="w-8 h-8 bg-[#b0b0b0] text-white rounded-lg flex justify-center items-center">
              {listReserveHistory.length}
            </span>
          </ToggleButton>
          {statusList.map((e, i) => (
              <ToggleButton
              key={i}
                color="info"
                onClick={() => setStatusId(i)}
                className="focus:bg-slate-200 lg:w-1/5 sm:w-1/3 w-full m-0"
                value={e}
              >
                <div className="px-2">
                  <span className={i === 0 ? 'text-red-500' : i === 1 ? 'text-teal-500' : i === 2 ? 'text-green-500' : 'text-orange-500'}>{e}</span>
                </div>
                <span
                  style={{
                    backgroundColor: i === 0 ? 'rgb(239 68 68)' : i === 1 ? 'rgb(20 184 166)' : i === 2 ? 'rgb(34 197 94)' : 'rgb(249 115 22)',
                  }}
                  className="w-8 h-8 bg-[#b0b0b0] text-white rounded-lg flex justify-center items-center"
                >
                  {listReserveHistory.filter((e) => e.status === statusList[i]).length}
                </span>
              </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Stack>
    </>
  );
}

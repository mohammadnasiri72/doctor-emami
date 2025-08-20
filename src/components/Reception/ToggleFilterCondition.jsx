/* eslint-disable no-nested-ternary */
import { Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import React, { useState } from 'react';

export default function ToggleFilterCondition({
  receptions,
  conditionList,
  setFocus,
  setStatusCondition,
  setFlagCondition,
  alignment,
setAlignment
}) {
  

  const handleAlignment = (event, newAlignment) => {
    setFlagCondition((e) => !e);
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  const filterHandler = (e) => {
    setFocus(false);
    setStatusCondition(e);
    // setReceptions(receptions.filter((ev)=>ev.status=== e.target.innerText))
  };

  return (
    <>
      <Stack className="w-full ">
        <ToggleButtonGroup
          className="flex justify-around flex-wrap"
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
        >
          <div className="lg:w-1/6 md:w-1/3 sm:w-1/2 w-full">
            <ToggleButton
              onClick={() => setStatusCondition('')}
              color="info"
              // style={{ backgroundColor: focus ? 'rgb(226 232 240)' : 'transparent' }}
              className="focus:bg-slate-200 w-full"
              value={-1}
              aria-label="left aligned"
            >
              <div className="px-2">
                <span>همه</span>
              </div>
              <span className="w-8 h-8 bg-[#b0b0b0] text-white rounded-lg flex justify-center items-center">
                {receptions.length}
              </span>
            </ToggleButton>
          </div>

          {conditionList.map((e, i) => (
            <div key={i} className="lg:w-1/6 md:w-1/3 sm:w-1/2 w-full">
              <ToggleButton
                color="error"
                onClick={() => filterHandler(e)}
                className="focus:bg-slate-200 w-full"
                value={e}
              >
                <div className="px-2">
                  <span
                    className={
                      i === 0
                        ? 'text-blue-500'
                        : i === 1
                        ? 'text-yellow-500'
                        : i === 2
                        ? 'text-teal-500'
                        : i === 3
                        ? 'text-green-500'
                        : 'text-red-500'
                    }
                  >
                    {e}
                  </span>
                </div>
                <span
                  style={{
                    backgroundColor:
                      i === 0
                        ? 'rgb(59 130 246)'
                        : i === 1
                        ? 'rgb(234 179 8)'
                        : i === 2
                        ? 'rgb(20 184 166)'
                        : i === 3
                        ? 'rgb(34 197 94)'
                        : 'rgb(239 68 68)',
                        
                  }}
                  className="w-8 h-8 bg-[#b0b0b0] text-white rounded-lg flex justify-center items-center"
                >
                  {receptions.filter((rec) => rec.status === conditionList[i]).length}
                </span>
              </ToggleButton>
            </div>
          ))}
        </ToggleButtonGroup>
      </Stack>
    </>
  );
}

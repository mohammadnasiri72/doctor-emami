import { Button, MenuList, ToggleButton, ToggleButtonGroup } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { mainDomain } from '../../utils/mainDomain';
import ToggleFilterCondition from './ToggleFilterCondition';

export default function FilterCondition({
  receptions,
  setStatusCondition,
  userSelected,
  fromPersianDate,
  toPersianDate,
  pageStateReception,
  setIsLoading,
  setFlagCondition,
  alignment,
  setAlignment,
}) {
  const [conditionList, setConditionList] = useState([]);
  const [focus, setFocus] = useState(true);
  useEffect(() => {
    setFocus(true);
    setStatusCondition('');
  }, [userSelected, fromPersianDate, toPersianDate]);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${mainDomain}/api/Appointment/GetStatusList`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setConditionList(Object.values(res.data));
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, [pageStateReception]);

  return (
    <>
      <div className="mt-3 rounded-md border p-2 flex justify-center items-center">
        {/* <div className=" rounded-md">
          <Button
            onClick={() => setStatusCondition('')}
            color="info"
            onFocus={() => setFocus(true)}
            style={{ backgroundColor: focus ? 'rgb(226 232 240)' : 'transparent' }}
            className="focus:bg-slate-200"
          >
            <div className="px-2">
              <span>همه</span>
            </div>
            <span className="w-8 h-8 bg-[#b0b0b0] text-white rounded-lg flex justify-center items-center">
              {receptions.length}
            </span>
          </Button>
        </div>
        {conditionList.map((e, i) => (
          <div key={e} className="px-5 ">
            <Button color="info" onClick={()=> filterHandler(e)} className="focus:bg-slate-200" value={e}>
              <div className="px-2">
                <span>{e}</span>
              </div>
              <span className="w-8 h-8 bg-[#b0b0b0] text-white rounded-lg flex justify-center items-center">
                {receptions.filter((rec) => rec.status === conditionList[i]).length}
              </span>
            </Button>
          </div>
        ))} */}
        <ToggleFilterCondition
          receptions={receptions}
          conditionList={conditionList}
          setFocus={setFocus}
          setStatusCondition={setStatusCondition}
          setFlagCondition={setFlagCondition}
          alignment={alignment}
          setAlignment={setAlignment}
        />
      </div>
    </>
  );
}

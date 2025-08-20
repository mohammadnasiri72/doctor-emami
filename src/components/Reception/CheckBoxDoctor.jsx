import { Checkbox, FormControlLabel } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { mainDomain } from '../../utils/mainDomain';
import CheckBoxHandler from './CheckBoxHandler';

export default function CheckBoxDoctor({
  valCondition,
  setValCondition,
  medicalRecord,
  disabledChechBox,
  userSelected,
}) {
  const [conditionPatient, setConditionPatient] = useState([]);

  
  useEffect(() => {
    if (userSelected) {
      const arr = [];
      medicalRecord.map((e) => {
        arr.push(e.medicalItemId);
        return true;
      });
      setValCondition(arr);
      
    }
  }, [medicalRecord]);

  useEffect(() => {
    axios
      .get(`${mainDomain}/api/BasicInfo/PatientStatusAdmission/GetList`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setConditionPatient(res.data);
      })
      .catch((err) => {});
  }, []);


  const changConditionHandler = (e) => {
    if (valCondition.includes(Number(e.itemId))) {
      setValCondition(valCondition.filter((event) => event !== Number(e.itemId)));
    } else {
      setValCondition([...new Set([...valCondition, Number(e.itemId)])]);
    }
  };


  return (
    <>
      <div className="flex justify-center items-center flex-wrap">
        <h3 className="px-1 whitespace-nowrap sm:w-auto w-full text-start">وضعیت هنگام پذیرش:</h3>
        <div className="sm:w-auto w-full flex">
          {conditionPatient
            .filter((e) => e.isActive)
            .map((e, i) => (
              <CheckBoxHandler
                key={e.itemId}
                e={e}
                changConditionHandler={changConditionHandler}
                medicalRecord={medicalRecord}
                disabledChechBox={disabledChechBox}
                userSelected={userSelected}
              />
            ))}
        </div>
      </div>
    </>
  );
}

import axios from 'axios';
import { Autocomplete, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { mainDomain } from '../../utils/mainDomain';

export default function SelectPatient({ setPatientUserId , setIsLoading , isLoading}) {
  const [patientList, setPatientList] = useState([]);
  const [query, setQuery] = useState('');
  const [userSelected, setUserSelected] = useState({});

  useEffect(() => {
    if (query.length > 2) {
      setIsLoading(true)
      axios
        .get(`${mainDomain}/api/Patient/GetList`, {
          params: {
            query,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setIsLoading(false)
          setPatientList(res.data);
        })
        .catch(() => {
          setIsLoading(false)
        });
    } else {
      setPatientList([]);
    }
  }, [query]);

  const changValPatientHandler = (event, newValue) => {
    if (newValue) {
      if (patientList.find((ev) => newValue.includes(ev.nationalId))) {
        setUserSelected(patientList.find((ev) => newValue.includes(ev.nationalId)));
      } else {
        setUserSelected({});
      }
    } else {
      setUserSelected({});
      setPatientUserId('')
    }
  };

  useEffect(() => {
    if (userSelected.userId) {
      setPatientUserId(userSelected.userId);
    }
  }, [userSelected]);

  return (
    <>
      <div className="w-full">
        <Autocomplete
          loading={query.length > 2 && isLoading}
          value={
            userSelected.nationalId
              ? `${userSelected.firstName} ${userSelected.lastName} (  ${userSelected.nationalId} )`
              : ''
          }
          onChange={(event, newValue) => changValPatientHandler(event, newValue)}
          freeSolo
          options={patientList.map((option) => `${option.firstName} ${option.lastName} ( ${option.nationalId} ) `)}
          renderInput={(params) => (
            <TextField onChange={(e) => setQuery(e.target.value)} {...params} label={'لیست بیماران'} />
          )}
        />
      </div>
    </>
  );
}

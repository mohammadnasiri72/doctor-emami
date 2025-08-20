/* eslint-disable no-nested-ternary */
import { Autocomplete, Box, CircularProgress, InputAdornment, TextField, textFieldClasses } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { mainDomain } from '../../utils/mainDomain';

export default function InputPatientList({
  pageStateReception,
  setUserSelected,
  patientList,
  setPatientList,
  userSelected,
  editeUser,
  query,
  setQuery,
  setAlignment,
}) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // if (!editeUser) {
    //   setUserSelected({});
    // }
    if (editeUser?.patientNationalId) {
      axios
        .get(`${mainDomain}/api/Patient/GetList`, {
          params: {
            query: editeUser.patientNationalId,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setUserSelected(res.data[0]);
        })
        .catch((err) => {});
    }
  }, [pageStateReception]);

  useEffect(() => {
    if (query.length > 2) {
      setLoading(true);
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
          setLoading(false);
          setPatientList(res.data);
        })
        .catch((err) => {
          setLoading(false);
        });
    } else {
      setPatientList([]);
    }
  }, [query]);

  const changValPatientHandler = (event, newValue) => {
    setAlignment(-1);
    if (newValue) {
      if (patientList.find((ev) => newValue.includes(ev.nationalId))) {
        setUserSelected(patientList.find((ev) => newValue.includes(ev.nationalId)));
      } else {
        setUserSelected([]);
      }
    } else {
      setUserSelected([]);
    }
  };
  return (
    <>
      <div>
        <Autocomplete
          TextFieldProps={{
            InputLabelProps: {
              style: {
                fontSize: 10,
              },
            },
            style: {
              fontSize: 10,
            },
          }}
          loading={query.length > 2 && loading}
          value={
            userSelected.nationalId
              ? `${userSelected.firstName} ${userSelected.lastName} (  ${userSelected.nationalId} )`
              : ''
          }
          onChange={(event, newValue) => changValPatientHandler(event, newValue)}
          freeSolo
          options={patientList.map((option) => `${option.firstName} ${option.lastName} ( ${option.nationalId} ) `)}
          renderOption={(props, option) => (
            <Box sx={{ fontSize: 14 }} component="li" {...props}>
              {option}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
            sx={{
              '.MuiInputBase-input': { fontSize: '14px' , fontWeight:'700' },
            }}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              {...params}
              label={pageStateReception === 0 ? 'لیست بیماران' : 'انتخاب بیمار'}
            />
          )}
        />
      </div>
    </>
  );
}

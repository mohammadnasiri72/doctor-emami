/* eslint-disable no-nested-ternary */
import axios from 'axios';
import { Button, Skeleton, ToggleButton, ToggleButtonGroup } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { mainDomain } from '../../utils/mainDomain';
import useSettings from '../../hooks/useSettings';

export default function BoxDateReserve({ doctorId, setDates, setIsLoading, setDateReserved }) {
  const [dateFa, setDateFa] = useState([]);
  const [alignment, setAlignment] = useState('');

  const { themeMode } = useSettings();

  const handleAlignment = (event, newAlignment) => {
    
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  useEffect(() => {
    if (doctorId) {            
      setIsLoading(true);
      axios
        .get(`${mainDomain}/api/ReservationTime/GetList`, {
          params: {
            doctorId,
            dateFa: '',
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setIsLoading(false);
          setDateFa(res.data);
          setAlignment(res.data[0].dateFa);
          selectDateHandler(res.data[0].dateFa)
        })
        .catch((err) => {
          setIsLoading(false);
        });
    }
  }, [doctorId]);

  const selectDateHandler = (e) => {    
    setDateReserved(e);
    setIsLoading(true);
    axios
      .get(`${mainDomain}/api/ReservationTime/GetList`, {
        params: {
          doctorId,
          dateFa: e,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setDates(res.data[0].reservationTimes);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };
  const boxBtn = useRef(null);

 

  return (
    <>
      <div className="relative">
        <div
          style={{ backgroundColor: themeMode === 'light' ? '#fff' : '#161c24' }}
          className="absolute top-0 w-full mb-4 z-50"
        >
          <h2 className="font-semibold">انتخاب تاریخ</h2>
        </div>
        <div
          ref={boxBtn}
          className="lg:h-[80vh] lg:overflow-y-auto lg:overflow-x-hidden overflow-x-auto relative box-reserve pt-7"
        >
          <ToggleButtonGroup value={alignment} exclusive onChange={handleAlignment} aria-label="text alignment">
            {dateFa.length > 0 && (
              <div className="flex lg:block px-3 pb-5">
                {dateFa.map((date) => (
                  <div key={date.dateFa} className="p-1">
                    <ToggleButton
                      sx={{
                        color: 'white',
                        py: 1,
                        boxShadow: 'none',
                        backgroundColor: 'rgb(20 184 166)',
                        '&:hover': {
                          backgroundColor: 'rgb(13 148 136)',
                        },
                      }}
                      value={date.dateFa}
                      className="p-2 rounded-md duration-300 mt-2 w-28"
                      onClick={() => selectDateHandler(date.dateFa)}
                      variant="contained"
                    >
                      <div className="flex flex-col">
                        <p>{date.dateFa}</p>
                        <p>
                          {date.dayName === 'saturday'
                            ? 'شنبه'
                            : date.dayName === 'sunday'
                            ? 'یکشنبه'
                            : date.dayName === 'monday'
                            ? 'دوشنبه'
                            : date.dayName === 'tuesday'
                            ? 'سه‌شنبه'
                            : date.dayName === 'wednesday'
                            ? 'چهارشنبه'
                            : date.dayName === 'thursday'
                            ? 'پنجشنبه'
                            : 'جمعه'}
                        </p>
                      </div>
                    </ToggleButton>
                  </div>
                ))}
              </div>
            )}
          </ToggleButtonGroup>
          {dateFa.length === 0 && (
            <div className="w-full">
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

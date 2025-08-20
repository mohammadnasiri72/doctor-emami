import { Autocomplete, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function SelectCityUpdateProfile({ province, setProvince, setCity, city, setIsLoading }) {
  const [provinces, setProvinces] = useState([{ name: 'تهران' }, { name: 'مشهد' }]);
  const [cities, setCities] = useState([{ name: 'لطفا اول استان را انتخاب کنید' }]);
  useEffect(() => {
    if (province) {
      setIsLoading(true);
      axios
        .get(`https://iran-locations-api.ir/api/v1/fa/cities?state=${province}`)
        .then((res) => {
          setCities(res.data[0].cities);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
        });
    }
  }, [province]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get('https://iran-locations-api.ir/api/v1/fa/states')
      .then((res) => {
        setIsLoading(false);
        setProvinces(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);
  return (
    <>
      <div className="flex flex-wrap">
        <div className="sm:w-1/2 w-full mt-6 px-5">
          <Autocomplete
            value={province}
            onChange={(e) => setProvince(e.target.innerText ? e.target.innerText : '')}
            id="province"
            options={provinces.map((option) => option.name)}
            renderInput={(params) => <TextField {...params} label="استان محل سکونت" />}
          />
        </div>
        <div className="sm:w-1/2 w-full mt-6 px-5">
          <Autocomplete
          disabled={cities.length===1}
            value={city}
            onChange={(e) => setCity(e.target.innerText ? e.target.innerText : '')}
            id="شهر محل سکونت"
            freeSolo
            options={cities.map((option) => option.name)}
            renderInput={(params) => <TextField {...params} label="شهر محل سکونت" />}
          />
        </div>
      </div>
    </>
  );
}

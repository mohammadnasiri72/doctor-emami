import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { mainDomain } from '../../utils/mainDomain';

export default function MedicineList({ isPatientActive, setMedicationIdList , valueMedicine , setValueMedicine}) {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    axios
      .get(`${mainDomain}/api/Medication/GetList`, {
        params: {
          categoryId: -1,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setMedicines(res.data);
      })
      .catch((err) => {});
  }, []);

  const changMedicineHandler = (event, newValue) => {
    setValueMedicine(newValue);
    const arr = [];
    newValue.map((e) => {
      arr.push(e.medicationId);
      return true
    });
    setMedicationIdList(arr);
  };

  return (
    <>
      <div>
        <Stack spacing={3}>
          <Autocomplete
            value={isPatientActive === 'true'? valueMedicine : []}
            disabled={isPatientActive!=='true'}
            onChange={(event, newValue) => {
              changMedicineHandler(event, newValue);
            }}
            multiple
            id="tags-outlined"
            options={medicines}
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => (
              <Box dir='ltr' component="li" sx={{textAlign:'start' , fontSize:12}} {...props}>
                
                {option.name} 
              </Box>
            )}
            filterSelectedOptions
            renderInput={(params) => <TextField {...params} label="دارو های مورد استفاده" placeholder="انتخاب دارو" />}
          />
        </Stack>
      </div>
    </>
  );
}

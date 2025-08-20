import { Autocomplete, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { mainDomain } from '../../utils/mainDomain';


export default function InsuranceList({
  userSelected,
  setInsuranceListSelected,
  flag,
  insuranceUser,
  valInsurance,
  setValInsurance
}) {
  const [insuranceList, setInsuranceList] = useState([]);
  
  useEffect(()=>{
    const arr = []
    insuranceUser.map((e)=>{
      
      arr.push(e.insurance);
      setInsuranceListSelected(arr);
      setValInsurance(arr)
      return true
    })
  },[insuranceUser])
  

  
  // useEffect(()=>{
  //   setValInsurance([])
  //   setInsuranceListSelected([])
  // },[flag])
  useEffect(() => {
    if (userSelected.nationalId) {
      axios
        .get(`${mainDomain}/api/Insurance/GetList`, {
          params: {
            patientNationalId: userSelected.nationalId,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setInsuranceList(res.data);
        })
        .catch((err) => {});
    }else{
      setInsuranceList([])
      
    }
  }, [userSelected, flag]);
  

  const changInsuranceHandler = (event, newValue) => {
    setInsuranceListSelected(newValue);
    setValInsurance(newValue)
  };
  return (
    <div className="w-80">
      {/* <FormControl sx={{ mt: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">لیست بیمه های بیمار</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="لیست بیمه های بیمار" />}
          renderValue={(selected) => {
            
            return (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value.insuranceCompanyId} label={value.insuranceCompanyName} />
                ))}
              </Box>
            );
          }}
          MenuProps={MenuProps}
        >
          {insuranceList.map((name) => (
            <MenuItem key={name.insuranceCompanyId} value={name} style={getStyles(name, personName, theme)}>
              {name.insuranceCompanyName}
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}
      <Autocomplete
        value={valInsurance}
        onChange={(event, newValue) => {
          changInsuranceHandler(event, newValue);
        }}
        multiple
        id="tags-outlined"
        options={insuranceList}
        getOptionLabel={(option) => option.insuranceCompanyName}
        filterSelectedOptions
        renderInput={(params) => <TextField {...params} label="لیست بیمه های بیمار" placeholder="انتخاب بیمه" />}
      />
    </div>
  );
}

import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import React, { useEffect, useState } from 'react';
import { mainDomain } from '../../utils/mainDomain';

export default function SelectFieldOrder({ patSelected, setIsLoading, setFlag, flag }) {
  const [categoryOrder, setCategoryOrder] = useState([]);
  const [valCategoryOrder, setValCategoryOrder] = useState(-1);
  const [orderList, setOrderList] = useState([]);
  const [valOrderList, setValOrderList] = useState([]);
  const [doctorComments, setDoctorComments] = useState('');

  // import sweet alert-2
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });

  //   get category order
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${mainDomain}/api/BasicInfo/Category/GetList`, {
        params: {
          typeId: 3,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setCategoryOrder(res.data);
        setValCategoryOrder(res.data[0].categoryId);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, [flag]);

  //   get list order
  useEffect(() => {
    if (valCategoryOrder !== -1) {
      setIsLoading(true);
      axios
        .get(`${mainDomain}/api/BasicInfo/Item/GetList`, {
          params: {
            typeId: 3,
            categoryId: valCategoryOrder,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setIsLoading(false);
          setOrderList(res.data);

          setValOrderList(res.data[0].itemId);
        })
        .catch((err) => {
          setIsLoading(false);
        });
    }
  }, [valCategoryOrder, flag]);

  //   set new order
  const setNewOrderHandler = () => {
    setIsLoading(true);
    const data = {
      appointmentId: patSelected.appointmentId,
      medicalItemId: valOrderList,
      doctorComments,
      statusId: 1,
      typeId: 5,
    };
    axios
      .post(`${mainDomain}/api/MedicalRecord/Order/Add`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setFlag((e) => !e);
        setDoctorComments('');
        Toast.fire({
          icon: 'success',
          text: 'اردر با موفقیت ثبت شد',
        });
      })
      .catch((err) => {
        setIsLoading(false);
        Toast.fire({
          icon: 'error',
          text: err.response ? err.response.data : 'خطای شبکه',
        });
      });
  };

  return (
    <>
      <div className="w-full">
        <FormControl color="primary" className="w-full">
          <InputLabel color="primary" className="px-2" id="demo-simple-select-label">
            لیست دسته بندی اردر ها
          </InputLabel>
          <Select
            onChange={(e) => setValCategoryOrder(e.target.value)}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="لیست دسته بندی اردر ها"
            color="primary"
            value={valCategoryOrder}
          >
            {categoryOrder.map((e) => (
              <MenuItem key={e.categoryId} value={e.categoryId}>
                {e.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="w-full mt-4">
        <FormControl color="primary" className="w-full">
          <InputLabel color="primary" className="px-2" id="demo-simple-select-label">
            لیست اردر ها
          </InputLabel>
          <Select
            onChange={(e) => setValOrderList(e.target.value)}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="لیست اردر ها"
            color="primary"
            value={valOrderList}
          >
            {orderList.map((e) => (
              <MenuItem key={e.itemId} value={e.itemId}>
                {e.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="w-full mt-6 text-start">
        <TextField
          className="w-full text-end"
          id="outlined-multiline-flexible"
          label="توضیحات پزشک"
          multiline
          dir="rtl"
          onChange={(e) => setDoctorComments(e.target.value)}
          value={doctorComments}
          minRows={4}
        />
      </div>
      <div className="text-start">
        {/* <button
          onClick={setNewOrderHandler}
          className="px-5 py-2 mt-3 rounded-lg bg-green-500 hover:bg-green-600 duration-300 text-white font-semibold"
        >
          ثبت
        </button> */}
        <Button
          sx={{
            color: 'white',
            mt: 2,
            py: 1,
            boxShadow: 'none',
            // fontSize: 20,
            backgroundColor: 'rgb(16 185 129)',
            '&:hover': {
              backgroundColor: 'rgb(5 150 105)',
            },
          }}
          className="p-2 rounded-md duration-300 mt-2 w-28"
          onClick={setNewOrderHandler}
          variant="contained"
        >
          ثبت
        </Button>
      </div>
    </>
  );
}

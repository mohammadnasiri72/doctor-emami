import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import axios from 'axios';
import { mainDomain } from '../../utils/mainDomain';

export default function AddNewItem({ setIsLoading, medicalCategoryId, setFlag }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = useState('');
  const [valueDesc, setValueDesc] = useState('');

  // import sweet alert-2
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addNewItemHandler = () => {
    if (value.length > 0) {
      setIsLoading(true);
      const data = {
        medicalCategoryId,
        name: value,
        description: valueDesc,
        isActive: true,
        priority: 0,
      };
      axios
        .post(`${mainDomain}/api/BasicInfo/Item/Add`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setIsLoading(false);
          setFlag((e) => !e);
          setValue('');
          setValueDesc('');
          Toast.fire({
            icon: 'success',
            text: 'با موفقیت ثبت شد',
          });
        })
        .catch((err) => {
          setIsLoading(false);
          Toast.fire({
            icon: 'error',
            text: err.response ? err.response.data : 'خطای شبکه',
          });
        });
    }else{
      Toast.fire({
        icon: 'error',
        text: 'لطفا عنوان آیتم را وارد کنید',
      });
    }
  };
  return (
    <>
      {/* <button className='px-3 py-2 rounded-md bg-green-500 duration-300 text-white hover:bg-green-600' onClick={handleClickOpen}>
      <FaPlus /> 

      </button> */}
      <Button
        sx={{
          py: 2,
          boxShadow: 'none',
          // fontSize: 20,
          backgroundColor: 'rgb(16 185 129)',
          '&:hover': {
            backgroundColor: 'rgb(5 150 105)',
          },
        }}
        className="rounded-md duration-300 mt-2"
        onClick={handleClickOpen}
        variant="contained"
      >
        <FaPlus />
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            handleClose();
          },
        }}
      >
        <div className="w-auto">
          <DialogTitle>آیتم جدید</DialogTitle>
          <DialogContent>
            <DialogContentText>آیتم جدید را وارد کنید</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="آیتم جدید"
              fullWidth
              variant="standard"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <TextField
              margin="dense"
              id="name"
              label="توضیحات"
              fullWidth
              variant="standard"
              value={valueDesc}
              onChange={(e) => setValueDesc(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button color="error" onClick={handleClose}>
              انصراف
            </Button>
            <Button onClick={() => addNewItemHandler(value)} color="success" type="submit">
              تایید
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
}

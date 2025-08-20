import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Switch,
  TextField,
  Tooltip,
} from '@mui/material';
import { IoCloseSharp } from 'react-icons/io5';
import Swal from 'sweetalert2';
import axios from 'axios';
import Iconify from '../Iconify';
import { mainDomain } from '../../utils/mainDomain';

export default function ModalEditInsurance({ insurance, setIsLoading, setFlag }) {
  const [open, setOpen] = useState(false);
  const [nameInsurance, setNameInsurance] = useState('');
  const [descInsurance, setDescInsurance] = useState('');
  const [isActive, setisActive] = useState(false);

  useEffect(() => {
    setNameInsurance(insurance.name);
    setDescInsurance(insurance.description);
    setisActive(insurance.isActive);
  }, [insurance]);

  // import sweet alert-2
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });

  //   open modal
  const handleClickOpen = (insurance) => {
    setOpen(true);
  };

  //   close modal
  const handleClose = () => {
    setOpen(false);
  };

  //   edit insurance
  const editInsuranceHandler = (insurance) => {
    if (nameInsurance.length === 0) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا عنوان بیمه را وارد کنید',
      });
    } else {
      setIsLoading(true);
      const data = {
        name: nameInsurance,
        description: descInsurance,
        isActive,
        insuranceCompanyId: insurance.insuranceCompanyId,
      };
      axios
        .post(`${mainDomain}/api/InsuranceCompany/Update`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setIsLoading(false);
          setFlag((e) => !e);

          setOpen(false);
          Toast.fire({
            icon: 'success',
            text: 'بیمه با موفقیت ویرایش شد',
          });
        })
        .catch((err) => {
          setIsLoading(false);
          Toast.fire({
            icon: 'error',
            text: err.response ? err.response.data : 'خطای شبکه',
          });
        });
    }
  };

  return (
    <>
      <>
        <Tooltip title="ویرایش">
          <IconButton>
            <Iconify
              onClick={() => handleClickOpen(insurance)}
              className="cursor-pointer text-2xl"
              icon={'eva:edit-fill'}
            />
          </IconButton>
        </Tooltip>

        <Dialog sx={{ zIndex: '99' }} fullWidth maxWidth="sm" open={open} onClose={handleClose}>
          <DialogTitle>ویرایش بیمه</DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <IoCloseSharp />
          </IconButton>
          <DialogContent>
            <div className="flex flex-col items-center justify-start">
              <div className='w-full'>
                <TextField
                  onChange={(e) => setNameInsurance(e.target.value)}
                  className=" text-end duration-300 w-full"
                  id="outlined-multiline-flexible"
                  label="عنوان بیمه"
                  multiline
                  dir="rtl"
                  value={nameInsurance}
                  maxRows={4}
                />
              </div>
              <div className="mt-3 w-full">
                <TextField
                  onChange={(e) => setDescInsurance(e.target.value)}
                  className=" text-end duration-300 w-full"
                  id="outlined-multiline-flexible"
                  label="توضیحات"
                  multiline
                  dir="rtl"
                  value={descInsurance}
                  maxRows={4}
                />
              </div>
              <div className="mt-5">
                <FormControlLabel
                  value={isActive}
                  onChange={() => setisActive(!isActive)}
                  control={<Switch checked={isActive} />}
                  label={isActive ? 'فعال' : 'غیر فعال'}
                />
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => editInsuranceHandler(insurance)}>ویرایش</Button>
          </DialogActions>
        </Dialog>
      </>
    </>
  );
}

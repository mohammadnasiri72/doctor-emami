import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Swal from 'sweetalert2';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import axios from 'axios';
import { CiViewList } from 'react-icons/ci';
import { mainDomain } from '../../utils/mainDomain';

export default function NameTemplate({ setIsLoading, listDrugCheched }) {
  const [open, setOpen] = useState(false);
  const [nameTemplate, setNameTemplate] = useState('');
  const [descTemplate, setDescTemplate] = useState('');
  const [prescriptionsId, setPrescriptionsId] = useState([]);
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });
  React.useEffect(() => {
    setPrescriptionsId([]);
    const arr = [];
    listDrugCheched.map((e) => {
      arr.push(e.prescriptionId);
      return true
    });
    setPrescriptionsId(arr);
  }, [listDrugCheched]);

  const handleClickOpen = () => {
    if (prescriptionsId.length === 0) {
      Toast.fire({
        icon: 'error',
        text: 'برای ثبت تمپلیت جدید حداقل یک دارو انتخاب کنید',
      });
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveTemplateHandler = () => {
    if (nameTemplate.length === 0) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا یک عنوان برای تمپلیت ثبت کنید',
      });
    } else {
      setIsLoading(true);
      const data = {
        prescriptionsId,
        title: nameTemplate,
        description: descTemplate,
        priority: 0,
      };
      axios
        .post(`${mainDomain}/api/PrescriptionTemplate/Add`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setIsLoading(false);
          Toast.fire({
            icon: 'success',
            text: 'تمپلیت با موفقیت ذخیره شد',
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
  const classBtnActiv = 'px-3 py-2 rounded-md text-white flex items-center bg-blue-500 hover:bg-blue-600'
  const classBtnDisActive = 'px-3 py-2 rounded-md text-white flex items-center bg-slate-300'
  return (
    <>
      {/* <button
        disabled={prescriptionsId.length === 0}
        className={prescriptionsId.length === 0? classBtnDisActive : classBtnActiv}
        onClick={handleClickOpen}
      >
        <span className="px-1">ذخیره به عنوان تمپلیت جدید</span>
        <CiViewList />
      </button> */}
      <Button
      className={prescriptionsId.length === 0? classBtnDisActive : classBtnActiv}
        sx={{
          py: 1,
          boxShadow: 'none',
          // fontSize: 20,
          backgroundColor: 'rgb(16 185 129)',
          '&:hover': {
            backgroundColor: 'rgb(5 150 105)',
          },
        }}
        
        onClick={handleClickOpen}
        variant="contained"
      >
        <span className="px-1">ذخیره به عنوان تمپلیت جدید</span>
        <CiViewList />
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
        <div className="w-96">
          <DialogTitle>تمپلیت جدید</DialogTitle>
          <DialogContent>
            <DialogContentText>نام تمپلیت و توضیحات را وارد کنید</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="نام تمپلیت"
              fullWidth
              variant="standard"
              value={nameTemplate}
              onChange={(e) => setNameTemplate(e.target.value)}
            />
            <TextField
              margin="dense"
              id="name"
              label="توضیحات"
              fullWidth
              variant="standard"
              value={descTemplate}
              onChange={(e) => setDescTemplate(e.target.value)}
            />
          </DialogContent>

          <DialogActions>
            <Button color="error" onClick={handleClose}>
              انصراف
            </Button>
            <Button onClick={saveTemplateHandler} color="success" type="submit">
              تایید
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
}

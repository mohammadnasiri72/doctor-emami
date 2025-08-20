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
// import { GridCloseIcon } from '@mui/x-data-grid';
import { IoCloseSharp } from 'react-icons/io5';
import Swal from 'sweetalert2';
import axios from 'axios';
import Iconify from '../Iconify';
import { mainDomain } from '../../utils/mainDomain';

export default function ModalEditType({ item, setIsLoading, setFlag }) {
  const [open, setOpen] = useState(false);
  const [titleType, setTitleType] = useState('');
  const [priority, setPriority] = useState(0);
  const [isActive, setisActive] = useState(true);
  const [descType, setDescType] = useState('');

  useEffect(() => {
    setisActive(item.isActive);
    setDescType(item.description);
    setTitleType(item.name);
    setPriority(item.priority);
  }, [item]);

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
  const handleClickOpen = () => {
    setOpen(true);
  };

  //   close modal
  const handleClose = () => {
    setOpen(false);
  };

  //   edit item
  const editItemHandler = (item) => {
    if (titleType.length === 0) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا عنوان آیتم را وارد کنید',
      });
    } else {
      setIsLoading(true);
      const data = {
        itemId: item.itemId,
        name: titleType,
        description: descType,
        isActive,
        priority,
      };
      axios
        .post(`${mainDomain}/api/BasicInfo/Item/Update`, data, {
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
            text: 'آیتم با موفقیت ویرایش شد',
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
          <IconButton onClick={handleClickOpen}>
            <Iconify className="cursor-pointer text-2xl" icon={'eva:edit-fill'} />
          </IconButton>
        </Tooltip>

        <Dialog sx={{ zIndex: '99' }} fullWidth maxWidth="sm" open={open} onClose={handleClose}>
          <DialogTitle>ویرایش آیتم</DialogTitle>
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
              {/* name item */}
              <div className='w-full'>
                <TextField
                  onChange={(e) => setTitleType(e.target.value)}
                  className=" text-end duration-300 sm:w-1/2 w-full"
                  id="outlined-multiline-flexible"
                  label="عنوان آیتم"
                  multiline
                  dir="rtl"
                  value={titleType}
                  maxRows={4}
                />
              </div>
              {/* description item */}
              <div className="mt-3 w-full">
                <TextField
                  onChange={(e) => setDescType(e.target.value)}
                  className=" text-end duration-300 sm:w-1/2 w-full"
                  id="outlined-multiline-flexible"
                  label="توضیحات"
                  multiline
                  dir="rtl"
                  value={descType}
                  maxRows={4}
                />
              </div>
              <div className="flex">
                {/* priority item */}
                <div className="mt-3">
                  <TextField
                    onChange={(e) => setPriority(e.target.value)}
                    className=" text-end w-20"
                    id="outlined-multiline-flexible"
                    label="اولویت"
                    multiline
                    dir="rtl"
                    value={priority}
                  />
                </div>
                {/* active item */}
                <div className="mt-5 pr-2">
                  <FormControlLabel
                    value={isActive}
                    onChange={() => setisActive(!isActive)}
                    control={<Switch checked={isActive} />}
                    label={isActive ? 'فعال' : 'غیر فعال'}
                  />
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => editItemHandler(item)}>ویرایش</Button>
          </DialogActions>
        </Dialog>
      </>
    </>
  );
}

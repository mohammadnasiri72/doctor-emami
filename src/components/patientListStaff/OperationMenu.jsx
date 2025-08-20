import { Button, IconButton, Paper, Tooltip } from '@mui/material';
import Menu from '@mui/material/Menu';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaEye, FaLock, FaLockOpen } from 'react-icons/fa';
import { MdOutlineMoreTime } from 'react-icons/md';
import { TiGroup } from 'react-icons/ti';
import Swal from 'sweetalert2';
import { mainDomain } from '../../utils/mainDomain';
import Iconify from '../Iconify';
import AddRelativePatient from './AddRelativePatient';
import DetailsPatient from './DetailsPatient';
import RelativePatient from './RealativePatient';

export default function OperationMenu({
  setAccountUpdate,
  setPageState,
  pat,
  isLoading,
  setIsLoading,
  setFlag,
  patient,
  setPatient,
  setReceptionSelected,
  PatientRelative,
  isOpenAccompanying,
  setIsOpenAccompanying,
  isOpenAddRelative,
  setIsOpenAddRelative,
  historyReception,
  setPatientRelative,
  setPatSelected,
  loadingDetail,
  showDetailsPatient,
setShowDetailsPatient
}) {
  const [anchorEl, setAnchorEl] = useState(null);

  
  

  useEffect(() => {
    if (isOpenAccompanying || isOpenAddRelative || showDetailsPatient) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }, [isOpenAccompanying, isOpenAddRelative, showDetailsPatient]);

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const editPatientHandler = (e) => {
    handleClose();
    setPageState(1);
    setAccountUpdate(e);
  };

  const deletePatientHandler = (e) => {
    handleClose();
    Swal.fire({
      title: 'حذف بیمار',
      text: 'آیا از حذف کاربر مطمئن هستید؟',

      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: 'green',
      cancelButtonText: 'انصراف',
      confirmButtonText: 'حذف کاربر',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        const data = new FormData();
        data.append('patientUserId', e.userId);
        axios
          .post(`${mainDomain}/api/Patient/Delete`, data, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
          .then((res) => {
            setIsLoading(false);
            setFlag((e) => !e);
            Toast.fire({
              icon: 'success',
              text: 'کاربر مورد نظر با موفقیت حذف شد',
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
    });
  };

  const accompanyingPatientHandler = (e) => {
    setIsOpenAccompanying(true);
    handleClose();
    setPatient(e);
    setPatientRelative([]);
  };

  const reserveToPatientHandler = (e) => {
    setAccountUpdate(e);
    setPageState(3);
  };

  const lockPatientHandler = (e) => {
    handleClose();
    Swal.fire({
      title: 'تحریم بیمار',
      text: 'آیا از درخواست خود مطمئن هستید؟',

      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: 'green',
      cancelButtonText: 'انصراف',
      confirmButtonText: 'تحریم کاربر',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        const data = new FormData();
        data.append('userId', e.userId);
        axios
          .post(`${mainDomain}/api/Authenticate/Lock`, data, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
          .then((res) => {
            setIsLoading(false);
            setFlag((e) => !e);
            Toast.fire({
              icon: 'success',
              text: 'کاربر مورد نظر با موفقیت تحریم شد',
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
    });
  };

  const unLockPatientHandler = (e) => {
    handleClose();
    Swal.fire({
      title: 'رفع تحریم بیمار',
      text: 'آیا از درخواست خود مطمئن هستید؟',

      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: '#d33',
      cancelButtonText: 'انصراف',
      confirmButtonText: 'رفع تحریم کاربر',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        const data = new FormData();
        data.append('userId', e.userId);
        axios
          .post(`${mainDomain}/api/Authenticate/UnLock`, data, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
          .then((res) => {
            setIsLoading(false);
            setFlag((e) => !e);
            Toast.fire({
              icon: 'success',
              text: 'کاربر مورد نظر با موفقیت رفع تحریم شد',
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
    });
  };

  return (
    <>
      <div>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <BsThreeDotsVertical className="cursor-pointer text-2xl" />
        </Button>
        {open && (
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <div className="px-4">
              <Tooltip title="ویرایش" placement="right">
                <IconButton onClick={() => editPatientHandler(pat)}>
                  <Iconify icon={'eva:edit-fill'} />
                </IconButton>
              </Tooltip>
            </div>

            <div className="px-4">
              <Tooltip title="همراه" placement="right">
                <IconButton onClick={() => accompanyingPatientHandler(pat)}>
                  <TiGroup />
                </IconButton>
              </Tooltip>
            </div>
            <div className="px-4">
              <Tooltip title="مشاهده جزئیات" placement="right">
                <IconButton
                  onClick={() => {
                    setShowDetailsPatient(true);
                    handleClose();
                    setPatient(pat);
                  }}
                >
                  <FaEye />
                </IconButton>
              </Tooltip>
            </div>
            <div className="px-4">
              <Tooltip title="نوبت دهی اینترنتی" placement="right">
                <IconButton onClick={() => reserveToPatientHandler(pat)}>
                  <MdOutlineMoreTime />
                </IconButton>
              </Tooltip>
            </div>
            <div className="px-4">
              {!pat.isLocked && (
                <Tooltip title="تحریم" placement="right">
                  <IconButton onClick={() => lockPatientHandler(pat)}>
                    <FaLockOpen className="text-emerald-500 text-lg" />
                  </IconButton>
                </Tooltip>
              )}
              {pat.isLocked && (
                <Tooltip title="رفع تحریم" placement="right">
                  <IconButton onClick={() => unLockPatientHandler(pat)}>
                    <FaLock className="text-red-500 text-lg" />
                  </IconButton>
                </Tooltip>
              )}
            </div>
            <div className="px-4">
              <Tooltip title="حذف" placement="right">
                <IconButton onClick={() => deletePatientHandler(pat)}>
                  <Iconify className="text-red-500" icon={'eva:trash-2-outline'} />
                </IconButton>
              </Tooltip>
            </div>
          </Menu>
        )}
      </div>
     
       
    

     
    </>
  );
}

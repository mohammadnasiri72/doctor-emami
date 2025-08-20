/* eslint-disable no-nested-ternary */
import { Box, Chip, IconButton, Menu, Tooltip } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { AiOutlineMessage } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaEye } from 'react-icons/fa';
import { FaTrashCan } from 'react-icons/fa6';
import { GiCancel } from 'react-icons/gi';
import { IoMdTime } from 'react-icons/io';
import { IoCalendarOutline } from 'react-icons/io5';
import Swal from 'sweetalert2';
import useSettings from '../../hooks/useSettings';
import { mainDomain } from '../../utils/mainDomain';
import CheckBoxReserve from './CheckBoxReserve';

export default function CardReserveHistory({
  listReserveChecked,
  setListReserveChecked,
  e,
  listReserveHistory,
  statusId,
  setShowDetailsPatient,
  setPatientId,
  setOpenBoxMessage,
  setUserId,
  setIsLoading,
  setFlag,
  patientId,
  setPatient,
}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const { themeMode } = useSettings();

  // import sweet alert-2
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

  const cancelHandler = (e) => {
    Swal.fire({
      title: 'کنسل کردن نوبت',
      text: 'آیا از ثبت درخواست خود مطمئن هستید؟',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: 'green',
      cancelButtonText: 'انصراف',
      confirmButtonText: 'کنسل',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        const data = {
          reservationId: e.reservationId,
          statusId: 0,
        };
        axios
          .post(`${mainDomain}/api/Reservation/Update`, data, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
          .then((res) => {
            setIsLoading(false);
            setFlag((e) => !e);
            Toast.fire({
              icon: 'success',
              text: 'نوبت با موفقیت کنسل شد',
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

  const deleteHandler = (e) => {
    Swal.fire({
      title: 'حذف کردن نوبت',
      text: 'آیا از ثبت درخواست خود مطمئن هستید؟',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: 'green',
      cancelButtonText: 'انصراف',
      confirmButtonText: 'حذف',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        // const data = {
        //   reservationId: e.reservationId,

        // };
        const reservationIdData = new FormData();
        reservationIdData.append('reservationId', e.reservationId);
        axios
          .post(`${mainDomain}/api/Reservation/Delete`, reservationIdData, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
          .then((res) => {
            setIsLoading(false);
            setFlag((e) => !e);
            Toast.fire({
              icon: 'success',
              text: 'نوبت با موفقیت حذف شد',
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
      <div
        style={{ backgroundColor: themeMode === 'light' ? 'rgb(248 250 252)' : '#161c24' }}
        className=" border rounded-lg p-2 relative"
      >
        <CheckBoxReserve
          listReserveChecked={listReserveChecked}
          setListReserveChecked={setListReserveChecked}
          e={e}
          listReserveHistory={listReserveHistory}
          statusId={statusId}
        />
        <div className="text-start pr-5">
          <div className="mt-1">
            <span className="font-semibold pr-2">
              {e.patientFirstName} {e.patientLastName}
            </span>
          </div>
          <div className="mt-1 flex items-center">
            <IoCalendarOutline className="text-2xl" />
            <span className="px-1">{e.reservationTimeDateFA}</span>
          </div>
          <div className="mt-1 flex items-center">
            <IoMdTime className="text-2xl" />
            <span>
              {e.reservationTimeToTime.slice(0, 5)} - {e.reservationTimeFromTime.slice(0, 5)}
            </span>
          </div>
          <div className="mt-1">
            <Chip
              size="small"
              label={e.status}
              variant="filled"
              sx={{
                backgroundColor:
                  e.statusId === 0 ? 'rgb(239 68 68)' : e.statusId === 1 ? 'rgb(20 184 166)' : e.statusId === 2 ? 'rgb(34 197 94)' : 'rgb(249 115 22)',
                color: 'white',
              }}
            />
          </div>
        </div>
      </div>
      <div className="absolute left-4 top-5">
        <Box
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <BsThreeDotsVertical className="cursor-pointer text-teal-500" />
        </Box>
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
            <Tooltip title="مشاهده جزئیات" placement="right">
              <span>
                <IconButton
                  onClick={() => {
                    handleClose();
                    setShowDetailsPatient(true);
                    setPatientId(e.patientNationalId);

                    axios
                      .get(`${mainDomain}/api/Patient/GetList`, {
                        params: {
                          query: e.patientNationalId,
                        },
                        headers: {
                          Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                      })
                      .then((res) => {
                        setPatient(res.data[0]);
                      })
                      .catch((err) => {
                        //   setIsLoading(false);
                      });
                  }}
                >
                  <FaEye className="text-teal-500" />
                </IconButton>
              </span>
            </Tooltip>
          </div>
          <div className="px-4">
            <Tooltip title="ارسال پیام" placement="right">
              <span>
                <IconButton
                  onClick={() => {
                    handleClose();
                    setOpenBoxMessage(true);
                    setUserId([e.patientUserId]);
                  }}
                >
                  <AiOutlineMessage className="text-emerald-500" />
                </IconButton>
              </span>
            </Tooltip>
          </div>
          <div className="px-4">
            <Tooltip title="کنسل" placement="right">
              <span>
                <IconButton
                  disabled={e.statusId !== 1}
                  onClick={() => {
                    cancelHandler(e);
                    handleClose();
                  }}
                >
                  <GiCancel style={{ color: e.statusId === 1 ? 'rgb(239 68 68)' : '#ddd' }} className="text-red-500" />
                </IconButton>
              </span>
            </Tooltip>
          </div>
          {e.statusId === 0 && (
            <div className="px-4">
              <Tooltip title="حذف" placement="right">
                <span>
                  <IconButton
                    onClick={() => {
                      deleteHandler(e);
                      handleClose();
                    }}
                  >
                    <FaTrashCan
                      // style={{ color: e.statusId === 1 ? 'rgb(239 68 68)' : '#ddd' }}
                      className="text-red-500"
                    />
                  </IconButton>
                </span>
              </Tooltip>
            </div>
          )}
        </Menu>
      </div>
    </>
  );
}

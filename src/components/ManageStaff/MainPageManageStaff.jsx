import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { IoIosArrowUp } from 'react-icons/io';
import { MdOutlineMinimize } from 'react-icons/md';
import Swal from 'sweetalert2';
import { mainDomain } from '../../utils/mainDomain';
import SimpleBackdrop from '../backdrop';
import TableManageStaff from './TableManageStaff';
import useSettings from '../../hooks/useSettings';

export default function MainPageManageStaff() {
  const [showManageStaff, setShowManageStaff] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [nationalIdStaff, setNationalIdStaff] = useState('');
  const [firstNameStaff, setFirstNameStaff] = useState('');
  const [lastNameStaff, setLastNameStaff] = useState('');
  const [genderStaff, setGenderStaff] = useState('m');
  const [mobileStaff, setMobileStaff] = useState('');
  const [jobList, setJobList] = useState([]);
  const [jobStaff, setJobStaff] = useState('');
  const [flag, setFlag] = useState(false);
  const [staffId, setStaffId] = useState('');

  const { themeMode } = useSettings();
  

  const paternNationalId = /^[0-9]{10}$/;
  const paternMobile = /^09[0|1|2|3|9][0-9]{8}$/;
  let colorNationId = '';
  let colorMobile = '';
  if (nationalIdStaff.match(paternNationalId)) {
    colorNationId = 'success';
  } else if (nationalIdStaff.length === 0) {
    colorNationId = 'primary';
  } else {
    colorNationId = 'error';
  }
  if (mobileStaff.match(paternMobile)) {
    colorMobile = 'success';
  } else if (mobileStaff.length === 0) {
    colorMobile = 'primary';
  } else {
    colorMobile = 'error';
  }

  // import sweet alert-2
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });

  // get list job
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${mainDomain}/api/BasicInfo/JobTitle/GetList`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setJobList(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, [flag]);

  // set new staff
  const newStaffHandler = () => {
    if (!nationalIdStaff.match(paternNationalId)) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا کد ملی را به درستی وارد کنید',
      });
    } else if (!mobileStaff.match(paternMobile)) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا شماره موبایل را به درستی وارد کنید',
      });
    } else if (firstNameStaff.length < 2 || lastNameStaff.length < 2 || jobStaff.length === 0) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا موارد خواسته شده را به درستی وارد کنید',
      });
    } else {
      Swal.fire({
        title: 'ثبت پرسنل جدید',
        text: 'آیا از ثبت پرسنل مطمئن هستید؟',
        showCancelButton: true,
        confirmButtonColor: 'green',
        cancelButtonColor: '#d33',
        cancelButtonText: 'انصراف',
        confirmButtonText: 'تایید ',
      }).then((result) => {
        if (result.isConfirmed) {
          setIsLoading(true);
          const data = {
            nationalId: nationalIdStaff,
            firstName: firstNameStaff,
            lastName: lastNameStaff,
            gender: genderStaff,
            jobTitle: jobStaff,
            mobile: mobileStaff,
          };
          axios
            .post(`${mainDomain}/api/Staff/Add`, data, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            })
            .then((res) => {
              Toast.fire({
                icon: 'success',
                text: 'پرسنل با موفقیت ثبت شد',
              });
              setNationalIdStaff('');
              setFirstNameStaff('');
              setLastNameStaff('');
              setGenderStaff('m');
              setMobileStaff('');
              setJobStaff('');
              setFlag((e) => !e);
              setIsLoading(false);
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
    }
  };

  // edit staff
  const editStaffHandler = () => {
    setIsLoading(true);
    const data = {
      staffId,
      nationalId: nationalIdStaff,
      firstName: firstNameStaff,
      lastName: lastNameStaff,
      gender: genderStaff,
      jobTitle: jobStaff,
    };
    axios
      .post(`${mainDomain}/api/Staff/Update`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setShowManageStaff(false);
        setIsLoading(false);
        setFlag((e) => !e);
        setIsEdit(false);
        setNationalIdStaff('');
        setFirstNameStaff('');
        setLastNameStaff('');
        setGenderStaff('m');
        setMobileStaff('');
        setJobStaff('');
        Toast.fire({
          icon: 'success',
          text: 'پرسنل با موفقیت ویرایش شد',
        });
      })
      .catch((err) => {
        setIsLoading(false);
        setIsEdit(false);
        setShowManageStaff(false);
        Toast.fire({
          icon: 'error',
          text: err.response ? err.response.data : 'خطای شبکه',
        });
      });
  };

  return (
    <>
      <div className="text-start relative">
        {!isEdit && (
          <Button
            sx={{
              boxShadow: 'none',
              backgroundColor: 'rgb(16 185 129)',
              '&:hover': {
                backgroundColor: 'rgb(5 150 105)',
              },
            }}
            onClick={() => setShowManageStaff(!showManageStaff)}
            className="sticky top-5 flex items-center text-white px-5 py-2 rounded-md bg-green-500 duration-300 hover:bg-green-600"
          >
            <span className="px-2">{showManageStaff ? 'بستن' : 'افزودن پرسنل'}</span>
            {!showManageStaff && <FaPlus />}
            {showManageStaff && <MdOutlineMinimize />}
          </Button>
        )}
        <div
          style={{
            opacity: showManageStaff ? '1' : '0',
            visibility: showManageStaff ? 'visible' : 'hidden',
            maxHeight: showManageStaff ? '35rem' : '0',
            zIndex: '12',
            backgroundColor: themeMode === 'light' ? 'white' : '#161c24',
          }}
          className="border mt-5 overflow-hidden sticky top-12 left-0 right-0 bottom-0 duration-500 px-3 bg-white shadow-lg pb-3"
        >
          {!isEdit && (
            <Button
              sx={{
                py: 1,
                position: 'absolute',
                bottom: '0',
                left: '50%',
                transform: 'translate(-50% , 50%)',
                borderRadius: '100%',
                boxShadow: 'none',
                backgroundColor: 'rgb(226 232 240)',
                '&:hover': {
                  backgroundColor: 'rgb(203 213 225)',
                },
              }}
              onClick={() => setShowManageStaff(false)}
              className="absolute bottom-0 left-1/2"
            >
              <IoIosArrowUp className="text-3xl rounded-t-full w-14 -translate-y-3 duration-300" />
            </Button>
          )}
          <div className="mt-5 flex flex-wrap items-center">
            {/* national id */}
            <div className="text-start mt-3 lg:w-1/4 sm:w-1/3 w-full" dir="rtl">
              <TextField
                onChange={(e) => setNationalIdStaff(e.target.value)}
                className=" text-end w-full"
                id="outlined-multiline-flexible"
                label="کد ملی پرسنل"
                multiline
                dir="rtl"
                value={nationalIdStaff}
                maxRows={4}
                color={colorNationId}
              />
            </div>
            {/* first name */}
            <div className="text-start mt-3 sm:pr-2 lg:w-1/4 sm:w-1/3 w-full" dir="rtl">
              <TextField
                onChange={(e) => setFirstNameStaff(e.target.value)}
                className=" text-end w-full"
                id="outlined-multiline-flexible"
                label="نام پرسنل"
                multiline
                dir="rtl"
                value={firstNameStaff}
                maxRows={4}
              />
            </div>
            {/* last name */}
            <div className="text-start mt-3 sm:pr-2 lg:w-1/4 sm:w-1/3 w-full" dir="rtl">
              <TextField
                onChange={(e) => setLastNameStaff(e.target.value)}
                className=" text-end w-full"
                id="outlined-multiline-flexible"
                label="نام خانوادگی پرسنل"
                multiline
                dir="rtl"
                value={lastNameStaff}
                maxRows={4}
              />
            </div>
          </div>
          <div className="flex flex-wrap items-center">
            {/* mobile */}
            <div className="text-start mt-3 lg:w-1/4 sm:w-1/3 w-full" dir="rtl">
              <TextField
                onChange={(e) => setMobileStaff(e.target.value)}
                className=" text-end w-full"
                id="outlined-multiline-flexible"
                label="شماره موبایل پرسنل"
                multiline
                dir="rtl"
                value={mobileStaff}
                maxRows={4}
                color={colorMobile}
              />
            </div>
            {/* job title */}
            <div className="text-start mt-3 sm:pr-2 lg:w-1/4 sm:w-1/3 w-full">
              <FormControl color="primary" className="w-full">
                <InputLabel color="primary" className="px-2" id="demo-simple-select-label">
                  عنوان شغلی
                </InputLabel>
                <Select
                  onChange={(e) => setJobStaff(e.target.value)}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="عنوان شغلی"
                  color="primary"
                  value={jobStaff}
                >
                  {jobList.map((e) => (
                    <MenuItem key={e.itemId} value={e.name}>
                      {e.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            {/* gender */}
            <div className="mt-3 pr-2" dir="rtl">
              <FormControl color="primary">
                <InputLabel color="primary" className="px-2" id="demo-simple-select-label">
                  جنسیت
                </InputLabel>
                <Select
                  className="w-20"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={genderStaff}
                  label="جنسیت"
                  color="primary"
                  onChange={(e) => setGenderStaff(e.target.value)}
                >
                  <MenuItem value="m">مرد</MenuItem>
                  <MenuItem value="f">زن</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          {!isEdit && (
            <div className="mt-3">
              <Button
                sx={{
                  boxShadow: 'none',
                  backgroundColor: 'rgb(16 185 129)',
                  '&:hover': {
                    backgroundColor: 'rgb(5 150 105)',
                  },
                }}
                onClick={newStaffHandler}
                className="px-5 py-2 rounded-md bg-green-500 duration-300 hover:bg-green-600 text-white font-semibold"
              >
                ثبت
              </Button>
            </div>
          )}
          {isEdit && (
            <div className="flex mt-3">
              <div className="px-2">
                <Button
                  sx={{
                    boxShadow: 'none',
                    backgroundColor: 'rgb(16 185 129)',
                    '&:hover': {
                      backgroundColor: 'rgb(5 150 105)',
                    },
                  }}
                  onClick={editStaffHandler}
                  className="bg-green-500 hover:bg-green-600 duration-300 px-5 py-2 rounded-md text-white"
                >
                  ویرایش
                </Button>
              </div>
              <div className="px-2">
                <Button
                  sx={{
                    boxShadow: 'none',
                    backgroundColor: 'rgb(239 68 68)',
                    '&:hover': {
                      backgroundColor: 'rgb(220 38 38)',
                    },
                  }}
                  onClick={() => {
                    setShowManageStaff(false);
                    setIsEdit(false);
                    setNationalIdStaff('');
                    setFirstNameStaff('');
                    setLastNameStaff('');
                    setGenderStaff('m');
                    setMobileStaff('');
                    setJobStaff('');
                  }}
                  className="bg-red-500 hover:bg-red-600 duration-300 px-5 py-2 rounded-md text-white"
                >
                  انصراف
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-5">
          <TableManageStaff
            setIsLoading={setIsLoading}
            setFlag={setFlag}
            flag={flag}
            setShowManageStaff={setShowManageStaff}
            setIsEdit={setIsEdit}
            setNationalIdStaff={setNationalIdStaff}
            setFirstNameStaff={setFirstNameStaff}
            setLastNameStaff={setLastNameStaff}
            setGenderStaff={setGenderStaff}
            setMobileStaff={setMobileStaff}
            setJobStaff={setJobStaff}
            setStaffId={setStaffId}
            isLoading={isLoading}
          />
        </div>
      </div>
      {isLoading && <SimpleBackdrop />}
    </>
  );
}

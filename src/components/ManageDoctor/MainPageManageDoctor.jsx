import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { IoIosArrowUp } from 'react-icons/io';
import { MdOutlineMinimize } from 'react-icons/md';
import Swal from 'sweetalert2';
import { mainDomain } from '../../utils/mainDomain';
import SimpleBackdrop from '../backdrop';
import TableManageDoctor from './TableManageDoctor';
import useSettings from '../../hooks/useSettings';
// import TableManageService from './TableManageService';

export default function MainPageManageDoctor() {
  const [showManageDoctor, setShowManageDoctor] = useState(false);
  const [flag, setFlag] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [medicalSystemId, setMedicalSystemId] = useState('');
  const [firstNameDoctor, setFirstNameDoctor] = useState('');
  const [lastNameDoctor, setLastNameDoctor] = useState('');
  const [mobileDoctor, setMobileDoctor] = useState('');
  const [emailDoctor, setEmailDoctor] = useState('');
  const [expertise, setExpertise] = useState([]);
  const [expertiseDoctor, setExpertiseDoctor] = useState('');

  const { themeMode } = useSettings();

  const paternMobile = /^09[0|1|2|3|9][0-9]{8}$/;
  const paternEmail = /[a-zA-Z0-9.-]+@[a-z-]+\.[a-z]{2,3}/;
  let colorMobile = '';
  let colorEmail = '';
  if (mobileDoctor.match(paternMobile)) {
    colorMobile = 'success';
  } else if (mobileDoctor.length === 0) {
    colorMobile = 'primary';
  } else {
    colorMobile = 'error';
  }
  if (emailDoctor.match(paternEmail)) {
    colorEmail = 'success';
  } else if (emailDoctor.length === 0) {
    colorEmail = 'primary';
  } else {
    colorEmail = 'error';
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

  // get list expertises
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${mainDomain}/api/BasicInfo/Specialization/GetList`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setExpertise(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, [flag]);

  // set new doctor
  const newDoctorHandler = () => {
    if (medicalSystemId.length === 0) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا کد نظام پزشکی را به درستی وارد کنید',
      });
    } else if (!mobileDoctor.match(paternMobile)) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا شماره موبایل را به درستی وارد کنید',
      });
    } else if (!emailDoctor.match(paternEmail)) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا ایمیل را به درستی وارد کنید',
      });
    } else if (firstNameDoctor.length < 2 || lastNameDoctor.length < 2 || expertiseDoctor.length === 0) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا موارد خواسته شده را به درستی وارد کنید',
      });
    } else {
      Swal.fire({
        title: 'ثبت پزشک جدید',
        text: 'آیا از ثبت پزشک مطمئن هستید؟',
        showCancelButton: true,
        confirmButtonColor: 'green',
        cancelButtonColor: '#d33',
        cancelButtonText: 'انصراف',
        confirmButtonText: 'تایید ',
      }).then((result) => {
        if (result.isConfirmed) {
          setIsLoading(true);
          const data = {
            medicalSystemId,
            specializationId: expertiseDoctor,
            firstName: firstNameDoctor,
            lastName: lastNameDoctor,
            mobile: mobileDoctor,
            email: emailDoctor,
          };
          axios
            .post(`${mainDomain}/api/Doctor/Add`, data, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            })
            .then((res) => {
              Toast.fire({
                icon: 'success',
                text: 'پزشک با موفقیت ثبت شد',
              });
              setMedicalSystemId('');
              setFirstNameDoctor('');
              setLastNameDoctor('');
              setMobileDoctor('');
              setExpertiseDoctor('');
              setEmailDoctor('');
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

  // edit doctor
  const editDoctorHandler = () => {
    setIsLoading(true);
    const data = {
      medicalSystemId,
      specializationId: expertiseDoctor,
      firstName: firstNameDoctor,
      lastName: lastNameDoctor,
    };
    axios
      .post(`${mainDomain}/api/Doctor/Update`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setShowManageDoctor(false);
        setIsLoading(false);
        setFlag((e) => !e);
        setIsEdit(false);
        setMedicalSystemId('');
        setFirstNameDoctor('');
        setLastNameDoctor('');
        setMobileDoctor('');
        setExpertiseDoctor('');
        setEmailDoctor('');
        Toast.fire({
          icon: 'success',
          text: 'پزشک با موفقیت ویرایش شد',
        });
      })
      .catch((err) => {
        setIsLoading(false);
        setIsEdit(false);
        setShowManageDoctor(false);
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
            onClick={() => setShowManageDoctor(!showManageDoctor)}
            className="sticky top-5 flex items-center text-white px-5 py-2 rounded-md  duration-300"
          >
            <span className="px-2">{showManageDoctor ? 'بستن' : 'افزودن پزشک'}</span>
            {!showManageDoctor && <FaPlus />}
            {showManageDoctor && <MdOutlineMinimize />}
          </Button>
        )}
        <div
          style={{
            opacity: showManageDoctor ? '1' : '0',
            visibility: showManageDoctor ? 'visible' : 'hidden',
            maxHeight: showManageDoctor ? '35rem' : '0',
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
              onClick={() => setShowManageDoctor(false)}
            >
              <IoIosArrowUp className="text-3xl rounded-t-full w-14 -translate-y-3 duration-300" />
            </Button>
          )}
          <div className="mt-5 flex flex-wrap items-center">
            {/* medicalSystemId */}
            <div className="text-start mt-3 lg:w-1/4 sm:w-1/3 w-full" dir="rtl">
              <TextField
                disabled={isEdit}
                onChange={(e) => setMedicalSystemId(e.target.value)}
                className=" text-end w-full"
                id="outlined-multiline-flexible"
                label="کد نظام پزشکی"
                multiline
                dir="rtl"
                value={medicalSystemId}
                maxRows={4}
              />
            </div>
            {/* first name */}
            <div className="text-start mt-3 sm:pr-2 lg:w-1/4 sm:w-1/3 w-full" dir="rtl">
              <TextField
                onChange={(e) => setFirstNameDoctor(e.target.value)}
                className=" text-end w-full"
                id="outlined-multiline-flexible"
                label="نام پزشک"
                multiline
                dir="rtl"
                value={firstNameDoctor}
                maxRows={4}
              />
            </div>
            {/* last name */}
            <div className="text-start mt-3 sm:pr-2 lg:w-1/4 sm:w-1/3 w-full" dir="rtl">
              <TextField
                onChange={(e) => setLastNameDoctor(e.target.value)}
                className=" text-end w-full"
                id="outlined-multiline-flexible"
                label="نام خانوادگی پزشک"
                multiline
                dir="rtl"
                value={lastNameDoctor}
                maxRows={4}
              />
            </div>
          </div>
          <div className="flex flex-wrap items-center">
            {/* mobile */}
            <div className="text-start mt-3 lg:w-1/4 sm:w-1/3 w-full" dir="rtl">
              <TextField
                disabled={isEdit}
                onChange={(e) => setMobileDoctor(e.target.value)}
                className="w-full text-end"
                id="outlined-multiline-flexible"
                label="شماره موبایل پزشک"
                multiline
                dir="rtl"
                value={mobileDoctor}
                maxRows={4}
                color={colorMobile}
              />
            </div>
            {/* expertise title */}
            <div className="text-start mt-3 sm:pr-2 lg:w-1/4 sm:w-1/3 w-full">
              <FormControl color="primary" className="w-full">
                <InputLabel color="primary" className="px-2" id="demo-simple-select-label">
                  تخصص
                </InputLabel>
                <Select
                  onChange={(e) => setExpertiseDoctor(e.target.value)}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="تخصص"
                  color="primary"
                  value={expertiseDoctor}
                >
                  {expertise.map((e) => (
                    <MenuItem key={e.itemId} value={e.itemId}>
                      {e.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            {/* email */}
            <div className="text-start mt-3 sm:pr-2 lg:w-1/4 sm:w-1/3 w-full" dir="rtl">
              <TextField
                disabled={isEdit}
                onChange={(e) => setEmailDoctor(e.target.value)}
                className=" text-end w-full"
                id="outlined-multiline-flexible"
                label="ایمیل"
                multiline
                dir="rtl"
                value={emailDoctor}
                maxRows={4}
                color={colorEmail}
              />
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
                onClick={newDoctorHandler}
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
                  onClick={editDoctorHandler}
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
                    setShowManageDoctor(false);
                    setIsEdit(false);
                    setMedicalSystemId('');
                    setFirstNameDoctor('');
                    setLastNameDoctor('');
                    setMobileDoctor('');
                    setExpertiseDoctor('');
                    setEmailDoctor('');
                  }}
                  className="duration-300 px-5 py-2 rounded-md text-white"
                >
                  انصراف
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-5">
          <TableManageDoctor
            flag={flag}
            setIsLoading={setIsLoading}
            setFlag={setFlag}
            setShowManageDoctor={setShowManageDoctor}
            setIsEdit={setIsEdit}
            setMedicalSystemId={setMedicalSystemId}
            setFirstNameDoctor={setFirstNameDoctor}
            setLastNameDoctor={setLastNameDoctor}
            setMobileDoctor={setMobileDoctor}
            setEmailDoctor={setEmailDoctor}
            setExpertiseDoctor={setExpertiseDoctor}
            isLoading={isLoading}
          />
        </div>
      </div>
      {isLoading && <SimpleBackdrop />}
    </>
  );
}

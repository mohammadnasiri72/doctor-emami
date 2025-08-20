import React, { useEffect, useState } from 'react';
import { FaChevronRight } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import { Button } from '@mui/material';
import { IoClose } from 'react-icons/io5';
import axios from 'axios';
import InputFullName from './InputFullName';
import InputRelative from './InputRelative';
import InputMobileRelative from './InputMobileRelative';
import InputAddress from './InputAddress';
import InputDesc from './InputDesc';
import { mainDomain } from '../../utils/mainDomain';
import SimpleBackdrop from '../backdrop';

export default function AddRelativePatient({ isOpenAddRelative, setIsOpenAddRelative, patient, editRelative }) {
  const [fullName, setFullName] = useState('');
  const [relative, setRelative] = useState('');
  const [mobileRelative, setMobileRelative] = useState('');
  const [addressRelative, setAddressRelative] = useState('');
  const [descRelative, setDescRelative] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (editRelative.fullName) {
      setFullName(editRelative.fullName);
    }
    if (editRelative.relative) {
      setRelative(editRelative.relative);
    }
    if (editRelative.mobileNumber) {
      setMobileRelative(editRelative.mobileNumber);
    }
    if (editRelative.address) {
      setAddressRelative(editRelative.address);
    }
    if (editRelative.description) {
      setDescRelative(editRelative.description);
    }
  }, [editRelative]);

  const paternMobile = /^09[0|1|2|3|9][0-9]{8}$/;

  // import sweet alert-2
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });

  // set new relative
  const setNewRelativeHandler = () => {
    if (fullName.length > 0 && relative.length > 0 && mobileRelative.match(paternMobile)) {
      setIsLoading(true);
      const data = {
        patientId: patient.patientId,
        fullName,
        relative,
        mobileNumber: mobileRelative,
        address: addressRelative,
        description: descRelative,
      };
      axios
        .post(`${mainDomain}/api/PatientRelative/Add`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setIsOpenAddRelative(false);
          setIsLoading(false);
          setFullName('');
          setRelative('');
          setMobileRelative('');
          setAddressRelative('');
          setDescRelative('');
          Toast.fire({
            icon: 'success',
            text: 'همراه با موفقیت ثبت شد',
            customClass: {
              container: 'toast-modal',
            },
          });
        })
        .catch((err) => {
          setIsLoading(false);
        });
    } else if (fullName.length === 0) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا نام همراه را وارد کنید',
        customClass: {
          container: 'toast-modal',
        },
      });
    } else if (relative.length === 0) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا نسبت همراه با بیمار را وارد کنید',
        customClass: {
          container: 'toast-modal',
        },
      });
    } else if (!mobileRelative.match(paternMobile)) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا شماره موبایل همراه را بصورت صحیح وارد کنید',
        customClass: {
          container: 'toast-modal',
        },
      });
    }
  };

  // edit relative patient
  const editRelativeHandler = () => {
    if (fullName.length > 0 && relative.length > 0 && mobileRelative.match(paternMobile)) {
      setIsLoading(true);
      const data = {
        patientRelativeId: editRelative.patientRelativeId,
        fullName,
        relative,
        mobileNumber: mobileRelative,
        address: addressRelative,
        description: descRelative,
      };
      axios
        .post(`${mainDomain}/api/PatientRelative/Update`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setIsOpenAddRelative(false);
          setIsLoading(false);
          setFullName('');
          setRelative('');
          setMobileRelative('');
          setAddressRelative('');
          setDescRelative('');
          Toast.fire({
            icon: 'success',
            text: 'بیمار با موفقیت ویرایش شد',
            customClass: {
              container: 'toast-modal',
            },
          });
        })
        .catch((err) => {
          setIsLoading(false);
        });
    } else if (fullName.length === 0) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا نام همراه را وارد کنید',
        customClass: {
          container: 'toast-modal',
        },
      });
    } else if (relative.length === 0) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا نسبت همراه با بیمار را وارد کنید',
        customClass: {
          container: 'toast-modal',
        },
      });
    } else if (!mobileRelative.match(paternMobile)) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا شماره موبایل همراه را بصورت صحیح وارد کنید',
        customClass: {
          container: 'toast-modal',
        },
      });
    }
  };

  return (
    <>
      <div
        style={{ zIndex: '1301', transform: isOpenAddRelative ? 'translateX(0)' : 'translateX(-100%)' }}
        className="fixed top-0 bottom-0 lg:right-2/3 sm:right-1/2 right-0 left-0 bg-slate-50 duration-500 p-5 shadow-lg overflow-y-auto"
      >
        {isOpenAddRelative && (
          <div>
            <div className="relative">
              <IoClose
                onClick={() => setIsOpenAddRelative(false)}
                className="absolute right-3 top-2 text-4xl hover:scale-125 cursor-pointer duration-300 rounded-full bg-slate-300 p-2"
              />

              <div className="text-center py-2 text-2xl font-semibold">
                {editRelative.patientId && <span>ویرایش همراه</span>}
                {!editRelative.patientId && <span>ثبت همراه جدید</span>}
              </div>
            </div>
            <InputFullName fullName={fullName} setFullName={setFullName} />
            <InputRelative relative={relative} setRelative={setRelative} />
            <InputMobileRelative mobileRelative={mobileRelative} setMobileRelative={setMobileRelative} />
            <InputAddress addressRelative={addressRelative} setAddressRelative={setAddressRelative} />
            <InputDesc descRelative={descRelative} setDescRelative={setDescRelative} />
            <div className="mt-6 text-start pb-10">
              {!editRelative.patientId && (
                <Button
                  sx={{
                    color: 'white',
                    py: 2,
                    mb: 2,
                    boxShadow: 'none',
                    backgroundColor: 'rgb(16 185 129)',
                    '&:hover': {
                      backgroundColor: 'rgb(5 150 105)',
                    },
                  }}
                  className="rounded-md duration-300 mt-2"
                  onClick={setNewRelativeHandler}
                  variant="contained"
                >
                  ثبت همراه
                </Button>
              )}
              {editRelative.patientId && (
                <Button
                  sx={{
                    color: 'white',
                    py: 2,
                    boxShadow: 'none',
                    // fontSize: 20,
                    backgroundColor: 'rgb(16 185 129)',
                    '&:hover': {
                      backgroundColor: 'rgb(5 150 105)',
                    },
                  }}
                  className="rounded-md duration-300 mt-2"
                  onClick={editRelativeHandler}
                  variant="contained"
                >
                  ویرایش
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
      {/* {isLoading && <SimpleBackdrop />} */}
    </>
  );
}

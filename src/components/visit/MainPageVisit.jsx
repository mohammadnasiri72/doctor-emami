import { Button, ToggleButton, ToggleButtonGroup } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { IoMdArrowForward } from 'react-icons/io';
import { IoCheckmarkDoneCircle } from 'react-icons/io5';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { mainDomain } from '../../utils/mainDomain';
import FormHistoryVisit from '../VisitHistory/FormHistoryVisit';
import SimpleBackdrop from '../backdrop';
import InputDateVisit from './InputDateVisit';
import SecoundPageVisit from './SecoundPageVisit';
import ShowNotPopUp from './ShowNotPopUp';
import ShowPatient from './ShowPatient';
import TablePatientDoing from './TablePatientDoing';

export default function MainPageVisit({ changeStatePages }) {
  const [pageStateVisit, setPageStateVisit] = useState(0);
  const [fromPersianDate, setFromPersianDate] = useState(new Date().toLocaleDateString('fa-IR'));
  const [toPersianDate, setToPersianDate] = useState(new Date().toLocaleDateString('fa-IR'));
  const [patList, setPatList] = useState([]);
  const [patSelected, setPatSelected] = useState([]);
  const [alignment, setAlignment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const [medicalRecord, setMedicalRecord] = useState([]);
  const [valCondition, setValCondition] = useState([]);
  const [account, setAccount] = useState([]);
  const [receptionSelected, setReceptionSelected] = useState([]);
  const [patientWating, setPatientWating] = useState(false);
   const [listReception, setListReception] = useState([]);
  const disabledChechBox = true;

  const navigate = useNavigate();
  const url = window.location.pathname;

  useEffect(()=>{
    if (pageStateVisit===0) {
      navigate('/dashboard/visit')
    }
    if (pageStateVisit===1) {
      navigate('/dashboard/visit/visitPatient')
    }
    if (pageStateVisit===2) {
      navigate('/dashboard/visit/historyVisit')
    }
   
  },[pageStateVisit])

 useEffect(()=>{
    if (url=== '/dashboard/visit') {
      setPageStateVisit(0)
    }
  },[url])

  useEffect(() => {
    setPageStateVisit(0);
  }, [changeStatePages]);

  // import sweet alert-2
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });

  // done handler
  const doneHandler = () => {
    Swal.fire({
      title: 'ثبت نهایی ویزیت',
      text: 'آیا از ثبت درخواست خود مطمئن هستید؟',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: '#d33',
      cancelButtonText: 'انصراف',
      confirmButtonText: 'ثبت',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        const data = new FormData();
        data.append('appointmentId', patSelected.appointmentId);
        axios
          .post(`${mainDomain}/api/Appointment/NextStatus`, data, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
          .then((res) => {
            setIsLoading(false);
            setPageStateVisit(0);
            setPatSelected([]);
            Toast.fire({
              icon: 'success',
              text: 'ویزیت با موفقیت انجام شد',
            });
          })
          .catch((err) => {
            setIsLoading(false);
          });
      }
    });
  };

  //  back handler
  const backHandler = () => {
    Swal.fire({
      title: 'بازگشت به انتظار',
      text: 'آیا از ثبت درخواست خود مطمئن هستید؟',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: '#d33',
      cancelButtonText: 'انصراف',
      confirmButtonText: 'بازگشت به انتظار',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        const data = new FormData();
        data.append('appointmentId', patSelected.appointmentId);
        axios
          .post(`${mainDomain}/api/Appointment/PrevStatus`, data, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
          .then((res) => {
            setIsLoading(false);
            setPageStateVisit(0);
            setPatSelected([]);
            Toast.fire({
              icon: 'success',
              text: 'بیمار سمت منشی فرستاده شد',
            });
          })
          .catch((err) => {
            setIsLoading(false);
          });
      }
    });
  };

  // get medicalRecord
  useEffect(() => {
    if (patSelected.appointmentId) {
      axios
        .get(`${mainDomain}/api/MedicalRecord/GetList`, {
          params: {
            appointmentId: patSelected.appointmentId,
            typeId: 1,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setMedicalRecord(res.data);
        })
        .catch((err) => {});
    }
  }, [patSelected]);

  useEffect(() => {
    setPatSelected([]);
  }, [patList]);

  return (
    <>
      <div>
        {pageStateVisit === 0 && (
          <div>
            <div className="flex">
              {/* <InputTypeVisit valType={valType} setValType={setValType} setIsLoading={setIsLoading} /> */}
              <InputDateVisit setFromPersianDate={setFromPersianDate} setToPersianDate={setToPersianDate} />
            </div>
            <div className="flex flex-wrap mt-5">
              <div className="lg:w-1/4 w-full">
                <ShowPatient
                  patList={patList}
                  setPatSelected={setPatSelected}
                  patSelected={patSelected}
                  pageStateVisit={pageStateVisit}
                  setIsLoading={setIsLoading}
                  fromPersianDate={fromPersianDate}
                  toPersianDate={toPersianDate}
                  setPatientWating={setPatientWating}
                />
              </div>
              <div className="lg:w-3/4 w-full">
                <div className="">
                  <TablePatientDoing
                    patSelected={patSelected}
                    valType={1}
                    setPageStateVisit={setPageStateVisit}
                    setIsLoading={setIsLoading}
                    setAccount={setAccount}
                    setReceptionSelected={setReceptionSelected}
                    patientWating={patientWating}
                    setListReception2={setListReception}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        {pageStateVisit === 1 && (
          <div>
            <div className="mb-5 flex items-center flex-wrap justify-between">
              <div className="text-start">
                <Button
                  sx={{
                    py: 1,
                    boxShadow: 'none',
                    backgroundColor: 'rgb(20 184 166)',
                    '&:hover': {
                      backgroundColor: 'rgb(13 148 136)',
                    },
                  }}
                  className="p-2 rounded-md duration-300 mt-2 text-white"
                  onClick={() => setPageStateVisit(0)}
                  variant="contained"
                >
                  برگشت به صفحه قبل
                </Button>
              </div>
              <div className="flex">
                <ToggleButtonGroup
                  color="primary"
                  value={alignment}
                  exclusive
                  onChange={(event, newEvent) => setAlignment(newEvent)}
                  aria-label="Platform"
                >
                  <ToggleButton onClick={backHandler} value="back">
                    <div className="flex items-center">
                      <IoMdArrowForward className="text-3xl text-red-500 px-1" />
                      <span className="text-red-500">بازگشت به انتظار</span>
                    </div>
                  </ToggleButton>
                  <ToggleButton onClick={doneHandler} value="done">
                    <div className="flex items-center">
                      <span className="text-green-500">انجام شده</span>
                      <IoCheckmarkDoneCircle className="text-2xl text-green-500" />
                    </div>
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
            </div>
            <SecoundPageVisit
              patSelected={patSelected}
              setIsLoading={setIsLoading}
              isLoading={isLoading}
              disabledChechBox={disabledChechBox}
              valCondition={valCondition}
              setValCondition={setValCondition}
              medicalRecord={medicalRecord}
              listReception={listReception}
              setReceptionSelected={setReceptionSelected}
              setPageStateVisit={setPageStateVisit}
              setAccount={setAccount}
            />
          </div>
        )}
        {pageStateVisit === 2 && (
          <div>
            <FormHistoryVisit
              setPageStateVisit={setPageStateVisit}
              receptionSelected={receptionSelected}
              setIsLoading={setIsLoading}
              account={account}
              isLoading={isLoading}
              setReceptionSelected={setReceptionSelected}
            />
          </div>
        )}
        {pageStateVisit === 3 && (
          <div>
            <FormHistoryVisit
              setPageStateVisit2={setPageStateVisit}
              receptionSelected={receptionSelected}
              setIsLoading={setIsLoading}
              account={account}
              isLoading={isLoading}
              setReceptionSelected={setReceptionSelected}
            />
          </div>
        )}
      </div>

      {isLoading && <SimpleBackdrop />}
      <ShowNotPopUp showNote={showNote} setShowNote={setShowNote} />
    </>
  );
}

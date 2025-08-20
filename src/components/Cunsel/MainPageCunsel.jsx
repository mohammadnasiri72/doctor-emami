import { Button, ToggleButton, ToggleButtonGroup } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { IoCheckmarkDoneCircle } from 'react-icons/io5';
import Swal from 'sweetalert2';
import { mainDomain } from '../../utils/mainDomain';
import SimpleBackdrop from '../backdrop';
import SecoundPageVisit from '../visit/SecoundPageVisit';
import ShowPatient from '../visit/ShowPatient';
import TablePatientDoing from '../visit/TablePatientDoing';
import InputDateCunsel from './InputDateCunsel';
import FormHistoryVisit from '../VisitHistory/FormHistoryVisit';

export default function MainPageCunsel({ changeStatePages }) {
  const [pageStateCunsel, setPageStateCunsel] = useState(0);
  const [fromPersianDate, setFromPersianDate] = useState('');
  const [toPersianDate, setToPersianDate] = useState('');
  const [patList, setPatList] = useState([]);
  const [patSelected, setPatSelected] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [account, setAccount] = useState([]);
  const [receptionSelected, setReceptionSelected] = useState([]);
  const [pageStateVisitHistory, setPageStateVisitHistory] = useState(0);
  const [alignment, setAlignment] = useState('');
  const [valCondition, setValCondition] = useState([]);
  const [medicalRecord, setMedicalRecord] = useState([]);
  const [patientWating, setPatientWating] = useState(false);

  // import sweet alert-2
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });

  useEffect(() => {
    setPageStateCunsel(0);
    setPageStateVisitHistory(0);
  }, [changeStatePages]);

  const disabledChechBox = true;

  const doneHandler = () => {
    Swal.fire({
      title: 'ثبت نهایی ویزیت آنلاین',
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
            setPageStateCunsel(0);
            setPatSelected([]);
            Toast.fire({
              icon: 'success',
              text: 'ویزیت آنلاین با موفقیت انجام شد',
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
            typeId: 2,
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

  return (
    <>
      {pageStateVisitHistory === 0 && (
        <div>
          {pageStateCunsel === 0 && (
            <div>
              <div className="flex">
                <InputDateCunsel setFromPersianDate={setFromPersianDate} setToPersianDate={setToPersianDate} />
              </div>
              <div className="flex flex-wrap mt-5">
                <div className="lg:w-1/4 w-full">
                  <ShowPatient
                    patList={patList}
                    setPatSelected={setPatSelected}
                    patSelected={patSelected}
                    setPageStateCunsel={setPageStateCunsel}
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
                      valType={2}
                      setPageStateCunsel={setPageStateCunsel}
                      setIsLoading={setIsLoading}
                      setPageStateVisitHistory={setPageStateVisitHistory}
                      setAccount={setAccount}
                      setReceptionSelected={setReceptionSelected}
                      patientWating={patientWating}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {pageStateCunsel === 1 && (
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
                    onClick={() => setPageStateCunsel(0)}
                    variant="contained"
                  >
                    برگشت به صفحه قبل
                  </Button>
                </div>
                {pageStateCunsel && <p className="text-xl font-semibold">ویزیت آنلاین</p>}
                <div className="flex">
                  <ToggleButtonGroup
                    color="primary"
                    value={alignment}
                    exclusive
                    onChange={(event, newEvent) => setAlignment(newEvent)}
                    aria-label="Platform"
                  >
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
                pageStateCunsel={pageStateCunsel}
              />
            </div>
          )}
        </div>
      )}
      {pageStateVisitHistory === 1 && (
        <div>
          <FormHistoryVisit
            setPageStateVisitHistory={setPageStateVisitHistory}
            receptionSelected={receptionSelected}
            setIsLoading={setIsLoading}
            account={account}
            isLoading={isLoading}
            setReceptionSelected={setReceptionSelected}
          />
        </div>
      )}

      {isLoading && <SimpleBackdrop />}
    </>
  );
}

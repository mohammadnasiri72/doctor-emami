import { FormControl, IconButton, InputLabel, MenuItem, Select, Tooltip } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { FaArrowRight } from 'react-icons/fa6';
import { mainDomain } from '../../utils/mainDomain';
import PrescriptionHistoryVisit from './PrescriptionHistoryVisit';
import OrderHistoryVisit from './OrderHistoryVisit';
import ProblemPatientHistoryVisit from './ProblemPatientHistoryVisit';
import DiagnosisHistoryVisit from './DiagnosisHistoryVisit';
import AdviceHistoryVisit from './AdviceHistoryVisit';
import FilesHistoryVisit from './FilesHistoryVisit';
import CheckBoxDoctor from '../Reception/CheckBoxDoctor';

export default function FormHistoryVisit({
  setPageStateVisitHistory,
  receptionSelected,
  setIsLoading,
  account,
  setPageState,
  isLoading,
  setPageStateReception,
  setPageStateReserveHistory,
  setPageStateMyReserv,
  setPageStateVisit,
  setPageNumber,
  setReceptionSelected,
  setPageStateVisit2
}) {
  const [medicalRecord, setMedicalRecord] = useState([]);
  const [valCondition, setValCondition] = useState([]);
  const [valReception, setValReception] = useState('');
  const [historyReception, setHistoryReception] = useState([]);

  // get medicalrecoard
  useEffect(() => {
    if (receptionSelected.appointmentId) {
      setIsLoading(true);
      axios
        .get(`${mainDomain}/api/MedicalRecord/GetList`, {
          params: {
            appointmentId: receptionSelected.appointmentId,
            typeId: -1,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setIsLoading(false);
          setMedicalRecord(res.data);
        })
        .catch((err) => {
          setIsLoading(false);
        });
    }
  }, [receptionSelected]);

  const disabledChechBox = true;

  useEffect(() => {
    if (receptionSelected.patientNationalId) {
      axios
        .get(`${mainDomain}/api/Appointment/GetList`, {
          params: {
            typeId: -1,
            patientNationalId: receptionSelected.patientNationalId,
            doctorMedicalSystemId: -1,

            statusId: -1,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setHistoryReception(res.data.filter((e)=>e.statusId===3 || e.statusId===4));
          setValReception(res.data.find((e) => e.appointmentId === receptionSelected.appointmentId));
        })
        .catch((err) => {});
    }
  }, []);

  return (
    <>
      <div className="text-start flex justify-start items-center">
        <Tooltip title="برگشت به صفحه قبل" placement="bottom">
          <IconButton
            onClick={() => {
              if (setPageStateVisitHistory) {
                setPageStateVisitHistory(0);
              } else if (setPageState) {
                setPageState(0);
              } else if (setPageNumber) {
                setPageNumber(0);
              } else if (setPageStateReception) {
                setPageStateReception(0);
              } else if (setPageStateReserveHistory) {
                setPageStateReserveHistory(0);
              } else if (setPageStateMyReserv) {
                setPageStateMyReserv(0);
              } else if (setPageStateVisit) {
                setPageStateVisit(0);
              }else if (setPageStateVisit2) {
                setPageStateVisit2(1);
              }
            }}
          >
            <FaArrowRight />
          </IconButton>
        </Tooltip>
        {historyReception.length >= 2 && (
          <div className="w-full py-2" dir="rtl">
            <FormControl color="primary" className="w-full">
              <InputLabel color="primary" className="px-2" id="demo-simple-select-label">
                پذیرش های انجام شده
              </InputLabel>
              <Select
                className="w-52"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={valReception}
                label="پذیرش های انجام شده"
                color="primary"
                onChange={(e) => {
                  setValReception(e.target.value);
                  setReceptionSelected(e.target.value);
                }}
              >
                {historyReception.map((e, i) => (
                  <MenuItem key={e.appointmentId} value={e}>
                    {e.appointmentDateFA}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        )}
      </div>

      <div className="border-2 rounded-lg ">
        <div className="flex items-center">
          <div className="p-3">
            <img className="w-10 h-10 rounded-full object-cover" src={mainDomain + account.avatar} alt="" />
          </div>
          <div className="text-start">
            <p>
              {account.firstName} {account.lastName}
            </p>
            <p className="text-sm">{account.nationalId}</p>
          </div>
        </div>
        <div className="text-start text-xs font-semibold px-4">
          <span>تاریخ ویزیت : {receptionSelected.appointmentDateFA}</span>
        </div>

        <hr className="my-2 border-dotted border-2" />
        <div className="flex flex-wrap">
          <div className="lg:w-1/2 w-full border-l-2 border-dotted">
            <div className="text-start font-semibold px-4">
              <span>توضیحات : </span>
              <span>{receptionSelected.notes}</span>
            </div>
            {receptionSelected.typeId === 1 && (
              <CheckBoxDoctor
                disabledChechBox={disabledChechBox}
                valCondition={valCondition}
                setValCondition={setValCondition}
                medicalRecord={medicalRecord.filter((e) => e.typeId === 1)}
              />
            )}
            <hr className="pb-2" />
            <ProblemPatientHistoryVisit medicalRecord={medicalRecord} />
            <hr className="my-2 border-dotted border-2" />
            <DiagnosisHistoryVisit medicalRecord={medicalRecord} />
            <hr className="my-2 border-dotted border-2" />
            <AdviceHistoryVisit medicalRecord={medicalRecord} />
          </div>
          <div className="lg:w-1/2 w-full lg:mt-0 mt-4 ">
            <PrescriptionHistoryVisit
              receptionSelected={receptionSelected}
              setIsLoading={setIsLoading}
              isLoading={isLoading}
            />
            <hr className="my-2 border-dotted border-2" />
            <OrderHistoryVisit receptionSelected={receptionSelected} setIsLoading={setIsLoading} />
            <hr className="my-2 border-dotted border-2" />
            <FilesHistoryVisit medicalRecord={medicalRecord} receptionSelected={receptionSelected} />
          </div>
        </div>
      </div>
    </>
  );
}

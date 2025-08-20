import axios from 'axios';
import moment from 'jalali-moment';
import { useEffect, useState } from 'react';
import persian from 'react-date-object/calendars/persian';
import { DateObject } from 'react-multi-date-picker';
import { useNavigate } from 'react-router';
import { mainDomain } from '../../utils/mainDomain';
import FormHistoryVisit from '../VisitHistory/FormHistoryVisit';
import SimpleBackdrop from '../backdrop';
import SecoundPageVisit from '../visit/SecoundPageVisit';
import BoxReserveHistory from './BoxReserveHistory';
import SelectCondition from './SelectCondition';
import SelectDate from './SelectDate';
import SelectDoctor from './SelectDoctor';
import SelectPatient from './SelectPatient';

export default function MainPageReserveHistory({ changeStatePages }) {
  const [pageStateReserveHistory, setPageStateReserveHistory] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [patientUserId, setPatientUserId] = useState('');
  const [doctorId, setDoctorId] = useState(-1);
  const now = moment();
  const startOfMonth = moment(now).startOf('jMonth');
  const endOfMonth = moment(now).endOf('jMonth');
  const [fromPersianDate, setFromPersianDate] = useState(
    new DateObject({ calendar: persian, date: startOfMonth.toDate() }).format()
  );
  const [toPersianDate, setToPersianDate] = useState(
    new DateObject({ calendar: persian, date: endOfMonth.toDate() }).format()
  );
  const [statusId, setStatusId] = useState(-1);
  const [listReserveHistory, setListReserveHistory] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [flag, setFlag] = useState(false);
  const [flag1, setFlag1] = useState(false);
  const [receptionSelected, setReceptionSelected] = useState({});
  const [patient, setPatient] = useState({});

  const navigate = useNavigate();
  const url = window.location.pathname;

  useEffect(() => {
    if (pageStateReserveHistory === 0) {
      navigate('/dashboard/reservHistory');
    }
    if (pageStateReserveHistory === 1) {
      navigate('/dashboard/reservHistory/historyVisit');
    }
    if (pageStateReserveHistory === 2) {
      navigate('/dashboard/reservHistory/visit');
    }
  }, [pageStateReserveHistory]);

  useEffect(() => {
    if (url === '/dashboard/reservHistory') {
      setPageStateReserveHistory(0);
    }
  }, [url]);

  useEffect(() => {
    setPageStateReserveHistory(0);
    if (flag1) {
      setFlag((e) => !e);
    }
    setFlag1(true);
  }, [changeStatePages]);

  // get list status
  useEffect(() => {
    axios
      .get(`${mainDomain}/api/Reservation/GetStatusList`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setStatusList(Object.values(res.data));
      })
      .catch((err) => {});
  }, []);

  // get list doctor
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${mainDomain}/api/Doctor/GetList`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setDoctors(res.data);
        // setDoctorId(res.data[0].doctorId);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {pageStateReserveHistory === 0 && (
        <div>
          <div className="flex flex-wrap">
            <div className="lg:w-1/4 w-full">
              <SelectDoctor
                setIsLoading={setIsLoading}
                doctorId={doctorId}
                setDoctorId={setDoctorId}
                doctors={doctors}
              />
            </div>
            <div className="lg:w-1/2 w-full lg:px-3 lg:mt-0 mt-3">
              <SelectPatient setPatientUserId={setPatientUserId} setIsLoading={setIsLoading} isLoading={isLoading} />
            </div>
            <div className="lg:w-1/4 w-full lg:mt-0 mt-3">
              <SelectDate setFromPersianDate={setFromPersianDate} setToPersianDate={setToPersianDate} />
            </div>
          </div>
          <div>
            <SelectCondition
              setStatusId={setStatusId}
              listReserveHistory={listReserveHistory}
              statusList={statusList}
              setFlag={setFlag}
            />
          </div>
          <div>
            <BoxReserveHistory
              patientUserId={patientUserId}
              doctorId={doctorId}
              fromPersianDate={fromPersianDate}
              toPersianDate={toPersianDate}
              statusId={statusId}
              setIsLoading={setIsLoading}
              listReserveHistory={listReserveHistory}
              setListReserveHistory={setListReserveHistory}
              isLoading={isLoading}
              flag={flag}
              setFlag={setFlag}
              setReceptionSelected={setReceptionSelected}
              setPageStateReserveHistory={setPageStateReserveHistory}
              patient={patient}
              setPatient={setPatient}
            />
          </div>
        </div>
      )}
      {pageStateReserveHistory === 1 && (
        <div>
          <FormHistoryVisit
            setPageStateReserveHistory={setPageStateReserveHistory}
            receptionSelected={receptionSelected}
            setIsLoading={setIsLoading}
            account={patient}
            setReceptionSelected={setReceptionSelected}
          />
        </div>
      )}
      {pageStateReserveHistory === 2 && (
        <div>
          <SecoundPageVisit
            patSelected={receptionSelected}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
            setPageStateReserveHistory={setPageStateReserveHistory}
          />
        </div>
      )}
      {isLoading && <SimpleBackdrop />}
    </>
  );
}

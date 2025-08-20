import { Button, Checkbox, FormControlLabel, Paper, TextField } from '@mui/material';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaArrowRight, FaPlus } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import { mainDomain } from '../../utils/mainDomain';
import SimpleBackdrop from '../backdrop';
import MainRegisterPage from '../register/mainRegisterPage';
import SecoundRegisterPage from '../register/secoundRegisterPage';
import AddInsurance from './AddInsurance';
import BoxChangDate from './BoxChangDate';
import BoxReception from './BoxReception';
import CheckBoxDoctor from './CheckBoxDoctor';
import FilterCondition from './FilterCondition';
import InputConditionReception from './InputConditionReception';
import InputDate from './InputDate';
import InputDoctorSelect from './InputDoctorSelect';
import InputPatientList from './InputPatientList';
import InputTypeReception from './InputTypeReception';
import InsuranceList from './InsuranceList';
import ReserveListPatient from './ReserveListPatient';
import ServicesList from './ServicesList';
import TableInsuranceSelected from './TableInsuranceSelected';
import FormHistoryVisit from '../VisitHistory/FormHistoryVisit';
import SecoundPageVisit from '../visit/SecoundPageVisit';
import useSettings from '../../hooks/useSettings';

export default function MainPageReception({ account, changeStatePages }) {
  const [pageStateReception, setPageStateReception] = useState(0);
  const [valReservPatient, setValReservPatient] = useState('');
  const [userSelected, setUserSelected] = useState({});
  const [reservUser, setReservUser] = useState([]);
  const [showAddInsurance, setShowAddInsurance] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [registerModel, setRegisterModel] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [flag, setFlag] = useState(false);
  const [paid, setPaid] = useState(false);
  const [doctorId, setDoctorId] = useState(-1);
  const [date, setDate] = useState(new Date().toLocaleDateString('fa-IR'));
  const [valTimeStart, setValTimeStart] = useState('');
  const [valTimeEnd, setValTimeEnd] = useState('');
  const [insuranceListSelected, setInsuranceListSelected] = useState([]);
  const [insuranceList, setInsuranceList] = useState([]);
  const [serviceList, setServiceList] = useState([]);
  const [valCondition, setValCondition] = useState([]);
  const [patientList, setPatientList] = useState([]);
  const [turn, setTurn] = useState(1);
  const [notes, setNotes] = useState('');
  const [statusId, setStatusId] = useState(1);
  const [valType, setValType] = useState(1);
  const [receptions, setReceptions] = useState([]);
  const [fromPersianDate, setFromPersianDate] = useState(new Date().toLocaleDateString('fa-IR'));
  const [toPersianDate, setToPersianDate] = useState(new Date().toLocaleDateString('fa-IR'));
  const [statusCondition, setStatusCondition] = useState('');
  const [changStatusCondition, setChangStatusCondition] = useState(false);
  const [editeUser, setEditeUser] = useState({});
  const [insuranceUser, setInsuranceUser] = useState([]);
  const [valInsurance, setValInsurance] = useState([]);
  const [servicesUser, setServicesUser] = useState([]);
  const [listServices, setListServices] = useState([]);
  const [medicalRecord, setMedicalRecord] = useState([]);
  const [isEditStartTime, setIsEditStartTime] = useState(false);
  const [hoursStart, setHoursStart] = useState('');
  const [minStart, setMinStart] = useState('');
  const [timeEditStart, setTimeEditStart] = useState('');
  const [isEditEndTime, setIsEditEndTime] = useState(false);
  const [hoursEnd, setHoursEnd] = useState('');
  const [minEnd, setMinEnd] = useState('');
  const [timeEditEnd, setTimeEditEnd] = useState('');
  const [query, setQuery] = useState('');
  const [doctorMedicalSystemId, setDoctorMedicalSystemId] = useState(-1);
  const [receptionSelected, setReceptionSelected] = useState({});
  const [flagCondition, setFlagCondition] = useState(false);
  const [patSelected, setPatSelected] = useState({});
  const [alignment, setAlignment] = useState(-1);
  const [userSelect, setUserSelect] = useState({});
  const [dataPri, setDataPri] = useState(new Date().toLocaleDateString('fa-IR'));

  const { themeMode } = useSettings();

  const navigate = useNavigate();
  const url = window.location.pathname;

  useEffect(() => {
    if (pageStateReception === 0) {
      navigate('/dashboard/reception');
    }
    if (pageStateReception === 1) {
      navigate('/dashboard/reception/setReception');
    }
    if (pageStateReception === 3) {
      navigate('/dashboard/reception/historyVisit');
    }
    if (pageStateReception === 4) {
      navigate('/dashboard/reception/visit');
    }
  }, [pageStateReception]);

  useEffect(() => {
    if (url === '/dashboard/reception') {
      setPageStateReception(0);
    }
  }, [url]);

  useEffect(() => {
    setValInsurance([]);
    setInsuranceListSelected([]);
    setListServices([]);
    setValCondition([]);
    // setStatusId(1);
    // setValTimeStart('');
    // setValTimeEnd('');
    // setPaid(false);
    setNotes('');
  }, [userSelected]);

  useEffect(() => {
    setPageStateReception(0);
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

  // time start
  useEffect(() => {
    if (valTimeStart && !isEditStartTime) {
      if (valTimeStart.getHours().toString().length === 1) {
        setHoursStart(`0${valTimeStart.getHours()}`);
      } else {
        setHoursStart(`${valTimeStart.getHours()}`);
      }
      if (valTimeStart.getMinutes().toString().length === 1) {
        setMinStart(`0${valTimeStart.getMinutes()}`);
      } else {
        setMinStart(`${valTimeStart.getMinutes()}`);
      }
      setTimeEditStart(`${hoursStart}:${minStart}:00`);
    }
  }, [valTimeStart, isEditStartTime, minStart, hoursStart]);

  // time end
  useEffect(() => {
    if (valTimeEnd && !isEditEndTime) {
      if (valTimeEnd.getHours().toString().length === 1) {
        setHoursEnd(`0${valTimeEnd.getHours()}`);
      } else {
        setHoursEnd(`${valTimeEnd.getHours()}`);
      }
      if (valTimeEnd.getMinutes().toString().length === 1) {
        setMinEnd(`0${valTimeEnd.getMinutes()}`);
      } else {
        setMinEnd(`${valTimeEnd.getMinutes()}`);
      }
      setTimeEditEnd(`${hoursEnd}:${minEnd}:00`);
    }
  }, [valTimeEnd, isEditEndTime, minEnd, hoursEnd]);

  useEffect(() => {
    if (editeUser.paid) {
      setPaid(editeUser.paid);
    }
    if (editeUser.appointmentId) {
      axios
        .get(`${mainDomain}/api/Appointment/Insurance/GetList`, {
          params: {
            appointmentId: editeUser.appointmentId,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setInsuranceUser(res.data);
        })
        .catch((err) => {});

      axios
        .get(`${mainDomain}/api/Appointment/Service/GetList`, {
          params: {
            appointmentId: editeUser.appointmentId,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setServicesUser(res.data);
        })
        .catch((err) => {});

      axios
        .get(`${mainDomain}/api/MedicalRecord/GetList`, {
          params: {
            appointmentId: editeUser.appointmentId,
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
  }, [editeUser]);

  useEffect(() => {
    if (pageStateReception === 0 && userSelected.nationalId) {
      setUserSelected({});
      setFromPersianDate(new Date().toLocaleDateString('fa-IR'));
      setToPersianDate(new Date().toLocaleDateString('fa-IR'));
    }
  }, [pageStateReception]);



  useEffect(() => {
    if (doctorMedicalSystemId !== -1) {
      setIsLoading(true);
      axios
        .get(`${mainDomain}/api/Appointment/GetList`, {
          params: {
            typeId: valType,
            patientNationalId: userSelected.nationalId,
            doctorMedicalSystemId,
            fromPersianDate,
            toPersianDate,
            statusId: -1,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setReceptions(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
        });
    }
  }, [
    toPersianDate,
    fromPersianDate,
    userSelected,
    valType,
    changStatusCondition,
    pageStateReception,
    doctorMedicalSystemId,
    flagCondition,
  ]);

  useEffect(() => {
    const arr = [];
    insuranceListSelected.map((e) => {
      arr.push({
        appointmentId: 0,
        insuranceId: e.insuranceId,
      });
      return true;
    });
    setInsuranceList(arr);
  }, [insuranceListSelected]);

  const showAddInsuranceHandler = () => {
    if (!userSelected.nationalId) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا ابتدا بیمار را ثبت کنید',
      });
    } else {
      setShowAddInsurance(true);
    }
  };

  useEffect(() => {
    setNotes(editeUser?.notes ? editeUser.notes : '');
    // setTurn(1);
    // setPaid(false);
    // setValReservPatient('');
    // setReservUser([]);
    // setValType(1)
  }, [pageStateReception]);

  const submitFormHandler = () => {
    if (!userSelected.patientId) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا ابتدا بیمار را انتخاب نمایید',
      });
    } else {
      setIsLoading(true);
      const dataForm = {
        patientId: userSelected.patientId,
        paid,
        doctorId,
        dateFa: date,
        startTime: isEditStartTime ? `${valTimeStart.format()}:00` : timeEditStart,
        endTime: isEditEndTime ? `${valTimeEnd.format()}:00` : timeEditEnd,
        insuranceList,
        serviceList,
        statusAdmissionIdList: [...new Set(valCondition)],
        turn,
        notes,
        statusId,
        reservationId: valReservPatient || 0,
      };
      axios
        .post(`${mainDomain}/api/Appointment/Add`, dataForm, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then(() => {
          setIsLoading(false);
          // setIsEditStartTime(false);
          // setIsEditEndTime(false);
          setValTimeStart('');
          setValTimeEnd('');
          Toast.fire({
            icon: 'success',
            text: 'پذیرش با موفقیت انجام شد',
          });
          setPageStateReception(0);
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

  const editeFormHandler = () => {
    setIsLoading(true);
    const dataForm = {
      appointmentId: editeUser.appointmentId,
      patientId: userSelected.patientId,
      paid,
      doctorId,
      dateFa: date,
      startTime: isEditStartTime ? `${valTimeStart.format()}:00` : timeEditStart,
      endTime: isEditEndTime ? `${valTimeEnd.format()}:00` : timeEditEnd,
      insuranceList,
      serviceList,
      statusAdmissionIdList: [...new Set(valCondition)],
      turn,
      notes,
      statusId,
    };
    axios
      .post(`${mainDomain}/api/Appointment/Edit`, dataForm, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        // setIsEditStartTime(false);
        // setIsEditEndTime(false);
        setValTimeStart('');
        setValTimeEnd('');
        Toast.fire({
          icon: 'success',
          text: 'پذیرش با موفقیت ویرایش شد',
        });
        setPageStateReception(0);
      })
      .catch((err) => {
        setIsLoading(false);
        Toast.fire({
          icon: 'error',
          text: err.response ? err.response.data : 'خطای شبکه',
        });
      });
  };

  return (
    <>
      {pageStateReception === 0 && (
        <div>
          <div className="flex justify-start flex-wrap items-center">
            <div className="lg:w-1/6 sm:w-1/2 w-full">
              <InputTypeReception valType={valType} setValType={setValType} editeUser={editeUser} />
            </div>
            {/* <InputCondition conditionVal={conditionVal} setConditionVal={setConditionVal} /> */}
            <div className="lg:w-1/6 sm:w-1/2 w-full sm:mt-0 mt-3">
              <InputDoctorSelect
                pageStateReception={pageStateReception}
                setDoctorId={setDoctorId}
                doctorId={doctorId}
                setDoctorMedicalSystemId={setDoctorMedicalSystemId}
                setAlignment={setAlignment}
              />
            </div>
            <div className="lg:w-1/4 sm:w-1/2 w-full lg:mt-0 mt-3">
              <InputPatientList
                pageStateReception={pageStateReception}
                setUserSelected={setUserSelected}
                patientList={patientList}
                setPatientList={setPatientList}
                userSelected={userSelected}
                query={query}
                setQuery={setQuery}
                setAlignment={setAlignment}
              />
            </div>
            <div className="lg:w-1/4 sm:w-1/2 w-full lg:mt-0 mt-3">
              <InputDate
                setFromPersianDate={setFromPersianDate}
                setToPersianDate={setToPersianDate}
                setAlignment={setAlignment}
                dataPri={dataPri}
                setDataPri={setDataPri}
              />
            </div>
            <div className="lg:w-1/6 sm:w-1/2 w-full lg:mt-0 mt-3">
              <Button
                onClick={() => {
                  setPageStateReception(1);
                  setEditeUser({});
                  setValInsurance([]);
                  setInsuranceListSelected([]);
                  setInsuranceUser([]);
                  setListServices([]);
                  setPaid(false);
                  setStatusId(1);
                  setValType(1);
                  setServicesUser([]);
                  setMedicalRecord([]);
                  setServiceList([]);
                  setValCondition([]);
                  setValTimeStart('');
                  setValTimeEnd('');
                  setIsEditStartTime(false);
                  setIsEditEndTime(false);
                  setQuery('');
                  setUserSelected({});
                }}
                sx={{
                  boxShadow: 'none',
                  color: 'white',
                  backgroundColor: 'rgb(16 185 129)',
                  '&:hover': {
                    backgroundColor: 'rgb(5 150 105)',
                  },
                }}
                className=" flex items-center"
              >
                <span className="px-2 whitespace-nowrap">پذیرش جدید</span>
                <FaPlus className="text-2xl" />
              </Button>
            </div>
          </div>

          <FilterCondition
            pageStateReception={pageStateReception}
            receptions={receptions}
            setStatusCondition={setStatusCondition}
            userSelected={userSelected}
            fromPersianDate={fromPersianDate}
            toPersianDate={toPersianDate}
            setIsLoading={setIsLoading}
            setFlagCondition={setFlagCondition}
            alignment={alignment}
            setAlignment={setAlignment}
          />
          <div className="mt-5">
            <BoxReception
              receptions={receptions}
              patientList={patientList}
              statusCondition={statusCondition}
              setChangStatusCondition={setChangStatusCondition}
              setPageStateReception={setPageStateReception}
              setUserSelected={setUserSelected}
              setEditeUser={setEditeUser}
              setIsEditStartTime={setIsEditStartTime}
              setIsEditEndTime={setIsEditEndTime}
              setIsLoading={setIsLoading}
              setReceptionSelected={setReceptionSelected}
              setPatSelected={setPatSelected}
              patSelected={patSelected}
              isLoading={isLoading}
              setUserSelect={setUserSelect}
            />
          </div>
        </div>
      )}
      {pageStateReception === 1 && (
        <div>
          <div className="text-start mb-5">
            <Button
              onClick={() => {
                setPageStateReception(0);
                setValType(1);
                setEditeUser({});
                setMedicalRecord([]);
                setListServices([]);
                setServiceList([]);
                setServicesUser([]);
                setValCondition([]);
                setValTimeStart('');
                setValTimeEnd('');
              }}
              sx={{
                py: 2,
                boxShadow: 'none',
                // fontSize: 20,
                backgroundColor: 'rgb(16 185 129)',
                '&:hover': {
                  backgroundColor: 'rgb(5 150 105)',
                },
              }}
              className="text-white px-5 py-2 rounded-md duration-300 "
            >
              برگشت به صفحه قبل
            </Button>
          </div>
          <div className="flex justify-start flex-wrap">
            <div className="sm:w-1/6 w-full sm:mt-0 mt-3">
              <InputTypeReception valType={valType} setValType={setValType} editeUser={editeUser} />
            </div>
            <div className="sm:w-1/3 w-full sm:mt-0 mt-3">
              <InputDoctorSelect
                pageStateReception={pageStateReception}
                setDoctorId={setDoctorId}
                doctorId={doctorId}
                setDoctorMedicalSystemId={setDoctorMedicalSystemId}
              />
            </div>
            <div className="sm:w-1/2 w-full sm:mt-0 mt-3 ">
              <InputPatientList
                pageStateReception={pageStateReception}
                setUserSelected={setUserSelected}
                patientList={patientList}
                setPatientList={setPatientList}
                userSelected={userSelected}
                editeUser={editeUser}
                query={query}
                setQuery={setQuery}
                setAlignment={setAlignment}
              />
            </div>
            {/* <Button
              onClick={() => setPageStateReception(2)}
              sx={{
                py: 2,
                boxShadow: 'none',
                // fontSize: 20,
                backgroundColor: 'rgb(16 185 129)',
                '&:hover': {
                  backgroundColor: 'rgb(5 150 105)',
                },
              }}
              className="px-5 py-2 rounded-md text-white duration-300"
            >
              <FaPlus />
            </Button> */}
          </div>
          <div className="flex justify-start mt-5 flex-wrap">
            <div className="md:w-1/5 w-full">
              <ReserveListPatient
                valReservPatient={valReservPatient}
                setValReservPatient={setValReservPatient}
                userSelected={userSelected}
                reservUser={reservUser}
                setReservUser={setReservUser}
                pageStateReception={pageStateReception}
              />
            </div>
            <div className="md:w-4/5 w-full">
              <BoxChangDate
                valReservPatient={valReservPatient}
                reservUser={reservUser}
                userSelected={userSelected}
                setDate={setDate}
                date={date}
                valTimeStart={valTimeStart}
                setValTimeStart={setValTimeStart}
                setValTimeEnd={setValTimeEnd}
                valTimeEnd={valTimeEnd}
                setTurn={setTurn}
                turn={turn}
                editeUser={editeUser}
                setIsEditStartTime={setIsEditStartTime}
                setIsEditEndTime={setIsEditEndTime}
              />
            </div>
          </div>
          <div className="flex items-center mt-6">
            <InsuranceList
              insuranceUser={insuranceUser}
              flag={flag}
              userSelected={userSelected}
              setInsuranceListSelected={setInsuranceListSelected}
              valInsurance={valInsurance}
              setValInsurance={setValInsurance}
            />
            <div className="px-4">
              <Button
                onClick={showAddInsuranceHandler}
                sx={{
                  py: 2,
                  boxShadow: 'none',
                  backgroundColor: 'rgb(16 185 129)',
                  '&:hover': {
                    backgroundColor: 'rgb(5 150 105)',
                  },
                }}
                className="px-5 py-2 rounded-md text-white duration-300 mt-4"
              >
                افزودن بیمه
              </Button>
            </div>
          </div>
          <div className="mt-4">
            <TableInsuranceSelected
              insuranceListSelected={insuranceListSelected}
              setIsLoading={setIsLoading}
              setInsuranceListSelected={setInsuranceListSelected}
              setFlag={setFlag}
              setValInsurance={setValInsurance}
            />
          </div>
          <div>
            <ServicesList
              userSelected={userSelected}
              setServiceList={setServiceList}
              servicesUser={servicesUser}
              listServices={listServices}
              setListServices={setListServices}
            />
          </div>
          <div className="mt-10">
            <CheckBoxDoctor
              valCondition={valCondition}
              setValCondition={setValCondition}
              medicalRecord={medicalRecord}
              userSelected={userSelected}
            />
          </div>
          <div className="mt-5 flex items-center">
            <InputConditionReception setStatusId={setStatusId} statusId={statusId} editeUser={editeUser} />
            <FormControlLabel
              onChange={() => setPaid(!paid)}
              className="px-10"
              control={<Checkbox checked={paid} />}
              label={'پرداخت شده'}
            />
          </div>
          <div className=" text-start mt-4" dir="rtl">
            <TextField
              onChange={(e) => setNotes(e.target.value)}
              className="w-1/2 text-end"
              id="outlined-multiline-flexible"
              label="یادداشت"
              multiline
              dir="rtl"
              value={notes}
              minRows={4}
            />
          </div>
          <div className="text-start mt-5">
            {editeUser.appointmentId && (
              <Button
                sx={{
                  py: 2,
                  boxShadow: 'none',
                  backgroundColor: 'rgb(16 185 129)',
                  '&:hover': {
                    backgroundColor: 'rgb(5 150 105)',
                  },
                }}
                onClick={editeFormHandler}
                className="px-5 py-2 bg-green-500 text-white rounded-md duration-300 hover:bg-green-600"
              >
                ویرایش
              </Button>
            )}
            {!editeUser.appointmentId && (
              <Button
                sx={{
                  py: 2,
                  boxShadow: 'none',
                  backgroundColor: 'rgb(16 185 129)',
                  '&:hover': {
                    backgroundColor: 'rgb(5 150 105)',
                  },
                }}
                onClick={submitFormHandler}
                className="px-5 py-2 bg-green-500 text-white rounded-md duration-300 hover:bg-green-600"
              >
                ثبت پذیرش
              </Button>
            )}
          </div>
          <div
            style={{
              zIndex: '1300',
              transform: showAddInsurance ? 'translateX(0)' : 'translateX(-100%)',
              backgroundColor: themeMode === 'light' ? 'rgb(248 250 252)' : '#161c24',
            }}
            className="fixed top-0 bottom-0 lg:right-2/3 sm:right-1/2 right-0 left-0 duration-500 p-5 shadow-lg overflow-y-auto"
          >
            <AddInsurance userSelected={userSelected} setShowAddInsurance={setShowAddInsurance} setFlag={setFlag} />
          </div>
          <Paper
            sx={{ backgroundColor: '#000c' }}
            style={{ zIndex: '1299', display: showAddInsurance ? 'block' : 'none' }}
            onClick={() => setShowAddInsurance(false)}
            className="fixed top-0 left-0 right-0 bottom-0"
          />
        </div>
      )}
      {pageStateReception === 2 && (
        <div>
          {
            <div className="px-3">
              <Button
                onClick={() => setPageStateReception(1)}
                className="bg-blue-500 px-5 py-2 rounded-md duration-300 text-white hover:bg-blue-600 flex items-center"
              >
                <FaArrowRight />
                <span className="px-2">برگشت به صفخه قبل</span>
              </Button>
            </div>
          }
          {!isRegister && (
            <MainRegisterPage
              setIsRegister={setIsRegister}
              setRegisterModel={setRegisterModel}
              setIsLoading={setIsLoading}
            />
          )}
          {isRegister && (
            <SecoundRegisterPage
              setPageStateReception={setPageStateReception}
              pageStateReception={pageStateReception}
              registerModel={registerModel}
              setIsRegister={setIsRegister}
              setIsLoading={setIsLoading}
            />
          )}
          {isLoading && <SimpleBackdrop />}
        </div>
      )}
      {pageStateReception === 3 && (
        <FormHistoryVisit
          setPageStateReception={setPageStateReception}
          receptionSelected={receptionSelected}
          setIsLoading={setIsLoading}
          account={userSelect}
          setReceptionSelected={setReceptionSelected}
        />
      )}
      {pageStateReception === 4 && (
        <div>
          <SecoundPageVisit
            patSelected={patSelected}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
            setPageStateReception={setPageStateReception}
          />
        </div>
      )}
      {isLoading && <SimpleBackdrop />}
    </>
  );
}

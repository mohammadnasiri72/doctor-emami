import { Autocomplete, Button, Stack, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaRegEye } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import { mainDomain } from '../../utils/mainDomain';
import CheckBoxDoctor from '../Reception/CheckBoxDoctor';
import AddNewItem from './AddNewItem';
import TableDiagnosisPatient from './TableDiagnosisPatient';
import DetailsDiagnosis from './DetailsDiagnosis';

export default function DiagnosisPatient({
  patSelected,
  setIsLoading,
  disabledChechBox,
  valCondition,
  setValCondition,
  medicalRecordd,
  pageStateCunsel,
}) {
  const [alignment, setAlignment] = useState('Problem');
  const [diagnosisList, setDiagnosisList] = useState([]);
  const [valDiagnosis, setValDiagnosis] = useState([]);
  const [valProblem, setValProblem] = useState([]);
  const [problemList, setProblemList] = useState([]);
  const [adviceList, setAdviceList] = useState([]);
  const [valAdvice, setValAdvice] = useState([]);
  const [medicalRecord, setMedicalRecord] = useState([]);
  const [flag, setFlag] = useState(false);
  const [typeId, settypeId] = useState('');
  const [medicalItemId, setMedicalItemId] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [optionsAuto, setOptionsAuto] = useState([]);
  const [label, setLabel] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const [medicalCategoryId, setMedicalCategoryId] = useState('');
  const [listReception, setListReception] = useState([]);

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
    if (patSelected.patientNationalId) {
      setIsLoading(true);
      axios
        .get(`${mainDomain}/api/Appointment/GetList`, {
          params: {
            typeId: 1,
            patientNationalId: patSelected.patientNationalId,
            doctorMedicalSystemId: -1,
            fromPersianDate: '',
            toPersianDate: new Date().toLocaleDateString('fa-IR'),
            statusId: 4,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setIsLoading(false);
          setListReception(res.data);
        })
        .catch((err) => {
          setIsLoading(false);
        });
    }
  }, [patSelected]);

  // get list problem patient
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${mainDomain}/api/BasicInfo/PatientComplaints/GetList`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setProblemList(res.data);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [alignment, flag]);

  // get list diagnosis
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${mainDomain}/api/BasicInfo/DoctorDiagnoses/GetList`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setDiagnosisList(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, [alignment, flag]);

  // get list Advice
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${mainDomain}/api/BasicInfo/DoctorRecommendations/GetList`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setAdviceList(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, [alignment, flag]);

  // get medicalrecoard
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${mainDomain}/api/MedicalRecord/GetList`, {
        params: {
          appointmentId: patSelected.appointmentId,
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
      .catch(() => {
        setIsLoading(false);
      });
  }, [flag, alignment]);

  useEffect(() => {
    if (alignment === 'Problem') {
      settypeId(2);
      setMedicalItemId(valProblem?.itemId);
      setValue(valProblem);
      setOptionsAuto(problemList);
      setLabel('مشکلات و علائم بیمار');
      setPlaceholder('انتخاب عارضه');
      if (problemList.length > 0) {
        setMedicalCategoryId(problemList[0].medicalCategoryId);
      }
    }
    if (alignment === 'Diagnosis') {
      settypeId(3);
      setMedicalItemId(valDiagnosis?.itemId);
      setValue(valDiagnosis);
      setOptionsAuto(diagnosisList);
      setLabel('تشخیص ها');
      setPlaceholder('انتخاب تشخیص');
      if (diagnosisList.length > 0) {
        setMedicalCategoryId(diagnosisList[0].medicalCategoryId);
      }
    }
    if (alignment === 'Advice') {
      settypeId(4);
      setMedicalItemId(valAdvice?.itemId);
      setValue(valAdvice);
      setOptionsAuto(adviceList);
      setLabel('توصیه ها');
      setPlaceholder('انتخاب توصیه');
      if (adviceList.length > 0) {
        setMedicalCategoryId(adviceList[0].medicalCategoryId);
      }
    }
  }, [alignment, problemList, diagnosisList, adviceList, valProblem, valDiagnosis, valAdvice]);

  const setItemHandler = () => {
    if (medicalItemId) {
      setIsLoading(true);
      const data = {
        appointmentId: patSelected.appointmentId,
        typeId,
        medicalItemId,
        description,
      };
      axios
        .post(`${mainDomain}/api/MedicalRecord/Add`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setFlag((e) => !e);
          setIsLoading(false);
          setDescription('');
          setValProblem([]);
          setValDiagnosis([]);
          setValAdvice([]);
          Toast.fire({
            icon: 'success',
            text: 'با موفقیت ثبت شد',
          });
        })
        .catch((err) => {
          setIsLoading(false);
          Toast.fire({
            icon: 'error',
            text: err.response ? err.response.data : 'خطای شبکه',
          });
        });
    } else {
      Toast.fire({
        icon: 'error',
        text: 'لطفا عنوان را وارد کنید',
      });
    }
  };

  const changeValue = (newValue) => {
    if (alignment === 'Problem') {
      setValProblem(newValue);
    } else if (alignment === 'Diagnosis') {
      setValDiagnosis(newValue);
    } else {
      setValAdvice(newValue);
    }
  };

  return (
    <>
      <div className="text-start -mt-2">
        {!pageStateCunsel && (
          <div className="">
            <CheckBoxDoctor
              disabledChechBox={disabledChechBox}
              valCondition={valCondition}
              setValCondition={setValCondition}
              medicalRecord={medicalRecordd}
            />
          </div>
        )}
        <div className="pb-3">
          <p>توضیحات:</p>
          <p className="px-3 w-5/6 text-justify">{patSelected.notes}</p>
        </div>
        <hr className="pb-5" />

        <div className="flex items-center">
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={(event, newEvent) => {
              if (newEvent !== null) {
                setAlignment(newEvent);
              }
            }}
            aria-label="Platform"
          >
            <ToggleButton value="Problem">مشکل و علائم بیمار</ToggleButton>
            <ToggleButton value="Diagnosis">تشخیص</ToggleButton>
            <ToggleButton value="Advice">توصیه</ToggleButton>
          </ToggleButtonGroup>
          {listReception.length > 0 && <DetailsDiagnosis listReception={listReception} />}
        </div>
      </div>
      {
        <div>
          <div className="flex flex-wrap mt-5">
            <div className="flex w-full sm:w-1/2">
              <div className="sm:pr-4">
                <AddNewItem setIsLoading={setIsLoading} medicalCategoryId={medicalCategoryId} setFlag={setFlag} />
              </div>
              <div className="w-full pr-4" dir="rtl">
                <Stack spacing={3}>
                  <Autocomplete
                    value={value}
                    onChange={(event, newValue) => {
                      changeValue(newValue);
                    }}
                    id="tags-outlined"
                    options={optionsAuto}
                    getOptionLabel={(option) => (option.name ? option.name : '')}
                    filterSelectedOptions
                    renderInput={(params) => <TextField {...params} label={label} placeholder={placeholder} />}
                  />
                </Stack>
              </div>
            </div>
            <div className="w-full sm:w-1/3 sm:mt-0 mt-2 text-start sm:pr-4" dir="rtl">
              <TextField
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                className="w-full text-end"
                id="outlined-multiline-flexible"
                label="توضیحات"
                multiline
                dir="rtl"
                value={description}
              />
            </div>
            <div className="sm:pr-8 sm:mt-0 mt-2 flex items-center w-full sm:w-1/6">
              <Button
                sx={{
                  py: 1,
                  boxShadow: 'none',
                  // fontSize: 20,
                  backgroundColor: 'rgb(16 185 129)',
                  '&:hover': {
                    backgroundColor: 'rgb(5 150 105)',
                  },
                }}
                className="p-2 rounded-md duration-300 mt-2 w-28"
                onClick={setItemHandler}
                variant="contained"
              >
                <span className="px-2">ثبت</span>
                <FaPlus />
              </Button>
            </div>
          </div>
          <TableDiagnosisPatient
            medicalRecord={medicalRecord}
            setIsLoading={setIsLoading}
            setFlag={setFlag}
            alignment={alignment}
          />
        </div>
      }
    </>
  );
}

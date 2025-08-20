import { Button, FormControl, InputLabel, MenuItem, Select, Skeleton, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { MdDriveFolderUpload } from 'react-icons/md';
import Swal from 'sweetalert2';
import { mainDomain } from '../../utils/mainDomain';
import SimpleBackdrop from '../backdrop';
import ProgressBarUpload from '../Counseling/ProgressBarUpload';
import TableFilePatient from './TableFilePatient';

export default function MainPageUploadDocument({ account }) {
  const [fileType, setFileType] = useState([]);
  const [fileVal, setFileVal] = useState('');
  const [valProgres, setValProgres] = useState(0);
  const [addressType, setAddressType] = useState('Image');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingFile, setIsLoadingFile] = useState(true);
  const [desc, setDesc] = useState('');
  const [dataAttachment, setDataAttachment] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [doctor, setDoctor] = useState([]);
  const [expertise, setExpertise] = useState('همه');
  const [listFilePatient, setListFilePatient] = useState([]);
  const [flag, setFlag] = useState(false);

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });

  const inpRef = useRef();

  // get type file
  useEffect(() => {
    axios
      .get(`${mainDomain}/api/BasicInfo/MedicalDocument/GetList`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setFileType(res.data);
        setFileVal(res.data[0].itemId);
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
        setIsLoading(false);
        setDoctors(res.data);
        setDoctor(res.data[0].doctorId);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);

  // get list file uploaded
  useEffect(() => {
    if (account.nationalId && doctor) {
      setIsLoadingFile(true);
      axios
        .get(`${mainDomain}/api/PatientFile/GetList`, {
          params: {
            nationalId: account.nationalId,
            doctorId: doctor,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setListFilePatient(res.data);
          setIsLoadingFile(false);
        })
        .catch((err) => {
          setIsLoadingFile(false);
        });
    }
  }, [account, doctor, flag]);

  const selectFileHandler = () => {
    if (fileVal.length === 0) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا نوع فایل را انتخاب کنید',
      });
    } else {
      inpRef.current.click();
    }
  };

  const uploadDocumentHandler = (e) => {
    const fileData = new FormData();
    fileData.append('file', e.target.files[0]);
    if (
      (e.target.files[0].type.includes('image') && fileVal === 4) ||
      (e.target.files[0].type.includes('video') && fileVal === 5) ||
      (e.target.files[0].type.includes('pdf') && fileVal === 7) ||
      (e.target.files[0].type.includes('audio') && fileVal === 6)
    ) {
      setIsLoading(true);

      axios
        .post(`${mainDomain}/api/File/Upload/${addressType}`, fileData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          onUploadProgress: (val) => {
            setValProgres(Number(Math.round((val.loaded * 100) / val.total)));
          },
        })
        .then((res) => {
          setIsLoading(true);
          setDataAttachment(res.data);
          const data = {
            doctorId: doctor,
            medicalItemId: fileVal,
            attachment: res.data,
            description: desc,
          };

          axios
            .post(`${mainDomain}/api/PatientFile/Add`, data, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            })
            .then((res) => {
              setValProgres(0);
              setFlag((e) => !e);
              Toast.fire({
                icon: 'success',
                text: 'فایل با موفقیت آپلود شد',
              });
              setIsLoading(false);
              // setFlagUpload(!flagUpload);
            })
            .catch((err) => {
              setIsLoading(false);
              setValProgres(0);
              Toast.fire({
                icon: 'error',
                text: err.response.data ? err.response.data : 'خطای شبکه',
              });
            });
        })
        .catch((err) => {
          setIsLoading(false);
          Toast.fire({
            icon: 'error',
            text: err.response.data ? err.response.data : 'خطای شبکه',
          });
        });
    } else {
      Toast.fire({
        icon: 'error',
        text: 'فرمت فایل انتخاب شده صحیح نیست',
      });
    }
  };

  const changTypeFileHandler = (e) => {
    setFileVal(e.target.value);
    fileType.map((t) => {
      if (t.itemId === e.target.value) {
        setAddressType(t.description);
      }
      return true;
    });
  };
  return (
    <>
      <div>
        <h2 className="font-semibold pb-4">در صورت تمایل میتوانید مدارک یا فایل های خود را برای پزشک ارسال کنید</h2>
      </div>
      <div className="px-4 w-full flex flex-wrap justify-start items-center" dir="rtl">
        <div className="lg:w-48 w-full text-start pl-2">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">انتخاب دکتر</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={doctor}
              label="انتخاب دکتر"
              onChange={(e) => setDoctor(e.target.value)}
            >
              {expertise !== 'همه' &&
                doctors
                  .filter((doctor) => doctor.specialization === expertise)
                  .map((doctor) => (
                    <MenuItem key={doctor.doctorId} value={doctor.doctorId}>
                      {doctor.firstName} {doctor.lastName}
                    </MenuItem>
                  ))}
              {expertise === 'همه' &&
                doctors.map((doctor) => (
                  <MenuItem key={doctor.doctorId} value={doctor.doctorId}>
                    {doctor.firstName} {doctor.lastName}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </div>
        <div className="lg:w-32 lg:mt-0 mt-3 w-full text-start">
          <FormControl className="w-32" color="primary">
            <InputLabel color="primary" className="px-2" id="demo-simple-select-label">
              نوع فایل
            </InputLabel>
            <Select
              onChange={changTypeFileHandler}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="نوع فایل"
              color="primary"
              value={fileVal}
            >
              {fileType.map((e) => (
                <MenuItem key={e.itemId} value={e.itemId}>
                  {e.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="lg:mt-0 mt-3 text-start lg:px-2 w-96" dir="rtl">
          <TextField
            onChange={(e) => setDesc(e.target.value)}
            className="w-full text-end"
            id="outlined-multiline-flexible"
            label="توضیحات"
            multiline
            dir="rtl"
            maxRows={4}
            value={desc}
          />
        </div>
        <input className="opacity-0 invisible absolute" ref={inpRef} type="file" onChange={uploadDocumentHandler} />

        <div className="flex items-center">
          <div className="lg:px-3 lg:mt-0 mt-3 lg:w-auto w-full text-start">
            <Button
              disabled={isLoading}
              sx={{
                py: 1,
                boxShadow: 'none',
                // fontSize: 20,
                backgroundColor: 'rgb(16 185 129)',
                '&:hover': {
                  backgroundColor: 'rgb(5 150 105)',
                },
              }}
              className="p-2 rounded-md duration-300 whitespace-nowrap text-white"
              onClick={selectFileHandler}
              variant="contained"
            >
              <span className="px-2">ارسال فایل</span>
              <MdDriveFolderUpload className="text-3xl" />
            </Button>
          </div>
          <div className="px-5">
            <ProgressBarUpload valProgres={valProgres} />
          </div>
        </div>
      </div>
      <hr className="mt-3" />
      {listFilePatient.length === 0 && isLoadingFile && (
        <div>
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
        </div>
      )}
      {listFilePatient.length === 0 && !isLoadingFile && <div>صفحه ارسال فایل خالی است</div>}
      {listFilePatient.length > 0 && (
        <TableFilePatient listFilePatient={listFilePatient} doctor={doctor} setIsLoading={setIsLoading} setFlag={setFlag}/>
      )}
      {isLoading && <SimpleBackdrop />}
    </>
  );
}

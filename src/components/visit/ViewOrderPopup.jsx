import { Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { MdDriveFolderUpload } from 'react-icons/md';
import Swal from 'sweetalert2';
import { mainDomain } from '../../utils/mainDomain';
import ProgressBarUpload from '../Counseling/ProgressBarUpload';
import SimpleBackdrop from '../backdrop';

export default function ViewOrderPopup({ isOpenOrder, setIsOpenOrder, orderEdit, setIsLoading , setFlag}) {
  const [fileType, setFileType] = useState([]);
  const [fileVal, setFileVal] = useState('');
  const [addressType, setAddressType] = useState('');
  const [valProgres, setValProgres] = useState(0);
  const [dataAttachment, setDataAttachment] = useState('');
  const [doctorComments, setDoctorComments] = useState('');
  const [labComments, setLabComments] = useState('');
  const [loading, setLoading] = useState(false);
  const [condition, setCondition] = useState('');
  const [disableBtn, setDisableBtn] = useState(false);


  useEffect(() => {
    setDoctorComments(orderEdit.doctorComments);
    setLabComments(orderEdit.labComments? orderEdit.labComments : '')
    setCondition(orderEdit.statusId)
  }, [orderEdit]);

  useEffect(()=>{
    setValProgres(0)
  },[isOpenOrder])

  const inpRef = useRef();
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });

  useEffect(() => {
    axios
      .get(`${mainDomain}/api/BasicInfo/MedicalDocument/GetList`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setFileType(res.data);
      })
      .catch((err) => {});
  }, []);

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

  const changTypeFileHandler = (e) => {
    setFileVal(e.target.value);
    fileType.map((t) => {
      if (t.itemId === e.target.value) {
        setAddressType(t.description);
      }
      return true
    });
  };
  useEffect(() => {
    if (valProgres > 99) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [valProgres]);

  const uploadDocumentHandler = (e) => {
    const fileData = new FormData();
    fileData.append('file', e.target.files[0]);
    if (
      (e.target.files[0].type.includes('image') && fileVal === 4) ||
      (e.target.files[0].type.includes('video') && fileVal === 5) ||
      (e.target.files[0].type.includes('pdf') && fileVal === 7) ||
      (e.target.files[0].type.includes('audio') && fileVal === 6)
    ) {
      setDisableBtn(true)
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
          setDataAttachment(res.data);
          setLoading(false);
          setDisableBtn(false)
          Toast.fire({
            icon: 'success',
            text: 'فایل با موفقیت ارسال شد',
          });
          //   const data = {
          //     appointmentId: apointmentId,
          //     typeId: 6,
          //     medicalItemId: fileVal,
          //     attachment: res.data,
          //     description: desc,
          //   };
          //   setIsLoading(true);
          //   axios
          //     .post(mainDomain + '/api/MedicalRecord/Add', data, {
          //       headers: {
          //         Authorization: 'Bearer ' + localStorage.getItem('token'),
          //       },
          //     })
          //     .then((res) => {
          //       setValProgres(0);
          //       Toast.fire({
          //         icon: 'success',
          //         text: 'فایل با موفقیت آپلود شد',
          //       });
          //       setIsLoading(false);
          //     //   setFlagUpload(!flagUpload);
          //     })
          //     .catch((err) => {
          //       setIsLoading(false);
          //       setValProgres(0);
          //       Toast.fire({
          //         icon: 'error',
          //         text: err.response.data ? err.response.data : 'خطای شبکه',
          //       });
          //     });
        })
        .catch((err) => {
          setDisableBtn(false)
          setLoading(false);
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

  const editOrderHandler = () => {
    setIsLoading(true);
    const data = {
      orderId: orderEdit.orderId,
      statusId: condition,
      result: dataAttachment,
      doctorComments,
      labComments,
    };
    axios
      .post(`${mainDomain}/api/MedicalRecord/Order/Update`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setIsOpenOrder(false);
        setFlag((e)=>!e)
        Toast.fire({
          icon: 'success',
          text: 'اردر با موفقیت ویرایش شد',
        });
      })
      .catch((err) => {
        setIsLoading(false);
        Toast.fire({
          icon: 'error',
          text: err.response.data ? err.response.data : 'خطای شبکه',
        });
      });
  };
  return (
    <>
      <div
        style={{ zIndex: '1300', transform: isOpenOrder ? 'translateX(0)' : 'translateX(-100%)' }}
        className="fixed top-0 bottom-0 lg:right-2/3 sm:right-1/2 right-0 left-0 bg-slate-50 duration-500 p-5 shadow-lg overflow-y-auto"
      >
        <div className="lg:w-full w-1/2 mt-6 text-start">
          <TextField
            className="w-full text-end"
            id="outlined-multiline-flexible"
            label="توضیحات پزشک"
            multiline
            dir="rtl"
            onChange={(e) => setDoctorComments(e.target.value)}
            value={doctorComments}
            minRows={4}
          />
        </div>
        <div className="flex justify-start mt-5 items-center flex-wrap">
          <FormControl color="primary" className="w-36">
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
          <input className="opacity-0 invisible absolute " ref={inpRef} type="file" onChange={uploadDocumentHandler} />

          <div className="pr-2">
            <Button
            disabled={disableBtn}
            sx={{
              py: 1,
              color:'white',
              fontSize: 16,
              backgroundColor: disableBtn? '#0bb8' : 'rgb(6 182 212)',
              '&:hover': {
                backgroundColor: 'rgb(8 145 178)',
              },
            }}
              onClick={selectFileHandler}
              // className="p-3 flex justify-center items-center bg-slate-100 hover:bg-slate-300 duration-300 rounded-full"
            >
              <span className="px-2">ارسال فایل</span>
              <MdDriveFolderUpload className="text-3xl" />
            </Button>
          </div>
          <ProgressBarUpload valProgres={valProgres} />
        </div>
        <div className="lg:w-full w-1/2 mt-6 text-start">
          <TextField
            className="w-full text-end"
            id="outlined-multiline-flexible"
            label="توضیحات اردر"
            multiline
            dir="rtl"
            onChange={(e) => setLabComments(e.target.value)}
            value={labComments}
            minRows={4}
          />
        </div>
        <div className='mt-5 text-start'>
        <FormControl color="primary" className="w-36">
            <InputLabel color="primary" className="px-2" id="demo-simple-select-label">
               انتخاب وضعیت
            </InputLabel>
            <Select
              onChange={(e)=> setCondition(e.target.value)}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="انتخاب وضعیت"
              color="primary"
              value={condition}
            >
                <MenuItem value={1}>
                  Pending
                </MenuItem>
                <MenuItem value={2}>
                  Doing
                </MenuItem>
                <MenuItem value={3}>
                  Done
                </MenuItem>
                <MenuItem value={4}>
                  Cancel
                </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="mt-3 text-start">
          <button
            onClick={editOrderHandler}
            className="px-5 py-2 rounded-md bg-green-500 text-white duration-300 hover:bg-green-600"
          >
            ثبت
          </button>
        </div>
        {loading && <SimpleBackdrop />}
      </div>
      <Paper
      sx={{backgroundColor: '#0009'}}
        onClick={() => setIsOpenOrder(false)}
        style={{ display: isOpenOrder ? 'block' : 'none', zIndex: '1299' }}
        className="fixed top-0 bottom-0 left-0 right-0"
      />
    </>
  );
}

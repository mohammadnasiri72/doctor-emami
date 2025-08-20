import { Autocomplete, Button, Stack, TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { mainDomain } from '../../utils/mainDomain';
import SimpleBackdrop from '../backdrop';

export default function ProblemPatient({
  setPageNumber,
  valDoctor,
  service,
  setApointmentId,
  flagUpload,
  setFlagUpload,
  account,
  titleServices,
  priceServices,
  nameDoctor,
  setFlagNotif,
}) {
  const [problemList, setProblemList] = useState([]);
  const [desc, setDesc] = useState('');
  const [valProblem, setValProblem] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  

  
  const redirectWithToken = (token, targetUrl) => {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = targetUrl;
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'token';
    input.value = token;
    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();
  };

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
      .get(`${mainDomain}/api/BasicInfo/PatientComplaints/GetList`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setProblemList(res.data);
      })
      .catch((err) => {});
  }, []);
  const goToNext = () => {
    if (desc.length === 0 && valProblem.length === 0) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا مشخصات خواسته شده را وارد کنید',
      });
    } else {
      Swal.fire({
        title: 'ثبت درخواست',
        text: `آیا درخواست شما برای ${titleServices} با هزینه ${priceServices} تومان برای ${nameDoctor} ثبت شود؟`,
        showCancelButton: true,
        // showDenyButton: true,
        // denyButtonText: `بعدا پرداخت می‌کنم`,
        confirmButtonColor: 'green',
        cancelButtonColor: '#d33',
        // denyButtonColor: '#333',
        cancelButtonText: 'انصراف',
        confirmButtonText: 'تایید و پرداخت',
      }).then((result) => {
        if (result.isConfirmed) {
          setIsLoading(true);
          const data = {
            patientUserId: account.userId,
            doctorId: valDoctor.doctorId,
            notes: desc,
            serviceList: [
              {
                appointmentId: 0,
                medicalServiceId: service.medicalServiceId,
                number: 1,
              },
            ],
            complaints,
            payment: false,
          };
          axios
            .post(`${mainDomain}/api/AppointmentCounseling/Add`, data, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            })
            .then((res) => {
              setIsLoading(false);
              setApointmentId(res.data);
              axios
              .get(`${mainDomain}/api/Ipg/Pay`, {
                params: {
                  appointmentId: res.data,
                  bank: '',
                },
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
              })
              .then((res) => {
                setIsLoading(false);
                
                redirectWithToken(res.data.form[0].value , res.data.url)
              })
              .catch((err) => {
                setIsLoading(false);
                Toast.fire({
                  icon: 'error',
                  text: err.response.data,
                });
              });
             
            })
            .catch((err) => {
              setIsLoading(false);
              Toast.fire({
                icon: 'error',
                text: err.response.data,
              });
            });










         
        } 
        // else if (result.isDenied) {
        //   setIsLoading(true);

        //   const data = {
        //     patientUserId: account.userId,
        //     doctorId: valDoctor.doctorId,
        //     notes: desc,
        //     serviceList: [
        //       {
        //         appointmentId: 0,
        //         medicalServiceId: service.medicalServiceId,
        //         number: 1,
        //       },
        //     ],
        //     complaints,
        //     payment: false,
        //   };
        //   axios
        //     .post(`${mainDomain}/api/AppointmentCounseling/Add`, data, {
        //       headers: {
        //         Authorization: `Bearer ${localStorage.getItem('token')}`,
        //       },
        //     })
        //     .then((res) => {
        //       setIsLoading(false);
        //       setApointmentId(res.data);
        //       navigate('/dashboard/counseling');
        //       setPageNumber(0);
        //       setFlagUpload(!flagUpload);
        //       setFlagNotif((e) => !e);
        //       Toast.fire({
        //         icon: 'success',
        //         text: 'درخواست شما با موفقیت ثبت شد',
        //       });
        //     })
        //     .catch((err) => {
        //       setIsLoading(false);
        //       Toast.fire({
        //         icon: 'error',
        //         text: err.response.data,
        //       });
        //     });
        // }
      });
    }
  };
  const changProblem = (event, newValue) => {
    setValProblem(newValue);
    if (newValue.length > 0) {
      const arr = [];
      newValue.map((e) => {
        const complaintsChild = {
          appointmentId: 0,
          typeId: 2,
          medicalItemId: e.itemId,
        };
        arr.push(complaintsChild);
        return true;
      });
      setComplaints(arr);
    }
  };
  return (
    <>
      <div className="lg:w-1/2 sm:w-3/4 w-full mx-auto">
        <h2 className="text-start mb-5 text-xl">لطفا مشکل خود را وارد کنید</h2>
        <div className="px-4 w-full" dir="rtl">
          <Stack spacing={3}>
            <Autocomplete
              value={valProblem}
              onChange={(event, newValue) => {
                changProblem(event, newValue);
              }}
              multiple
              id="tags-outlined"
              options={problemList}
              getOptionLabel={(option) => option.name}
              filterSelectedOptions
              renderInput={(params) => <TextField {...params} label="مشکلات بیمار" placeholder="انتخاب عارضه" />}
            />
          </Stack>
        </div>
        <div className="mt-5 px-5">
          <TextField
            onChange={(e) => setDesc(e.target.value)}
            className="w-full"
            id="outlined-multiline-flexible"
            label="توضیحات"
            multiline
            minRows={3}
            value={desc}
            maxRows={8}
          />
        </div>
        <div className="flex justify-between mt-5 px-4">
          {/* <button
            onClick={() => setPageNumber(2)}
            className="px-5 py-2 rounded-md bg-red-500 text-white duration-300 hover:bg-red-600"
          >
            برگشت به صفحه قبل
          </button> */}
          <Button
            sx={{
              py: 1,
              boxShadow: 'none',
              // fontSize: 20,
              backgroundColor: 'rgb(6 182 212)',
              '&:hover': {
                backgroundColor: 'rgb(8 145 178)',
              },
            }}
            className="p-2 rounded-md duration-300 whitespace-nowrap text-white"
            onClick={() => setPageNumber(2)}
            variant="contained"
          >
            برگشت به صفحه قبل
          </Button>
          {/* <button
            onClick={goToNext}
            className="px-5 py-2 rounded-md bg-green-500 text-white duration-300 hover:bg-green-600"
          >
             ثبت درخواست
          </button> */}
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
            className="p-2 rounded-md duration-300 whitespace-nowrap text-white"
            onClick={goToNext}
            variant="contained"
          >
            ثبت درخواست
          </Button>
        </div>
      </div>
      {isLoading && <SimpleBackdrop />}
    </>
  );
}

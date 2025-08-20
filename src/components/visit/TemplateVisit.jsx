import { Button, IconButton, Tooltip } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { FaTrashCan } from 'react-icons/fa6';
import { mainDomain } from '../../utils/mainDomain';

export default function TemplateVisit({ patSelected, setFlag, setIsLoading, setTemplateId , flag}) {
  const [templateList, setTemplateList] = useState([]);
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${mainDomain}/api/PrescriptionTemplate/GetList`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setTemplateList(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, [flag]);
  const setTemplateHandler = (e) => {
    setIsLoading(true);
    const data = {
      appointmentId: patSelected.appointmentId,
      templateId: e.templateId,
    };
    axios
      .post(`${mainDomain}/api/Prescription/AddFromTemplate`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setFlag((ev) => !ev);
        setIsLoading(false);
        setTemplateId(e.templateId);
        Toast.fire({
          icon: 'success',
          text: 'تمپلیت با موفقیت افزوده شد',
        });
      })
      .catch((err) => {
        setIsLoading(false);
        Toast.fire({
          icon: 'error',
          text: err.response ? err.response.data : 'خطای شبکه',
        });
      });
  };
  const deleteTemplateHandler = (e)=>{
    Swal.fire({
      title: "",
      text: 'آیا از ثبت درخواست خود مطمئن هستید؟',
      
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: 'green',
      cancelButtonText: 'انصراف',
      confirmButtonText: 'حذف تمپلیت',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true)
        const dataDelete = new FormData();
    dataDelete.append('templateId', e.templateId);
        axios
        .post(`${mainDomain}/api/PrescriptionTemplate/Delete` , dataDelete , {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res)=>{
          setIsLoading(false)
          setFlag((e)=>!e)
          Toast.fire({
            icon: 'success',
            text: 'تمپلیت با موفقیت حذف شد',
          });
        })
        .catch((err)=>{
          setIsLoading(false)
          Toast.fire({
            icon: 'error',
            text: err.response ? err.response.data : 'خطای شبکه',
          });
        })
      }
    });
  }
  return (
    <>
      {templateList.map((e) => (
        <div
          key={e.templateId}
          className="w-full border rounded-md shadow-md p-3 text-start mt-2 flex flex-wrap justify-between items-center"
        >
          <div>
            <h5 className="font-semibold">{e.name}</h5>
            <p className="text-sm mt-1">{e.description}</p>
          </div>
          <div className="flex items-center">
            <div className="px-1">
              <Button
               sx={{
                py: 1,
                boxShadow: 'none',
                // fontSize: 20,
                backgroundColor: 'rgb(20 184 166)',
                '&:hover': {
                  backgroundColor: 'rgb(13 148 136)',
                },
              }}
                onClick={() => setTemplateHandler(e)}
                className="text-white bg-green-500 rounded-md hover:bg-green-600 px-5 py-2 duration-300"
              >
                تجویز
              </Button>
            </div>
            <Tooltip title="حذف تمپلیت">
              <IconButton onClick={()=> deleteTemplateHandler(e)}>
                <FaTrashCan className="cursor-pointer text-red-500" />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      ))}
    </>
  );
}

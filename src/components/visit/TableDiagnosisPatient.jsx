import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { mainDomain } from '../../utils/mainDomain';

export default function TableDiagnosisPatient({ medicalRecord, setIsLoading, setFlag, alignment }) {
  const [typeId , settypeId] = useState('')
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });
  const deleteProblemHandler = (e) => {
    Swal.fire({
      title: 'حذف آیتم',
      text: 'آیا از حذف درخواست خود مطمئن هستید؟',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: 'green',
      cancelButtonText: 'انصراف',
      confirmButtonText: 'حذف ',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        const dataDelete = {
          appointmentId: e.appointmentId,
          medicalRecordId: e.id,
        };
        axios
          .post(`${mainDomain}/api/MedicalRecord/Delete`, dataDelete, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
          .then((res) => {
            Toast.fire({
              icon: 'success',
              text: 'درخواست با موفقیت حذف شد',
            });
            setIsLoading(false);
            setFlag((e) => !e);
          })
          .catch((err) => {
            setIsLoading(false);
            Toast.fire({
              icon: 'error',
              text: err.response ? err.response.data : 'خطای شبکه',
            });
          });
      }
    });
  };
  useEffect(()=>{
    if (alignment === 'Problem') {
      settypeId(2)
    }else if (alignment === 'Diagnosis') {
      settypeId(3) 
    }else{
      settypeId(4)
    }
  },[alignment])

  return (
    <>
      <div className="mt-3 sm:block hidden">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="sticky table">
            <TableHead className="">
              <TableRow>
                <TableCell>ردیف</TableCell>
                <TableCell align="center">عنوان</TableCell>
                <TableCell align="center">توضیحات</TableCell>
                <TableCell align="center">عملیات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {medicalRecord
                .filter((e) => e.typeId === typeId)
                .map((e, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <span className="pr-3 font-semibold">{i + 1}</span>
                    </TableCell>
                    <TableCell align="center">{e.medicalItemName}</TableCell>
                    <TableCell align="center">{e.description}</TableCell>
                    <TableCell align="center">
                      <div className="flex justify-center">
                        <Tooltip title="حذف" placement="left">
                          <IconButton onClick={() => deleteProblemHandler(e)}>
                            <FaTrashAlt className="cursor-pointer text-red-500" />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className='sm:hidden block mt-3'>
      {medicalRecord
                .filter((e) => e.typeId === typeId)
                .map((e , i)=>(
                  <div key={i} className='py-1'>
                    <div  className='flex justify-between items-center border w-full rounded-lg p-2'>
                    <div className='flex flex-col '>
                      <p className='text-start font-semibold'>عنوان : {e.medicalItemName}</p>
                      <p className='text-start '>توضیحات : {e.description}</p>
                    </div>
                    <div>
                    <FaTrashAlt className="cursor-pointer text-red-500" />
                    </div>
                  </div>
                  </div>
                ))
      }
      </div>
    </>
  );
}

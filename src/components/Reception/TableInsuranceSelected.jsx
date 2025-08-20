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
import Swal from 'sweetalert2';
import { GoTrash } from 'react-icons/go';
import { mainDomain } from '../../utils/mainDomain';

export default function TableInsuranceSelected({
  insuranceListSelected,
  setIsLoading,
  setInsuranceListSelected,
  setFlag,
  setValInsurance,
}) {

  // import sweet alert-2
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });

  
  const deleteInsuranceHandler = (e) => {
    
    Swal.fire({
      title: 'حذف بیمه',
      text: 'آیا از حذف بیمه مطمئن هستید؟',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: 'green',
      cancelButtonText: 'انصراف',
      confirmButtonText: 'حذف',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true)
        const data = new FormData();
        data.append('insuranceId', e.insuranceId);
        axios.post(`${mainDomain}/api/Insurance/Delete` , data , {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res)=>{
          setIsLoading(false)
          setFlag((e)=>!e)
          setInsuranceListSelected(insuranceListSelected.filter((ev)=>ev.insuranceId !==e.insuranceId));
          setValInsurance(insuranceListSelected.filter((ev)=>ev.insuranceId !==e.insuranceId));
          
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
  };
  return (
    <>
      {insuranceListSelected.length === 0 && <p className="border rounded-md py-5">بیمه ای وارد نشده است</p>}
      {insuranceListSelected.length !== 0 && (
        <div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="sticky table">
              <TableHead className="">
                <TableRow>
                  <TableCell>ردیف</TableCell>
                  <TableCell align="center">نام بیمه</TableCell>
                  <TableCell align="center">نوع پوشش</TableCell>
                  <TableCell align="center">درصد پوشش</TableCell>
                  <TableCell align="center">تاریخ شروع</TableCell>
                  <TableCell align="center">تاریخ اتمام</TableCell>
                  <TableCell align="center">عملیات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {insuranceListSelected.map((e, i) => (
                  <TableRow key={e.insuranceCompanyId}>
                    <TableCell>
                      <span className="pr-3 font-semibold">{i + 1}</span>
                    </TableCell>
                    <TableCell align="center">{e.insuranceCompanyName}</TableCell>
                    <TableCell align="center">{e.coverageType}</TableCell>
                    <TableCell align="center">{e.coverageAmount}%</TableCell>
                    <TableCell align="center">{e.startDateFa}</TableCell>
                    <TableCell align="center">{e.endDateFa}</TableCell>
                    <TableCell align="center">
                      <div className="flex justify-center">
                        <Tooltip title="حذف بیمه">
                          <IconButton onClick={() => deleteInsuranceHandler(e)}>
                            <GoTrash className="text-red-500 cursor-pointer" />
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
      )}
    </>
  );
}

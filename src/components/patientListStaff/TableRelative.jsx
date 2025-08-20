import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { mainDomain } from '../../utils/mainDomain';
import SimpleBackdrop from '../backdrop';
import OperationMenu from './OperationMenu';

export default function TableRelative({ PatientRelative }) {
  const [patientList, setPatientList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [flag, setFlag] = useState(false);

  //   useEffect(() => {
  //     axios
  //       .get(mainDomain + '/api/Patient/GetList', {
  //         headers: {
  //           Authorization: 'Bearer ' + localStorage.getItem('token'),
  //         },
  //       })
  //       .then((res) => {
  //         setPatientList(res.data);
  //       })
  //       .catch((err) => {});
  //   }, [flag]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ردیف</TableCell>
              <TableCell className="whitespace-nowrap">نام و نام خانوادگی</TableCell>
              <TableCell align="center">نسبت</TableCell>
              <TableCell align="center">موبایل</TableCell>
              {/* <TableCell align="center">جزئیات</TableCell> */}
              <TableCell align="center">عملیات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {PatientRelative.map((rel, index) => (
              <TableRow key={rel.patientRelativeId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>
                  <span className="pr-2 font-semibold">{index + 1}</span>
                </TableCell>
                <TableCell component="th" scope="rel">
                  {rel.fullName}
                </TableCell>
                <TableCell align="center">{rel.relative}</TableCell>
                <TableCell align="center">{rel.mobileNumber}</TableCell>
                <TableCell align="center">del</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {isLoading && <SimpleBackdrop />}
    </>
  );
}

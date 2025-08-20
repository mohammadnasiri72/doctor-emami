import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { LuRefreshCcw } from 'react-icons/lu';
import { mainDomain } from '../../utils/mainDomain';

export default function MainPageManagReserve() {
  const [listCode, setListCode] = useState([]);
  const [flag, setFlag] = useState(false);

  // get logs otp
  useEffect(() => {
    setListCode([]);
    axios
      .get(`${mainDomain}/api/Logs/Otp`, {
        params: {
          pageSize: 20,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setListCode(res.data);
      })
      .catch((err) => {});
  }, [flag]);

  return (
    <>
      <div className="flex p-3">
        <Button
          onClick={() => {
            setFlag((e) => !e);
          }}
          sx={{
            py: 1,
            backgroundColor: 'rgb(16 185 129)',
            '&:hover': {
              backgroundColor: 'rgb(5 150 105)',
            },
            color: 'white',
          }}
        >
          <LuRefreshCcw />
        </Button>
      </div>
      {listCode.length > 0 && (
        <div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="sticky table">
              <TableHead className="">
                <TableRow>
                  <TableCell align="start">ردیف</TableCell>
                  <TableCell align="center">شماره موبایل</TableCell>
                  <TableCell align="center">کد ارسالی</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listCode.map((code, i) => (
                  <TableRow key={code.id}>
                    <TableCell>
                      <span className="pr-2 font-semibold">{i + 1}</span>
                    </TableCell>
                    <TableCell align="center">{code.receiver}</TableCell>
                    <TableCell align="center">{code.code}</TableCell>
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

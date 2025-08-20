import { Button, Paper, Table, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import axios from 'axios';
import useSettings from '../../hooks/useSettings';
import { mainDomain } from '../../utils/mainDomain';
import TablePatient from '../patientList/TablePatient';

export default function InformationPatient({
  infoPat,
  setIsLoading,
  isLoading,
  listReception,
  setReceptionSelected,
  setPageStateVisit,
  setAccount,
  setIsShowDocPatient,
}) {
  const { themeColorPresets } = useSettings();

  const showDetailsHandler = (e) => {
    setReceptionSelected(e);
    setPageStateVisit(3);
    axios
      .get(`${mainDomain}/api/Patient/GetList`, {
        params: {
          query: e.patientNationalId,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => [setAccount(res.data[0])])
      .catch((err) => {});
  };
  return (
    <>
      <div className="flex flex-wrap">
        <div className="lg:w-1/6 w-full">
          <img className="w-20 h-20 rounded-full border" src={mainDomain + infoPat.avatar} alt="" />
        </div>
        <div className="lg:w-5/12 w-full">
          <div className=" text-start mt-3" dir="rtl">
            <TextField
              disabled
              className="lg:w-2/3 sm:w-3/4 w-full text-end"
              id="outlined-multiline-flexible"
              label="نام و نام خانوادگی بیمار"
              multiline
              dir="rtl"
              value={infoPat.firstName ? `${infoPat.firstName} ${infoPat.lastName}` : '_____'}
              maxRows={4}
            />
          </div>
          <div className=" text-start mt-3" dir="rtl">
            <TextField
              disabled
              className="lg:w-2/3 sm:w-3/4 w-full text-end"
              id="outlined-multiline-flexible"
              label="کد ملی بیمار"
              multiline
              dir="rtl"
              value={infoPat.nationalId ? infoPat.nationalId : '_____'}
              maxRows={4}
            />
          </div>
          <div className=" text-start mt-3" dir="rtl">
            <TextField
              disabled
              className="lg:w-2/3 sm:w-3/4 w-full text-end"
              id="outlined-multiline-flexible"
              label="نام پدر"
              multiline
              dir="rtl"
              value={infoPat.fatherName ? infoPat.fatherName : '_____'}
              maxRows={4}
            />
          </div>
          <div className=" text-start mt-3" dir="rtl">
            <TextField
              disabled
              className="lg:w-2/3 sm:w-3/4 w-full text-end"
              id="outlined-multiline-flexible"
              label="شماره موبایل"
              multiline
              dir="rtl"
              value={infoPat.userPhoneNumber ? infoPat.userPhoneNumber : '_____'}
              maxRows={4}
            />
          </div>
        </div>
        <div className="lg:w-5/12 w-full">
          <div className="flex lg:w-2/3 sm:w-3/4 w-full">
            <div className=" text-start mt-3 w-1/2 pl-1" dir="rtl">
              <TextField
                disabled
                className="w-full text-end "
                id="outlined-multiline-flexible"
                label="تاریخ تولد"
                multiline
                dir="rtl"
                value={infoPat.dateOfBirthFa ? infoPat.dateOfBirthFa : '_____'}
                maxRows={4}
              />
            </div>
            <div className=" text-start mt-3 w-1/2 pr-1" dir="rtl">
              <TextField
                disabled
                className="w-full text-end"
                id="outlined-multiline-flexible"
                label="سن"
                multiline
                dir="rtl"
                value={infoPat.age ? infoPat.age : '_____'}
                maxRows={4}
              />
            </div>
          </div>
          <div className=" text-start mt-3" dir="rtl">
            <TextField
              disabled
              className="lg:w-2/3 sm:w-3/4 w-full text-end"
              id="outlined-multiline-flexible"
              label="استان و شهر محل سکونت"
              multiline
              dir="rtl"
              value={infoPat.province ? `${infoPat.province} / ${infoPat.city}` : '_____'}
              maxRows={4}
            />
          </div>
          <div className=" text-start mt-3" dir="rtl">
            <TextField
              disabled
              className="lg:w-2/3 sm:w-3/4 w-full text-end"
              id="outlined-multiline-flexible"
              label="آدرس"
              multiline
              dir="rtl"
              value={infoPat.address ? infoPat.address : '_____'}
              minRows={4}
            />
          </div>
        </div>
      </div>
      {listReception && listReception.filter((e) => e.statusId === 4).length > 0 && (
        <div>
          <h3 className="text-start p-3 text-teal-500 ">تاریخچه ویزیت های بیمار</h3>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650, position: 'relative' }} aria-label="sticky table">
              <TableHead
                sx={{
                  '& th': {
                    backgroundColor: themeColorPresets !== 'default' ? themeColorPresets : '#00ab55',
                  },
                }}
              >
                <TableRow>
                  <TableCell sx={{ color: 'white' }} align="center">
                    تاریخ
                  </TableCell>
                  <TableCell sx={{ color: 'white' }} align="center">
                    عملیات
                  </TableCell>
                  <TableCell sx={{ color: 'white' }} align="center">
                    مدارک پزشکی
                  </TableCell>
                </TableRow>
              </TableHead>

              {listReception
                .filter((e) => e.statusId === 4)
                .sort((a, b) => Number(b.appointmentDateFA.slice(8, 10)) - Number(a.appointmentDateFA.slice(8, 10)))
                .map((e) => (
                  <TableRow key={e.appointmentId}>
                    <TableCell align="center">{e.appointmentDateFA}</TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={() => showDetailsHandler(e)}
                        variant="contained"
                        color="primary"
                        className="text-white px-0"
                      >
                        جزئیات
                      </Button>
                    </TableCell>

                    <TableCell align="center">
                      <Button
                        onClick={(ev) => {
                          setIsShowDocPatient(true);
                        }}
                        variant="contained"
                        color="info"
                        className="text-white px-0"
                      >
                        مدارک
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </Table>
          </TableContainer>
        </div>
      )}

      <div className="w-full mx-auto">
        <TablePatient infoPat={infoPat} setIsLoading={setIsLoading} isLoading={isLoading} />
      </div>
    </>
  );
}

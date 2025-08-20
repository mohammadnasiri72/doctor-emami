import { Button, IconButton, Skeleton, TextField, Tooltip } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { LuPanelTop } from 'react-icons/lu';
import { FaRegTrashCan } from 'react-icons/fa6';
import { BsCapsulePill } from 'react-icons/bs';
import { GiMatterStates } from 'react-icons/gi';
import { PiNotepadDuotone } from 'react-icons/pi';
import { IoToday } from 'react-icons/io5';
import { MdDoNotDisturbOn } from 'react-icons/md';
import Swal from 'sweetalert2';
import { mainDomain } from '../../utils/mainDomain';
import Iconify from '../Iconify';
import AddPatientPopUp from './AddPatientPopUp';
import useSettings from '../../hooks/useSettings';

export default function TablePatient({
  isOpenAddPatient,
  infoPat,
  isLoading,
  setIsLoading,
  medicationIdList,
  setMedicationIdList,
}) {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });
  const [listPatient, setListPatient] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [openEditPatient, setOpenEditPatient] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [isPatientActive, setIsPatientActive] = useState('true');
  const [desc, setDesc] = useState('');
  const [valueMedicine, setValueMedicine] = useState([]);
  const [patId, setPatId] = useState('');
  const [flag, setFlag] = useState(false);

  const { themeMode } = useSettings();

  useEffect(() => {
    if (openEditPatient) {
      document.body.style.overflowY = 'hidden';
    } else if (!openEditPatient) {
      document.body.style.overflowY = 'auto';
    }
  }, [openEditPatient]);

  useEffect(() => {
    if (isOpenAddPatient) {
      document.body.style.overflowY = 'hidden';
    } else if (!isOpenAddPatient) {
      document.body.style.overflowY = 'auto';
    }
  }, [isOpenAddPatient]);

  useEffect(() => {
    if (!infoPat) {
      setIsLoading(true);
      axios
        .get(`${mainDomain}/api/PatientHistory/GetList`, {
          params: {
            statusId: -1,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setIsLoading(false);
          setListPatient(res.data);
        })
        .catch((err) => {
          setIsLoading(false);
        });
    } else if (infoPat.nationalId) {
      setIsLoading(true);
      axios
        .get(`${mainDomain}/api/PatientHistory/GetListByPatient`, {
          params: {
            statusId: -1,
            nationalId: infoPat.nationalId,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setIsLoading(false);
          setListPatient(res.data);
        })
        .catch((err) => {
          setIsLoading(false);
        });
    }
  }, [isOpenAddPatient, openEditPatient, infoPat, flag]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${mainDomain}/api/Medication/GetList`, {
        params: {
          categoryId: -1,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setMedicines(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);

  const editPatientHandler = (e) => {
    setOpenEditPatient(!openEditPatient);
    setPatientName(e.title);
    setAge(e.age);
    if (e.statusId === 0) {
      setIsPatientActive('false');
    } else if (e.statusId === 1) {
      setIsPatientActive('true');
    }
    setDesc(e.description);
    const arr = [];
    e.medicationIdList.map((ev) => {
      arr.push(medicines.find((med) => med.medicationId === ev));
      return true;
    });
    setMedicationIdList(e.medicationIdList);
    setValueMedicine(arr);
    setPatId(e.patientHistoryId);
  };

  const deletePatientHandler = (e) => {
    Swal.fire({
      title: '',
      text: 'آیا از حذف بیماری مطمئن هستید؟',
      customClass: themeMode === 'light' ? 'bg-[#fff]' : 'bg-[#161c24]',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: 'green',
      cancelButtonText: 'انصراف',
      confirmButtonText: 'حذف بیماری',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        const dataDelete = new FormData();
        dataDelete.append('patientHistoryId', e.patientHistoryId);
        axios
          .post(`${mainDomain}/api/PatientHistory/Delete`, dataDelete, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
          .then((res) => {
            setIsLoading(false);
            setFlag((e) => !e);
            Toast.fire({
              icon: 'success',
              text: 'بیماری با موفقیت حذف شد',
            });
          })
          .catch((err) => {
            setIsLoading(false);
          });
      }
    });
  };

  return (
    <>
      <div>
        {infoPat && <h3 className="my-3 font-semibold">لیست بیماری های بیمار</h3>}
        {listPatient.length > 0 && (
          <div className="md:block hidden">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="sticky table">
                <TableHead className="">
                  <TableRow>
                    <TableCell>عنوان بیماری</TableCell>
                    <TableCell align="center">سن ابتلا</TableCell>
                    <TableCell align="center">وضعیت بیماری</TableCell>
                    <TableCell align="center">داروهای مورد استفاده</TableCell>
                    <TableCell align="center">توضیحات</TableCell>
                    <TableCell align="center">عملیات</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow className="h-3" />
                  {listPatient.map((pat) => (
                    <TableRow
                      key={pat.patientHistoryId}
                      sx={{
                        borderBottom: 'dotted #0001',
                        borderBottomWidth: '2px',
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {pat.title}
                      </TableCell>
                      <TableCell align="center">{pat.age}</TableCell>
                      <TableCell align="center">{pat.statusId === 0 ? 'بهبود یافته' : 'درگیر'}</TableCell>
                      <TableCell align="center">
                        <div>
                          {pat.medicationIdList.map((e, i) => (
                            <p
                              style={{ backgroundColor: themeMode === 'light' ? 'rgb(226 232 240)' : '#161c24' }}
                              className="mt-1 p-1 rounded-3xl"
                              key={i}
                            >
                              {medicines.length > 0 && medicines.find((ev) => ev.medicationId === e).name}
                            </p>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell align="center">{pat.description}</TableCell>
                      <TableCell align="center">
                        {!infoPat && (
                          <div className="flex justify-around">
                            <Tooltip title="ویرایش">
                              <IconButton onClick={() => editPatientHandler(pat)}>
                                <Iconify icon={'eva:edit-fill'} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="حذف">
                              <IconButton onClick={() => deletePatientHandler(pat)}>
                                <Iconify className="text-red-500" icon={'eva:trash-2-outline'} />
                              </IconButton>
                            </Tooltip>
                          </div>
                        )}
                        {infoPat && (
                          <div className="flex justify-center">
                            <MdDoNotDisturbOn className="text-2xl" />
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
        {listPatient.length === 0 && !isLoading && (
          <div>
            <div className="flex justify-center">
              <svg width="136" height="136" viewBox="0 0 136 136" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M30.6374 52.3822L68.898 61.5235L54.503 76.3781L17 64.1897L30.6374 52.3822Z" fill="#EDF2F6" />
                <path d="M30.9514 66.6124L69.1774 62.1481V111.535L30.9514 101.211V66.6124Z" fill="#EDF2F6" />
                <path d="M70.8514 43.1746H68.8982V61.59L106.566 52.6613L70.8514 43.1746Z" fill="#EDF2F6" />
                <path
                  d="M69.095 42.9374L83.7333 28.6528C83.9029 28.4873 84.1463 28.422 84.3758 28.4804L118.607 37.1843C119.098 37.3093 119.285 37.909 118.951 38.2909L106.467 52.5751M69.095 42.9374L54.8371 28.6626C54.6663 28.4916 54.4175 28.4241 54.1837 28.4853L18.8318 37.7422C18.3398 37.871 18.1582 38.4745 18.4973 38.8535L30.7787 52.5751L17.9253 63.5046C17.5204 63.8489 17.6493 64.5038 18.1545 64.669L54.1612 76.4439C54.4063 76.5241 54.6757 76.4587 54.8568 76.2751L69.095 61.8348M69.095 42.9374L106.467 52.5751M69.095 42.9374L30.59 52.5751L69.095 61.8348M69.095 61.8348L83.7032 76.2752C83.8885 76.4584 84.1623 76.5196 84.408 76.4327L117.693 64.6603C118.171 64.4913 118.303 63.8776 117.936 63.5275L106.467 52.5751M69.095 61.8348V45.2051M69.095 61.8348L106.467 52.5751M69.095 111.535L106.158 101.279C106.452 101.198 106.656 100.93 106.656 100.624V68.5639M69.095 111.535L31.4687 101.278C31.1728 101.197 30.9675 100.929 30.9675 100.622V68.8591M69.095 111.535V67.1261M84.95 50.3074L89.4225 47.7886C90.4354 47.2182 91.2164 46.311 91.6298 45.2245L92.0199 44.1991C92.3226 43.4036 92.2388 42.5125 91.7931 41.7874L91.6509 41.5561C91.2402 40.8879 90.5121 40.4808 89.7278 40.4808H89.4041C88.1002 40.4808 87.1434 41.7059 87.4593 42.9709V42.9709C87.6544 43.7524 88.2984 44.3412 89.0943 44.4656L92.7837 45.0428C93.4645 45.1493 94.1612 45.0836 94.8101 44.8515V44.8515C95.8667 44.4737 96.7237 43.6819 97.1837 42.6584L98.1625 40.4808"
                  stroke="#4A6C90"
                />
                <path
                  d="M42.6621 42.8955L39.9507 40.5864C39.0975 39.8598 38.824 38.6584 39.2785 37.634L39.4291 37.2944C39.6809 36.7269 40.2016 36.3244 40.8143 36.2237L40.8972 36.2101C41.6161 36.0919 42.3317 36.4387 42.6843 37.0762V37.0762C43.0148 37.6737 42.9613 38.4098 42.548 38.9532L42.1672 39.4539C41.7577 39.9923 41.1619 40.3655 40.4953 40.4806C38.9531 40.7469 37.2142 40.8716 35.6826 39.3613V39.3613C33.8409 37.5451 32.9428 34.8498 33.5862 32.3445C33.6655 32.0357 33.738 31.8151 33.7963 31.7347C34.3561 30.9618 34.8163 30.4838 35.2162 30.1743C36.4058 29.2537 38.3262 29.9127 39.3724 30.9936V30.9936C40.5674 32.2281 40.5445 34.1948 39.3212 35.4012L38.7008 36.013C36.6258 38.2452 32.8531 38.6172 30.9668 35.455C30.798 35.172 30.6441 34.7192 30.5016 34.2156C30.0508 32.6231 30.1733 30.8854 30.7859 29.3478V29.3478C31.5008 27.5532 32.9495 26.1504 34.7662 25.4935L37.569 24.4801"
                  stroke="#4A6C90"
                />
                <path
                  d="M76.1526 29.5025C76.7726 29.567 78.1243 29.7736 78.5708 30.0833C78.8026 30.2442 79.2785 30.6904 79.7694 31.1727C80.5798 31.9689 81.1288 32.9889 81.3942 34.0935V34.0935C81.6172 35.0223 81.6295 35.9892 81.4301 36.9233L80.989 38.9892"
                  stroke="#4A6C90"
                />
                <path
                  d="M54.3884 41.2214V43.3652C54.3884 44.0375 54.5211 44.7033 54.7788 45.3242L55.2405 46.4367C55.7529 47.6712 56.9581 48.4759 58.2947 48.4759V48.4759"
                  stroke="#4A6C90"
                />
                <path
                  d="M126.311 101.721L69.0342 111.437L106.283 101.253C106.508 101.191 106.663 100.987 106.663 100.754V91.0115H122.21C122.419 91.0115 122.607 91.1374 122.687 91.3306L126.702 101.013C126.829 101.32 126.638 101.665 126.311 101.721Z"
                  fill="#4A6C90"
                  stroke="#4A6C90"
                />
                <path
                  d="M44.7 89.5L47.2998 89.963L48.2999 88L49.5499 91.5271L50.2998 90.463L51.5 90.7"
                  stroke="#4A6C90"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M50.5 94L44.7002 93.2133" stroke="#4A6C90" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M47 96.2L44.7002 95.8587" stroke="#4A6C90" strokeLinecap="round" strokeLinejoin="round" />
                <path
                  d="M51 84.8C53 85 54.8 86.3182 54.8 89V96.2488C54.8 98.5042 52.9674 99.9837 50.8972 99.9975C50.8874 99.9975 45.1299 99 45.1299 99C43 98.5 41.15 97.5156 41.15 95.2488V87.7611C41.15 85.5056 43.0319 84.027 45.1021 84.0131"
                  stroke="#4A6C90"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M45.5 82.9304C45.5 82.6215 45.7774 82.3864 46.0822 82.4372L50.0822 83.1039C50.3233 83.1441 50.5 83.3527 50.5 83.5971V85.5695C50.5 85.8785 50.2226 86.1135 49.9178 86.0627L45.9178 85.396C45.6767 85.3559 45.5 85.1473 45.5 84.9028V82.9304Z"
                  stroke="#4A6C90"
                />
              </svg>
            </div>
            <p className="pb-3">لیست بیماری‌ ها خالی است</p>
          </div>
        )}
        {listPatient.length === 0 && isLoading && (
          <div className="w-11/12 mx-auto">
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
          </div>
        )}
        <AddPatientPopUp
          isOpenAddPatient={openEditPatient}
          setIsOpenAddPatient={setOpenEditPatient}
          patientName={patientName}
          setPatientName={setPatientName}
          age={age}
          setAge={setAge}
          isPatientActive={isPatientActive}
          setIsPatientActive={setIsPatientActive}
          medicationIdList={medicationIdList}
          setMedicationIdList={setMedicationIdList}
          desc={desc}
          setDesc={setDesc}
          valueMedicine={valueMedicine}
          setValueMedicine={setValueMedicine}
          patId={patId}
        />
      </div>
      <div className="md:hidden block">
        <div className="flex flex-wrap justify-around pb-2">
          {listPatient.map((pat) => (
            <div
              style={{ backgroundColor: themeMode === 'light' ? 'rgb(248 250 252)' : '#161c24' }}
              key={pat.patientHistoryId}
              className="border rounded-2xl p-3 sm:w-5/12 w-full mt-2"
            >
              <div className="mt-3 w-full mx-auto">
                <div className="flex flex-col">
                  <div className="flex items-center justify-center mb-2">
                    <LuPanelTop />
                    <span className="px-3">عنوان بیماری</span>
                  </div>
                  <div>
                    <span className="font-semibold">{pat.title}</span>
                  </div>
                </div>
              </div>
              <div className="mt-5  w-full mx-auto">
                {/* <TextField
                  aria-readonly
                  className="text-end"
                  id="outlined-multiline-flexible"
                  label="سن ابتلا"
                  dir="rtl"
                  value={pat.age}
                /> */}
                <div className="flex justify-around">
                  <div className="">
                    <div className="flex items-center justify-center mb-2">
                      <IoToday />
                      <span className="px-1">سن ابتلا</span>
                    </div>
                    <div>
                      <span className="font-semibold">{pat.age}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center mb-2">
                      <GiMatterStates />
                      <span className="px-1">وضعیت ابتلا</span>
                    </div>
                    <div>
                      <span className="font-semibold">{pat.statusId === 0 ? 'بهبود یافته' : 'درگیر'}</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="mt-3 w-52 mx-auto">
                <TextField
                  aria-readonly
                  className="text-end"
                  id="outlined-multiline-flexible"
                  label="وضعیت ابتلا"
                  dir="rtl"
                  value={pat.statusId === 0 ? 'بهبود یافته' : 'درگیر'}
                />
              </div> */}
              {pat.medicationIdList.length > 0 && (
                // <div className="w-full mx-auto flex flex-col items-center border mt-3 p-1 rounded-xl ">
                //   <div className="text-start w-full">
                //     <h6 className="">داروهای مورد استفاده</h6>
                //   </div>
                //   {pat.medicationIdList.map((e, i) => (
                //     <p className="mt-1 px-5 bg-slate-200 rounded-3xl" key={i}>
                //       {medicines.length > 0 && medicines.find((ev) => ev.medicationId === e).name}
                //     </p>
                //   ))}
                // </div>
                <div className="mt-3 w-full mx-auto">
                  <div className="flex flex-col">
                    <div className="flex items-center justify-center mb-2">
                      <BsCapsulePill />
                      <span className="px-3">داروهای مورد استفاده</span>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      {pat.medicationIdList.map((e, i) => (
                        <span
                          style={{ backgroundColor: themeMode === 'light' ? 'rgb(226 232 240)' : '#333d49' }}
                          className="mt-1 px-5 bg-slate-200 rounded-3xl"
                          key={i}
                        >
                          {medicines.length > 0 && medicines.find((ev) => ev.medicationId === e).name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {/* <div className="mt-3 w-full mx-auto">
                <TextField
                  aria-readonly
                  className="text-end w-full"
                  id="outlined-multiline-flexible"
                  label="توضیحات"
                  dir="rtl"
                  multiline
                  minRows={2}
                  value={pat.description}
                />
              </div> */}
              <div className="mt-3 w-full mx-auto">
                <div className="flex flex-col">
                  <div className="flex items-center justify-center mb-2">
                    <PiNotepadDuotone />
                    <span className="px-3">توضیحات</span>
                  </div>
                  <div>
                    <span className="font-semibold">{pat.description}</span>
                  </div>
                </div>
              </div>
              {
                !infoPat &&
              <div className="flex justify-center mt-5">
                <Button onClick={() => deletePatientHandler(pat)} className="flex items-center">
                  <FaRegTrashCan className="text-red-500 text-2xl" />
                  <span className="text-red-500 px-1">حذف</span>
                </Button>
                <Button onClick={() => editPatientHandler(pat)} className="flex items-center">
                  <Iconify className="text-teal-500 text-2xl" icon={'eva:edit-fill'} />
                  <span className="text-teal-500 px-1">ویرایش</span>
                </Button>
              </div>
              }
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

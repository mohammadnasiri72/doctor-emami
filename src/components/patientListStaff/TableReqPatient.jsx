import { Pagination, Skeleton, Stack } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Swal from 'sweetalert2';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { TiFlag } from 'react-icons/ti';
import useSettings from '../../hooks/useSettings';
import { mainDomain } from '../../utils/mainDomain';
import SimpleBackdrop from '../backdrop';
import AddRelativePatient from './AddRelativePatient';
import DetailsPatient from './DetailsPatient';
import OperationMenu from './OperationMenu';
import RelativePatient from './RealativePatient';
import SelectStatus from './SelectStatus';
import ShowFileUploaded from './showFileUploaded';

export default function TableReqPatient({
  setPageState,
  setAccountUpdate,
  setIsLoading,
  isLoading,
  patient,
  setPatient,
  setReceptionSelected,
  statusList,
  patientList,
  setPatientList,
  setNumPages,
  totalPages,
  setPatSelected,
  flag,
  historyReception,
  setFlag,
  isLoadingPat,
  currentPage,
  pageSize,
  numPages,
  totalCount,
}) {
  const [PatientRelative, setPatientRelative] = useState([]);
  const [isOpenAccompanying, setIsOpenAccompanying] = useState(false);
  const [isOpenAddRelative, setIsOpenAddRelative] = useState(false);
  
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [editRelative, setEditRelative] = useState({});
  const [showDetailsPatient, setShowDetailsPatient] = useState(false);

  const { themeColorPresets } = useSettings();
 

  

  useEffect(() => {
    if (patient.nationalId && isOpenAccompanying) {
      setLoadingDetail(true);
      axios
        .get(`${mainDomain}/api/PatientRelative/Patient/GetList`, {
          params: {
            nationalId: patient.nationalId,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setPatientRelative(res.data);
          setLoadingDetail(false);
        })
        .catch((err) => {
          setLoadingDetail(false);
        });
    }
  }, [patient, isOpenAccompanying, flag]);

  // get list patient
  // useEffect(() => {
  //   setIsLoading(true);
  //   axios
  //     .get(`${mainDomain}/api/Patient/GetListPaged`, {
  //       params:{
  //         pageIndex: numPages
  //       },
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem('token')}`,
  //       },
  //     })
  //     .then((res) => {
  //       setIsLoading(false);
  //       setPatientList(res.data.items);
  //       setTotalPages(res.data.totalPages)
  //     })
  //     .catch((err) => {
  //       setIsLoading(false);
  //     });
  // }, [flag]);

  return (
    <>
      {
        // patientList
        // .filter(
        //   (ev) =>
        //   (ev.firstName.includes(searchValue) ||
        //       ev.lastName.includes(searchValue) ||
        //       ev.nationalId.includes(searchValue))

        //       &&

        //      ( ev.status === valStatusFilter ||
        //     valStatusFilter === 'همه')
        // ).length > 0 &&
        <div>
          <div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead
                  sx={{
                    '& th': {
                      backgroundColor: themeColorPresets !== 'default' ? themeColorPresets : '#00ab55',
                    },
                  }}
                >
                  <TableRow>
                    <TableCell sx={{ color: 'white' }}>ردیف</TableCell>
                    <TableCell sx={{ color: 'white' }}>نام و نام خانوادگی</TableCell>
                    <TableCell sx={{ color: 'white' }} align="center">
                      نام پدر
                    </TableCell>
                    <TableCell sx={{ color: 'white' }} align="center">
                      کد ملی
                    </TableCell>
                    <TableCell sx={{ color: 'white' }} align="center">
                      سن
                    </TableCell>
                    <TableCell sx={{ color: 'white' }} align="center">
                      جنسیت
                    </TableCell>
                    <TableCell sx={{ color: 'white' }} align="center">
                      موبایل / ایمیل
                    </TableCell>
                    <TableCell sx={{ color: 'white' }} align="center">
                      وضعیت
                    </TableCell>
                    <TableCell sx={{ color: 'white' }} align="center">
                      عملیات
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {patientList.length > 0 &&
                    patientList
                      //  .filter(
                      //   (ev) =>
                      //   (ev.firstName.includes(searchValue) ||
                      //       ev.lastName.includes(searchValue) ||
                      //       ev.nationalId.includes(searchValue))

                      //       &&

                      //      ( ev.status === valStatusFilter ||
                      //     valStatusFilter === 'همه')
                      // )
                      .map((pat, index) => (
                        <TableRow key={pat.patientId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell>
                            <span className="pr-2 font-semibold">{(currentPage - 1) * pageSize + index + 1}</span>
                          </TableCell>
                          <TableCell component="th" scope="pat">
                            <div className="flex items-center relative">
                              {pat.foreignNational && <TiFlag className="text-xl absolute -right-5" />}
                              <div className="px-1">
                                {pat.firstName} {pat.lastName}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell align="center">{pat.fatherName ? pat.fatherName : '_____'}</TableCell>
                          <TableCell align="center">{pat.nationalId}</TableCell>
                          <TableCell align="center">{pat.age}</TableCell>
                          <TableCell align="center">{pat.gender === 'm' ? 'مرد' : 'زن'}</TableCell>
                          <TableCell align="center">{pat.abroad ? pat.userEmail : pat.userPhoneNumber}</TableCell>
                          <TableCell align="center">
                            <SelectStatus pat={pat} setIsLoading={setIsLoading} statusList={statusList} />
                          </TableCell>
                          <TableCell align="center">
                            <OperationMenu
                              setPageState={setPageState}
                              setAccountUpdate={setAccountUpdate}
                              pat={pat}
                              isLoading={isLoading}
                              setIsLoading={setIsLoading}
                              setFlag={setFlag}
                              patient={patient}
                              setPatient={setPatient}
                              setReceptionSelected={setReceptionSelected}
                              PatientRelative={PatientRelative}
                              isOpenAccompanying={isOpenAccompanying}
                              setIsOpenAccompanying={setIsOpenAccompanying}
                              isOpenAddRelative={isOpenAddRelative}
                              setIsOpenAddRelative={setIsOpenAddRelative}
                              historyReception={historyReception}
                              setPatientRelative={setPatientRelative}
                              setPatSelected={setPatSelected}
                              loadingDetail={loadingDetail}
                              showDetailsPatient={showDetailsPatient}
                              setShowDetailsPatient={setShowDetailsPatient}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
              {patientList.length === 0 && isLoadingPat && (
                <div className="w-full">
                  <Skeleton animation="wave" />
                  <Skeleton animation="wave" />
                  <Skeleton animation="wave" />
                </div>
              )}
            </TableContainer>
            {patientList.length === 0 && !isLoadingPat && (
              <div>
                <div className="flex justify-center">
                  <svg width="136" height="136" viewBox="0 0 136 136" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M30.6374 52.3822L68.898 61.5235L54.503 76.3781L17 64.1897L30.6374 52.3822Z"
                      fill="#EDF2F6"
                    />
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
                <p>بیماری یافت نشد</p>
              </div>
            )}

            <div className="flex justify-center items-center mt-2">
              <Stack spacing={2}>
                <Pagination page={numPages} onChange={(e, value) => setNumPages(value)} count={totalPages} />
              </Stack>
              <span>{totalCount} رکورد</span>
            </div>
          </div>
        </div>
      }
      <RelativePatient
        isOpenAccompanying={isOpenAccompanying}
        PatientRelative={PatientRelative}
        setIsOpenAddRelative={setIsOpenAddRelative}
        setIsOpenAccompanying={setIsOpenAccompanying}
        setEditRelative={setEditRelative}
        setFlag={setFlag}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />

      <AddRelativePatient
        isOpenAddRelative={isOpenAddRelative}
        setIsOpenAddRelative={setIsOpenAddRelative}
        patient={patient}
        editRelative={editRelative}
      />

      <DetailsPatient
        showDetailsPatient={showDetailsPatient}
        setShowDetailsPatient={setShowDetailsPatient}
        patient={patient}
        setPageState={setPageState}
        setReceptionSelected={setReceptionSelected}
        historyReception={historyReception}
        setIsLoading={setIsLoading}
        setPatSelected={setPatSelected}
        isLoading={loadingDetail}
      />

      

      {(isOpenAccompanying || isOpenAddRelative) && (
        <Paper
          sx={{ backgroundColor: '#0008' }}
          style={{ zIndex: 1200 }}
          onClick={() => {
            setIsOpenAccompanying(false);
            setIsOpenAddRelative(false);
          }}
          className="fixed top-0 left-0 right-0 bottom-0"
        />
      )}
      {showDetailsPatient && (
        <Paper
          sx={{ backgroundColor: '#0008' }}
          style={{ zIndex: 1200 }}
          onClick={() => {
            setShowDetailsPatient(false);
          }}
          className="fixed top-0 left-0 right-0 bottom-0"
        />
      )}
      {isLoading && <SimpleBackdrop />}
      {isLoadingPat && <SimpleBackdrop />}
    </>
  );
}

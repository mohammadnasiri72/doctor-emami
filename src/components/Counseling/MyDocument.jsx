import * as React from 'react';
import { Button, Card, CardActions, CardContent, IconButton, Tooltip, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { FaEye, FaTrashAlt } from 'react-icons/fa';
import { RiFileVideoLine } from 'react-icons/ri';
import { IoIosDocument } from 'react-icons/io';
import Swal from 'sweetalert2';
import { FaImage } from 'react-icons/fa6';
import { MdAudioFile } from 'react-icons/md';
import { mainDomain } from '../../utils/mainDomain';
import SimpleBackdrop from '../backdrop';
import BoxVideo from './BoxVideo';
import BoxAudio from './BoxAudio';
import useSettings from '../../hooks/useSettings';
import  BoxImg  from './BoxImg';

export default function MyDocumentSend({
  apointmentId,
  flagUpload,
  setFlagUpload,
  filesUpload,
  setFilesUpload,
  isShowImg,
  setIsShowImg,
  isShowAudio,
  setIsShowAudio,
  isShowVideo,
  setIsShowVideo,
  src,
  setSrc,
  srcVideo,
  setSrcVideo,
  srcAudio,
  setSrcAudio,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const { themeMode } = useSettings();

  const btnDoc = useRef(null);

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
      .get(`${mainDomain}/api/MedicalRecord/GetList`, {
        params: {
          appointmentId: apointmentId,
          typeId: 6,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setFilesUpload(res.data);
      })
      .catch((err) => {});
  }, [flagUpload]);
  const deleteFileHandler = (e) => {
    Swal.fire({
      title: 'حذف فایل',
      text: 'آیا از حذف فایل خود مطمئن هستید؟',

      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: 'green',
      cancelButtonText: 'انصراف',
      confirmButtonText: 'حذف ',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        const dataDeleteFile = {
          appointmentId: apointmentId,
          medicalRecordId: e.id,
        };
        axios
          .post(`${mainDomain}/api/MedicalRecord/Delete`, dataDeleteFile, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
          .then(() => {
            Toast.fire({
              icon: 'success',
              text: 'فایل با موفقیت حذف شد',
            });
            setIsLoading(false);
            setFlagUpload(!flagUpload);
          })
          .catch((err) => {
            setIsLoading(false);
            Toast.fire({
              icon: 'error',
              text: err.response.data ? err.response.data : 'خطای شبکه',
            });
          });
      }
    });
  };

  return (
    <>
      <div className="md:border rounded-xl">
        {filesUpload.length === 0 && <p>صفحه مدارک خالی است</p>}
        {filesUpload.length !== 0 && (
          <div>
            <div className="md:block hidden">
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>ردیف</TableCell>
                      <TableCell>توضیحات</TableCell>
                      <TableCell align="center">نوع فایل</TableCell>
                      <TableCell align="center">مشاهده فایل</TableCell>
                      <TableCell align="center">عملیات</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filesUpload.map((file, index) => (
                      <TableRow key={file.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell>
                          <span className="pr-5 font-semibold">{index + 1}</span>
                        </TableCell>
                        <TableCell component="th" scope="file">
                          {file.description}
                        </TableCell>
                        <TableCell align="center">{file.medicalItemName}</TableCell>
                        <TableCell align="center">
                          <div className="flex justify-center">
                            {file.medicalItemName === 'ویدئو' && (
                              <Tooltip title="مشاهده ویدئو">
                                <IconButton
                                  onClick={() => {
                                    setIsShowVideo(true);
                                    setSrcVideo(file.attachmentSrc);
                                  }}
                                >
                                  <RiFileVideoLine className="hover:text-green-700 duration-300" />
                                </IconButton>
                              </Tooltip>
                            )}
                            {file.medicalItemName === 'سند' && (
                              <Tooltip title="مشاهده سند">
                                <IconButton>
                                  <a target="_blank" rel="noreferrer" href={mainDomain + file.attachmentSrc}>
                                    <IoIosDocument className="hover:text-green-700 duration-300" />
                                  </a>
                                </IconButton>
                              </Tooltip>
                            )}
                            {file.medicalItemName === 'تصویر' && (
                              <Tooltip title="مشاهده تصویر">
                                <IconButton
                                  onClick={() => {
                                    setIsShowImg(true);
                                    setSrc(file.attachmentSrc);
                                  }}
                                >
                                  <FaImage className="hover:text-green-700 duration-300" />
                                </IconButton>
                              </Tooltip>
                            )}
                            {file.medicalItemName === 'صوت' && (
                              <Tooltip title="پخش صوت">
                                <IconButton
                                  onClick={() => {
                                    setIsShowAudio(true);
                                    setSrcAudio(file.attachmentSrc);
                                  }}
                                >
                                  <MdAudioFile className="hover:text-green-700 duration-300" />
                                </IconButton>
                              </Tooltip>
                            )}
                          </div>
                        </TableCell>
                        <TableCell align="center">
                          <Tooltip title="حذف">
                            <IconButton onClick={() => deleteFileHandler(file)}>
                              <FaTrashAlt className="hover:text-red-500 duration-300" />
                            </IconButton>
                          </Tooltip>
                          {/* <div className="flex justify-center">
                        <FaTrashAlt onClick={() => deleteFileHandler(file)} className="text-2xl cursor-pointer" />
                      </div> */}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div className="md:hidden block">
              <div className="flex flex-wrap">
                {filesUpload.map((file, index) => (
                  <div key={file.id} className="sm:w-1/2 w-full py-2">
                    <div style={{backgroundColor: themeMode==='light'? 'rgb(248 250 252)':'#161c24'}} className="border rounded-lg flex flex-wrap">
                      <div className="w-1/6">
                        {file.medicalItemName === 'تصویر' && (
                          <div className="flex justify-center items-center pt-2">
                            <FaImage className="  text-3xl text-slate-700" />
                          </div>
                        )}
                        {file.medicalItemName === 'ویدئو' && (
                          <div className="flex justify-center items-center pt-2">
                            <RiFileVideoLine className=" text-3xl text-slate-700" />
                          </div>
                        )}
                        {file.medicalItemName === 'سند' && (
                          <div>
                            <a ref={btnDoc} target="_blank" rel="noreferrer" href={mainDomain + file.attachmentSrc}>
                              {/*  */}
                            </a>

                            <div className="flex justify-center items-center pt-2">
                              <IoIosDocument className=" text-3xl text-slate-700" />
                            </div>
                          </div>
                        )}
                        {file.medicalItemName === 'صوت' && (
                          <div className="flex justify-center items-center pt-2">
                            <MdAudioFile className=" text-3xl text-slate-700" />
                          </div>
                        )}
                      </div>
                      <div className="w-1/2 flex flex-col">
                        <Typography variant="h5" component="div">
                          {file.medicalItemName}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                          {file.description}
                        </Typography>
                      </div>
                      <div className="w-1/3 flex justify-center items-center">
                        <Tooltip title="مشاهده جزئیات">
                          <IconButton
                            onClick={() => {
                              if (file.medicalItemId === 4) {
                                setIsShowImg(true);
                                setSrc(file.attachmentSrc);
                              } else if (file.medicalItemId === 5) {
                                setIsShowVideo(true);
                                setSrcVideo(file.attachmentSrc);
                              } else if (file.medicalItemId === 6) {
                                setIsShowAudio(true);
                                setSrcAudio(file.attachmentSrc);
                              } else {
                                btnDoc.current.click();
                              }
                            }}
                          >
                            <FaEye className="text-xl cursor-pointer text-teal-500" />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="حذف مدرک">
                          <IconButton onClick={() => deleteFileHandler(file)}>
                            <FaTrashAlt className="text-lg cursor-pointer duration-300 text-red-500 hover:text-red-600" />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <BoxImg isShowImg={isShowImg} setIsShowImg={setIsShowImg} src={src} filesUpload={filesUpload} setSrc={setSrc} />
        <BoxVideo srcVideo={srcVideo} isShowVideo={isShowVideo} setIsShowVideo={setIsShowVideo} />
        <BoxAudio isShowAudio={isShowAudio} srcAudio={srcAudio} setIsShowAudio={setIsShowAudio} />
      </div>
      {isLoading && <SimpleBackdrop />}
    </>
  );
}

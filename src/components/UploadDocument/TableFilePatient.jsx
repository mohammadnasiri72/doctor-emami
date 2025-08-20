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
import { useState } from 'react';
import { FaImage } from 'react-icons/fa';
import { IoIosDocument } from 'react-icons/io';
import { MdAudioFile } from 'react-icons/md';
import { RiFileVideoLine } from 'react-icons/ri';
import { TiDelete } from 'react-icons/ti';
import Swal from 'sweetalert2';
import { mainDomain } from '../../utils/mainDomain';
import BoxAudio from '../Counseling/BoxAudio';
import BoxVideo from '../Counseling/BoxVideo';
import BoxImg from './BoxImg';

export default function TableFilePatient({ listFilePatient, doctor, setIsLoading , setFlag}) {
  const [isShowImg, setIsShowImg] = useState(false);
  const [isShowAudio, setIsShowAudio] = useState(false);
  const [isShowVideo, setIsShowVideo] = useState(false);
  const [src, setSrc] = useState('');
  const [srcVideo, setSrcVideo] = useState('');
  const [srcAudio, setSrcAudio] = useState('');

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });

  const deletFileHandler = (e) => {
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
        const data = new FormData();
        data.append('id' , e.id)
        data.append('doctorId' , doctor)
        axios
          .post(`${mainDomain}/api/PatientFile/Delete`, data, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
          .then((res) => {
            setIsLoading(false);
            setFlag((e)=>!e)
            Toast.fire({
              icon: 'success',
              text: 'فایل با موفقیت حذف شد',
            });
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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="sticky table">
          <TableHead className="">
            <TableRow>
              <TableCell>ردیف</TableCell>
              <TableCell align="center">نوع فایل</TableCell>
              <TableCell align="center">توضیحات</TableCell>
              <TableCell align="center">تاریخ و زمان ارسال</TableCell>
              <TableCell align="center">مشاهده فایل</TableCell>
              <TableCell align="center">حذف</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listFilePatient.map((e, i) => (
              <TableRow key={i}>
                <TableCell>
                  <span className="pr-3 font-semibold">{i + 1}</span>
                </TableCell>
                <TableCell align="center">{e.medicalItemName}</TableCell>
                <TableCell align="center">{e.description?e.description : '_________'}</TableCell>
                <TableCell align="center">{e.createdDateTimeFa}</TableCell>

                <TableCell align="center">
                  <div className="flex justify-center">
                    {e.medicalItemName === 'ویدئو' && (
                      <Tooltip title="مشاهده ویدئو">
                        <IconButton
                          onClick={() => {
                            setIsShowVideo(true);
                            setSrcVideo(e.attachmentSrc);
                          }}
                        >
                          <RiFileVideoLine className="hover:text-green-700 duration-300" />
                        </IconButton>
                      </Tooltip>
                    )}
                    {e.medicalItemName === 'سند' && (
                      <Tooltip title="مشاهده سند">
                        <IconButton>
                          <a target="_blank" rel="noreferrer" href={mainDomain + e.attachmentSrc}>
                            <IoIosDocument className="hover:text-green-700 duration-300" />
                          </a>
                        </IconButton>
                      </Tooltip>
                    )}
                    {e.medicalItemName === 'تصویر' && (
                      <Tooltip title="مشاهده تصویر">
                        <IconButton
                          onClick={() => {
                            setIsShowImg(true);
                            setSrc(e.attachmentSrc);
                          }}
                        >
                          <FaImage className="hover:text-green-700 duration-300" />
                        </IconButton>
                      </Tooltip>
                    )}
                    {e.medicalItemName === 'صوت' && (
                      <Tooltip title="پخش صوت">
                        <IconButton
                          onClick={() => {
                            setIsShowAudio(true);
                            setSrcAudio(e.attachmentSrc);
                          }}
                        >
                          <MdAudioFile className="hover:text-green-700 duration-300" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </div>
                </TableCell>

                <TableCell align="center">
                  <div className="flex justify-center">
                    {e.canBeDeleted && (
                      <TiDelete
                        onClick={() => deletFileHandler(e)}
                        className="cursor-pointer text-4xl text-red-500 hover:text-red-600 duration-300"
                      />
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <BoxImg
        isShowImg={isShowImg}
        setIsShowImg={setIsShowImg}
        src={src}
        filesUpload={listFilePatient}
        setSrc={setSrc}
      />
      <BoxVideo srcVideo={srcVideo} isShowVideo={isShowVideo} setIsShowVideo={setIsShowVideo} />
      <BoxAudio isShowAudio={isShowAudio} srcAudio={srcAudio} setIsShowAudio={setIsShowAudio} />
    </>
  );
}

import { Button, Paper, Stack } from '@mui/material';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { MdOutlineAddAPhoto } from 'react-icons/md';
import Swal from 'sweetalert2';
import { mainDomain } from '../../utils/mainDomain';
import SimpleBackdrop from '../backdrop';
import ProgressBarUpdateProfile from './ProgressBarUpdateProfile';

export default function UploaderImage({ account, setChang, patient }) {
  const [avatarTemporary, setAvatarTemporary] = useState('');
  const [fileAtt, setFileAtt] = useState('');
  const [valProgres, setValProgres] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [src, setSrc] = useState('');

  // import sweet alert-2
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });

  const viewImgHandler = (e) => {
    setIsLoading(true);
    const fileData = new FormData();
    fileData.append('file', e.target.files[0]);
    axios
      .post(`${mainDomain}/api/File/Upload/Image`, fileData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setFileAtt(res.data);
        setAvatarTemporary(`${mainDomain}/uploads/temp_up/${res.data}`);
      })
      .catch((err) => {
        setIsLoading(false);
        Toast.fire({
          icon: 'error',
          text: err.response ? err.response.data : 'خطای شبکه',
        });
      });
  };

  const inpImg = useRef();
  const selectImgHandler = () => {
    inpImg.current.click();
  };

  const uploadImgHandler = () => {
    if (fileAtt) {
      setIsLoading(true);
      let data = {};
      let role = '';
      if (patient) {
        data = {
          fileSrc: fileAtt,
          userId: account.userId,
        };
        role = 'Patient';
      } else if (!patient) {
        if (localStorage.getItem('roles') === 'Patient') {
          data = {
            fileSrc: fileAtt,
            userId: account.userId,
          };
          role = 'Patient';
        } else if (localStorage.getItem('roles').includes('Staff')) {
          data = new FormData();
          data.append('fileSrc', fileAtt);
          role = 'Staff';
        } else if (localStorage.getItem('roles').includes('Doctor')) {
          data = new FormData();
          data.append('fileSrc', fileAtt);
          role = 'Doctor';
        }
      }

      axios
        .post(`${mainDomain}/api/${role}/Avatar/Update`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },

          onUploadProgress: (val) => {
            setValProgres(Number(Math.round((val.loaded * 100) / val.total)));
          },
        })
        .then((res) => {
          setIsLoading(false);
          setValProgres(0);
          setChang((e) => !e);
          setFileAtt('');
          Toast.fire({
            icon: 'success',
            text: 'تصویر پروفایل با موفقیت بروز رسانی شد',
          });
        })
        .catch((err) => {
          setIsLoading(false);
          Toast.fire({
            icon: 'error',
            text: err.response ? err.response.data : 'خطای شبکه',
          });
        });
    }
  };
  useEffect(() => {
    if (avatarTemporary) {
      setSrc(avatarTemporary);
      setIsLoading(false);
    } else {
      setSrc(mainDomain + account.avatar);
    }
  }, [account, avatarTemporary]);
  return (
    <>
      <div className="border rounded-lg h-full relative">
        <input className="opacity-0 invisible" ref={inpImg} onChange={viewImgHandler} type="file" />
        <Paper
          sx={{ borderRadius: '100%' }}
          className="border-dashed relative border border-black w-32 h-32 rounded-full flex justify-center items-center mx-auto"
        >
          {account.avatar && (
            <img className="w-full h-full rounded-full duration-300 object-cover brightness-100" src={src} alt="" />
          )}
          {
            <Stack
              onClick={selectImgHandler}
              className="flex justify-center items-center flex-col duration-300  rounded-full absolute text-[#eee] -right-1 -bottom-1 bg-teal-500 hover:bg-teal-600 hover:text-[#fff] p-2 cursor-pointer"
            >
              <MdOutlineAddAPhoto className="text-3xl" />
            </Stack>
          }
        </Paper>

        <div className="absolute bottom-5 left-5">
          <div>
            <ProgressBarUpdateProfile valProgres={valProgres} />
          </div>
        </div>
        <div className="mb-20">
          <p className="text-xs mt-2">Allowed *.jpeg, *.jpg, *.png, *.gif</p>
          <p className="text-xs mt-2"> max size of 3.1 MB</p>
        </div>
        <div>
          <Button
            disabled={!fileAtt}
            onClick={uploadImgHandler}
            size="medium"
            sx={{
              py: 1,
              fontSize: 16,
              backgroundColor: 'rgb(6 182 212)',
              '&:hover': {
                backgroundColor: 'rgb(8 145 178)',
              },
            }}
            className="rounded-md text-white mt-5 duration-300"
            variant="contained"
          >
            آپلود تصویر
          </Button>
        </div>
      </div>
      {isLoading && <SimpleBackdrop />}
    </>
  );
}

import { Button, Checkbox, FormControlLabel, Skeleton } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { PiNotePencilLight } from 'react-icons/pi';
import Swal from 'sweetalert2';
import { FaTrashAlt } from 'react-icons/fa';
import { mainDomain } from '../../utils/mainDomain';
import ChechBoxDrug from './ChechBoxDrug';
import NameTemplate from './NameTemplate';
import useSettings from '../../hooks/useSettings';

export default function Prescription({ patSelected, flag, setIsLoading, setFlag, templateId, isLoading }) {
  const [listDrugSelected, setListDrugSelected] = useState([]);
  const [listDrugCheched, setListDrugCheched] = useState([]);
  const [prescriptionsId, setPrescriptionsId] = useState([]);
  const [listId, setListId] = useState([]);

  const { themeMode } = useSettings();

  useEffect(() => {
    const arr = [];
    listDrugCheched.map((ev) => {
      arr.push(ev.prescriptionId);
      return true;
    });
    setListId(arr);
  }, [listDrugCheched]);

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });

  // get list drug selected
  useEffect(() => {
    setPrescriptionsId([]);
    const arr = [];
    listDrugCheched.map((e) => {
      arr.push(e.prescriptionId);
      return true;
    });
    setPrescriptionsId(arr);
  }, [listDrugCheched]);

  useEffect(() => {
    setListDrugCheched([]);
    setIsLoading(true);
    axios
      .get(`${mainDomain}/api/Prescription/GetList`, {
        params: {
          appointmentId: patSelected.appointmentId,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setListDrugSelected(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, [flag]);

  const editTemplateHandler = () => {
    setIsLoading(true);
    const data = {
      templateId,
      prescriptionsId,
    };
    axios
      .post(`${mainDomain}/api/PrescriptionTemplate/Update`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        Toast.fire({
          icon: 'success',
          text: 'تمپلیت با موفقیت ویرایش شد',
        });
      })
      .catch((err) => {
        setIsLoading(false);
        Toast.fire({
          icon: 'error',
          text: err.response ? err.response.data : 'خطای شبکه',
        });
      });
  };

  const deleteAllHandler = () => {
    const data = new FormData();
    listId.map((e) => {
      data.append('prescriptionIdList', e);
      return true;
    });
    axios
      .post(`${mainDomain}/api/Prescription/Delete`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setFlag((e) => !e);
        Toast.fire({
          icon: 'success',
          text: 'حذف با موفقیت انجام شد',
        });
      })
      .catch((err) => {
        setIsLoading(false);
        Toast.fire({
          icon: 'error',
          text: err.response ? err.response.data : 'خطای شبکه',
        });
      });
  };

  const classBtnActiv = 'px-3 py-2 rounded-md text-white flex items-center bg-green-500 hover:bg-green-600';
  const classBtnDisActive = 'px-3 py-2 rounded-md text-white flex items-center bg-slate-300';

  return (
    <>
      <div className="text-start w-full min-h-[90vh]">
        <div className="text-center">
          <h3 className="text-xl font-semibold ">جزئیات نسخه</h3>
          {/* <p className="text-xs">تاریخ ویزیت: {patSelected.appointmentDateFA}</p> */}
        </div>
        <hr className="mt-2 pb-2" />
        {listDrugSelected.length > 0 && (
          <div
            style={{ backgroundColor: themeMode === 'light' ? 'rgb(241 245 249)' : '#0005' }}
            className="bg-slate-100 rounded-lg flex justify-between"
            dir="ltr"
          >
            <FormControlLabel
              style={{ color: themeMode === 'light' ? '#0005' : 'rgb(241 245 249)' }}
              onChange={() => {
                if (listDrugCheched.length === listDrugSelected.length && listDrugCheched.length !== 0) {
                  setListDrugCheched([]);
                } else {
                  setListDrugCheched(listDrugSelected);
                }
              }}
              control={
                <Checkbox
                  checked={listDrugCheched.length === listDrugSelected.length && listDrugCheched.length !== 0}
                  indeterminate={listDrugSelected.length > listDrugCheched.length && listDrugCheched.length !== 0}
                />
              }
              label={'انتخاب همه'}
            />

            <Button
              sx={{
                py: 1,
                boxShadow: 'none',
                // fontSize: 20,
                backgroundColor: 'rgb(248 113 113)',
                '&:hover': {
                  backgroundColor: 'rgb(239 68 68)',
                },
              }}
              className="p-2 rounded-md duration-300 mt-2"
              onClick={deleteAllHandler}
              disabled={prescriptionsId.length === 0}
              variant="contained"
            >
              <FaTrashAlt
                style={{ color: prescriptionsId.length === 0 ? 'rgb(203 213 225)' : 'rgb(51 65 85)' }}
                className="text-lg duration-300"
              />
            </Button>
          </div>
        )}
        {listDrugSelected.length === 0 && !isLoading && (
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
            <p className="text-center mt-5">نسخه خالی است</p>
          </div>
        )}
        {listDrugSelected.length === 0 && isLoading && (
          <div className="w-full">
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
          </div>
        )}

        {listDrugSelected.map((e, i) => (
          <ChechBoxDrug
            listDrugSelected={listDrugSelected}
            key={e.prescriptionId}
            e={e}
            setFlag={setFlag}
            setIsLoading={setIsLoading}
            setListDrugCheched={setListDrugCheched}
            listDrugCheched={listDrugCheched}
          />
        ))}
      </div>
      <div className="flex justify-around w-full">
        <NameTemplate setIsLoading={setIsLoading} listDrugCheched={listDrugCheched} />
        {templateId !== -1 && (
          <Button
            sx={{
              py: 1,
              boxShadow: 'none',
              // fontSize: 20,
              backgroundColor: 'rgb(20 184 166)',
              '&:hover': {
                backgroundColor: 'rgb(13 148 136)',
              },
            }}
            className={prescriptionsId.length === 0 ? classBtnDisActive : classBtnActiv}
            onClick={editTemplateHandler}
            variant="contained"
          >
            <span className="px-1">ویرایش تمپلیت</span>
            <PiNotePencilLight />
          </Button>
        )}
      </div>
    </>
  );
}

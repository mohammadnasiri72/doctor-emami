/* eslint-disable no-nested-ternary */
import { Chip, IconButton, InputAdornment, TextField, Tooltip } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaDownload } from 'react-icons/fa';
import { mainDomain } from '../../utils/mainDomain';

export default function OrderHistoryVisit({ receptionSelected, setIsLoading }) {
  const [listOrder, setListOrder] = useState([]);


  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${mainDomain}/api/MedicalRecord/Order/GetList`, {
        params: {
          appointmentId: receptionSelected.appointmentId,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setListOrder(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div>
        <h3 className="text-teal-500 font-semibold">اردر های پزشک</h3>
        {listOrder.length > 0 &&
          listOrder.map((e, i) => (
            <div key={e.orderId}>
              <div className="px-3 flex justify-between items-center rounded-lg duration-300 mt-2">
                <div>
                  <h3 className="font-semibold text-start">
                    {i + 1} - {e.medicalItemName}
                  </h3>
                  <div className="flex text-xs">
                    <p className='whitespace-nowrap'>کامنت پزشک : </p>
                    <p className="pr-2 text-sm text-justify">{e.doctorComments ? e.doctorComments : '------'}</p>
                  </div>
                  <div className="flex text-xs">
                    <p className='whitespace-nowrap'>کامنت جواب : </p>
                    <p className="pr-2 text-sm text-justify">{e.labComments ? e.labComments : '------'}</p>
                  </div>
                </div>
                <div className="">
                  {e.result && (
                    <Tooltip title="دانلود فایل">
                      <IconButton>
                        <a target="_blank" rel="noreferrer" href={`${mainDomain}${e.resultSrc}`} download>
                          <FaDownload className="text-lg" />
                        </a>
                      </IconButton>
                    </Tooltip>
                  )}
                  <Chip
                    sx={{
                      backgroundColor:
                        e.statusId === 1
                          ? 
                          'rgb(234 179 8)'
                          : e.statusId === 2
                          ? 'rgb(59 130 246)'
                          : e.statusId === 3
                          ? 'rgb(34 197 94)'
                          : 'rgb(239 68 68)',
                      color: 'white',
                    }}
                    label={e.status}
                    variant="filled"
                    size="small"
                  />
                </div>
              </div>
              <hr />
            </div>
          ))}
        {listOrder.length === 0 && <p className="text-sm mt-2">موردی ثبت نشده است</p>}
      </div>
    </>
  );
}

import axios from 'axios';
import { Chip, Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { mainDomain } from '../../utils/mainDomain';

export default function PrescriptionHistoryVisit({ receptionSelected, setIsLoading, isLoading }) {
  const [listDrug, setListDrug] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${mainDomain}/api/Prescription/GetList`, {
        params: {
          appointmentId: receptionSelected.appointmentId,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setListDrug(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, [receptionSelected]);


  return (
    <>
      <div>
        <div className="rounded-lg border-2">
          <h3 className="text-teal-500 font-semibold">جزئیات نسخه</h3>

          <hr className="my-2 border-dashed border" />
          {listDrug.length > 0 &&
            listDrug.map((e, i) => (
              <div key={e.prescriptionId} dir="ltr" className="px-1 text-start">
                {/* <div dir="ltr" className="flex items-center rounded-lg bg-slate-50 mt-2 px-2">
              <span>{i + 1}_</span>
              <span className="px-1 text-sm">{e.medicationName}</span>
              <span className="px-1 text-sm">{e.form}</span>
              <span className="px-1 text-sm">{e.frequency}</span>
              <span className="px-1 text-sm">{e.dosage}</span>
            </div> */}
                <div className="flex flex-col text-xs">
                  <span className="pt-2">
                    {i + 1}- {e.medicationName}
                  </span>
                  <div className="flex flex-wrap">
                    {e.dosage && (
                      <div className="pr-1">
                        <Chip size="small" className="mt-1" label={e.dosage} />
                      </div>
                    )}
                    {e.form && (
                      <div className="pr-1">
                        <Chip size="small" className="mt-1" label={e.form} />
                      </div>
                    )}
                    {e.frequency && (
                      <div className="pr-1">
                        <Chip size="small" className="mt-1" label={e.frequency} />
                      </div>
                    )}
                    {e.number > 0 && (
                      <div className="pr-1">
                        <Chip size="small" className="mt-1" label={`x ${e.number} `} />
                      </div>
                    )}
                  </div>
                  {e.medicationDescription && <span className="pt-2">{e.medicationDescription}</span>}
                </div>
                <hr className="mt-1" />
              </div>
            ))}
          {listDrug.length === 0 && !isLoading && <p className="text-sm mt-2">موردی ثبت نشده است</p>}
          {listDrug.length === 0 && isLoading && (
            <div className="w-full">
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

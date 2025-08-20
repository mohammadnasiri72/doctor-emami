import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaArrowRight } from 'react-icons/fa';
import { IconButton, Tooltip } from '@mui/material';
import { mainDomain } from '../../utils/mainDomain';
import ProblemPatientHistoryVisit from '../VisitHistory/ProblemPatientHistoryVisit';
import DiagnosisHistoryVisit from '../VisitHistory/DiagnosisHistoryVisit';
import AdviceHistoryVisit from '../VisitHistory/AdviceHistoryVisit';

export default function DetailsRequest({setIsLoading , appointmentId , setIsShowDetails , account}) {
    const [medicalRecord, setMedicalRecord] = useState([])
    
    useEffect(() => {
        if (appointmentId) {
         setIsLoading(true);
         axios
           .get(`${mainDomain}/api/MedicalRecord/GetList`, {
             params: {
               appointmentId,
               typeId: -1,
             },
             headers: {
               Authorization: `Bearer ${localStorage.getItem('token')}`,
             },
           })
           .then((res) => {
             setIsLoading(false);
             setMedicalRecord(res.data);
           })
           .catch((err) => {
             setIsLoading(false);
           });
        }
       }, [appointmentId]);
  return (
    <>
    <div className="text-start">
        <Tooltip title="برگشت به صفحه قبل" placement="bottom">
          <IconButton
            onClick={() => {
                setIsShowDetails(false);
            }}
          >
            <FaArrowRight />
          </IconButton>
        </Tooltip>
      </div>
      
     <div className='border-2 p-2 rounded-lg'>
     <div className="flex items-center">
          <div className="p-3">
            <img className="w-10 h-10 rounded-full" src={mainDomain + account.avatar} alt="" />
          </div>
          <div className="text-start">
            <p>
              {account.firstName} {account.lastName}
            </p>
            <p className="text-sm">{account.nationalId}</p>
          </div>
        </div>
        <hr className="my-2 border-dotted border-2" />
      <div className='flex flex-wrap'>
        <div className='lg:w-1/2 w-full border-l-2 border-dotted px-3'>
        <ProblemPatientHistoryVisit  medicalRecord={medicalRecord}/>
        <hr className="my-2 border-dotted border-2" />
        <DiagnosisHistoryVisit medicalRecord={medicalRecord}/>
        <hr className="my-2 border-dotted border-2" />
        <AdviceHistoryVisit medicalRecord={medicalRecord}/>
        </div>
        {/* <div className='lg:w-1/2 w-full px-3'>
        <PrescriptionHistoryVisit receptionSelected={receptionSelected} setIsLoading={setIsLoading}/>
        <hr className="my-2 border-dotted border-2" />
        <OrderHistoryVisit receptionSelected={receptionSelected} setIsLoading={setIsLoading}/>
        <hr className="my-2 border-dotted border-2" />
        <FilesHistoryVisit medicalRecord={medicalRecord} receptionSelected={receptionSelected}/>
        </div> */}
      </div>
     </div>
    </>
  )
}

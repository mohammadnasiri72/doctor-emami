import React from 'react';
import { Button } from '@mui/material';
import PatientList from '../patientList/PatientList';

export default function PatientListVisit({setPageNumber}) {
  return (
    <>
      <div>
        <PatientList />
        <div className="flex justify-between mt-5 px-4 w-11/12">
          {/* <button onClick={()=> setPageNumber(1)} className="px-5 py-2 rounded-md bg-red-500 text-white duration-300 hover:bg-red-600">
            برگشت به صفحه قبل
          </button> */}
          <Button
              sx={{
                py: 1,
                boxShadow: 'none',
                // fontSize: 20,
                backgroundColor: 'rgb(6 182 212)',
                '&:hover': {
                  backgroundColor: 'rgb(8 145 178)',
               
                },
              }}
              className="p-2 rounded-md duration-300 whitespace-nowrap text-white"
              onClick={()=> setPageNumber(1)}
              variant="contained"
            >
              برگشت به صفحه قبل
            </Button>
          {/* <button onClick={()=> setPageNumber(3)} className="px-5 py-2 rounded-md bg-green-500 text-white duration-300 hover:bg-green-600">
            مرحله بعد
          </button> */}
          <Button
              sx={{
                py: 1,
                boxShadow: 'none',
                // fontSize: 20,
                backgroundColor: 'rgb(16 185 129)',
                '&:hover': {
                  backgroundColor: 'rgb(5 150 105)',
                },
              }}
              className="p-2 rounded-md duration-300 whitespace-nowrap text-white"
              onClick={()=> setPageNumber(3)}
              variant="contained"
            >
              مرحله بعد
            </Button>
        </div>
      </div>
    </>
  );
}

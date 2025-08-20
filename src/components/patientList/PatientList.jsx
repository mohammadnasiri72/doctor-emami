import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { Button } from '@mui/material';
import TablePatient from './TablePatient';
import AddPatientPopUp from './AddPatientPopUp';
import SimpleBackdrop from '../backdrop';
import useSettings from '../../hooks/useSettings';

export default function PatientList() {
  const [isOpenAddPatient, setIsOpenAddPatient] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [isPatientActive, setIsPatientActive] = useState('true');
  const [medicationIdList, setMedicationIdList] = useState([]);
  const [desc, setDesc] = useState('');
  const [valueMedicine, setValueMedicine] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { themeMode } = useSettings();

  return (
    <>
      <div>
        <div className="w-full border rounded-md">
          <h3 style={{backgroundColor:themeMode==='light'? '#f4f6f8': '#333d49'}} className="rounded-t-md font-semibold text-xl p-2">لیست بیماری های من</h3>
          <div className="p-3 ">
            <Button
              sx={{
                py: 1,
                boxShadow: 'none',
                backgroundColor: 'rgb(16 185 129)',
                '&:hover': {
                  backgroundColor: 'rgb(5 150 105)',
                },
              }}
              className="p-2 rounded-md duration-300 mt-2 text-white"
              onClick={() => {
                setIsOpenAddPatient(!isOpenAddPatient)
                setMedicationIdList([])
              }}
              variant="contained"
            >
              <span className="px-2 ">ثبت بیماری جدید</span>
              <FaPlus />
            </Button>
          </div>

          <div>
            <TablePatient
              isOpenAddPatient={isOpenAddPatient}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              medicationIdList={medicationIdList}
              setMedicationIdList={setMedicationIdList}
            />
          </div>
        </div>
        <AddPatientPopUp
          isOpenAddPatient={isOpenAddPatient}
          setIsOpenAddPatient={setIsOpenAddPatient}
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
        />
      </div>
      {isLoading && <SimpleBackdrop />}
    </>
  );
}

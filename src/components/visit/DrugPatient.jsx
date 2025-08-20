import { useState } from 'react';
import Prescription from './Prescription';
import SelectPrescription from './SelectPrescription';

export default function DrugPatient({ patSelected, setIsLoading , isLoading}) {
  const [flag, setFlag] = useState(false);
  const [templateId , setTemplateId] = useState(-1)

  return (
    <>
      <div className="flex flex-wrap">
        <div className="lg:w-5/12 w-full sm:pl-5">
          
          <SelectPrescription setIsLoading={setIsLoading} patSelected={patSelected} setFlag={setFlag} setTemplateId={setTemplateId} flag={flag}/>
        </div>
        <div className="lg:w-7/12 w-full border p-4 flex flex-col items-end justify-between">
          <Prescription patSelected={patSelected} flag={flag} setIsLoading={setIsLoading} setFlag={setFlag} templateId={templateId} isLoading={isLoading}/>
        </div>
      </div>
    </>
  );
}

import { InputAdornment, TextField } from '@mui/material';

export default function DiagnosisHistoryVisit({ medicalRecord }) {
  return (
    <>
      <h3 className="font-semibold text-teal-500">تشخیص پزشک</h3>
      {medicalRecord.filter((e) => e.typeId === 3).length > 0 &&
        medicalRecord
          .filter((e) => e.typeId === 3)
          .map((e, i) => (
            <div key={e.id} className="px-3">
              <div className="flex flex-wrap items-center rounded-lg shadow-md duration-300 hover:shadow-lg mt-2 p-2">
                <div>
                  <h3 className="font-semibold text-start">
                    {i + 1} - {e.medicalItemName}
                  </h3>
                  <p className="pr-2 text-sm text-justify">{e.description ? e.description : '------'}</p>
                </div>
              </div>
            </div>
          ))}
      {medicalRecord.filter((e) => e.typeId === 3).length === 0 && <p className="text-sm mt-2">موردی ثبت نشده است</p>}
    </>
  );
}

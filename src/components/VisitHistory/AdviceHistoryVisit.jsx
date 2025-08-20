import { InputAdornment, TextField } from '@mui/material';

export default function AdviceHistoryVisit({ medicalRecord }) {
  return (
    <>
      <h3 className="font-semibold text-teal-500">توصیه های پزشک</h3>
      {medicalRecord.filter((e) => e.typeId === 4).length > 0 &&
        medicalRecord
          .filter((e) => e.typeId === 4)
          .map((e, i) => (
            <div key={e.id} className="px-3">
              <div className="flex flex-wrap items-center rounded-lg duration-300 hover:shadow-lg shadow-md mt-2 p-2">
                <div className='text-start'>
                  <h3 className="font-semibold text-start">
                    {i + 1} - {e.medicalItemName}
                  </h3>
                  <p className="pr-2 text-sm text-justify">{e.description ? e.description : '------'}</p>
                </div>
              </div>
            </div>
          ))}
      {medicalRecord.filter((e) => e.typeId === 4).length === 0 && <p className="text-sm mt-2">موردی ثبت نشده است</p>}
    </>
  );
}

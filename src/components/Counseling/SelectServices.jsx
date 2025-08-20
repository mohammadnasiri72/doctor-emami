import { Button } from '@mui/material';
import { useState } from 'react';
import SelecDoctor from './SelecDoctor';
import SelectExpertises from './SelectExpertises';
import SelectServicesNotPersonal from './SelectServicesNotPersonal';

export default function SelectServices({
  setPageNumber,
  valDoctor,
  setValDoctor,
  service,
  setService,
  setTitleServices,
  setPriceServices,
  setNameDoctor
}) {
  const [expertise, setExpertise] = useState('همه');

  return (
    <>
      <div className="md:w-1/2 sm:w-2/3 w-full mx-auto pb-10">
        <h2 className="font-semibold">لطفا خدمت مد نظر خود را وارد کنید</h2>
        <SelectExpertises expertise={expertise} setExpertise={setExpertise} />
        <SelecDoctor expertise={expertise} valDoctor={valDoctor} setValDoctor={setValDoctor} setNameDoctor={setNameDoctor}/>
        <SelectServicesNotPersonal
          service={service}
          setService={setService}
          setTitleServices={setTitleServices}
          setPriceServices={setPriceServices}
        />

        <div className="flex justify-between mt-5 px-4">
          <Button
            sx={{
              py: 1,
              boxShadow: 'none',
              backgroundColor: 'rgb(6 182 212)',
              '&:hover': {
                backgroundColor: 'rgb(8 145 178)',
              },
            }}
            className="p-2 rounded-md duration-300 whitespace-nowrap text-white"
            onClick={() => setPageNumber(0)}
            variant="contained"
          >
            برگشت به صفحه قبل
          </Button>
          <Button
            sx={{
              py: 1,
              boxShadow: 'none',
              backgroundColor: 'rgb(16 185 129)',
              '&:hover': {
                backgroundColor: 'rgb(5 150 105)',
              },
            }}
            className="p-2 rounded-md duration-300 whitespace-nowrap text-white"
            onClick={() => setPageNumber(2)}
            variant="contained"
          >
            مرحله بعد
          </Button>
        </div>
      </div>
    </>
  );
}

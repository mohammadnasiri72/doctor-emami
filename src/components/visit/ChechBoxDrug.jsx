import { Button, Checkbox, Chip, FormControlLabel } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { TiDelete } from 'react-icons/ti';
import Swal from 'sweetalert2';
import { mainDomain } from '../../utils/mainDomain';
import useSettings from '../../hooks/useSettings';

export default function ChechBoxDrug({
  e,
  listDrugSelected,
  setFlag,
  setIsLoading,
  listDrugCheched,
  setListDrugCheched,
}) {
  const [valChechBox, setValChechBox] = useState(false);

  const { themeMode } = useSettings();

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });

  const deleteDrugHandler = () => {
    setIsLoading(true);
    const data = new FormData();
    data.append('prescriptionIdList', e.prescriptionId);
    axios
      .post(`${mainDomain}/api/Prescription/Delete`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setFlag((e) => !e);
        setListDrugCheched(listDrugCheched.filter((ev) => ev.prescriptionId !== e.prescriptionId));
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
  useEffect(() => {
    if (listDrugCheched.length === listDrugSelected.length && listDrugCheched.length !== 0) {
      setValChechBox(true);
    }
    if (listDrugCheched.length === 0) {
      setValChechBox(false);
    }
  }, [listDrugCheched, listDrugSelected]);
  return (
    <>
      <div
        style={{ backgroundColor: themeMode === 'light' ? 'rgb(248 250 252)' : '' }}
        dir="ltr"
        className="flex flex-wrap justify-between rounded-lg mt-3 border text-xs"
      >
        <div className=" flex items-center sm:w-5/6 w-full">
          <FormControlLabel
            onChange={() => {
              if (listDrugCheched.includes(e)) {
                setListDrugCheched(listDrugCheched.filter((ev) => ev.prescriptionId !== e.prescriptionId));
                setValChechBox(false);
              } else {
                setListDrugCheched([...listDrugCheched, e]);
                setValChechBox(true);
              }
            }}
            control={<Checkbox checked={valChechBox} />}
            label={''}
          />

          <div className="px-4">
            <div className="flex flex-col text-xs">
              <span className="pt-2">{e.medicationName}</span>
              <div className="flex justify-center flex-wrap">
                {e.dosage && (
                  <div className="pr-1">
                    <Chip className="mt-1" label={e.dosage} />
                  </div>
                )}
                {e.form && (
                  <div className="pr-1">
                    <Chip className="mt-1" label={e.form} />
                  </div>
                )}
                {e.frequency && (
                  <div className="pr-1">
                    <Chip className="mt-1" label={e.frequency} />
                  </div>
                )}
                {e.number && (
                  <div className="pr-1">
                    <Chip className="mt-1" label={`x ${e.number}`} />
                  </div>
                )}
              </div>
            </div>
            <span className="pl-4">{e.instructions}</span>
          </div>
        </div>

        <Button
          sx={{
            py: 1,
            boxShadow: 'none',

            backgroundColor: 'rgb(248 113 113)',
            '&:hover': {
              backgroundColor: 'rgb(239 68 68)',
            },
          }}
          className="p-2 rounded-md duration-300 mt-2 sm:w-1/12 w-full"
          onClick={deleteDrugHandler}
          variant="contained"
        >
          <TiDelete className="text-2xl duration-300" />
        </Button>
      </div>
    </>
  );
}

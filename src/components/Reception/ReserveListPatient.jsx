import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';
import { mainDomain } from '../../utils/mainDomain';

export default function ReserveListPatient({
  valReservPatient,
  setValReservPatient,
  userSelected,
  setReservUser,
  reservUser,
  pageStateReception,
}) {
  useEffect(() => {
    if (userSelected.userId) {
      axios
        .get(`${mainDomain}/api/Reservation/GetList`, {
          params: {
            patientUserId: userSelected.userId,
            statusId: 1,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setReservUser(res.data);
          setValReservPatient(res.data.length !== 0 ? res.data[0].reservationId : '');
        })
        .catch((err) => {});
    } else {
      setReservUser([]);
      setValReservPatient([]);
    }
  }, [userSelected, pageStateReception]);
  return (
    <>
      <div className="w-full mt-3">
        <FormControl color="primary" className="w-full">
          <InputLabel color="primary" className="px-2" id="demo-simple-select-label">
            لیست رزروهای بیمار
          </InputLabel>
          <Select
            onChange={(e) => setValReservPatient(e.target.value)}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="لیست رزروهای بیمار"
            color="primary"
            value={valReservPatient}
          >
            {reservUser.length > 0 &&
              reservUser.map((e) => (
                <MenuItem key={e.reservationId} value={e.reservationId}>
                  <span>{e.reservationTimeDateFA}</span>
                  <span>
                    ساعت {e.reservationTimeFromTime.slice(0,5)} تا {e.reservationTimeToTime.slice(0,5)}
                  </span>
                </MenuItem>
              ))}
            {userSelected.length === 0 && <MenuItem disabled>لطفا ابتدا بیمار را ثبت کنید</MenuItem>}
            {reservUser.length === 0 && userSelected.length !== 0 && <MenuItem disabled>صفحه رزرو خالی است</MenuItem>}
          </Select>
        </FormControl>
      </div>
    </>
  );
}

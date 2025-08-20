import { TextField } from '@mui/material';
import { useEffect } from 'react';
import persian from 'react-date-object/calendars/persian';
import persianFa from 'react-date-object/locales/persian_fa';
import DatePicker from 'react-multi-date-picker';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import useSettings from '../../hooks/useSettings';
// import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import TimePicker from 'react-multi-date-picker/plugins/time_picker';

export default function BoxChangDate({
  valReservPatient,
  reservUser,
  userSelected,
  date,
  setDate,
  valTimeStart,
  setValTimeStart,
  valTimeEnd,
  setValTimeEnd,
  setTurn,
  turn,
  editeUser,
  setIsEditStartTime,
  setIsEditEndTime,
}) {

  const { themeMode } = useSettings();

  useEffect(() => {
    if (editeUser.appointmentId) {
      const startTime = new Date();
      startTime.setHours(Number(editeUser.startTime.slice(0, 2)));
      startTime.setMinutes(Number(editeUser.startTime.slice(3, 5)));
      setValTimeStart(startTime);
      const endTime = new Date();
      endTime.setHours(Number(editeUser.endTime.slice(0, 2)));
      endTime.setMinutes(Number(editeUser.endTime.slice(3, 5)));
      setValTimeEnd(endTime);
    }
  }, [editeUser]);



  useEffect(() => {
    if (reservUser.length !== 0) {
      reservUser
        .filter((ev) => ev.reservationId === valReservPatient)
        .map((e) => {
          setDate(e.reservationTimeDateFA);
          
          // setValTimeStart(e.reservationTimeFromTime);
          const startTime = new Date();
      startTime.setHours(Number(e.reservationTimeFromTime.slice(0, 2)));
      startTime.setMinutes(Number(e.reservationTimeFromTime.slice(3, 5)));
      setValTimeStart(startTime);
          // setValTimeEnd(e.reservationTimeToTime);
          const endTime = new Date();
      endTime.setHours(Number(e.reservationTimeToTime.slice(0, 2)));
      endTime.setMinutes(Number(e.reservationTimeToTime.slice(3, 5)));
      setValTimeEnd(endTime);
          return true;
        });
    } else if (reservUser.length === 0 && !editeUser.appointmentDateFA) {
      setDate(new Date().toLocaleDateString('fa-IR'));
    } else if (reservUser.length === 0 && editeUser.appointmentDateFA) {
      setDate(editeUser.appointmentDateFA);
    }
    // if (
    //   userSelected.length === 0 ||
    //   reservUser.filter((ev) => ev.reservationTimeId === valReservPatient).length === 0
    // ) {
    //   setValTimeStart('');
    //   setValTimeEnd('');
    // }
  }, [userSelected, valReservPatient]);

  return (
    <>
      <div className="flex flex-col justify-center items-start w-full">
        <div className="lg:pr-4 mt-3 flex flex-wrap">
          <div className='sm:w-2/5 w-full sm:mt-0 mt-3'>
            <DatePicker
            
            style={{backgroundColor:themeMode==='light'?'white':'#161c24'}}
              inputClass="outline-none border rounded-lg w-full h-14 px-3"
              locale={persianFa}
              calendar={persian}
              value={date}
              onChange={(event) => {
                setDate(event.format());
              }}
              placeholder="تاریخ رزرو"
            />
          </div>
         
          <div className="sm:pr-2 sm:w-1/5 w-full sm:mt-0 mt-3">
            <DatePicker
            style={{backgroundColor:themeMode==='light'?'white':'#161c24'}}
              children
              inputClass="border w-full rounded-lg h-14 px-3"
              disableDayPicker
              format="HH:mm"
              plugins={[<TimePicker hideSeconds key={userSelected} />]}
              calendarPosition="bottom-right"
              onChange={(event) => {
                setValTimeStart(event);
                setIsEditStartTime(true)
              }}
              value={valTimeStart}
              placeholder="ساعت شروع"
            />
          </div>
         
          <div className="sm:pr-2 sm:w-1/5 w-full sm:mt-0 mt-3">
            <DatePicker
            style={{backgroundColor:themeMode==='light'?'white':'#161c24'}}
              inputClass="border w-full rounded-lg h-14 px-3"
              disableDayPicker
              format="HH:mm"
              plugins={[<TimePicker hideSeconds key={valTimeEnd} />]}
              calendarPosition="bottom-right"
              onChange={(event) => {
                setValTimeEnd(event);
                setIsEditEndTime(true)
              }}
              value={valTimeEnd}
              placeholder="ساعت پایان"
            />
          </div>
          <div className="sm:pr-2 flex justify-center sm:w-1/5 w-full sm:mt-0 mt-3 ">
            <TextField
              onChange={(e) => setTurn(e.target.value)}
              type="number"
              className="w-1/2"
              id="outlined-multiline-flexible"
              label="نوبت"
              multiline
              value={turn}
            />
            {/* <div className="px-1 overflow-hidden">
                <input
                placeholder='نوبت'
                  value={turn}
                  onChange={(e) => setTurn(e.target.value)}
                  className="w-14 h-14 border text-center outline-none p-2 rounded-lg"
                  type="text"
                />
              </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

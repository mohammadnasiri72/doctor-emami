/* eslint-disable no-nested-ternary */
import { Button, Card, Chip } from '@mui/material';
import { FaEye } from 'react-icons/fa';
import { FaUserDoctor } from 'react-icons/fa6';
import { FcInspection } from 'react-icons/fc';
import { IoCalendarOutline } from 'react-icons/io5';

export default function BoxReceptionPatient({
  reception,
  setPageStateVisitHistory,
  setReceptionSelected,
  setPageState,
  setPageStateReception,
  setPageStateReserveHistory,
  setPatSelected,
}) {
  return (
    <>
      <Card className="relative w-full h-full">
        <div className="px-4 py-2">
          <div className="absolute left-3">
            <Chip
              size="small"
              label={reception.status}
              sx={{
                backgroundColor:
                  reception.statusId === 5
                    ? 'rgb(239 68 68)'
                    : reception.statusId === 4
                    ? 'rgb(34 197 94)'
                    : reception.statusId === 3
                    ? 'rgb(20 184 166)'
                    : reception.statusId === 2
                    ? 'rgb(234 179 8)'
                    : 'rgb(59 130 246)',
                color: 'white',
              }}
              variant="filled"
            />
          </div>

          <div className="flex items-center text-sm">
            <FaUserDoctor className="text-2xl" />
            <span className="px-2">
              {reception.doctorFirstName} {reception.doctorLastName}
            </span>
          </div>
          <div className="mt-2 flex items-center ">
            <IoCalendarOutline className="text-xl" />
            <span className="px-2 text-sm">{reception.appointmentDateFA}</span>
          </div>
        </div>
        <div className="flex p-3">
          {reception.statusId === 4 && (
            <div className="px-1 w-full">
              <Button
                size="small"
                sx={{
                  py: 1,
                  width: '100%',
                  boxShadow: 'none',
                  fontSize: 12,
                  color: 'white',
                  backgroundColor: 'rgb(20 184 166)',
                  '&:hover': {
                    backgroundColor: 'rgb(13 148 136)',
                  },
                }}
                className="duration-300 mt-1 whitespace-nowrap"
                onClick={() => {
                  if (setPageState) {
                    setPageState(5);
                  } else if (setPageStateVisitHistory) {
                    setPageStateVisitHistory(1);
                  } else if (setPageStateReception) {
                    setPageStateReception(3);
                  } else if (setPageStateReserveHistory) {
                    setPageStateReserveHistory(1);
                  }
                  setReceptionSelected(reception);
                }}
                variant="contained"
              >
                <FaEye className="text-xl" />
                <span className="whitespace-nowrap px-1"> مشاهده جزئیات</span>
              </Button>
            </div>
          )}
          {localStorage.getItem('roles').includes('Staff') && (reception.statusId === 3 || reception.statusId === 4) && (
            <div className="px-1 w-full">
              <Button
                size="small"
                sx={{
                  py: 1,
                  width: '100%',
                  boxShadow: 'none',
                  fontSize: 12,
                  color: 'white',
                  backgroundColor: 'rgb(16 185 129)',
                  '&:hover': {
                    backgroundColor: 'rgb(5 150 105)',
                  },
                }}
                className="duration-300 mt-1 whitespace-nowrap"
                onClick={() => {
                  if (setPageState) {
                    setPageState(6);
                    if (setPatSelected) {
                      setPatSelected(reception);
                    }
                  } else if (setPageStateReception) {
                    setPageStateReception(4);
                  } else if (setPageStateReserveHistory) {
                    setPageStateReserveHistory(2);
                    setReceptionSelected(reception);
                  }
                }}
                variant="contained"
              >
                <FcInspection className="text-xl" />
                <span className="whitespace-nowrap px-1">معاینه</span>
              </Button>
            </div>
          )}
        </div>
      </Card>
    </>
  );
}

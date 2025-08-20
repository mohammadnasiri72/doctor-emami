import { Button } from '@mui/material';
import { FaEye } from 'react-icons/fa';
import { IoMdTime } from 'react-icons/io';
import { IoCalendarOutline } from 'react-icons/io5';
import { mainDomain } from '../../utils/mainDomain';

export default function MyVisitedBox({ list, doctor, setPageStateMyReserv, setReceptionSelected }) {
  return (
    <>
      <div className="flex items-center">
        <div className="w-1/4 p-3">
          <div className="w-16 h-16 border rounded-full cursor-pointer">
            <img className="w-full h-full rounded-full" src={mainDomain + list.doctorAvatar} alt="" />
          </div>
        </div>
        <div className="w-3/4 text-start">
          <p className="lg:text-sm text-sm font-semibold whitespace-nowrap">
            {list.doctorFirstName} {list.doctorLastName}
          </p>
          <p className="mt-1 font-semibold text-sm">{doctor?.specialization}</p>
        </div>
      </div>
      <div className="px-10">
        <div className="flex items-center">
          <IoCalendarOutline className="text-2xl" />
          <p className="px-2">{list.appointmentDateFA}</p>
        </div>
        <div className="flex items-center mt-1">
          <IoMdTime className="text-2xl" />
          <p className="px-2 whitespace-nowrap">
            {list.startTime.slice(0, 5)} الی {list.endTime.slice(0, 5)}
          </p>
        </div>
      </div>
      <div className="text-start mt-1 p-3">
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
            setPageStateMyReserv(1);
            setReceptionSelected(list);
          }}
          variant="contained"
        >
          <FaEye className="text-xl" />
          <span className="whitespace-nowrap px-1"> مشاهده جزئیات</span>
        </Button>
      </div>
    </>
  );
}

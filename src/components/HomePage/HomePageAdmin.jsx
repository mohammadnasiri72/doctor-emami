import axios from 'axios';
import { IoStatsChartOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import ChartMainPage from './ChartMainPage';
import { mainDomain } from '../../utils/mainDomain';
import BarChartReserve from './BarChartReserve';
import ChartPatient from './ChartPatient';

export default function HomePageAdmin({ account }) {
  const [counselings, setCounselings] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    axios
      .get(`${mainDomain}/api/Report/Dashboard`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setCounselings(res.data.filter((e) => e.category === 'counselings'));
        setAppointments(res.data.filter((e) => e.category === 'appointments'));
        setReservations(res.data.filter((e) => e.category === 'reservations'));
        setPatients(res.data.filter((e) => e.category === 'patients'));
      })
      .catch((err) => {});
  }, []);
  return (
    <>
      <div>
        <h3 className="text-start font-semibold text-lg">نوبت های امروز : </h3>
        <div className="flex flex-wrap mt-1 ">
          {reservations.map((e) => (
            <div key={e.status} className="md:w-1/3 w-full px-2">
              <div className="border rounded-lg shadow-lg py-5 px-2">
                <h4 className="text-start text-teal-700">نوبت های {e.status} : </h4>
                <div className="flex justify-between items-center mt-3">
                  <div className="w-1/2 flex justify-center">
                    <IoStatsChartOutline className="text-5xl text-teal-700" />
                  </div>
                  <span className="text-2xl font-semibold w-1/2 text-teal-700">{e.number}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className=" lg:w-1/2 w-full p-3 ">
          <div className="border  rounded-xl shadow-xl overflow-hidden p-3">
            <h3 className="text-start font-semibold mb-5">تاریخچه ویزیت آنلاین </h3>
            <ChartMainPage counselings={counselings} />
          </div>
        </div>
        <div className=" lg:w-1/2 w-full p-3">
          <div className="border  rounded-xl shadow-xl overflow-hidden p-3">
            <h3 className="text-start font-semibold mb-5">آمار بیماران </h3>
            <ChartPatient patients={patients} />
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="border  rounded-xl shadow-xl overflow-hidden p-3">
          <h3 className="text-start font-semibold">آمار روزانه خدمات حضوری </h3>
          <BarChartReserve appointments={appointments} />
        </div>
      </div>
    </>
  );
}

/* eslint-disable no-undef */
import { Backdrop, Box, CircularProgress, Paper, Skeleton, Tab, Tabs } from '@mui/material';
import { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import MessageHandler from '../Reception/MessageHandler';
import BoxReceptionPatient from '../VisitHistory/BoxReceptionPatient';
import UserCard from './UserCard';
import useSettings from '../../hooks/useSettings';
import SimpleBackdrop from '../backdrop';
import ShowFileUploaded from './showFileUploaded';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function DetailsPatient({
  showDetailsPatient,
  setShowDetailsPatient,
  patient,
  setPageState,
  setReceptionSelected,
  historyReception,
  setPageStateReception,
  setPageStateReserveHistory,
  setIsLoading,
  setPatSelected,
  isLoading,
  setHistoryReception,
  setPatient,
  appointmentId
}) {
  const [openBoxMessage, setOpenBoxMessage] = useState(false);
  const [userId, setUserId] = useState('');
  const [value, setValue] = useState(0);
  const [isShowfilePatient, setIsShowfilePatient] = useState(false);


  useEffect(() => {
    if (!showDetailsPatient) {
      if (setPatient) {
        setPatient({});
      }
      if (setHistoryReception) {
        setHistoryReception([])
      }
    }
  }, [showDetailsPatient]);

  const { themeMode } = useSettings();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setUserId([patient.userId]);
  }, [patient]);

  

  return (
    <>
      <div
        style={{
          zIndex: '1301',
          transform: showDetailsPatient ? 'translateX(0)' : 'translateX(-100%)',
          backgroundColor: themeMode === 'light' ? 'rgb(248 250 252)' : '#161c24',
        }}
        className="fixed top-0 bottom-0 lg:right-2/3 sm:right-1/2 right-0 left-0 duration-500 p-5 shadow-lg overflow-y-auto"
      >
        <IoClose
          onClick={() => {
            setShowDetailsPatient(false);
          }}
          className="absolute z-50 right-3 top-2 text-4xl hover:scale-125 cursor-pointer duration-300 rounded-full bg-slate-300 p-2"
        />

        <div className="">
          <UserCard
            patient={patient}
            setOpenBoxMessage={setOpenBoxMessage}
            setShowDetailsPatient={setShowDetailsPatient}
            isLoading={isLoading}
            setIsShowfilePatient={setIsShowfilePatient}
          />
        </div>
        <p className="text-xl font-semibold mt-3">سوابق پذیرش ها</p>
        {isLoading && (
          <div className="w-full">
            <Skeleton height={100} animation="wave" />
            
          </div>
        )}
        
        {!isLoading && (
          <div className="mt-5">
            
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs sx={{ width: '100%' }} value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab sx={{ width: '50%' }} label="حضوری" {...a11yProps(0)} />
                <Tab sx={{ width: '50%' }} label="ویزیت آنلاین" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              {historyReception.length > 0 &&
                historyReception
                  .filter((e) => e.typeId === 1)
                  .filter((e) => e.statusId === 3 || e.statusId === 4)

                  .map((e) => (
                    <div key={e.appointmentId} className="w-full mt-3">
                      <BoxReceptionPatient
                        reception={e}
                        setPageState={setPageState}
                        setReceptionSelected={setReceptionSelected}
                        setPageStateReception={setPageStateReception}
                        setPageStateReserveHistory={setPageStateReserveHistory}
                        setPatSelected={setPatSelected}
                      />
                    </div>
                  ))}
              {historyReception.length === 0 && isLoading && <SimpleBackdrop />}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              {historyReception.filter((e) => e.typeId === 2).length > 0 &&
                historyReception
                  .filter((e) => e.typeId === 2)
                  .filter((e) => e.statusId === 3 || e.statusId === 4)
                  .map((e) => (
                    <div key={e.appointmentId} className="w-full mt-3">
                      <BoxReceptionPatient
                        reception={e}
                        setPageState={setPageState}
                        setReceptionSelected={setReceptionSelected}
                        setPageStateReception={setPageStateReception}
                        setPageStateReserveHistory={setPageStateReserveHistory}
                        setPatSelected={setPatSelected}
                      />
                    </div>
                  ))}
            </CustomTabPanel>
          </div>
        )}
      </div>
      <MessageHandler open={openBoxMessage} setOpen={setOpenBoxMessage} userId={userId} setIsLoading={setIsLoading} />
      <ShowFileUploaded
        isShowfilePatient={isShowfilePatient}
        setIsShowfilePatient={setIsShowfilePatient}
        nationalId={patient.nationalId}
        appointmentId={appointmentId}
      />
      {
        isShowfilePatient &&
      <Paper
          sx={{ backgroundColor: '#0000' }}
          style={{ zIndex: 1302 }}
          onClick={() => {
            setIsShowfilePatient(false);
          }}
          className="fixed top-0 left-0 right-0 bottom-0"
        />
      }
    </>
  );
}

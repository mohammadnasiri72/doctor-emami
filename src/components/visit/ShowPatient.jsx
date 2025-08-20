import { ToggleButton } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useEffect } from 'react';
import { FaRegUser } from 'react-icons/fa';
import { SlUser, SlUserFemale } from 'react-icons/sl';
import SwipeableViews from 'react-swipeable-views';
import { mainDomain } from '../../utils/mainDomain';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    'aria-controls': `action-tabpanel-${index}`,
  };
}

export default function ShowPatient({
  setPatSelected,
  patSelected,
  pageStateVisit,
  setIsLoading,
  fromPersianDate,
  toPersianDate,
  setPageStateCunsel,
  setPatientWating,
}) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [valDoing, setValDoing] = React.useState('');
  const [valWating, setValWating] = React.useState('');
  const [patListDoing, setPatListDoing] = React.useState([]);
  const [patListWating, setPatListWating] = React.useState([]);
  const [flagDoing, setFlagDoing] = React.useState(false);
  const [flagWaiting, setFlagWaiting] = React.useState(false);

  useEffect(() => {
    if (value === 0) {
      setIsLoading(true);
      axios
        .get(`${mainDomain}/api/Appointment/GetList`, {
          params: {
            typeId: setPageStateCunsel ? 2 : 1,
            doctorMedicalSystemId: -1,
            fromPersianDate,
            toPersianDate,
            statusId: 3,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setIsLoading(false);
          setPatListDoing(res.data);
        })
        .catch((err) => {
          setIsLoading(false);
        });
    }
  }, [toPersianDate, fromPersianDate, flagDoing]);

  useEffect(() => {
    if (value === 1) {
      setIsLoading(true);
      axios
        .get(`${mainDomain}/api/Appointment/GetList`, {
          params: {
            typeId: setPageStateCunsel ? 2 : 1,
            doctorMedicalSystemId: -1,
            fromPersianDate,
            toPersianDate,
            statusId: 2,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setIsLoading(false);
          setPatListWating(res.data);
        })
        .catch((err) => {
          setIsLoading(false);
        });
    }
  }, [toPersianDate, fromPersianDate, flagWaiting]);

  // React.useEffect(() => {
  //   if (patSelected.appointmentId) {

  //     setValDoing(patSelected.appointmentId);
  //   }
  // }, [pageStateVisit, patSelected]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };


  return (
    <Box
      className="h-full"
      sx={{
        bgcolor: 'background.paper',
        width: '100%',
        position: 'relative',
        minHeight: 200,
      }}
    >
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="action tabs example"
        >
          <Tab
            style={{ color: 'rgb(20 184 166)' }}
            onClick={() => setFlagDoing((e) => !e)}
            label="در حال انجام"
            {...a11yProps(0)}
          />
          {!setPageStateCunsel && (
            <Tab
              style={{ color: 'rgb(234 179 8)' }}
              onClick={() => setFlagWaiting((e) => !e)}
              label="لیست انتظار"
              {...a11yProps(1)}
            />
          )}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <div className="w-full p-0 m-0 flex justify-start overflow-hidden">
          <div
            className="max-h-[70vh] min-h-20 overflow-auto w-full p-0 m-0 flex flex-col"
            role="tabpanel"
            value={value}
            index={0}
            dir={theme.direction}
          >
            {patListDoing.length > 0 &&
              patListDoing.map((e) => (
                <ToggleButton
                  className="duration-300"
                  sx={{
                    mt: 1,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    bgcolor: 'rgb(20 184 166)',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'rgb(13 148 136)',
                    },
                  }}
                  onClick={() => {
                    setPatientWating(false);
                    setPatSelected(e);
                  }}
                  key={e.appointmentId}
                  value={e.appointmentId}
                  aria-label="list"
                >
                  <div className="flex items-center">
                    <div>
                      {e.patientGender === 'm' ? <SlUser className="text-xl" /> : <SlUserFemale className="text-xl" />}
                    </div>

                    <span className="px-1">{`${e.patientFirstName} ${e.patientLastName}`}</span>
                  </div>
                  <span className="text-sm">{`${e.patientNationalId}`}</span>
                </ToggleButton>
              ))}
            {patListDoing.length === 0 && (
              <div className="w-full mt-5">در این تاریخ {setPageStateCunsel ? 'درخواستی' : 'نوبتی'} ثبت نشده است</div>
            )}
          </div>
        </div>
        <div className="w-full p-0 m-0 flex justify-start overflow-hidden">
          <div
            role="tabpanel"
            className="max-h-[70vh] min-h-20 overflow-auto w-full p-0 m-0 flex flex-col"
            value={value}
            index={1}
            dir={theme.direction}
          >
            {patListWating.length > 0 &&
              patListWating.map((e) => (
                <div key={e.appointmentId} className="w-full">
                  <ToggleButton
                    className="duration-300"
                    sx={{
                      mt: 1,
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      backgroundColor: 'rgb(234 179 8)',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'rgb(202 138 4)',
                      },
                    }}
                    onClick={() => {
                      setPatientWating(true);
                      setPatSelected(e);
                    }}
                  >
                    <div className="flex items-center">
                      <div>
                        {e.patientGender === 'm' ? (
                          <SlUser className="text-xl" />
                        ) : (
                          <SlUserFemale className="text-xl" />
                        )}
                      </div>
                      <span className="px-1">{`${e.patientFirstName} ${e.patientLastName}`}</span>
                    </div>
                    <span className="text-sm">{`${e.patientNationalId}`}</span>
                  </ToggleButton>
                </div>
              ))}
            {patListWating.length === 0 && <div className="mt-5 w-full">لیست انتظار خالی است</div>}
          </div>
        </div>
      </SwipeableViews>
    </Box>
  );
}

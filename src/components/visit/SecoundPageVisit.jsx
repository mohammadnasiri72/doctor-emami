/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button } from '@mui/material';
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
import { BsCapsulePill } from 'react-icons/bs';
import { FaRegFolderOpen, FaUserMd } from 'react-icons/fa';
import { FaRegPenToSquare } from 'react-icons/fa6';
import { SlUser, SlUserFemale } from 'react-icons/sl';
import SwipeableViews from 'react-swipeable-views';
import { mainDomain } from '../../utils/mainDomain';
import BoxAudio from '../Counseling/BoxAudio';
import BoxImg from '../Counseling/BoxImg';
import BoxVideo from '../Counseling/BoxVideo';
import DiagnosisPatient from './DiagnosisPatient';
import DrugPatient from './DrugPatient';
import InformationPatient from './InformationPatient';
import Order from './Order';
import UploadDocumentsDoctor from './UploadDocumentsDoctor';
import ViewOrderPopup from './ViewOrderPopup';
import ShowDocUploaded from './ShowDocUploaded';

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

export default function SecoundPageVisit({
  patSelected,
  setIsLoading,
  isLoading,
  setPageState,
  disabledChechBox,
  valCondition,
  setValCondition,
  medicalRecord,
  pageStateCunsel,
  setPageStateReception,
  setPageStateReserveHistory,
  listReception,
  setReceptionSelected,
  setPageStateVisit,
  setAccount
}) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [infoPat, setInfoPat] = React.useState({});
  const [isOpenOrder, setIsOpenOrder] = React.useState(false);
  const [orderEdit, setOrderEdit] = React.useState([]);
  const [flag, setFlag] = React.useState(false);

  const [filesUpload, setFilesUpload] = React.useState([]);
  const [isShowImg, setIsShowImg] = React.useState(false);
  const [isShowAudio, setIsShowAudio] = React.useState(false);
  const [isShowVideo, setIsShowVideo] = React.useState(false);
  const [src, setSrc] = React.useState('');
  const [srcVideo, setSrcVideo] = React.useState('');
  const [srcAudio, setSrcAudio] = React.useState('');
const [isShowDocPatient, setIsShowDocPatient] = React.useState(false);
  useEffect(() => {
    axios
      .get(`${mainDomain}/api/Patient/GetList`, {
        params: {
          query: patSelected.patientNationalId,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setInfoPat(res.data[0]);
      })
      .catch((err) => {});
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <>
      {(setPageState || setPageStateReception || setPageStateReserveHistory) && (
        <div className="text-start">
          <Button
            sx={{
              py: 1,
              boxShadow: 'none',
              backgroundColor: 'rgb(20 184 166)',
              '&:hover': {
                backgroundColor: 'rgb(13 148 136)',
              },
            }}
            className="p-2 rounded-md duration-300 mt-2 text-white"
            onClick={() => {
              if (setPageState) {
                setPageState(0);
              }
              if (setPageStateReception) {
                setPageStateReception(0);
              }
              if (setPageStateReserveHistory) {
                setPageStateReserveHistory(0);
              }
            }}
            variant="contained"
          >
            برگشت به صفحه قبل
          </Button>
        </div>
      )}
      <div className="flex">
        <Box
          sx={{
            bgcolor: 'background.paper',
            position: 'relative',
            minHeight: 200,
            width: '100%',
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
              className="text-teal-200"
            >
              <Tab
                sx={{
                  backgroundColor: value === 0 ? 'rgb(20 184 166)' : 'rgb(153 246 228 )',
                  color: value === 0 ? 'white !important' : '',
                }}
                icon={
                  patSelected.patientGender === 'm' ? (
                    <SlUser className="text-xl" />
                  ) : (
                    <SlUserFemale className="text-xl" />
                  )
                }
                label="اطلاعات بیمار"
                {...a11yProps(0)}
              />
              {!setPageState && !setPageStateReception && !setPageStateReserveHistory && (
                <Tab
                  sx={{
                    backgroundColor: value === 1 ? 'rgb(20 184 166)' : 'rgb(153 246 228 )',
                    color: value === 1 ? 'white !important' : '',
                  }}
                  icon={<FaUserMd className="text-xl" />}
                  label="معاینه"
                  {...a11yProps(1)}
                />
              )}
              {!setPageState && !setPageStateReception && !setPageStateReserveHistory && (
                <Tab
                  sx={{
                    backgroundColor: value === 2 ? 'rgb(20 184 166)' : 'rgb(153 246 228 )',
                    color: value === 2 ? 'white !important' : '',
                  }}
                  icon={<BsCapsulePill className="text-xl" />}
                  label="دارو ها"
                  {...a11yProps(2)}
                />
              )}
              <Tab
                sx={{
                  backgroundColor: value === 3 ? 'rgb(20 184 166)' : 'rgb(153 246 228 )',
                  color: value === 3 ? 'white !important' : '',
                }}
                icon={<FaRegPenToSquare className="text-xl" />}
                label="اردرها"
                {...a11yProps(2)}
              />
              <Tab
                sx={{
                  backgroundColor: value === 4 ? 'rgb(20 184 166)' : 'rgb(153 246 228 )',
                  color: value === 4 ? 'white !important' : '',
                }}
                icon={<FaRegFolderOpen className="text-xl" />}
                label="فایل های ضمیمه"
                {...a11yProps(2)}
              />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <InformationPatient
                infoPat={infoPat}
                setIsLoading={setIsLoading}
                isLoading={isLoading}
                listReception={listReception}
                setReceptionSelected={setReceptionSelected}
                setPageStateVisit={setPageStateVisit}
                setAccount={setAccount}
                setIsShowDocPatient={setIsShowDocPatient}
              />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              {(setPageState || setPageStateReception || setPageStateReserveHistory) && (
                <Order
                  patSelected={patSelected}
                  setIsLoading={setIsLoading}
                  setIsOpenOrder={setIsOpenOrder}
                  setOrderEdit={setOrderEdit}
                  setFlag={setFlag}
                  flag={flag}
                  setPageState={setPageState}
                  isLoading={isLoading}
                />
              )}
              {!setPageState && !setPageStateReception && !setPageStateReserveHistory && (
                <DiagnosisPatient
                  patSelected={patSelected}
                  setIsLoading={setIsLoading}
                  disabledChechBox={disabledChechBox}
                  valCondition={valCondition}
                  setValCondition={setValCondition}
                  medicalRecordd={medicalRecord}
                  pageStateCunsel={pageStateCunsel}
                />
              )}
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
              {(setPageState || setPageStateReception || setPageStateReserveHistory) && (
                <UploadDocumentsDoctor
                  patSelected={patSelected}
                  setIsLoading={setIsLoading}
                  filesUpload={filesUpload}
                  setFilesUpload={setFilesUpload}
                  isShowImg={isShowImg}
                  setIsShowImg={setIsShowImg}
                  isShowAudio={isShowAudio}
                  setIsShowAudio={setIsShowAudio}
                  isShowVideo={isShowVideo}
                  setIsShowVideo={setIsShowVideo}
                  src={src}
                  setSrc={setSrc}
                  srcVideo={srcVideo}
                  setSrcVideo={setSrcVideo}
                  srcAudio={srcAudio}
                  setSrcAudio={setSrcAudio}
                />
              )}
              {!setPageState && !setPageStateReception && !setPageStateReserveHistory && (
                <DrugPatient patSelected={patSelected} setIsLoading={setIsLoading} isLoading={isLoading} />
              )}
            </TabPanel>
            <TabPanel value={value} index={3} dir={theme.direction}>
              <Order
                patSelected={patSelected}
                setIsLoading={setIsLoading}
                setIsOpenOrder={setIsOpenOrder}
                setOrderEdit={setOrderEdit}
                setFlag={setFlag}
                flag={flag}
                isLoading={isLoading}
              />
            </TabPanel>
            <TabPanel value={value} index={4} dir={theme.direction}>
              <UploadDocumentsDoctor
                patSelected={patSelected}
                setIsLoading={setIsLoading}
                filesUpload={filesUpload}
                setFilesUpload={setFilesUpload}
                isShowImg={isShowImg}
                setIsShowImg={setIsShowImg}
                isShowAudio={isShowAudio}
                setIsShowAudio={setIsShowAudio}
                isShowVideo={isShowVideo}
                setIsShowVideo={setIsShowVideo}
                src={src}
                setSrc={setSrc}
                srcVideo={srcVideo}
                setSrcVideo={setSrcVideo}
                srcAudio={srcAudio}
                setSrcAudio={setSrcAudio}
              />
            </TabPanel>
          </SwipeableViews>
        </Box>

        <ViewOrderPopup
          isOpenOrder={isOpenOrder}
          setIsOpenOrder={setIsOpenOrder}
          setIsLoading={setIsLoading}
          orderEdit={orderEdit}
          setFlag={setFlag}
        />
        <BoxImg isShowImg={isShowImg} setIsShowImg={setIsShowImg} src={src} filesUpload={filesUpload} setSrc={setSrc} />
        <BoxVideo srcVideo={srcVideo} isShowVideo={isShowVideo} setIsShowVideo={setIsShowVideo} />
        <BoxAudio isShowAudio={isShowAudio} srcAudio={srcAudio} setIsShowAudio={setIsShowAudio} />
      </div>












      <ShowDocUploaded
        isShowfilePatient={isShowDocPatient}
        setIsShowfilePatient={setIsShowDocPatient}
        nationalId={patSelected.patientNationalId}
        appointmentId={patSelected.appointmentId}
      />
<div
        onClick={() => setIsShowDocPatient(false)}
        style={{ zIndex: 1300, display: isShowDocPatient ? 'block' : 'none' }}
        className="fixed top-0 bottom-0 left-0 right-0 bg-[#0008]"
      />
    </>
  );
}

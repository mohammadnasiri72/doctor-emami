/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Avatar, Box, Card, Divider, IconButton, Skeleton, Tooltip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { AiOutlineMessage } from 'react-icons/ai';
import { IoDocuments } from 'react-icons/io5';
import cssStyles from '../../utils/cssStyles';
import { mainDomain } from '../../utils/mainDomain';
import SimpleBackdrop from '../backdrop';

// ----------------------------------------------------------------------

const OverlayStyle = styled('div')(({ theme }) => ({
  ...cssStyles().bgBlur({ blur: 2, color: theme.palette.primary.darker }),
  top: 0,
  zIndex: 8,
  content: "''",
  width: '100%',
  height: '100%',
  position: 'absolute',
}));

// ----------------------------------------------------------------------

UserCard.propTypes = {
  patient: PropTypes.object.isRequired,
};

export default function UserCard({
  patient,
  setOpenBoxMessage,
  setShowDetailsPatient,
  isLoading,
  setIsShowfilePatient,
}) {
  return (
    <>
      {patient.nationalId && !isLoading && (
        <Card sx={{ textAlign: 'center', pb: 2 }}>
          <Box sx={{ position: 'relative' }}>
            {!isLoading && (
              <Avatar
                alt={'avatar'}
                src={mainDomain + patient.avatar}
                sx={{
                  width: 64,
                  height: 64,
                  zIndex: 11,
                  left: 0,
                  right: 0,
                  bottom: -32,
                  mx: 'auto',
                  position: 'absolute',
                }}
              />
            )}
            {isLoading && (
              <div className="absolute top-7 left-1/2 -translate-x-1/2 rounded-full bg-[#fff5]">
                <Skeleton variant="circular" width={64} height={64} />
              </div>
            )}
            {/* <OverlayStyle /> */}
            <div className="w-full h-14 overflow-hidden bg-teal-500 text-end">
              <div className="flex justify-end">
                <Tooltip title="مشاهده مدارک">
                  <IconButton
                    onClick={() => {
                      setIsShowfilePatient(true);
                    }}
                  >
                    <IoDocuments className="pl-3 text-5xl cursor-pointer text-yellow-800" />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </Box>

          <div className="flex justify-between px-4 text-sm">
            <div className="mt-10 w-1/6 flex flex-col">
              <span>{patient.gender === 'm' ? 'مرد' : 'زن'}</span>
              <span>{patient.age} سال</span>
            </div>

            <div className="w-2/3">
              <Typography variant="subtitle1" sx={{ mt: 4, fontSize: 20 }}>
                {patient.firstName} {patient.lastName}
              </Typography>

              <div className="flex items-center justify-center">
                <Typography className="px-2" variant="body2" sx={{ color: 'text.secondary' }}>
                  {patient.nationalId}
                </Typography>
                <Tooltip title="ارسال پیام">
                  <IconButton
                    onClick={() => {
                      setOpenBoxMessage(true);
                      setShowDetailsPatient(false);
                    }}
                  >
                    <AiOutlineMessage className="text-xl cursor-pointer hover:text-teal-500 duration-300" />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
            <div className="mt-10 w-1/6">
              <span className=" whitespace-nowrap">{patient.abroad ? 'خارج ایران' : 'ساکن ایران'}</span>
              <p>{patient.foreignNational ? 'اتباع' : ''}</p>
            </div>
          </div>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <div className="flex text-sm">
            <div className="w-1/2 flex px-2">
              <span>فرزند : </span>
              <span className="px-1"> {patient.fatherName ? patient.fatherName : '______'} </span>
            </div>
            <div className="w-1/2 flex px-2 justify-end">
              <span>متولد : </span>
              <span className="px-1"> {patient.dateOfBirthFa} </span>
            </div>
          </div>
          <div className="flex text-sm">
            <div className="w-1/3 flex px-2">
              <span>تلفن : </span>
              <span className="px-2"> {patient.tel ? patient.tel : '______'} </span>
            </div>
            <div className="w-2/3 flex px-2 justify-end">
              <span>استان/شهر : </span>
              <span className="px-1">
                {patient.province ? patient.province : '______'} / {patient.city ? patient.city : '______'}
              </span>
            </div>
          </div>
          <div className="flex px-2 py-1 text-sm">
            <span>موبایل/ایمیل : </span>
            <span className="px-1"> {patient.abroad ? patient.userEmail : patient.userPhoneNumber} </span>
          </div>
          <div className="flex px-2 py-1 text-sm">
            <span>شماره پرونده : </span>
            <span className="px-1"> {patient.fileNumber ? patient.fileNumber : '______'} </span>
          </div>
          <div className="flex px-2 py-1 text-sm">
            <span>آدرس : </span>
            <span className="px-1"> {patient.address ? patient.address : '______'} </span>
          </div>
          {/* <span
            onClick={() => {
              setIsShowfilePatient(true);
            }}
            className="text-teal-500 cursor-pointer"
          >
            مشاهده مدارک ارسال شده
          </span> */}
        </Card>
      )}
      {(isLoading || !patient.nationalId) && (
        <div className="w-full">
          <Skeleton height={350} animation="wave" />
          <SimpleBackdrop />
        </div>
      )}
    </>
  );
}

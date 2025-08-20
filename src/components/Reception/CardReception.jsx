/* eslint-disable no-nested-ternary */
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Button, Chip, Menu, Tooltip } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import * as React from 'react';
import { AiOutlineMessage } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaEye } from 'react-icons/fa';
import { IoCalendarOutline } from 'react-icons/io5';
import { FaUserDoctor } from 'react-icons/fa6';
import { GiCancel } from 'react-icons/gi';
import { TbDoorEnter } from 'react-icons/tb';
import { mainDomain } from '../../utils/mainDomain';
import Iconify from '../Iconify';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CardReception({
  reception,
  setChangStatusCondition,
  setPageStateReception,
  setEditeUser,
  setIsEditStartTime,
  setIsEditEndTime,
  setShowDetailsPatient,
  setPatientId,
  setOpenBoxMessage,
  setUserId,
  setUserSelect,
  setPatSelected,
  setPatient
}) {
  const [expanded, setExpanded] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const nextToRoomDoctor = (e) => {
    const data = new FormData();
    data.append('appointmentId', e.appointmentId);
    axios
      .post(`${mainDomain}/api/Appointment/NextStatus`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setChangStatusCondition((e) => !e);
      })
      .catch((err) => {});
  };
  const cancelHandler = (e) => {
    const data = new FormData();
    data.append('appointmentId', e.appointmentId);
    axios
      .post(`${mainDomain}/api/Appointment/Cancel`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setChangStatusCondition((e) => !e);
      })
      .catch((err) => {});
  };
  const editHandler = (e) => {
    setPageStateReception(1);
    setEditeUser(e);
    // setUserSelected(patientList.find((ev) => ev.nationalId === e.patientNationalId));
    handleClose();
    setIsEditStartTime(false);
    setIsEditEndTime(false);
  };
  return (
    <Card className="relative w-full">
      <CardContent>
        <Box className={'flex justify-center'}>
          <img className="w-14 h-14 rounded-full border object-cover" src={mainDomain + reception.patientAvatar} alt="" />
        </Box>
        <Chip
          size="small"
          className="absolute top-6 right-1"
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
        <div className="absolute left-3 top-6">
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <BsThreeDotsVertical className="cursor-pointer text-2xl" />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <div className="px-4">
              <Tooltip title="مرحله بعد" placement="right">
                <span>
                  <IconButton
                    disabled={reception.statusId > 3}
                    onClick={() => {
                      handleClose();
                      nextToRoomDoctor(reception);
                    }}
                  >
                    <TbDoorEnter style={{ color: reception.statusId > 3 ? 'rgb(51 51 51 51)' : 'rgb(34 197 94)' }} />
                  </IconButton>
                </span>
              </Tooltip>
            </div>
            <div className="px-4">
              <Tooltip title="ویرایش" placement="right">
                <span>
                  <IconButton
                    onClick={() => {
                      editHandler(reception);
                    }}
                    disabled={reception.statusId > 2}
                  >
                    <Iconify icon={'eva:edit-fill'} />
                  </IconButton>
                </span>
              </Tooltip>
            </div>
            <div className="px-4">
              <Tooltip title="مشاهده جزئیات" placement="right">
                <span>
                  <IconButton
                    onClick={() => {
                      setPatSelected(reception);
                      handleClose();
                      setShowDetailsPatient(true);
                      setPatientId(reception.patientNationalId);
                      if (reception?.patientNationalId) {
                        axios
                          .get(`${mainDomain}/api/Patient/GetList`, {
                            params: {
                              query: reception.patientNationalId,
                            },
                            headers: {
                              Authorization: `Bearer ${localStorage.getItem('token')}`,
                            },
                          })
                          .then((res) => {
                            setUserSelect(res.data[0]);
                            setPatient(res.data[0]);
                          })
                          .catch((err) => {});
                      }
                    }}
                  >
                    <FaEye />
                  </IconButton>
                </span>
              </Tooltip>
            </div>
            <div className="px-4">
              <Tooltip title="ارسال پیام" placement="right">
                <span>
                  <IconButton
                    onClick={() => {
                      handleClose();
                      setOpenBoxMessage(true);
                      // setShowDetailsPatient(true)
                      setUserId([reception.patientUserId]);
                    }}
                  >
                    <AiOutlineMessage />
                  </IconButton>
                </span>
              </Tooltip>
            </div>
            <div className="px-4">
              <Tooltip title="کنسل" placement="right">
                <span>
                  <IconButton
                    onClick={() => {
                      cancelHandler(reception);
                      handleClose();
                    }}
                    disabled={reception.statusId > 3}
                  >
                    <GiCancel style={{ color: reception.statusId > 3 ? 'rgb(51 51 51 51)' : 'rgb(239 68 68)' }} />
                  </IconButton>
                </span>
              </Tooltip>
            </div>
          </Menu>
        </div>
        <h3 className="font-semibold">
          {reception.patientFirstName} {reception.patientLastName}
        </h3>
        <p className="font-semibold">{reception.patientNationalId}</p>
        <div className="mt-2 flex justify-start items-center">
          <IoCalendarOutline className="text-xl" />
          <div className="px-2 text-sm">
            <span>{reception?.startTime.slice(0, 5)}</span>
            <span> - </span>
            <span>{reception?.appointmentDateFA}</span>
          </div>
        </div>
        <div className="flex justify-start items-center">
          <FaUserDoctor className="text-xl" />
          <span className="px-2 pt-1 text-sm">
            {reception?.doctorFirstName} {reception?.doctorLastName}
          </span>
        </div>
      </CardContent>
      {/* <CardActions className="h-10" disableSpacing>
        <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions> */}
    </Card>
  );
}

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, Menu, Tooltip } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Swal from 'sweetalert2';
import { mainDomain } from '../../utils/mainDomain';
import Iconify from '../Iconify';

export default function CardRelative({
  title,
  fullName,
  mobile,
  desc,
  address,
  rel,
  setIsLoading,
  setIsOpenAddRelative,
  setEditRelative,
  setFlag,
}) {
  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
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
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // delete relative patient
  const deleteRelativeHandler = () => {
    handleClose();
    Swal.fire({
      title: 'حذف همراه',
      text: 'آیا از ثبت درخواست خود مطمئن هستید؟',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: 'green',
      cancelButtonText: 'انصراف',
      confirmButtonText: 'حذف همراه',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        const data = new FormData();
        data.append('patientRelativeId', rel.patientRelativeId);
        axios
          .post(`${mainDomain}/api/PatientRelative/Delete`, data, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
          .then((res) => {
            setIsLoading(false);
            setFlag((e) => !e);
            Toast.fire({
              icon: 'success',
              text: 'همراه مورد نظر با موفقیت حذف شد',
            });
          })
          .catch((err) => {
            setIsLoading(false);
            Toast.fire({
              icon: 'error',
              text: err.response ? err.response.data : 'خطای شبکه',
            });
          });
      }
    });
  };
  return (
    <>
      <Card>
        <CardHeader
          className="text-start"
          action={
            <div>
              <Button
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <BsThreeDotsVertical className="cursor-pointer text-2xl rounded-full" />
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
                  <Tooltip title="ویرایش" placement="right">
                    <IconButton
                      onClick={() => {
                        handleClose();
                        setIsOpenAddRelative(true);
                        setEditRelative(rel);
                      }}
                    >
                      <Iconify icon={'eva:edit-fill'} />
                    </IconButton>
                  </Tooltip>
                </div>
                <div className="px-4">
                  <Tooltip title="حذف" placement="right">
                    <IconButton onClick={deleteRelativeHandler}>
                      <Iconify className="text-red-500" icon={'eva:trash-2-outline'} />
                    </IconButton>
                  </Tooltip>
                </div>
              </Menu>
            </div>
          }
          title={title}
        />
        <CardContent>
          <p className="text-start mt-1 text-lg">{fullName}</p>
          <p className="text-start mt-1 whitespace-nowrap">{mobile}</p>
        </CardContent>
        <CardActions disableSpacing>
          <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <p>آدرس: {address}</p>
            <p>توضیحات: {desc}</p>
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
}

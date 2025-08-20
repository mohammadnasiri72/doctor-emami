import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    IconButton,
    Switch,
    TextField,
  } from '@mui/material';
  import axios from 'axios';
  import Swal from 'sweetalert2';
  import { useState } from 'react';
  import { IoCloseSharp } from 'react-icons/io5';
  import { mainDomain } from '../../utils/mainDomain';
  
  export default function MessageHandler({ open, setOpen, userId, setIsLoading }) {
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [isActiveNotif, setIsActiveNotif] = useState(true);
    const [errSubject, setErrSubject] = useState(false);
    const [errBody, setErrBody] = useState(false);
  
    //   import sweet alert-2
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-start',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  
    //   close modal
    const handleClose = () => {
      setOpen(false);
      setSubject('');
      setBody('');
      setIsActiveNotif(true);
    };
  
    const sendMessageHandler = () => {
      if (subject.length === 0) {
        setErrSubject(true);
      } else if (body.length === 0) {
        setErrBody(true);
      } else {
        const data = {
          userIdList: userId,
          subject,
          body,
          sendNotification: isActiveNotif,
        };
        setIsLoading(true);
        axios
          .post(`${mainDomain}/api/Message/Add`, data, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
          .then((res) => {
            setIsLoading(false);
            handleClose();
            Toast.fire({
              icon: 'success',
              text: 'پیام با موفقیت ارسال شد',
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
    };
    return (
      <>
        <Dialog
          sx={{ '& .MuiDialog-paper': { minHeight: 455 }, zIndex: '1200' }}
          fullWidth
          maxWidth="sm"
          open={open}
          onClose={handleClose}
        >
          <DialogTitle>ارسال پیام</DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <IoCloseSharp />
          </IconButton>
          <DialogContent>
            <div className="">
              <div className="w-full mt-5">
                <TextField
                  focused={errSubject}
                  color={errSubject ? 'error' : ''}
                  className="w-full text-end"
                  id="outlined-multiline-flexible"
                  label="موضوع"
                  dir="rtl"
                  value={subject}
                  onChange={(e) => {
                    setSubject(e.target.value);
                    setErrSubject(false);
                  }}
                />
              </div>
              <div className="mt-5 w-full">
                <TextField
                  focused={errBody}
                  color={errBody ? 'error' : ''}
                  className="w-full text-end"
                  id="outlined-multiline-flexible"
                  label="متن پیام"
                  dir="rtl"
                  multiline
                  minRows={3}
                  value={body}
                  onChange={(e) => {
                    setBody(e.target.value);
                    setErrBody(false);
                  }}
                />
              </div>
              <div>
                <FormControlLabel
                  value={isActiveNotif}
                  onChange={() => setIsActiveNotif(!isActiveNotif)}
                  control={<Switch checked={isActiveNotif} />}
                  label="اطلاع رسانی"
                />
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              sx={{
                py: 2,
                boxShadow: 'none',
                color: 'white',
                backgroundColor: 'rgb(16 185 129)',
                '&:hover': {
                  backgroundColor: 'rgb(5 150 105)',
                },
              }}
              onClick={sendMessageHandler}
            >
              ارسال پیام
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
  
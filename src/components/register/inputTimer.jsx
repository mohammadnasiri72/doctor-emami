import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { mainDomain } from '../../utils/mainDomain';

export default function InputTimer({ registerModel, setIsLoading }) {
  const [timeResendCode, setTimeResendCode] = useState(120);
  const [showBtnSendCode, setShowBtnSendCode] = useState(false);

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
  const url = '/api/Patient/PreRegister';

  const interval = setInterval(() => {
    if (timeResendCode >= 1) {
      setTimeResendCode(timeResendCode - 1);
      clearInterval(interval);
    }
    if (timeResendCode < 1) {
      setShowBtnSendCode(true);
      clearInterval(interval);
    }
  }, 1000);

  const resendCodeHandler = () => {
    setTimeResendCode(120);

    setIsLoading(true);
    axios
      .post(mainDomain + url, registerModel)
      .then(() => {
        setIsLoading(false);
        setShowBtnSendCode(false);
        Toast.fire({
          icon: 'success',
          text: 'کد شش رقمی ارسال شد',
        });
      })
      .catch((err) => {
        setIsLoading(false);
        Toast.fire({
          icon: 'error',
          text: err.response ? err.response.data : 'خطای شبکه',
        });
      });
  };
  return (
    <>
      <div className="px-2">
        {!showBtnSendCode && (
          <p disabled className="px-5 py-2 rounded-md">
            تا ارسال مجدد: {timeResendCode} ثانیه
          </p>
        )}
        {showBtnSendCode && (
          <button type="button" onClick={resendCodeHandler} className="bg-blue-500 text-white px-5 py-2 rounded-md">
            ارسال مجدد کد
          </button>
        )}
      </div>
    </>
  );
}

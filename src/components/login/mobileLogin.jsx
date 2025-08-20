import React, { useState } from 'react';
import MobileLoginPageOne from './mobileLoginPageOne';
import MobileLoginPageTwo from './mobileLoginPageTwo';

export default function MobileLogin({abroad , setAbroad , setIsLoading , setAccount}) {
  
  const [mobileNumber, setMobileNumber] = useState('');
  const [isValiedMobile, setIsValiedMobile] = useState(false);
 
  
  
  
  
  return (
    <>
      {!isValiedMobile && (
        <MobileLoginPageOne mobileNumber={mobileNumber} setMobileNumber={setMobileNumber} setIsValiedMobile={setIsValiedMobile} abroad={abroad} setAbroad={setAbroad} setIsLoading={setIsLoading}/>
      )}
      {isValiedMobile && (
        <MobileLoginPageTwo setIsValiedMobile={setIsValiedMobile} mobileNumber={mobileNumber} setMobileNumber={setMobileNumber} setIsLoading={setIsLoading} setAccount={setAccount}/>
      )}
    </>
  );
}

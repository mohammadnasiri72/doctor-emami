import { useState } from 'react';
import NationalIdLoginPageOne from './nationalIdLoginPageOne';
import NationalIdLoginPageTwo from './nationalIdLoginPageTwo';

export default function NationalIdLogin({ abroad, setAbroad, setIsLoading , setAccount}) {
  const [forgotPassword, setForgotPassword] = useState(false);

  return (
    <>
      {!forgotPassword && <NationalIdLoginPageOne abroad={abroad} setAbroad={setAbroad} setIsLoading={setIsLoading} setForgotPassword={setForgotPassword} setAccount={setAccount}/>}

      {forgotPassword && <NationalIdLoginPageTwo setForgotPassword={setForgotPassword} setIsLoading={setIsLoading}/>}
    </>
  );
}

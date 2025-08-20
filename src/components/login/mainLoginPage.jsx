import React, { useState } from 'react';
import { Container } from '@mui/material';
import NationalIdLogin from './nationalIdLogin';
import MobileLogin from './mobileLogin';
import SimpleBackdrop from '../backdrop';
import Page from '../Page';
import useSettings from '../../hooks/useSettings';

export default function MainLoginPage({setAccount}) {
  const [abroad, setAbroad] = useState(false);
  const [isLoading , setIsLoading] = useState(false)
  const { themeStretch , themeMode} = useSettings();
  
  
  return (
    <>
    <Page title="ورود">
        
      <div className="flex justify-center items-center min-h-screen">
        <div style={{backgroundColor: themeMode==='light'? 'rgb(241 245 249)':'#161c24'}} className="lg:w-1/2 w-full p-3 min-h-screen">
        <div className="flex justify-center mb-5">
            <img src={'/favicon/lgo.png'} alt="" />
          </div>
          {!abroad && <MobileLogin abroad={abroad} setAbroad={setAbroad} setIsLoading={setIsLoading} setAccount={setAccount}/>}
          {abroad && <NationalIdLogin abroad={abroad} setAbroad={setAbroad} setIsLoading={setIsLoading} setAccount={setAccount}/>}
        </div>
        <div className='lg:w-1/2 w-0 h-screen bg-login bg-cover bg-no-repeat bg-[#0005] bg-blend-multiply opacity-90'/>
      </div>
      {
        isLoading &&
        <SimpleBackdrop />
      }
      </Page>
    </>
  );
}

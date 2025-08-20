import React, { useState } from 'react';
import MainRegisterPage from './mainRegisterPage';
import SecoundRegisterPage from './secoundRegisterPage';
import SimpleBackdrop from '../backdrop';

export default function MainPageRegister({setPageState, pageState , setAccount}) {
  const [isRegister, setIsRegister] = useState(false);
  const [registerModel, setRegisterModel] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      {!isRegister && (
        <MainRegisterPage
          setIsRegister={setIsRegister}
          setRegisterModel={setRegisterModel}
          setIsLoading={setIsLoading}
          setPageState={setPageState}
        />
      )}
      {isRegister && (
        <SecoundRegisterPage
          registerModel={registerModel}
          setIsRegister={setIsRegister}
          setIsLoading={setIsLoading}
          isRegister={isRegister}
          setPageState={setPageState}
          pageState={pageState}
          setAccount={setAccount}
        />
      )}
      {isLoading && <SimpleBackdrop />}
    </>
  );
}

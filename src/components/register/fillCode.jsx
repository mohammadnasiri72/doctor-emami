import React, { createRef, useEffect, useRef, useState } from 'react';
import useSettings from '../../hooks/useSettings';

export default function InputFillCode({ setCode , login}) {
  const inpCode = useRef(new Array(6).fill('').map(() => createRef()));
  const [valueInputCode, setValueInputCode] = useState(new Array(6).fill(''));
  function toEnglishNumber(strNum, name) {
    const pn = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const en = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    let cache = strNum;
    for (let i = 0; i < 10; i += 1) {
      const regexFa = new RegExp(pn[i], 'g');
      cache = cache.replace(regexFa, en[i]);
    }
    return cache;
  }
  let numberCode = '';
  const arrCode = valueInputCode;

  const { themeMode} = useSettings();

  useEffect(() => {
    if (login) {
      inpCode.current[0].current.focus();
    }
  }, [inpCode]);
  const fillCodeHandler = (e, i) => {
    arrCode[i] = e.target.value.slice(0, 1);
    if (arrCode[i].match(/^[0-9]?$/)) {
      setValueInputCode([...arrCode]);
      if (i < 5) {
        inpCode.current[i + 1].current.focus();
      }
      if (valueInputCode[i] === '') {
        if (i===0) {
          inpCode.current[i].current.focus();
        }else{

          inpCode.current[i-1].current.focus();
        }
      }
    } else {
      arrCode[i] = '';
      setValueInputCode(arrCode);
    }
    valueInputCode.map((e) => numCodHandler(e));
    setCode(toEnglishNumber(numberCode));
  };
  function numCodHandler(e) {
    numberCode += e;
  }
  return (
    <>
      <div className=" mx-auto mt-4">
        <div className=" mx-auto mt-4">
          <h3 className="text-start lg:w-2/3 lg:px-0 px-5 w-full mx-auto">کد ارسال شده:</h3>
          <div className="flex mt-5 justify-center px-2 lg:w-3/4 sm:w-5/6 w-full mx-auto" dir="ltr">
            {new Array(6).fill().map((e, i) => (
              <div key={i} className="px-1 overflow-hidden ">
                <input
                  // tabIndex={i + 1}
                  ref={inpCode.current[i]}
                  value={valueInputCode[i]}
                  onChange={(e) => fillCodeHandler(e, i)}
                  style={{backgroundColor: themeMode==='light'? 'rgb(241 245 249)':'#161c24'}}
                  className="border-2 focus:border-green-500 border-gray-500  h-full w-full sm:w-14 sm:h-14  text-slate-600 text-3xl text-center outline-none p-2 rounded-lg"
                  type="number"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

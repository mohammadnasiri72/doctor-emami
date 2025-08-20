import React from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { mainDomain } from '../../utils/mainDomain';

export default function BoxAudio({ isShowAudio, srcAudio, setIsShowAudio }) {
  return (
    <>
      <div
        style={{ display: isShowAudio ? 'block' : 'none', zIndex: '9999999999' }}
        className="fixed top-0 bottom-0 right-0 left-0 bg-[#000a]"
      >
        <IoCloseSharp
          onClick={() => setIsShowAudio(false)}
          className="absolute top-10 right-10 text-white cursor-pointer rounded-full bg-[#0002] p-3 text-5xl duration-300 hover:bg-[#0006]"
        />
      </div>
      <div
        style={{ transform: isShowAudio ? 'scale(1)' : 'scale(0)', zIndex: '9999999999' }}
        className="fixed top-10 bottom-10 right-1/4 left-1/4 duration-300  cursor-pointer flex items-center"
      >
        {srcAudio && 
        <audio controls src={mainDomain + srcAudio} className="w-full">
          <track kind="captions"/>
          </audio>
          }
      </div>
    </>
  );
}

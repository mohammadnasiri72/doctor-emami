import React, { useEffect } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { mainDomain } from '../../utils/mainDomain';
import Page from '../Page';

export default function BoxVideo({ srcVideo, isShowVideo, setIsShowVideo }) {
  useEffect(() => {
    if (isShowVideo) {
      document.body.style.overflowY = 'hidden';
    } else if (!isShowVideo) {
      document.body.style.overflowY = 'auto';
    }
  }, [isShowVideo]);
  return (
    <>
      <Page
       onClick={() => setIsShowVideo(false)}
        style={{ display: isShowVideo ? 'block' : 'none', zIndex: '9999999999' }}
        className="fixed top-0 bottom-0 right-0 left-0 bg-[#000a]"
      />
        
      
      <div
        style={{ transform: isShowVideo ? 'scale(1)' : 'scale(0)', zIndex: '9999999999' }}
        className="fixed top-[10vh] bottom-[20vh] right-2 lg:right-1/4 left-2 lg:left-1/4 duration-300  rounded-lg shadow-lg cursor-pointer flex items-center"
      >
        <IoCloseSharp
          onClick={() => setIsShowVideo(false)}
          className="z-50 fixed top-0 right-0 bottom-10 left-10 text-white cursor-pointer rounded-full bg-[#7777] p-3 text-5xl duration-300 hover:bg-[#7779]"
        />
        {srcVideo && (
          <video className="w-full h-full bg-black" src={mainDomain + srcVideo} controls> 
            <track kind="captions"/>
          </video>
        )}
      </div>
    </>
  );
}

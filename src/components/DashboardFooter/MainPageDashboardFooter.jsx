import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useEffect, useState } from 'react';
import { CiHome } from 'react-icons/ci';
import { MdOutlineSick, MdSupportAgent } from 'react-icons/md';
import { FaPlus } from 'react-icons/fa6';
import { LiaUserEditSolid } from 'react-icons/lia';
import { useNavigate } from 'react-router';

export default function MainPageDashboardFooter({setChangeStatePages}) {

    const navigate = useNavigate()
    const url =  window.location.pathname
    
  

  return (
    <div style={{zIndex:'8798798798'}} className="fixed bottom-0 left-0 right-0 border border-[#0001] bg-white sm:hidden flex flex-wrap rounded-t-3xl">
      <div className="w-1/5 flex flex-col justify-center items-center">
        <Button
          onClick={() => {
            navigate('/dashboard/home')
          }}
          sx={{
            fontSize: 12,
            // color:valueButton==='home'? 'rgb(20 184 166)' : '#0005',
            color: url.includes('home')?  'rgb(20 184 166)' : '#0005'
          }}
          className="whitespace-nowrap flex flex-col h-full"
        >
          <CiHome className="text-3xl" />
          <span>خانه</span>
        </Button>
      </div>
      <div className="w-1/5 flex flex-col justify-center items-center">
        <Button
          onClick={() => {
            setChangeStatePages((e)=>!e)
            navigate('/dashboard/counseling')
          }}
          sx={{
            fontSize: 12,
            color: url.includes('counseling')?  'rgb(20 184 166)' : '#0005',
          }}
          className="whitespace-nowrap flex flex-col h-full"
        >
          <MdSupportAgent className="text-3xl"/>
          <span className="">ویزیت آنلاین</span>
        </Button>
      </div>
      <div className="w-1/5 flex flex-col justify-center items-center">
        <Button
          onClick={() => {
            navigate('/dashboard/reserve')
          }}
          sx={{
            fontSize: 12,
            color: url.includes('reserve')?  'rgb(20 184 166)' : '#0005',
            backgroundColor: 'white',
            '&:hover': {
              backgroundColor: 'white',
            },
          }}
          className="whitespace-nowrap flex flex-col h-full"
        >
          <FaPlus className="text-5xl bg-teal-500 rounded-full text-white p-3 -translate-y-8 absolute" />
          <span className="mt-7">ثبت نوبت</span>
        </Button>
      </div>
      <div className="w-1/5 flex flex-col justify-center items-center">
        <Button
          onClick={() => {
            navigate('/dashboard/sicknessList')
          }}
          sx={{
            fontSize: 12,
            color: url.includes('sicknessList')?  'rgb(20 184 166)' : '#0005',
          }}
          className="whitespace-nowrap flex flex-col h-full"
        >
          <MdOutlineSick className="text-3xl" />
          <span>بیماریهای من</span>
        </Button>
      </div>
      <div className="w-1/5 flex flex-col justify-center items-center">
        <Button
          onClick={() => {
            navigate('/dashboard/updateProfile')
          }}
          sx={{
            fontSize: 12,
            color: url.includes('updateProfile')?  'rgb(20 184 166)' : '#0005',
          }}
          className=" whitespace-nowrap flex flex-col h-full"
        >
          <LiaUserEditSolid className="text-3xl" />
          <span>پروفایل</span>
        </Button>
      </div>
    </div>
  );
}

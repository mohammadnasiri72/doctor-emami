import { Button, Paper, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';

export default function ShowNotPopUp({ showNote, setShowNote }) {
  const [desc, setDesc] = useState();
  useEffect(() => {
    if (showNote) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }, [showNote]);
  return (
    <>
      <div
        style={{
          zIndex: '1300',
          transform: showNote ? 'translateX(0)' : 'translateX(-100%)',
          opacity: showNote ? '1' : '0',
          visibility: showNote ? 'visible' : 'hidden',
        }}
        className="fixed top-0 bottom-0 right-2/3 left-0 bg-slate-50 duration-500 p-5 shadow-lg overflow-y-auto"
      >
        <div className="mt-3" dir="rtl">
          <h3 className="mb-3 text-xl font-semibold">وارد کردن توضیحات</h3>
          <TextField
            className="w-full text-end"
            id="outlined-multiline-flexible"
            label="توضیحات"
            multiline
            dir="rtl"
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
            minRows={6}
          />
        </div>
        <div className="pr-8 flex items-center mt-5">
          {/* <button className="px-5 py-4 rounded-lg bg-green-500 duration-300 hover:bg-green-600 text-white flex items-center">
          <span className="px-2">ثبت</span>
          <FaPlus />
        </button> */}
          <Button
            sx={{
              color:'white',
              py: 1,
              boxShadow: 'none',
              // fontSize: 20,
              backgroundColor: 'rgb(16 185 129)',
              '&:hover': {
                backgroundColor: 'rgb(5 150 105)',
              },
            }}
            className="p-2 rounded-md duration-300 mt-2 w-28"
            variant="contained"
          >
            <span className="px-2">ثبت</span>
            <FaPlus />
          </Button>
        </div>
      </div>

      {showNote && (
        <Paper
          sx={{ backgroundColor: '#000c' }}
          style={{ zIndex: '1299' }}
          onClick={() => setShowNote(false)}
          className="fixed top-0 left-0 right-0 bottom-0"
        />
      )}
    </>
  );
}

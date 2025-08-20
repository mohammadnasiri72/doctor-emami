import { IconButton, InputAdornment, TextField, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { FaImage } from 'react-icons/fa';
import { IoIosDocument } from 'react-icons/io';
import { MdAudioFile } from 'react-icons/md';
import { RiFileVideoLine } from 'react-icons/ri';
import { mainDomain } from '../../utils/mainDomain';
import BoxAudio from '../Counseling/BoxAudio';
import BoxImg from '../Counseling/BoxImg';
import BoxVideo from '../Counseling/BoxVideo';

export default function FilesHistoryVisit({ medicalRecord, receptionSelected }) {
  const [isShowVideo, setIsShowVideo] = useState(false);
  const [isShowImg, setIsShowImg] = useState(false);
  const [isShowAudio, setIsShowAudio] = useState(false);
  const [src, setSrc] = useState('');
  const [srcVideo, setSrcVideo] = useState('');
  const [srcAudio, setSrcAudio] = useState('');

  useEffect(() => {
    document.body.style.overflow = isShowVideo ? 'hidden' : 'auto';
  }, [isShowVideo]);
  useEffect(() => {
    document.body.style.overflow = isShowImg ? 'hidden' : 'auto';
  }, [isShowImg]);
  useEffect(() => {
    document.body.style.overflow = isShowAudio ? 'hidden' : 'auto';
  }, [isShowAudio]);

  return (
    <>
      <h3 className="text-teal-500 font-semibold">فایلهای ارسال شده</h3>
      {
      medicalRecord
      .filter((e) => e.typeId === 6).length>0 &&
      medicalRecord
        .filter((e) => e.typeId === 6)
        .map((e, i) => (
          <div key={e.id} className="px-3">
            <div className="flex items-center justify-between rounded-lg shadow-md duration-300 hover:shadow-lg mt-2 p-2">


            <div>
                  <h3 className="font-semibold text-start">
                    {i + 1} - {e.medicalItemName}
                  </h3>
                  <p className="pr-2 text-sm text-justify">{e.description ? e.description : '------'}</p>
                </div>
             
              <div>
                {e.medicalItemName === 'تصویر' && (
                  <Tooltip title="مشاهده عکس">
                    <IconButton
                      onClick={() => {
                        setSrc(e.attachmentSrc);
                        setIsShowImg(true);
                      }}
                    >
                      <FaImage className="text-2xl hover:text-green-700 cursor-pointer duration-300" />
                    </IconButton>
                  </Tooltip>
                )}
                {e.medicalItemName === 'ویدئو' && (
                  <Tooltip title="مشاهده ویدئو">
                    <IconButton
                      onClick={() => {
                        setSrcVideo(e.attachmentSrc);
                        setIsShowVideo(true);
                      }}
                    >
                      <RiFileVideoLine className="text-2xl hover:text-green-700 cursor-pointer duration-300" />
                    </IconButton>
                  </Tooltip>
                )}

                {e.medicalItemName === 'سند' && (
                  <Tooltip title="مشاهده فایل">
                    <IconButton>
                      <a target="_blank" rel="noreferrer" href={mainDomain + e.attachmentSrc}>
                        <IoIosDocument className="text-2xl hover:text-green-700 cursor-pointer duration-300" />
                      </a>
                    </IconButton>
                  </Tooltip>
                )}
                {e.medicalItemName === 'صوت' && (
                  <Tooltip title="پخش صوت">
                    <IconButton
                      onClick={() => {
                        setSrcAudio(e.attachmentSrc);
                        setIsShowAudio(true);
                      }}
                    >
                      <MdAudioFile className="text-2xl hover:text-green-700 cursor-pointer duration-300" />
                    </IconButton>
                  </Tooltip>
                )}
              </div>
            </div>
          </div>
        ))}
        {
           medicalRecord
           .filter((e) => e.typeId === 6).length===0 &&
           <p className="text-sm mt-2">موردی ثبت نشده است</p>
        }

      <BoxVideo srcVideo={srcVideo} isShowVideo={isShowVideo} setIsShowVideo={setIsShowVideo} />
      <BoxImg isShowImg={isShowImg} setIsShowImg={setIsShowImg} src={src} filesUpload={medicalRecord} setSrc={setSrc} />
      <BoxAudio isShowAudio={isShowAudio} srcAudio={srcAudio} setIsShowAudio={setIsShowAudio} />
    </>
  );
}

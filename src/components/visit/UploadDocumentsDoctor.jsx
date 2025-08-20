import React, { useState } from 'react';
import UploadDocuments from '../Counseling/UploadDocuments';

export default function UploadDocumentsDoctor({
  patSelected,
  setIsLoading,
  filesUpload,
  setFilesUpload,
  isShowImg,
  setIsShowImg,
  isShowAudio,
  setIsShowAudio,
  isShowVideo,
  setIsShowVideo,
  src,
  setSrc,
  srcVideo,
  setSrcVideo,
  srcAudio,
  setSrcAudio,
}) {
  const [flag, setFlag] = useState(false);

  return (
    <>
      <UploadDocuments
        apointmentId={patSelected.appointmentId}
        flagUpload={flag}
        setFlagUpload={setFlag}
        patSelected={patSelected}
        filesUpload={filesUpload}
        setFilesUpload={setFilesUpload}
        isShowImg={isShowImg}
        setIsShowImg={setIsShowImg}
        isShowAudio={isShowAudio}
        setIsShowAudio={setIsShowAudio}
        isShowVideo={isShowVideo}
        setIsShowVideo={setIsShowVideo}
        src={src}
        setSrc={setSrc}
        srcVideo={srcVideo}
        setSrcVideo={setSrcVideo}
        srcAudio={srcAudio}
        setSrcAudio={setSrcAudio}
      />
    </>
  );
}

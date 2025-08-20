import { TransformComponent, TransformWrapper, useControls } from 'react-zoom-pan-pinch';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FaArrowRotateLeft, FaArrowRotateRight } from 'react-icons/fa6';
import { IoCloseSharp } from 'react-icons/io5';
import ReactPanZoom from 'react-image-pan-zoom-rotate';
import SwiperCore, {
  Controller,
  EffectFade,
  HashNavigation,
  Keyboard,
  Mousewheel,
  Navigation,
  Pagination,
  Scrollbar,
  Zoom,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { MdMinimize } from 'react-icons/md';
import { GrPowerReset } from 'react-icons/gr';
import { FaPlus } from 'react-icons/fa';
import 'swiper/swiper.min.css';
import Page from '../Page';
import { mainDomain } from '../../utils/mainDomain';

// install Swiper modules
SwiperCore.use([Zoom, Navigation, Pagination, Scrollbar, Keyboard, Mousewheel, EffectFade, HashNavigation, Controller]);

export default function BoxImg({ isShowImg, setIsShowImg, src, filesUpload, setSrc }) {
  const [swiperRef, setSwiperRef] = useState(null);
  const [rotateR, setrotateR] = useState(0);

  // const { zoomIn, zoomOut, resetTransform } = useControls();

  useEffect(() => {
    filesUpload
      .filter((e) => e.typeId === 6)
      .map((e, i) => {
        if (e.attachmentSrc === src && isShowImg) {
          swiperRef.slideTo(i);
        }
        return true;
      });
  }, [filesUpload, src, isShowImg]);

  const nextImgHandler = () => {
    const arr = filesUpload.filter((e) => e.medicalItemId === 4);
    let num = arr.indexOf(filesUpload.find((e) => e.attachmentSrc === src));
    if (num >= arr.length - 1) {
      num = -1;
    }
    setSrc(arr[num + 1].attachmentSrc);
  };
  useEffect(() => {
    if (isShowImg) {
      document.body.style.overflowY = 'hidden';
    } else if (!isShowImg) {
      document.body.style.overflowY = 'auto';
    }
  }, [isShowImg]);
  const backImgHandler = () => {
    const arr = filesUpload.filter((e) => e.medicalItemId === 4);
    let num = arr.indexOf(filesUpload.find((e) => e.attachmentSrc === src));
    if (num <= 0) {
      num = arr.length;
    }
    setSrc(arr[num - 1].attachmentSrc);
  };

  const heroSwiper = useRef(null);

  const zoomConfig = useMemo(
    () => ({
      containerClass: 'swiper-zoom-container',
      minRatio: 1,
      maxRatio: 2,
    }),
    []
  );

  const Controls = () => {
    const { zoomIn, zoomOut, resetTransform, setTransform, centerView, zoomToElement } = useControls();
    return (
      <>
        {/* <div style={{zIndex:'4546545646546546546546465465'}} className='flex flex-col  border left-10'>

        <button onClick={() => zoomIn()}><FaPlus /></button>
        <button onClick={() => zoomOut()}>Zoom Out</button>
        <button onClick={() => resetTransform()}>Reset</button>
      </div> */}
        <FaArrowRotateRight
          style={{ zIndex: '878789798798798798789' }}
          onClick={() => setrotateR(rotateR+90)}
          className="absolute top-14 right-12 text-white cursor-pointer rounded-full bg-[#0009] p-3 text-5xl duration-300 hover:bg-[#000c]"
        />
        <FaArrowRotateLeft
          style={{ zIndex: '878789798798798798789' }}
          onClick={() => setrotateR(rotateR-90)}
          className="absolute top-28 right-12 text-white cursor-pointer rounded-full bg-[#0009] p-3 text-5xl duration-300 hover:bg-[#000c]"
        />
        <FiPlus
          style={{ zIndex: '878789798798798798789' }}
          onClick={() => zoomIn()}
          className="absolute top-[10.5rem] right-12 text-white cursor-pointer rounded-full bg-[#0009] p-3 text-5xl duration-300 hover:bg-[#000c]"
        />
        <FiMinus
          style={{ zIndex: '878789798798798798789' }}
          onClick={() => zoomOut()}
          className="absolute top-56 right-12 text-white cursor-pointer rounded-full bg-[#0009] p-3 text-5xl duration-300 hover:bg-[#000c]"
        />
        <GrPowerReset
          style={{ zIndex: '878789798798798798789' }}
          onClick={() => resetTransform()}
          className="absolute top-[17.5rem] right-12 text-white cursor-pointer rounded-full bg-[#0009] p-3 text-5xl duration-300 hover:bg-[#000c]"
        />
      </>
    );
  };

  return (
    <>
      <div style={{ zIndex: '99999998998989999' }}>
        <Page
          onClick={() => setIsShowImg(false)}
          style={{ display: isShowImg ? 'block' : 'none', zIndex: '9999999999' }}
          className="fixed top-0 bottom-0 right-0 left-0 bg-[#000a]"
        />

        <div
          style={{ transform: isShowImg ? 'scale(1)' : 'scale(0)', zIndex: '9999999999' }}
          className="fixed top-0 bottom-0 right-0 left-0  duration-300 border overflow-hidden rounded-lg shadow-lg"
        >
          {/* {src && (
            <a className="cursor-zoom-in" target="_blank" rel="noreferrer" href={mainDomain + src}>
              <img className="w-full h-full object-cover rounded-lg" src={mainDomain + src} alt="" />
            </a>
          )}
          <IoCloseSharp
            onClick={() => setIsShowImg(false)}
            className="absolute top-0 right-0 text-white cursor-pointer rounded-full bg-[#0009] p-3 text-5xl duration-300 hover:bg-[#000c]"
          />
          <FaChevronRight
            onClick={nextImgHandler}
            style={{ zIndex: '999999999999999999999' }}
            className="absolute top-1/2 right-0 text-white cursor-pointer rounded-full bg-[#0009] p-3 text-5xl duration-300 hover:bg-[#000c]"
          />
          <FaChevronLeft
            onClick={backImgHandler}
            className="absolute top-1/2 left-0 text-white cursor-pointer rounded-full bg-[#0009] p-3 text-5xl duration-300 hover:bg-[#000c]"
          /> */}
          <Swiper
            hashNavigation
            controller
            ref={heroSwiper}
            // initialSlide={4}
            EffectFade
            keyboard
            Scrollbar={{ draggable: true }}
            zoom={zoomConfig}
            navigation
            pagination={{
              clickable: true,
            }}
            // spaceBetween={50}
            slidesPerView={1}
            centeredSlides
            onSwiper={setSwiperRef}
            // onSlideChange={(swiper) => console.log(swiper.activeIndex)}
            modules={[Keyboard, Zoom, Mousewheel, Controller]}
            className="mySwiper"
          >
            <IoCloseSharp
              style={{ zIndex: '878789798798798798789' }}
              onClick={() => setIsShowImg(false)}
              className="absolute top-0 right-12 text-white cursor-pointer rounded-full bg-[#0009] p-3 text-5xl duration-300 hover:bg-[#000c]"
            />
            {/* <FaArrowRotateRight
              style={{ zIndex: '878789798798798798789' }}
              onClick={() => setrotateR(rotateR+90)}
              className="absolute top-0 right-16 text-white cursor-pointer rounded-full bg-[#0009] p-3 text-5xl duration-300 hover:bg-[#000c]"
            />
            <FaArrowRotateLeft
              style={{ zIndex: '878789798798798798789' }}
              onClick={() => setrotateR(rotateR-90)}
              className="absolute top-0 right-32 text-white cursor-pointer rounded-full bg-[#0009] p-3 text-5xl duration-300 hover:bg-[#000c]"
            />
            <FaArrowRotateLeft
              style={{ zIndex: '878789798798798798789' }}
              // onClick={() => zoomIn()}
              className="absolute top-0 right-48 text-white cursor-pointer rounded-full bg-[#0009] p-3 text-5xl duration-300 hover:bg-[#000c]"
            /> */}
            {filesUpload
              .filter((e) => e.typeId === 6)
              .filter((e) => e.medicalItemId === 4)
              .map((e, i) => (
                <SwiperSlide
                  style={{ width: '100%' }}
                  className="bg-slate-50 flex justify-center"
                  key={i}
                  virtualIndex={i}
                >
                  {/* <img 
                    className=" rounded-lg object-contain w-full h-screen"
                    src={mainDomain + e.attachmentSrc}
                    alt=""
                  /> */}
                  {/* <ReactPanZoom image={mainDomain + e.attachmentSrc} alt=""/> */}
                  <TransformWrapper>
                    <Controls />
                    <TransformComponent>
                      <img
                      style={{transform:`rotate(${rotateR}deg)`}}
                        className=" rounded-lg object-contain w-full h-screen"
                        src={mainDomain + e.attachmentSrc}
                        alt=""
                      />
                    </TransformComponent>
                  </TransformWrapper>
                  <p className="absolute left-1/2 -translate-x-1/2 bottom-9 bg-[#fff3] w-full">{e.description}</p>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}

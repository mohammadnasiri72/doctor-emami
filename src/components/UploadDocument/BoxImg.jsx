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
import { GrPowerReset } from 'react-icons/gr';
import 'swiper/swiper.min.css';
import Page from '../Page';
import { mainDomain } from '../../utils/mainDomain';

// install Swiper modules
SwiperCore.use([Zoom, Navigation, Pagination, Scrollbar, Keyboard, Mousewheel, EffectFade, HashNavigation, Controller]);

export default function BoxImg({ isShowImg, setIsShowImg, src, filesUpload, setSrc }) {
  const [swiperRef, setSwiperRef] = useState(null);
  const [rotateR, setrotateR] = useState(0);



  useEffect(() => {
    filesUpload
    .filter((e) => e.medicalItemId === 4)
      .map((e, i) => {
        if (e.attachmentSrc === src && isShowImg) {
          swiperRef.slideTo(i , 0);
        }
        return true;
      });
  }, [filesUpload, src, isShowImg]);

  useEffect(() => {
    if (isShowImg) {
      document.body.style.overflowY = 'hidden';
    } else if (!isShowImg) {
      document.body.style.overflowY = 'auto';
    }
  }, [isShowImg]);

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
        <FaArrowRotateRight
          style={{ zIndex: '878789798798798798789' }}
          onClick={() => setrotateR(rotateR + 90)}
          className="absolute top-14 right-12 text-white cursor-pointer rounded-full bg-[#0009] p-3 text-5xl duration-300 hover:bg-[#000c]"
        />
        <FaArrowRotateLeft
          style={{ zIndex: '878789798798798798789' }}
          onClick={() => setrotateR(rotateR - 90)}
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
          <Swiper
            hashNavigation
            controller
            ref={heroSwiper}
            EffectFade
            keyboard
            Scrollbar={{ draggable: true }}
            zoom={zoomConfig}
            navigation
            pagination={{
              clickable: true,
            }}
            slidesPerView={1}
            centeredSlides
            onSwiper={setSwiperRef}
            modules={[Keyboard, Zoom, Mousewheel, Controller]}
            className="mySwiper"
          >
            <IoCloseSharp
              style={{ zIndex: '878789798798798798789' }}
              onClick={() => setIsShowImg(false)}
              className="absolute top-0 right-12 text-white cursor-pointer rounded-full bg-[#0009] p-3 text-5xl duration-300 hover:bg-[#000c]"
            />

            {filesUpload
              .filter((e) => e.medicalItemId === 4)
              .map((e, i) => (
                <SwiperSlide
                  style={{ width: '100%' }}
                  className="bg-slate-50 flex justify-center"
                  key={i}
                  virtualIndex={i}
                >
                  <TransformWrapper>
                    <Controls />
                    <TransformComponent>
                      <img
                        style={{ transform: `rotate(${rotateR}deg)` }}
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

import { Button, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { IoIosArrowUp } from 'react-icons/io';
import { MdOutlineMinimize } from 'react-icons/md';
import Swal from 'sweetalert2';
import { mainDomain } from '../../utils/mainDomain';
import SimpleBackdrop from '../backdrop';
import TableManageService from './TableManageService';
import useSettings from '../../hooks/useSettings';

export default function MainPageManageServices() {
  const [showManageServices, setShowManageServices] = useState(false);
  const [showManagecategoryServices, setShowManagecategoryServices] = useState(false);
  const [categoryServices, setCategoryServices] = useState([]);
  const [valCategoryServices, setValCategoryServices] = useState('');
  const [nameServices, setNameServices] = useState('');
  const [descService, setDescService] = useState('');
  const [isActive, setisActive] = useState(true);
  const [priority, setPriority] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [flag, setFlag] = useState(false);
  const [titleNewCategory, setTitleNewCategory] = useState('');
  const [descNewCategory, setDescNewCategory] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState('');
  const [price, setPrice] = useState('');

  const { themeMode } = useSettings();

  // import sweet alert-2
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });

  // get category service
  useEffect(() => {
    axios
      .get(`${mainDomain}/api/MedicalServiceCategory/GetList`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setCategoryServices(res.data);
      })
      .catch((err) => {});
  }, [flag]);

  // set new service
  const newServiceHandler = () => {
    Swal.fire({
      title: 'ثبت خدمت جدید',
      text: 'آیا از ثبت خدمت مطمئن هستید؟',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: '#d33',
      cancelButtonText: 'انصراف',
      confirmButtonText: 'تایید ',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        const data = {
          medicalCategoryId: valCategoryServices,
          title: nameServices,
          description: descService,
          rate: price,
          isActive,
          priority,
        };
        axios
          .post(`${mainDomain}/api/MedicalService/Add`, data, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
          .then((res) => {
            Toast.fire({
              icon: 'success',
              text: 'خدمت با موفقیت ثبت شد',
            });
            setIsLoading(false);
            setFlag((e) => !e);
            setIsEdit(false);
            setNameServices('');
            setDescService('');
            setPrice('');
            setisActive(true);
            setPriority(0);
            setShowManageServices(false);
            setValCategoryServices('');
          })
          .catch((err) => {
            setIsLoading(false);
            Toast.fire({
              icon: 'error',
              text: err.response ? err.response.data : 'خطای شبکه',
            });
          });
      }
    });
  };

  // set new category
  const setNewCategoryHandler = () => {
    Swal.fire({
      title: 'ثبت دسته بندی جدید',
      text: 'آیا از ثبت دسته بندی جدید مطمئن هستید؟',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: '#d33',
      cancelButtonText: 'انصراف',
      confirmButtonText: 'تایید ',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        const data = {
          isActive: true,
          priority: 0,
          title: titleNewCategory,
          description: descNewCategory,
        };
        axios
          .post(`${mainDomain}/api/MedicalServiceCategory/Add`, data, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
          .then((res) => {
            setIsLoading(false);
            Toast.fire({
              icon: 'success',
              text: 'دسته بندی جدید با موفقیت ثبت شد',
            });

            //   setValCategoryServices(categoryServices.find((ev) => ev.title === titleNewCategory).medicalServiceCategoryId);

            setIsLoading(false);
            setFlag((e) => !e);
            setTitleNewCategory('');
            setDescNewCategory('');
          })
          .catch((err) => {
            setIsLoading(false);
            Toast.fire({
              icon: 'error',
              text: err.response ? err.response.data : 'خطای شبکه',
            });
          });
      }
    });
  };

  // edit service
  const editServiceHandler = () => {
    setIsLoading(true);
    const data = {
      medicalServiceId: editId,
      medicalCategoryId: valCategoryServices,
      title: nameServices,
      description: descService,
      rate: price,
      isActive,
      priority,
    };
    axios
      .post(`${mainDomain}/api/MedicalService/Update`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setFlag((e) => !e);
        setIsEdit(false);
        setNameServices('');
        setDescService('');
        setPrice('');
        setisActive(true);
        setPriority(0);
        setShowManageServices(false);
        setValCategoryServices('');
        Toast.fire({
          icon: 'success',
          text: 'خدمت با موفقیت ویرایش شد',
        });
      })
      .catch((err) => {
        setIsLoading(false);
        setIsEdit(false);
        setShowManageServices(false);
        Toast.fire({
          icon: 'error',
          text: err.response ? err.response.data : 'خطای شبکه',
        });
      });
  };

  return (
    <>
      <div className="text-start relative">
        {!isEdit && (
          <Button
            sx={{
              boxShadow: 'none',
              backgroundColor: 'rgb(16 185 129)',
              '&:hover': {
                backgroundColor: 'rgb(5 150 105)',
              },
            }}
            onClick={() => setShowManageServices(!showManageServices)}
            className="sticky top-5 flex items-center text-white px-5 py-2 rounded-md bg-green-500 duration-300 hover:bg-green-600"
          >
            <span className="px-2">{showManageServices ? 'بستن' : 'افزودن خدمات'}</span>
            {!showManageServices && <FaPlus />}
            {showManageServices && <MdOutlineMinimize />}
          </Button>
        )}
        <div
          style={{
            opacity: showManageServices ? '1' : '0',
            visibility: showManageServices ? 'visible' : 'hidden',
            maxHeight: showManageServices ? '30rem' : '0',
            zIndex: '12',
            backgroundColor: themeMode==='light'? 'white':'#161c24'
          }}
          className="border overflow-hidden mt-5 sticky top-12 left-0 right-0 bottom-0 duration-500 px-3 bg-white shadow-lg"
        >
          {!isEdit && (
            <Button
              sx={{
                py: 1,
                position: 'absolute',
                bottom: '0',
                left: '50%',
                transform: 'translate(-50% , 50%)',
                borderRadius: '100%',
                boxShadow: 'none',
                backgroundColor: 'rgb(226 232 240)',
                '&:hover': {
                  backgroundColor: 'rgb(203 213 225)',
                },
              }}
              onClick={() => setShowManageServices(false)}
              className="absolute bottom-0 left-1/2"
            >
              <IoIosArrowUp className="text-3xl rounded-t-full w-14 -translate-y-3 duration-300" />
            </Button>
          )}
          <div className="mt-5 flex items-center">
            <div>
              <FormControl color="primary" className="w-56">
                <InputLabel color="primary" className="px-2" id="demo-simple-select-label">
                  لیست دسته بندی خدمات
                </InputLabel>
                <Select
                  onChange={(e) => setValCategoryServices(e.target.value)}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="لیست دسته بندی خدمات"
                  color="primary"
                  value={valCategoryServices}
                >
                  {categoryServices.map((e) => (
                    <MenuItem key={e.medicalServiceCategoryId} value={e.medicalServiceCategoryId}>
                      {e.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            {!isEdit && (
              <div className="px-2 flex">
                <Button
                 sx={{
                  py:2,
                  boxShadow: 'none',
                  backgroundColor: 'rgb(16 185 129)',
                  '&:hover': {
                    backgroundColor: 'rgb(5 150 105)',
                  },
                }}
                  onClick={() => setShowManagecategoryServices(!showManagecategoryServices)}
                  className="text-white rounded-md p-4 bg-green-500 duration-300 hover:bg-green-600"
                >
                  {showManagecategoryServices ? <FaMinus /> : <FaPlus />}
                </Button>
              </div>
            )}

            <div className="text-start " dir="rtl">
              <TextField
                style={{
                  transform: showManagecategoryServices ? 'translateY(0)' : 'translateY(-101%)',
                  opacity: showManagecategoryServices ? '1' : '0',
                  visibility: showManagecategoryServices ? 'visible' : 'hidden',
                }}
                onChange={(e) => setTitleNewCategory(e.target.value)}
                className=" text-end duration-300"
                id="outlined-multiline-flexible"
                label="نام دسته بندی جدید"
                multiline
                dir="rtl"
                value={titleNewCategory}
                maxRows={4}
              />
            </div>
            <div className="text-start px-2" dir="rtl">
              <TextField
                style={{
                  transform: showManagecategoryServices ? 'translateY(0)' : 'translateY(-101%)',
                  opacity: showManagecategoryServices ? '1' : '0',
                  visibility: showManagecategoryServices ? 'visible' : 'hidden',
                }}
                onChange={(e) => setDescNewCategory(e.target.value)}
                className=" text-end duration-300 w-96"
                id="outlined-multiline-flexible"
                label="توضیحات"
                multiline
                dir="rtl"
                value={descNewCategory}
                maxRows={4}
              />
            </div>
            <div
              style={{
                transform: showManagecategoryServices ? 'translateY(0)' : 'translateY(-101%)',
                opacity: showManagecategoryServices ? '1' : '0',
                visibility: showManagecategoryServices ? 'visible' : 'hidden',
              }}
              className="duration-300"
            >
              <Button
              sx={{
                py:2,
                boxShadow: 'none',
                backgroundColor: 'rgb(16 185 129)',
                '&:hover': {
                  backgroundColor: 'rgb(5 150 105)',
                },
              }}
                onClick={setNewCategoryHandler}
                className="p-4 rounded-md bg-green-500 duration-300 hover:bg-green-600 text-white"
              >
                ثبت
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap items-center">
            <div className="text-start mt-3" dir="rtl">
              <TextField
                onChange={(e) => setNameServices(e.target.value)}
                className=" text-end"
                id="outlined-multiline-flexible"
                label="نام خدمت"
                multiline
                dir="rtl"
                value={nameServices}
                maxRows={4}
              />
            </div>
            <div className="text-start mt-3 pr-2 w-28" dir="rtl">
              <TextField
                onChange={(e) => setPrice(e.target.value)}
                className=" text-end"
                id="outlined-multiline-flexible"
                label="تعرفه"
                multiline
                dir="rtl"
                value={price}
                maxRows={4}
              />
            </div>
            <div className="mt-3 pr-2">
              <TextField
                onChange={(e) => setPriority(e.target.value)}
                className=" text-end w-20"
                id="outlined-multiline-flexible"
                label="اولویت"
                multiline
                dir="rtl"
                value={priority}
              />
            </div>
            <div className="mt-3 pr-2">
              <FormControlLabel
                value={isActive}
                onChange={() => setisActive(!isActive)}
                control={<Switch checked={isActive} />}
                label={isActive ? 'فعال' : 'غیر فعال'}
              />
            </div>
          </div>
          <div className="flex items-center">
            <div className="text-start mt-3 lg:w-1/2 w-full" dir="rtl">
              <TextField
                onChange={(e) => setDescService(e.target.value)}
                className=" text-end w-full"
                id="outlined-multiline-flexible"
                label="توضیحات"
                multiline
                dir="rtl"
                value={descService}
                minRows={3}
              />
            </div>
          </div>
          {!isEdit && (
            <div className="mt-3">
              <Button
              sx={{
                boxShadow: 'none',
                backgroundColor: 'rgb(16 185 129)',
                '&:hover': {
                  backgroundColor: 'rgb(5 150 105)',
                },
              }}
                onClick={newServiceHandler}
                className="px-5 py-2 rounded-md bg-green-500 duration-300 hover:bg-green-600 text-white font-semibold"
              >
                ثبت
              </Button>
            </div>
          )}
          {isEdit && (
            <div className="flex mt-3">
              <div className="px-2">
                <Button
                sx={{
                  boxShadow: 'none',
                  backgroundColor: 'rgb(16 185 129)',
                  '&:hover': {
                    backgroundColor: 'rgb(5 150 105)',
                  },
                }}
                  onClick={editServiceHandler}
                  className="bg-green-500 hover:bg-green-600 duration-300 px-5 py-2 rounded-md text-white"
                >
                  ویرایش
                </Button>
              </div>
              <div className="px-2">
                <Button
                sx={{
                  boxShadow: 'none',
                  backgroundColor: 'rgb(239 68 68)',
                  '&:hover': {
                    backgroundColor: 'rgb(239 68 68)',
                  },
                }}
                  onClick={() => {
                    setIsEdit(false);
                    setNameServices('');
                    setDescService('');
                    setPrice('');
                    setisActive(true);
                    setPriority(0);
                    setShowManageServices(false);
                    setValCategoryServices('');
                  }}
                  className="duration-300 px-5 py-2 rounded-md text-white"
                >
                  انصراف
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-5">
          <TableManageService
            flag={flag}
            categoryServices={categoryServices}
            setFlag={setFlag}
            setIsLoading={setIsLoading}
            setShowManageServices={setShowManageServices}
            setValCategoryServices={setValCategoryServices}
            setNameServices={setNameServices}
            setPrice={setPrice}
            setPriority={setPriority}
            setDescService={setDescService}
            setIsEdit={setIsEdit}
            setisActive={setisActive}
            setEditId={setEditId}
            setShowManagecategoryServices={setShowManagecategoryServices}
            isLoading={isLoading}
          />
        </div>
      </div>
      {isLoading && <SimpleBackdrop />}
    </>
  );
}

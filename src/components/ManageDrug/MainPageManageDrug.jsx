import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { IoIosArrowUp, IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { MdOutlineMinimize } from 'react-icons/md';
import Swal from 'sweetalert2';
import { mainDomain } from '../../utils/mainDomain';
import SimpleBackdrop from '../backdrop';
import TableManageDrug from './TableManageDrug';
import useSettings from '../../hooks/useSettings';

export default function MainPageManageDrug({ changeStatePages }) {
  const [showManageDrug, setShowManageDrug] = useState(false);
  const [showManageCategoryDrug, setShowManageCategoryDrug] = useState(false);
  const [categoryDrug, setCategoryDrug] = useState([]);
  const [valCategoryDrug, setValCategoryDrug] = useState('');
  const [nameDrug, setNameDrug] = useState('');
  const [descDrug, setDescDrug] = useState('');
  const [drugForm, setDrugForm] = useState([]);
  const [valDrugForm, setValDrugForm] = useState({});
  const [drugDose, setDrugDose] = useState([]);
  const [valDrugDose, setValDrugDose] = useState({});
  const [drugUseCycle, setDrugUseCycle] = useState([]);
  const [valDrugUseCycle, setValDrugUseCycle] = useState({});
  const [isActive, setisActive] = useState(true);
  const [priority, setPriority] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDrug, setIsLoadingDrug] = useState(false);
  const [flag, setFlag] = useState(false);
  const [titleNewCategory, setTitleNewCategory] = useState('');
  const [descNewCategory, setDescNewCategory] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState('');
  const [drugList, setDrugList] = useState([]);
  const [query, setQuery] = useState('');
  const [flagCat, setFlagCat] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [numPages, setNumPages] = useState(1);
  const [atcCode, setAtcCode] = useState('');
  const [numberDrug, setNumberDrug] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const { themeMode } = useSettings();

  useEffect(() => {
    setShowManageDrug(false);
    setShowManageCategoryDrug(false);
    setValCategoryDrug('');
    setValDrugForm('');
    setValDrugDose('');
    setValDrugUseCycle('');
    setisActive(true);
    setPriority(0);
    setTitleNewCategory('');
    setDescNewCategory('');
    setIsEdit(false);
    setQuery('');
  }, [changeStatePages]);

  // import sweet alert-2
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });

  useEffect(() => {
    // category
    axios
      .get(`${mainDomain}/api/MedicationCategory/GetList`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setCategoryDrug(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, [flagCat]);
  // get description drug
  useEffect(() => {
    setIsLoading(true);

    // form drug
    axios
      .get(`${mainDomain}/api/BasicInfo/DrugForm/GetList`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setDrugForm(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
      });

    // dose drug
    axios
      .get(`${mainDomain}/api/BasicInfo/DrugDose/GetList`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setDrugDose(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });

    // UseCycle drug
    axios
      .get(`${mainDomain}/api/BasicInfo/DrugUseCycle/GetList`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setDrugUseCycle(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);

  // set new drug
  const newDrugHandler = () => {
    if (!valCategoryDrug) {
      Toast.fire({
        icon: 'error',
        text: 'لطفاابتدا دسته بندی دارو را وارد کنید',
      });
    } else if (!nameDrug) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا نام دارو را وارد کنید',
      });
    } else {
      Swal.fire({
        title: 'ثبت دارو',
        text: 'آیا از ثبت دارو مطمئن هستید؟',
        showCancelButton: true,
        confirmButtonColor: 'green',
        cancelButtonColor: '#d33',
        cancelButtonText: 'انصراف',
        confirmButtonText: 'تایید ',
      }).then((result) => {
        if (result.isConfirmed) {
          setIsLoading(true);
          const data = {
            medicalCategoryId: valCategoryDrug,
            name: nameDrug,
            description: descDrug,
            defaultForm: valDrugForm.name,
            defaultDosage: valDrugDose.name,
            defaultFrequency: valDrugUseCycle.name,
            isActive,
            priority,
            atcCode,
            defaultNumber: numberDrug,
          };
          axios
            .post(`${mainDomain}/api/Medication/Add`, data, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            })
            .then((res) => {
              Toast.fire({
                icon: 'success',
                text: 'دارو با موفقیت ثبت شد',
              });
              setIsEdit(false);
              setNameDrug('');
              setDescDrug('');
              setValDrugForm({});
              setValDrugDose({});
              setValDrugUseCycle({});
              setisActive(true);
              setPriority(0);
              setValCategoryDrug('');
              setIsLoading(false);
              setFlag((e) => !e);
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
    }
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
          .post(`${mainDomain}/api/MedicationCategory/Add`, data, {
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
            setIsLoading(false);
            setFlagCat((e) => !e);
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

  // edit drug
  const editDrugHandler = () => {
    setIsLoading(true);
    const data = {
      medicationId: editId,
      medicalCategoryId: valCategoryDrug,
      name: nameDrug,
      description: descDrug,
      defaultForm: valDrugForm?.name ? valDrugForm?.name : '',
      defaultDosage: valDrugDose?.name ? valDrugDose?.name : '',
      defaultFrequency: valDrugUseCycle?.name ? valDrugUseCycle?.name : '',
      isActive,
      priority,
      atcCode,
      defaultNumber: numberDrug,
    };
    axios
      .post(`${mainDomain}/api/Medication/Update`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setFlag((e) => !e);
        setIsEdit(false);
        setShowManageDrug(false);
        setNameDrug('');
        setDescDrug('');
        setValDrugForm({});
        setValDrugDose({});
        setValDrugUseCycle({});
        setisActive(true);
        setPriority(0);
        setValCategoryDrug('');
        Toast.fire({
          icon: 'success',
          text: 'دارو با موفقیت ویرایش شد',
        });
      })
      .catch((err) => {
        setIsLoading(false);
        setIsEdit(false);
        setShowManageDrug(false);
        Toast.fire({
          icon: 'error',
          text: err.response ? err.response.data : 'خطای شبکه',
        });
      });
  };

  useEffect(() => {
    if (query.length > 2) {
      setNumPages(1);
    }
  }, [query]);

  // get list drug
  useEffect(() => {
    if (query.length>2) {
      
      setIsLoadingDrug(true);
      axios
        .get(`${mainDomain}/api/Medication/GetListPaged`, {
          params: {
            query,
            pageIndex: numPages,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setIsLoadingDrug(false);
          setDrugList(res.data.items);
          setTotalPages(res.data.totalPages);
          setCurrentPage(res.data.currentPage);
          setPageSize(res.data.pageSize);
          setTotalCount(res.data.totalCount)
        })
        .catch((err) => {
          setIsLoadingDrug(false);
        });
    }
  }, [flag, query, numPages]);

  useEffect(() => {
    if (query.length<=2) {
      
      setIsLoadingDrug(true);
      axios
        .get(`${mainDomain}/api/Medication/GetListPaged`, {
          params: {
            pageIndex: numPages,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setIsLoadingDrug(false);
          setDrugList(res.data.items);
          setTotalPages(res.data.totalPages);
          setCurrentPage(res.data.currentPage);
          setPageSize(res.data.pageSize);
          setTotalCount(res.data.totalCount)
        })
        .catch((err) => {
          setIsLoadingDrug(false);
        });
    }
  }, [flag, query.length<=2, numPages]);

  return (
    <>
      <div className="text-start relative">
        {!isEdit && (
          <div className="flex flex-wrap">
            <div className="sm:w-auto w-full">
              <Button
                sx={{
                  boxShadow: 'none',
                  backgroundColor: 'rgb(16 185 129)',
                  '&:hover': {
                    backgroundColor: 'rgb(5 150 105)',
                  },
                }}
                onClick={() => setShowManageDrug(!showManageDrug)}
                className="sticky flex items-center text-white px-5 py-2 rounded-md bg-green-500 duration-300 hover:bg-green-600"
              >
                <span className="px-2">{showManageDrug ? 'بستن' : 'افزودن دارو'}</span>
                {!showManageDrug && <FaPlus />}
                {showManageDrug && <MdOutlineMinimize />}
              </Button>
            </div>
            <div className="sm:w-auto w-full sm:mt-0 mt-3 sm:pr-3 pr-0">
              {/* <Autocomplete
               
                onChange={(event, newValue) => setQuery(newValue)}
                freeSolo
                options={drugList.map((option) => option.name)}
                renderInput={(params) => (
                  <TextField onChange={(e) => setQuery(e.target.value)} {...params} label={'لیست دارو ها'} />
                )}
              /> */}
              <TextField
                className="sm:w-auto w-4/5"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                label={'جستجوی دارو...'}
              />
            </div>
          </div>
        )}
        <div
          style={{
            // transform: !showManageDrug ? 'translateY(-100%)' : 'translateY(0%)',
            opacity: showManageDrug ? '1' : '0',
            visibility: showManageDrug ? 'visible' : 'hidden',
            maxHeight: showManageDrug ? '40rem' : '0',
            zIndex: '12',
            backgroundColor: themeMode==='light'? 'white':'#161c24'
          }}
          className="border overflow-hidden sticky top-12 mt-4 left-0 right-0 bottom-0 duration-500 px-3 shadow-lg"
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
              onClick={() => setShowManageDrug(false)}
              // className="absolute bottom-0 left-1/2"
            >
              <IoIosArrowUp className="text-3xl rounded-t-full w-14 -translate-y-3 duration-300" />
            </Button>
          )}
          <div className="mt-5 flex items-center">
            <div>
              <FormControl color="primary" className="w-56">
                <InputLabel color="primary" className="px-2" id="demo-simple-select-label">
                  لیست دسته بندی دارو ها*
                </InputLabel>
                <Select
                  onChange={(e) => setValCategoryDrug(e.target.value)}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="لیست دسته بندی دارو ها*"
                  color="primary"
                  value={valCategoryDrug}
                >
                  {categoryDrug.map((e) => (
                    <MenuItem dir="ltr" key={e.medicationCategoryId} value={e.medicationCategoryId}>
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
                    py: 2,
                    boxShadow: 'none',
                    backgroundColor: 'rgb(16 185 129)',
                    '&:hover': {
                      backgroundColor: 'rgb(5 150 105)',
                    },
                  }}
                  onClick={() => setShowManageCategoryDrug(!showManageCategoryDrug)}
                  className="text-white rounded-md p-4 bg-green-500 duration-300 hover:bg-green-600"
                >
                  {showManageCategoryDrug ? <FaMinus /> : <FaPlus />}
                </Button>
              </div>
            )}

            <div className="text-start " dir="rtl">
              <TextField
                style={{
                  transform: showManageCategoryDrug ? 'translateY(0)' : 'translateY(-101%)',
                  opacity: showManageCategoryDrug ? '1' : '0',
                  visibility: showManageCategoryDrug ? 'visible' : 'hidden',
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
                  transform: showManageCategoryDrug ? 'translateY(0)' : 'translateY(-101%)',
                  opacity: showManageCategoryDrug ? '1' : '0',
                  visibility: showManageCategoryDrug ? 'visible' : 'hidden',
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
                transform: showManageCategoryDrug ? 'translateY(0)' : 'translateY(-101%)',
                opacity: showManageCategoryDrug ? '1' : '0',
                visibility: showManageCategoryDrug ? 'visible' : 'hidden',
              }}
              className="duration-300"
            >
              <Button
                sx={{
                  py: 2,
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
          <div className="flex flex-wrap">
            <div className="text-start mt-3 sm:w-1/2 w-full" dir="rtl">
              <TextField
                onChange={(e) => setNameDrug(e.target.value)}
                className=" text-end w-full"
                id="outlined-multiline-flexible"
                label="نام دارو*"
                multiline
                dir="rtl"
                value={nameDrug}
                maxRows={4}
              />
            </div>
            <div className="sm:w-1/2 w-full mt-3 sm:pr-2 pr-0">
              <Autocomplete
                value={valDrugForm}
                onChange={(event, newValue) => setValDrugForm(newValue)}
                freeSolo
                autoHighlight
                options={drugForm}
                getOptionLabel={(option) => (option.name ? option.name : '')}
                renderOption={(props, option) => (
                  <Box dir="ltr" sx={{ textAlign: 'start' }} component="li" {...props}>
                    {option.name}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField {...params} label={'شکل پیش فرض دارو ها'} placeholder="انتخاب شکل دارو" />
                )}
              />
            </div>
            <div className="sm:w-1/2 w-full mt-3">
              <Autocomplete
                value={valDrugDose}
                onChange={(event, newValue) => setValDrugDose(newValue)}
                freeSolo
                autoHighlight
                options={drugDose}
                getOptionLabel={(option) => (option.name ? option.name : '')}
                renderOption={(props, option) => (
                  <Box dir="ltr" sx={{ textAlign: 'start' }} component="li" {...props}>
                    {option.name}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField {...params} label={'دوز پیش فرض دارو ها'} placeholder="انتخاب دوز دارو" />
                )}
              />
            </div>
            <div className="sm:w-1/2 w-full mt-3 sm:pr-2 pr-0">
              <Autocomplete
                value={valDrugUseCycle}
                onChange={(event, newValue) => setValDrugUseCycle(newValue)}
                freeSolo
                autoHighlight
                options={drugUseCycle}
                getOptionLabel={(option) => (option.name ? option.name : '')}
                renderInput={(params) => (
                  <TextField {...params} label={'چرخه پیش فرض مصرف'} placeholder="انتخاب چرخه مصرف" />
                )}
              />
            </div>
          </div>
          <div className="flex flex-wrap items-center">
            <div className="text-start mt-3 sm:w-1/2 w-full" dir="rtl">
              <TextField
                onChange={(e) => setDescDrug(e.target.value)}
                className=" text-end w-full"
                id="outlined-multiline-flexible"
                label="توضیحات"
                multiline
                dir="rtl"
                value={descDrug}
                minRows={3}
              />
            </div>
            <div className="flex flex-col justify-center pr-2 sm:w-1/2 w-full sm:mt-0 mt-3">
              <div className="flex">
                <div className=''>
                  <TextField
                    className="w-full"
                    value={atcCode}
                    onChange={(e) => setAtcCode(e.target.value)}
                    label={'ATC'}
                  />
                </div>
                <div className="flex pr-2 relative">
                  <input
                  style={{backgroundColor: themeMode==='light'? '':'#161c24'}}
                    className="border rounded-lg w-20 px-3"
                    value={numberDrug}
                    type="number"
                    placeholder="تعداد..."
                  />
                  <div className="flex flex-col absolute left-0">
                    <IoMdArrowDropup
                    style={{backgroundColor: themeMode==='light'? 'rgb(241 245 249)':'#0005'}}
                      onClick={() => setNumberDrug(numberDrug + 1)}
                      className="text-2xl cursor-pointer rounded-full p-1"
                    />
                    <IoMdArrowDropdown
                    style={{backgroundColor: themeMode==='light'? 'rgb(241 245 249)':'#0005'}}
                      onClick={() => {
                        if (numberDrug > 1) {
                          setNumberDrug(numberDrug - 1);
                        }
                      }}
                      className="text-2xl cursor-pointer mt-3 rounded-full p-1"
                    />
                  </div>
                </div>

                <div className="pr-2">
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
              </div>

              <div>
                <FormControlLabel
                  value={isActive}
                  onChange={() => setisActive(!isActive)}
                  control={<Switch checked={isActive} />}
                  label={isActive ? 'فعال' : 'غیر فعال'}
                />
              </div>
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
                onClick={newDrugHandler}
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
                  onClick={editDrugHandler}
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
                      backgroundColor: 'rgb(220 38 38)',
                    },
                  }}
                  onClick={() => {
                    setIsEdit(false);
                    setNameDrug('');
                    setDescDrug('');
                    setValDrugForm({});
                    setValDrugDose({});
                    setValDrugUseCycle({});
                    setisActive(true);
                    setPriority(0);
                    setShowManageDrug(false);
                    setValCategoryDrug('');
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
          <TableManageDrug
            flag={flag}
            setShowManageDrug={setShowManageDrug}
            setDescDrug={setDescDrug}
            drugForm={drugForm}
            setValDrugForm={setValDrugForm}
            drugDose={drugDose}
            setValDrugDose={setValDrugDose}
            drugUseCycle={drugUseCycle}
            setValDrugUseCycle={setValDrugUseCycle}
            setNameDrug={setNameDrug}
            setValCategoryDrug={setValCategoryDrug}
            setPriority={setPriority}
            setisActive={setisActive}
            setIsLoading={setIsLoadingDrug}
            setFlag={setFlag}
            setIsEdit={setIsEdit}
            setEditId={setEditId}
            setShowManageCategoryDrug={setShowManageCategoryDrug}
            query={query}
            setNumPages={setNumPages}
            totalPages={totalPages}
            drugList={drugList}
            isLoading={isLoadingDrug}
            setAtcCode={setAtcCode}
            currentPage={currentPage}
            pageSize={pageSize}
            numPages={numPages}
            totalCount={totalCount}
          />
        </div>
      </div>
      {isLoading && <SimpleBackdrop />}
      {isLoadingDrug && <SimpleBackdrop />}
    </>
  );
}

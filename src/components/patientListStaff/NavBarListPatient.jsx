import { Button, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { IoIosClose } from 'react-icons/io';
import { mainDomain } from '../../utils/mainDomain';

export default function NavBarListPatient({
  setPageState,
  setIsLoading,
  patientList,
  setPatientList,
  numPages,
  setTotalPages,
  statusList,
  flagDel,
  setNumPages,
  setIsLoadingPat,
  setCurrentPage,
  setPageSize,
  valStatusFilter,
  setValStatusFilter,
  searchValue,
  setSearchValue,
  setTotalCount
}) {
  useEffect(() => {
    if (searchValue.length > 2) {
      setIsLoadingPat(true);
      setIsLoading(true);
      axios
        .get(`${mainDomain}/api/Patient/GetListPaged`, {
          params: {
            pageIndex: numPages,
            query: searchValue,
            statusId: valStatusFilter,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setIsLoadingPat(false);
          setIsLoading(false);
          setPatientList(res.data.items);
          setTotalPages(res.data.totalPages);
          setCurrentPage(res.data.currentPage);
          setPageSize(res.data.pageSize);
          setTotalCount(res.data.totalCount);
        })
        .catch((err) => {
          setIsLoading(false);
          setIsLoadingPat(false);
        });
    }
  }, [valStatusFilter, searchValue, numPages, flagDel]);

  useEffect(() => {
    if (searchValue.length > 2) {
      setNumPages(1);
    }
  }, [searchValue]);

  useEffect(() => {
    if (searchValue.length <= 2) {
      setIsLoadingPat(true);
      setIsLoading(true);
      axios
        .get(`${mainDomain}/api/Patient/GetListPaged`, {
          params: {
            pageIndex: numPages,
            query: searchValue,
            statusId: valStatusFilter,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setIsLoadingPat(false);
          setIsLoading(false);
          setPatientList(res.data.items);
          setTotalPages(res.data.totalPages);
          setCurrentPage(res.data.currentPage);
          setPageSize(res.data.pageSize);
          setTotalCount(res.data.totalCount);
        })
        .catch((err) => {
          setIsLoading(false);
          setIsLoadingPat(false);
        });
    }
  }, [valStatusFilter, searchValue.length <= 2, numPages, flagDel]);

  return (
    <>
      <div className="flex flex-wrap justify-between w-5/6 mx-auto">
        <div className="flex flex-wrap px-5">
          <div className="md:w-44 w-full">
            <TextField
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              className="w-full"
              id="outlined-multiline-flexible"
              label="کدملی / نام / نام خانوادگی"
              value={searchValue}
              minRows={1}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <IoIosClose
                      style={{ display: searchValue.length > 0 ? 'inline' : 'none' }}
                      className="text-2xl -translate-x-4 cursor-pointer"
                      onClick={()=> setSearchValue('')}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="md:pr-3 pr-0 md:mt-0 mt-3 md:w-auto w-full">
            <FormControl className="md:w-auto w-full" color="primary">
              <InputLabel color="primary" className="px-2" id="demo-simple-select-label">
                وضعیت
              </InputLabel>
              <Select
                className="md:w-44 w-full"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={valStatusFilter}
                label="وضعیت"
                color="primary"
                onChange={(e) => setValStatusFilter(e.target.value)}
              >
                <MenuItem value={-1}>همه</MenuItem>
                {statusList.map((e, i) => (
                  <MenuItem key={i} value={i + 100}>
                    {e}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="md:w-auto w-full text-start md:mt-0 mt-3 px-5">
          <Button
            sx={{
              color: 'white',
              py: 1,
              boxShadow: 'none',
              backgroundColor: 'rgb(16 185 129)',
              '&:hover': {
                backgroundColor: 'rgb(5 150 105)',
              },
            }}
            className="rounded-md duration-300 mt-2"
            onClick={() => setPageState(2)}
            variant="contained"
          >
            <span className="px-1">بیمار جدید</span>
            <FaPlus />
          </Button>
        </div>
      </div>
    </>
  );
}

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { TiDelete } from 'react-icons/ti';

export default function TableServices({ listServices , setListServices}) {
  const deletServiceHandler = (e)=>{
    // const data = new FormData();
    // data.append('medicalServiceId', e.medicalServiceId);
    // axios
    // .post(mainDomain+'/api/MedicalService/Delete' , data , {
    //   headers: {
    //     Authorization: 'Bearer ' + localStorage.getItem('token'),
    //   },
    // })
    // .then((res)=>{
    //   
    // })
    // .catch((err)=>{

    // })
    setListServices(listServices.filter((ev)=>ev!==e));
    
  }
  return (
    <>
    {
        listServices.length>0 &&
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="sticky table">
          <TableHead className="">
            <TableRow>
              <TableCell>ردیف</TableCell>
              <TableCell align="center">نوع خدمات</TableCell>
              <TableCell align="center">نام خدمات</TableCell>
              <TableCell align="center">تعداد</TableCell>
              <TableCell align="center">قیمت</TableCell>
              <TableCell align="center">عملیات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...new Set(listServices)].map((e, i) => (
              <TableRow key={i}>
                <TableCell>
                  <span className="pr-3 font-semibold">{i + 1}</span>
                </TableCell>
                <TableCell align="center">{e.medicalCategoryTitle}</TableCell>
                <TableCell align="center">{e.title}</TableCell>
                <TableCell align="center">{e.number}</TableCell>
                <TableCell align="center">{e.rate}</TableCell>
                <TableCell align="center">
                  <div className="flex justify-center">
                    <TiDelete onClick={()=> deletServiceHandler(e)} className="cursor-pointer text-4xl text-red-500 hover:text-red-600 duration-300" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    }
    {
        listServices.length===0 && 
        <p className='border rounded-md py-5'>لیست خدمات خالی است</p>
    }
    </>
  );
}

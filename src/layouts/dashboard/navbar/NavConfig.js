// components
import { BsCapsulePill, BsClockHistory } from 'react-icons/bs';
import { CiCircleList, CiHome, CiViewList } from 'react-icons/ci';
import { FaMobileAlt, FaRegCalendarAlt, FaRegCalendarCheck, FaUserMd, FaUsers } from 'react-icons/fa';
import { FaUserGear, FaUsersGear } from 'react-icons/fa6';
import { FiMessageCircle } from 'react-icons/fi';
import { GrServices } from 'react-icons/gr';
import { LiaUserEditSolid } from 'react-icons/lia';
import { LuBadgeInfo } from 'react-icons/lu';
import { MdAssuredWorkload, MdSupportAgent } from 'react-icons/md';
import { RiFileUploadLine } from 'react-icons/ri';
import { TbCalendarTime } from 'react-icons/tb';

// ----------------------------------------------------------------------

const sidebarConfig = [
  // General
  // ----------------------------------------------------------------------
  {
    subheader: 'General',
    items: [
      { title: 'صفحه اصلی', path: '/dashboard/home', icon: <CiHome /> },
    ],
  },
  // Patient
  // ----------------------------------------------------------------------
  {
    subheader: 'Patient',
    items: [
      { title: 'نوبت دهی اینترنتی', path: '/dashboard/reserve', icon: <FaRegCalendarCheck /> },
      { title: 'نوبت های من', path: '/dashboard/viewReservation', icon: <FaRegCalendarAlt /> },
      { title: 'تاریخچه بیماری‌ها', path: '/dashboard/sicknessList', icon: <CiViewList /> },
      { title: 'ویزیت آنلاین', path: '/dashboard/counseling', icon: <MdSupportAgent /> },
      { title: 'سابقه پذیرش', path: '/dashboard/historyVisit', icon: <BsClockHistory /> },
      { title: 'آپلود مدارک', path: '/dashboard/uploadDocument', icon: <RiFileUploadLine /> },
    ],
  },

  // Staff
  // ----------------------------------------------------------------------
  {
    subheader: 'Staff',
    items: [
      { title: 'لیست بیماران', path: '/dashboard/patientListStaff', icon: <FaUsers /> },
      { title: 'پذیرش', path: '/dashboard/reception', icon: <MdSupportAgent /> },
      { title: 'لیست نوبت ها', path: '/dashboard/reservHistory', icon: <CiViewList /> },
    ],
  },

  // Doctor
  // ----------------------------------------------------------------------
  {
    subheader: 'Doctor',
    items: [
      { title: 'گزارش پذیرش', path: '/dashboard/manageReception', icon: <CiCircleList /> },
      { title: 'ویزیت', path: '/dashboard/visit', icon: <FaUserMd /> },
      { title: 'ویزیت آنلاین', path: '/dashboard/Cunsel', icon: <MdSupportAgent /> },
      { title: 'لیست بیماران', path: '/dashboard/patientListStaff', icon: <FaUsers /> },
      { title: 'مدیریت دارو', path: '/dashboard/manageDrug', icon: <BsCapsulePill /> },
    ],
  },
  // Admin
  // ----------------------------------------------------------------------
  {
    subheader: 'Admin',
    items: [
      { title: 'مدیریت دارو', path: '/dashboard/manageDrug', icon: <BsCapsulePill /> },
      { title: 'مدیریت خدمات', path: '/dashboard/manageServices', icon: <GrServices /> },
      { title: 'مدیریت پرسنل', path: '/dashboard/managStaff', icon: <FaUsersGear /> },
      { title: 'مدیریت پزشک', path: '/dashboard/managDoctor', icon: <FaUserGear /> },
      { title: 'مدیریت رزرو', path: '/dashboard/managReserve', icon: <TbCalendarTime /> },
      { title: 'مدیریت اطلاعات پایه', path: '/dashboard/managInformation', icon: <LuBadgeInfo /> },
      { title: 'مدیریت بیمه', path: '/dashboard/managInsuranceCompany', icon: <MdAssuredWorkload /> },
    ],
  },
  {
    subheader: 'Staff',
    items: [
    
      { title: 'کدهای ارسالی', path: '/dashboard/managSendCode', icon: <FaMobileAlt /> },
    ],
  },
  {
    subheader: 'General2',
    items: [
      { title: 'پیام های من', path: '/dashboard/mymessage', icon: <FiMessageCircle /> },
      { title: 'ویرایش پروفایل', path: '/dashboard/updateProfile', icon: <LiaUserEditSolid /> },
    ],
  },
];

export default sidebarConfig;

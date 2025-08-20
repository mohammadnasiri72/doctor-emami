/* eslint-disable no-nested-ternary */
import { Suspense, lazy, useEffect, useState } from 'react';
import { Navigate, useRoutes, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
// layouts
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// components
import LoadingScreen from '../components/LoadingScreen';
import Register from '../pages/registerPage';
import MainLoginPage from '../components/login/mainLoginPage';
import { mainDomain } from '../utils/mainDomain';
import HomePage from '../pages/homePage';
import UpdateProfile from '../pages/updateProfile';
import MainPageReserve from '../pages/reserve';
import ViewReservation from '../pages/myReservation';
import SicknessList from '../pages/SicknessList';
import Counseling from '../pages/Counseling';
import HistoryVisit from '../pages/HistoryVisit';
import Visit from '../pages/Visit';
import PatientListStaff from '../pages/PatientListStaff';
import Reception from '../pages/Reception';
import ManageDrug from '../pages/ManageDrug';
import ManageServices from '../pages/ManageServices';
import ManagStaff from '../pages/ManagStaff';
import ManagDoctor from '../pages/ManagDoctor';
import ManagReserve from '../pages/ManagReserve';
import ManagInformation from '../pages/ManagInformation';
import ManagInsuranceCompany from '../pages/ManagInsuranceCompany';
import Mymessage from '../pages/Mymessage';
import ReservHistory from '../pages/ReservHistory';
import Cunsel from '../pages/Cunsel';
import ManageReception from '../pages/ManageReception';
import UploadDocument from '../pages/UploadDocument';
import ManagSendCode from '../pages/ManagSendCode';
import ResultPayment from '../pages/ResultPayment';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  const [account, setAccount] = useState('');
  const [change, setChang] = useState(false);
  const [flagNotif, setFlagNotif] = useState(false);
  const [changeStatePages, setChangeStatePages] = useState(false);
  const [totalUnRead, setTotalUnRead] = useState(0);

  const url = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    let role = localStorage.getItem('roles') ? localStorage.getItem('roles') : 'patient';
    if (role.includes('Doctor')) {
      role = 'Doctor';
    } else if (role.includes('Staff')) {
      role = 'Staff';
    }
    if (localStorage.getItem('token')) {
      
      axios
        .get(`${mainDomain}/api/${role}/Get`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setAccount(res.data);
          } else {
            navigate('/login');
          }
        })
        .catch(() => {
          if (url.pathname.includes('/dashboard')) {
            navigate('/login');
          }
        });
    }
  }, [change]);

  return useRoutes([
    {
      path: '/',
      element: localStorage.getItem('token') ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />,
    },
    {
      path: '/register',
      element: <Register setAccount={setAccount}/>,
    },
    {
      path: '/login',
      element: <MainLoginPage setAccount={setAccount} />,
    },
    {
      path: '/dashboard',
      element: (
        <DashboardLayout
          setChangeStatePages={setChangeStatePages}
          account={account}
          flagNotif={flagNotif}
          setFlagNotif={setFlagNotif}
          totalUnRead={totalUnRead}
          setTotalUnRead={setTotalUnRead}
        />
      ),
      children: [
        {
          element: localStorage.getItem('token') ? (
            <Navigate to="/dashboard/home" replace />
          ) : (
            <Navigate to="/login" replace />
          ),
          index: true,
        },
        {
          path: 'home',
          element: localStorage.getItem('token') ? <HomePage account={account} /> : <Navigate to="/login" replace />,
        },
        {
          path: 'updateProfile',
          element: localStorage.getItem('token') ? (
            <UpdateProfile account={account} setChang={setChang} />
          ) : (
            <Navigate to="/login" replace />
          ),
        },
        {
          path: 'reserve',
          element: localStorage.getItem('token') ? (
            localStorage.getItem('roles') === 'Patient' ? (
              <MainPageReserve account={account} setFlagNotif={setFlagNotif} />
            ) : (
              <Navigate to="/404" replace />
            )
          ) : (
            <Navigate to="/login" replace />
          ),
        },
        {
          path: 'viewReservation',
          element: localStorage.getItem('token') ? (
            localStorage.getItem('roles') === 'Patient' ? (
              <ViewReservation account={account} />
            ) : (
              <Navigate to="/404" replace />
            )
          ) : (
            <Navigate to="/login" replace />
          ),
        },
        {
          path: 'sicknessList',
          element: localStorage.getItem('token') ? (
            localStorage.getItem('roles') === 'Patient' ? (
              <SicknessList />
            ) : (
              <Navigate to="/404" replace />
            )
          ) : (
            <Navigate to="/login" replace />
          ),
        },
        {
          path: 'uploadDocument',
          element: localStorage.getItem('token') ? (
            localStorage.getItem('roles') === 'Patient' ? (
              <UploadDocument account={account} />
            ) : (
              <Navigate to="/404" replace />
            )
          ) : (
            <Navigate to="/login" replace />
          ),
        },
        
        {
          path: 'counseling',
          element: localStorage.getItem('token') ? (
            localStorage.getItem('roles') === 'Patient' ? (
              <Counseling account={account} changeStatePages={changeStatePages} setFlagNotif={setFlagNotif} />
            ) : (
              <Navigate to="/404" replace />
            )
          ) : (
            <Navigate to="/login" replace />
          ),
          children: [
            {
              path: 'service',
              element: localStorage.getItem('token') ? (
                localStorage.getItem('roles') === 'Patient' ? (
                  <Counseling account={account} changeStatePages={changeStatePages} setFlagNotif={setFlagNotif} />
                ) : (
                  <Navigate to="/404" replace />
                )
              ) : (
                <Navigate to="/login" replace />
              ),
            },
            {
              path: 'historyVisit',
              element: localStorage.getItem('token') ? (
                localStorage.getItem('roles') === 'Patient' ? (
                  <Counseling account={account} changeStatePages={changeStatePages} setFlagNotif={setFlagNotif} />
                ) : (
                  <Navigate to="/404" replace />
                )
              ) : (
                <Navigate to="/login" replace />
              ),
            },
          ],
        },
        {
          path: 'historyVisit',
          element: localStorage.getItem('token') ? (
            <HistoryVisit account={account} changeStatePages={changeStatePages} />
          ) : (
            <Navigate to="/login" replace />
          ),
          children: [
            {
              path: 'details',
              element: localStorage.getItem('token') ? (
                <HistoryVisit account={account} changeStatePages={changeStatePages} />
              ) : (
                <Navigate to="/login" replace />
              ),
            },
          ],
        },
        {
          path: 'visit',
          element: localStorage.getItem('token') ? (
            localStorage.getItem('roles').includes('Doctor') ? (
              <Visit changeStatePages={changeStatePages} />
            ) : (
              <Navigate to="/404" replace />
            )
          ) : (
            <Navigate to="/login" replace />
          ),
          children: [
            {
              path: 'visitPatient',
              element: localStorage.getItem('token') ? (
                localStorage.getItem('roles').includes('Doctor') ? (
                  <Visit changeStatePages={changeStatePages} />
                ) : (
                  <Navigate to="/404" replace />
                )
              ) : (
                <Navigate to="/login" replace />
              ),
            },
            {
              path: 'historyVisit',
              element: localStorage.getItem('token') ? (
                localStorage.getItem('roles').includes('Doctor') ? (
                  <Visit changeStatePages={changeStatePages} />
                ) : (
                  <Navigate to="/404" replace />
                )
              ) : (
                <Navigate to="/login" replace />
              ),
            },
          ],
        },
        {
          path: 'Cunsel',
          element: localStorage.getItem('token') ? (
            localStorage.getItem('roles').includes('Doctor') ? (
              <Cunsel changeStatePages={changeStatePages} />
            ) : (
              <Navigate to="/404" replace />
            )
          ) : (
            <Navigate to="/login" replace />
          ),
        },
        {
          path: 'patientListStaff',
          element: localStorage.getItem('token') ? (
            localStorage.getItem('roles').includes('Staff') || localStorage.getItem('roles').includes('Doctor') ? (
              <PatientListStaff changeStatePages={changeStatePages} />
            ) : (
              <Navigate to="/404" replace />
            )
          ) : (
            <Navigate to="/login" replace />
          ),
          children: [
            {
              path: 'updatePatient',
              element: localStorage.getItem('token') ? (
                localStorage.getItem('roles').includes('Staff') || localStorage.getItem('roles').includes('Doctor') ? (
                  <PatientListStaff changeStatePages={changeStatePages} />
                ) : (
                  <Navigate to="/404" replace />
                )
              ) : (
                <Navigate to="/login" replace />
              ),
            },
            {
              path: 'newPatient',
              element: localStorage.getItem('token') ? (
                localStorage.getItem('roles').includes('Staff') || localStorage.getItem('roles').includes('Doctor') ? (
                  <PatientListStaff changeStatePages={changeStatePages} />
                ) : (
                  <Navigate to="/404" replace />
                )
              ) : (
                <Navigate to="/login" replace />
              ),
            },
            {
              path: 'reservePatient',
              element: localStorage.getItem('token') ? (
                localStorage.getItem('roles').includes('Staff') || localStorage.getItem('roles').includes('Doctor') ? (
                  <PatientListStaff changeStatePages={changeStatePages} />
                ) : (
                  <Navigate to="/404" replace />
                )
              ) : (
                <Navigate to="/login" replace />
              ),
            },
            {
              path: 'viewReservePatient',
              element: localStorage.getItem('token') ? (
                localStorage.getItem('roles').includes('Staff') || localStorage.getItem('roles').includes('Doctor') ? (
                  <PatientListStaff changeStatePages={changeStatePages} />
                ) : (
                  <Navigate to="/404" replace />
                )
              ) : (
                <Navigate to="/login" replace />
              ),
            },
            {
              path: 'historyVisitPatient',
              element: localStorage.getItem('token') ? (
                localStorage.getItem('roles').includes('Staff') || localStorage.getItem('roles').includes('Doctor') ? (
                  <PatientListStaff changeStatePages={changeStatePages} />
                ) : (
                  <Navigate to="/404" replace />
                )
              ) : (
                <Navigate to="/login" replace />
              ),
            },
            {
              path: 'visitPatient',
              element: localStorage.getItem('token') ? (
                localStorage.getItem('roles').includes('Staff') || localStorage.getItem('roles').includes('Doctor') ? (
                  <PatientListStaff changeStatePages={changeStatePages} />
                ) : (
                  <Navigate to="/404" replace />
                )
              ) : (
                <Navigate to="/login" replace />
              ),
            },
          ],
        },
        {
          path: 'reception',
          element: localStorage.getItem('token') ? (
            localStorage.getItem('roles').includes('Staff') ? (
              <Reception account={account} changeStatePages={changeStatePages} />
            ) : (
              <Navigate to="/404" replace />
            )
          ) : (
            <Navigate to="/login" replace />
          ),
          children: [
            {
              path: 'setReception',
              element: localStorage.getItem('token') ? (
                localStorage.getItem('roles').includes('Staff') ? (
                  <Reception account={account} changeStatePages={changeStatePages} />
                ) : (
                  <Navigate to="/404" replace />
                )
              ) : (
                <Navigate to="/login" replace />
              ),
            },
            {
              path: 'historyVisit',
              element: localStorage.getItem('token') ? (
                localStorage.getItem('roles').includes('Staff') ? (
                  <Reception account={account} changeStatePages={changeStatePages} />
                ) : (
                  <Navigate to="/404" replace />
                )
              ) : (
                <Navigate to="/login" replace />
              ),
            },
            {
              path: 'visit',
              element: localStorage.getItem('token') ? (
                localStorage.getItem('roles').includes('Staff') ? (
                  <Reception account={account} changeStatePages={changeStatePages} />
                ) : (
                  <Navigate to="/404" replace />
                )
              ) : (
                <Navigate to="/login" replace />
              ),
            },
          ],
        },
        {
          path: 'managSendCode',
          element: localStorage.getItem('token') ? (
            localStorage.getItem('roles').includes('Staff') ? (
              <ManagSendCode changeStatePages={changeStatePages} />
            ) : (
              <Navigate to="/404" replace />
            )
          ) : (
            <Navigate to="/login" replace />
          ),
        },
        {
          path: 'reservHistory',
          element: localStorage.getItem('token') ? (
            localStorage.getItem('roles').includes('Staff') ? (
              <ReservHistory changeStatePages={changeStatePages} />
            ) : (
              <Navigate to="/404" replace />
            )
          ) : (
            <Navigate to="/login" replace />
          ),
          children: [
            {
              path: 'historyVisit',
              element: localStorage.getItem('token') ? (
                localStorage.getItem('roles').includes('Staff') ? (
                  <ReservHistory changeStatePages={changeStatePages} />
                ) : (
                  <Navigate to="/404" replace />
                )
              ) : (
                <Navigate to="/login" replace />
              ),
            },
            {
              path: 'visit',
              element: localStorage.getItem('token') ? (
                localStorage.getItem('roles').includes('Staff') ? (
                  <ReservHistory changeStatePages={changeStatePages} />
                ) : (
                  <Navigate to="/404" replace />
                )
              ) : (
                <Navigate to="/login" replace />
              ),
            },
           
          ],
        },
        {
          path: 'manageDrug',
          element: localStorage.getItem('token') ? (
            localStorage.getItem('roles').includes('Admin') || localStorage.getItem('roles').includes('Doctor') ? (
              <ManageDrug changeStatePages={changeStatePages} />
            ) : (
              <Navigate to="/404" replace />
            )
          ) : (
            <Navigate to="/login" replace />
          ),
        },
        {
          path: 'manageReception',
          element: localStorage.getItem('token') ? (
            localStorage.getItem('roles').includes('Doctor') ? (
              <ManageReception changeStatePages={changeStatePages} account={account} />
            ) : (
              <Navigate to="/404" replace />
            )
          ) : (
            <Navigate to="/login" replace />
          ),
        },
        {
          path: 'manageServices',
          element: localStorage.getItem('token') ? (
            localStorage.getItem('roles').includes('Admin') ? (
              <ManageServices />
            ) : (
              <Navigate to="/404" replace />
            )
          ) : (
            <Navigate to="/login" replace />
          ),
        },
        {
          path: 'managStaff',
          element: localStorage.getItem('token') ? (
            localStorage.getItem('roles').includes('Admin') ? (
              <ManagStaff />
            ) : (
              <Navigate to="/404" replace />
            )
          ) : (
            <Navigate to="/login" replace />
          ),
        },
        {
          path: 'managDoctor',
          element: localStorage.getItem('token') ? (
            localStorage.getItem('roles').includes('Admin') ? (
              <ManagDoctor />
            ) : (
              <Navigate to="/404" replace />
            )
          ) : (
            <Navigate to="/login" replace />
          ),
        },
        {
          path: 'managReserve',
          element: localStorage.getItem('token') ? (
            localStorage.getItem('roles').includes('Admin') ? (
              <ManagReserve />
            ) : (
              <Navigate to="/404" replace />
            )
          ) : (
            <Navigate to="/login" replace />
          ),
        },
        {
          path: 'managInformation',
          element: localStorage.getItem('token') ? (
            localStorage.getItem('roles').includes('Admin') ? (
              <ManagInformation />
            ) : (
              <Navigate to="/404" replace />
            )
          ) : (
            <Navigate to="/login" replace />
          ),
        },
        {
          path: 'managInsuranceCompany',
          element: localStorage.getItem('token') ? (
            localStorage.getItem('roles').includes('Admin') ? (
              <ManagInsuranceCompany />
            ) : (
              <Navigate to="/404" replace />
            )
          ) : (
            <Navigate to="/login" replace />
          ),
        },
        {
          path: 'mymessage',
          element: localStorage.getItem('token') ? (
            <Mymessage
              flagNotif={flagNotif}
              setFlagNotif={setFlagNotif}
              totalUnRead={totalUnRead}
              setTotalUnRead={setTotalUnRead}
            />
          ) : (
            <Navigate to="/login" replace />
          ),
        },
      ],
    },
    // {
    //   path: '/register',
    //   element:
    // },
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'payment/result', element: <ResultPayment /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// Dashboard

const NotFound = Loadable(lazy(() => import('../pages/Page404')));

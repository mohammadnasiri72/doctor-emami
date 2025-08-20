// @mui
import { Container } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// components
import HomePagePatient from '../components/HomePage/HomePagePatient';
import Page from '../components/Page';
import HomePageAdmin from '../components/HomePage/HomePageAdmin';

// ----------------------------------------------------------------------

export default function HomePage({ account }) {
  const { themeStretch } = useSettings();
  const { themeMode } = useSettings();

  return (
    <>
      <div className="">
        <Page title="صفحه اصلی">
          <Container maxWidth={themeStretch ? false : 'xl'}>
            {localStorage.getItem('roles') === 'Patient' && (
              <div style={{backgroundColor: themeMode==='light'? '#d6f4e7' : '#161c24' }} className="min-h-screen border rounded-2xl">
                <HomePagePatient account={account} />
              </div>
            )}
            {(localStorage.getItem('roles').includes('Admin') ||
              localStorage.getItem('roles').includes('Doctor') ||
              localStorage.getItem('roles').includes('Staff')) && (
              <div className="min-h-screen">
                <HomePageAdmin account={account} />
              </div>
            )}
          </Container>
        </Page>
      </div>
    </>
  );
}

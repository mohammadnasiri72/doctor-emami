import { Container } from '@mui/material';
import Page from '../components/Page';
import useSettings from '../hooks/useSettings';
import MainPageManagInsuranceCompany from '../components/ManagInsuranceCompany/MainPageManagInsuranceCompany';
// ----------------------------------------------------------------------

export default function ManagInsuranceCompany({ account }) {
  const { themeStretch } = useSettings();
  return (
    <>
      <Page title="مدیرت بیمه">
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <MainPageManagInsuranceCompany />
        </Container>
      </Page>
    </>
  );
}

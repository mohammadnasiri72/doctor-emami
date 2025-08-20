// @mui
import { Container } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import MainpatientListStaff from '../components/patientListStaff/MainpatientListStaff';

// ----------------------------------------------------------------------

export default function PatientListStaff({changeStatePages}) {
  const { themeStretch } = useSettings();

  return (
    <Page title="لیست بیماران">
      <Container maxWidth={themeStretch ? false : 'xl'}>
      <MainpatientListStaff changeStatePages={changeStatePages}/>
      </Container>
    </Page>
  );
}

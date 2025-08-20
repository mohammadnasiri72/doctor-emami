// @mui
import { Container, Typography } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import PatientList from '../components/patientList/PatientList';

// ----------------------------------------------------------------------

export default function SicknessList() {
  const { themeStretch } = useSettings();

  return (
    <Page title="لیست بیماریهای من ">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <PatientList />
      </Container>
    </Page>
  );
}

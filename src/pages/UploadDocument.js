// @mui
import { Container } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import MainPageUploadDocument from '../components/UploadDocument/MainPageUploadDocument';

// ----------------------------------------------------------------------

export default function UploadDocument({account}) {
  const { themeStretch } = useSettings();

  return (
    <Page title="آپلود مدارک">
      <Container maxWidth={themeStretch ? false : 'xl'}>
      <MainPageUploadDocument account={account}/>
      </Container>
    </Page>
  );
}

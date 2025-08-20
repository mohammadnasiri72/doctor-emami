import { Container } from '@mui/material';
import Page from '../components/Page';
import useSettings from '../hooks/useSettings';
import MainPageManageServices from '../components/ManageServices/MainPageManageServices';
// ----------------------------------------------------------------------

export default function ManageServices({ account }) {
  const { themeStretch } = useSettings();
  return (
    <>
      <Page title="مدیریت خدمات">
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <MainPageManageServices />
        </Container>
      </Page>
    </>
  );
}

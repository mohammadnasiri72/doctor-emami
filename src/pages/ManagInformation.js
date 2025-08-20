import { Container } from '@mui/material';
import Page from '../components/Page';
import useSettings from '../hooks/useSettings';
import MainPageManagInformation from '../components/ManageInformation/MainPageManagInformation';
// ----------------------------------------------------------------------

export default function ManagInformation({ account }) {
  const { themeStretch } = useSettings();
  return (
    <>
      <Page title="مدیریت اطلاعات پایه">
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <MainPageManagInformation />
        </Container>
      </Page>
    </>
  );
}

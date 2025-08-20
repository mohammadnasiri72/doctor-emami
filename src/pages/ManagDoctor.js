import { Container } from '@mui/material';
import Page from '../components/Page';
import useSettings from '../hooks/useSettings';
import MainPageManageDoctor from '../components/ManageDoctor/MainPageManageDoctor';
// ----------------------------------------------------------------------

export default function ManagDoctor() {
  const { themeStretch } = useSettings();
  return (
    <>
      <Page title="مدیریت پزشک">
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <MainPageManageDoctor/>
        </Container>
      </Page>
    </>
  );
}

import { Container } from '@mui/material';
import Page from '../components/Page';
import useSettings from '../hooks/useSettings';
import MainPageManageStaff from '../components/ManageStaff/MainPageManageStaff';
// ----------------------------------------------------------------------

export default function ManagStaff({ account }) {
  const { themeStretch } = useSettings();
  return (
    <>
      <Page title="مدیریت پرسنل">
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <MainPageManageStaff account={account} />
        </Container>
      </Page>
    </>
  );
}

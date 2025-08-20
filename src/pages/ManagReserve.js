import { Container } from '@mui/material';
import Page from '../components/Page';
import useSettings from '../hooks/useSettings';
import MainPageManageReserve from '../components/ManageReserve/MainPageManageReserve';
// ----------------------------------------------------------------------

export default function ManagReserve({ account }) {
  const { themeStretch } = useSettings();
  return (
    <>
      <Page title="مدیریت نوبت">
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <MainPageManageReserve />
        </Container>
      </Page>
    </>
  );
}

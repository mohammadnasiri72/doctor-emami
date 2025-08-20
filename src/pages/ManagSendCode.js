import { Container } from '@mui/material';
import Page from '../components/Page';
import useSettings from '../hooks/useSettings';
import MainPageManagReserve from '../components/ManagReserve/MainPageManagReserve';
// ----------------------------------------------------------------------

export default function ManagSendCode({ account }) {
  const { themeStretch } = useSettings();
  return (
    <>
      <Page title="کدهای ارسالی">
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <MainPageManagReserve />
        </Container>
      </Page>
    </>
  );
}

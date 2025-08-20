// @mui
import { Container } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import MainPageReserveHistory from '../components/ReserveHistory/MainPageReserveHistory';

// ----------------------------------------------------------------------

export default function ReservHistory({changeStatePages}) {
  const { themeStretch } = useSettings();

  return (
    <Page title="لیست نوبت ها">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <MainPageReserveHistory changeStatePages={changeStatePages}/>
      </Container>
    </Page>
  );
}

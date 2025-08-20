import { Container } from '@mui/material';
import Page from '../components/Page';
import MyReservation from '../components/myReservation/myReservation';
import useSettings from '../hooks/useSettings';
// ----------------------------------------------------------------------

export default function ViewReservation({ account }) {
  const { themeStretch } = useSettings();
  return (
    <>
      <Page title="نوبت های من">
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <MyReservation account={account} />
        </Container>
      </Page>
    </>
  );
}

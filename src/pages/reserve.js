// @mui
import { Container, Typography } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import Reserve from '../components/reserve/reserve';

// ----------------------------------------------------------------------

export default function MainPageReserve({account , setFlagNotif}) {
  const { themeStretch } = useSettings();

  return (
    <Page title="نوبت دهی آنلاین">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          نوبت دهی آنلاین
        </Typography>
        <Reserve account={account} setFlagNotif={setFlagNotif}/>
      </Container>
    </Page>
  );
}

// @mui
import { Container, Typography } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import MainPageReception from '../components/Reception/MainPageReception';

// ----------------------------------------------------------------------

export default function Reception({account , changeStatePages}) {
  const { themeStretch } = useSettings();

  return (
    <Page title="پذیرش">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
            پذیرش
        </Typography>
        <MainPageReception account={account} changeStatePages={changeStatePages}/>
      </Container>
    </Page>
  );
}

// @mui
import { Container } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import MainPageCunsel from '../components/Cunsel/MainPageCunsel';

// ----------------------------------------------------------------------

export default function Cunsel({account , changeStatePages}) {
  const { themeStretch } = useSettings();

  return (
    <Page title="ویزیت آنلاین">
      <Container maxWidth={themeStretch ? false : 'xl'}>
      <MainPageCunsel account={account} changeStatePages={changeStatePages}/>
      </Container>
    </Page>
  );
}

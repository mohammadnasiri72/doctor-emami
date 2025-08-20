// @mui
import { Container } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import MainPageVisitHistory from '../components/VisitHistory/mainPageHistoryVisit';

// ----------------------------------------------------------------------

export default function HistoryVisit({account , changeStatePages}) {
  const { themeStretch } = useSettings();

  return (
    <Page title="سابقه پذیرش">
      <Container maxWidth={themeStretch ? false : 'xl'}>
      <MainPageVisitHistory account={account} changeStatePages={changeStatePages}/>
      </Container>
    </Page>
  );
}

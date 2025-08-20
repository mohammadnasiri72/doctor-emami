import { Container } from '@mui/material';
import Page from '../components/Page';
import useSettings from '../hooks/useSettings';
import MainPageManageReception from '../components/ManageReception/MainPageManageReception';
// ----------------------------------------------------------------------

export default function ManageReception({changeStatePages , account}) {
  const { themeStretch } = useSettings();
  return (
    <>
      <Page title="گزارش پذیرش">
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <MainPageManageReception changeStatePages={changeStatePages} account={account}/>
        </Container>
      </Page>
    </>
  );
}

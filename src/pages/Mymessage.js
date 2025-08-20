import { Container } from '@mui/material';
import Page from '../components/Page';
import useSettings from '../hooks/useSettings';
import MainPageMyMessage from '../components/MyMessage/MainPageMyMessage';
// ----------------------------------------------------------------------

export default function Mymessage({
  flagNotification,
  setFlagNotification,
  flagNotif,
  setFlagNotif,
  totalUnRead,
  setTotalUnRead,
}) {
  const { themeStretch } = useSettings();
  return (
    <>
      <Page title="پیغام های من">
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <MainPageMyMessage totalUnRead={totalUnRead} setTotalUnRead={setTotalUnRead} />
        </Container>
      </Page>
    </>
  );
}

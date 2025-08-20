// @mui
import { Container, Typography } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import UploaderImage from '../components/updateProfile/uploaderImage';
import FormUpdateProfile from '../components/updateProfile/formUpdateProfile';

// ----------------------------------------------------------------------

export default function UpdateProfile({account , setChang}) {
  const { themeStretch } = useSettings();

  return (
    <Page title="ویرایش پروفایل">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography className="text-start" variant="h3" component="h1" paragraph>
          ویرایش پروفایل
        </Typography>
        <div className="flex justify-center flex-wrap">
          <div className="lg:w-1/3 w-full p-4">
            <UploaderImage account={account} setChang={setChang}/>
          </div>
          <FormUpdateProfile account={account} setChang={setChang}/>
        </div>
      </Container>
    </Page>
  );
}

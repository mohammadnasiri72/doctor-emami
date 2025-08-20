import Page from '../components/Page';
import MainPageRegister from '../components/register/MainPageRegister';

function Register({setAccount}) {
  return (
    <>
      <Page title="ثبت نام" sx={{ height: 1 }}>
        <MainPageRegister setAccount={setAccount}/>
      </Page>
    </>
  );
}

export default Register;

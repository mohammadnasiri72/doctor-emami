import MainPageDashboardFooter from '../../../components/DashboardFooter/MainPageDashboardFooter';

export default function DashboardFooter({ setChangeStatePages }) {
  return (
    <>
      {localStorage.getItem('roles') === 'Patient' && (
        <MainPageDashboardFooter setChangeStatePages={setChangeStatePages} />
      )}
    </>
  );
}

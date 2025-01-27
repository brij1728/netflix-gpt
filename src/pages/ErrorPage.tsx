import { ErrorUI } from '../components/ui';

const ErrorPage = () => {
  return (
    <>
      <ErrorUI redirectToLogin={true} />
    </>
  );
};

export default ErrorPage;

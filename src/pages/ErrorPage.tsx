import React from 'react';

interface ErrorPageProps {
  title?: string;
  message?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({
  title = 'Oops! Something went wrong.',
  message = 'The page you are looking for does not exist or an unexpected error occurred.',
}) => {
  return (
    <>
      <h1>{title}</h1>
      <p>{message}</p>
    </>
  );
};

export default ErrorPage;

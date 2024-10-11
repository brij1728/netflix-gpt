import React from 'react';

interface ErrorProps {
  title?: string;
  message?: string;
}

export const Error: React.FC<ErrorProps> = ({
  title = 'Oops! Something went wrong.',
  message = 'The page you are looking for does not exist or an unexpected error occurred.',
}) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{message}</p>
    </div>
  );
};

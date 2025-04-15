import { useNavigate } from 'react-router-dom';
interface ErrorUIProps {
  title?: string | null;
  errorMessage?: string | null;
  onRetry?: () => void;
  redirectToLogin?: boolean;
}

export const ErrorUI: React.FC<ErrorUIProps> = ({
  title = 'An Error Occurred',
  errorMessage = 'Something went wrong!',
  onRetry,
  redirectToLogin = false,
}) => {
  const navigate = useNavigate();
  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-gray-800 bg-opacity-70">
      <div className="bg-white flex max-w-md flex-col items-center justify-center rounded-lg p-6 shadow-lg">
        {/* Error Title */}
        <h2 className="mb-2 text-xl font-bold text-gray-800">{title}</h2>

        {/* Error Icon */}
        <div className="mb-4 text-red-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 14l2-2m0 0l2-2m-2 2l-2 2m2-2v6m0-6a9 9 0 110-18 9 9 0 010 18z"
            />
          </svg>
        </div>

        {/* Error Message */}
        <p className="mb-4 text-center text-gray-600">{errorMessage}</p>

        {/* Retry Button */}
        {onRetry && (
          <button
            onClick={onRetry}
            className="text-white mb-2 rounded bg-red-500 px-4 py-2 hover:bg-red-600"
          >
            Retry
          </button>
        )}

        {/* Login Button */}
        {redirectToLogin && (
          <button
            onClick={handleLoginRedirect}
            className="text-white rounded bg-blue-500 px-4 py-2 hover:bg-blue-600"
          >
            Go to Login
          </button>
        )}
      </div>
    </div>
  );
};

interface ILoginForm {
  email: string;
  password: string;
}

// Update loginFormValidation to be a simple function instead of React.FC
export const loginFormValidation = ({
  email,
  password,
}: ILoginForm): string | null => {
  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email
  );

  const isPasswordValid =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );

  if (!isEmailValid) {
    return 'Invalid email address';
  }
  if (!isPasswordValid) {
    return 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character';
  }

  return null; // Return null if both validations pass
};

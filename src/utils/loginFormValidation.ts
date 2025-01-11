interface ILoginForm {
  email: string;
  password?: string; // Password is optional for magic link
}

export const loginFormValidation = ({
  email,
  password,
}: ILoginForm): string | null => {
  // Validate email format
  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email
  );
  if (!isEmailValid) {
    return 'Invalid email address';
  }

  // Skip password validation if password is not provided (magic link scenario)
  if (password === undefined || password === '') {
    return null; // No validation error for email-only login
  }

  // Validate password complexity
  const isPasswordValid =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );
  if (!isPasswordValid) {
    return 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character';
  }

  return null; // Return null if all validations pass
};

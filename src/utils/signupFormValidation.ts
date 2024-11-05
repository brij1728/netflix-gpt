interface ISignupForm {
  name: string;
  email: string;
  password: string;
}

export const signupFormValidation = ({
  name,
  email,
  password,
}: ISignupForm): string | null => {
  // Validate name with only letters and spaces
  const isNameValid = /^[a-zA-Z\s]{2,}$/.test(name.trim());

  // Validate email format
  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email
  );

  // Validate password with at least 8 characters, including uppercase, lowercase, number, and special character
  const isPasswordValid =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );

  // Return error messages based on validation checks
  if (!isNameValid) {
    return 'Name must contain at least 2 characters and only letters and spaces';
  }
  if (!isEmailValid) {
    return 'Invalid email address';
  }
  if (!isPasswordValid) {
    return 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character';
  }

  // Return null if all validations pass
  return null;
};

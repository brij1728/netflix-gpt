import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'text' | 'outlined' | 'contained'; // Variants
  color?: 'primary' | 'secondary'; // Colors
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = '',
  type,
  //variant = 'contained', // Default variant
  //color = 'primary', // Default color
}) => {
  // Define variant-based styles
  // const variantStyles = {
  //   contained: 'bg-blue-500 text-white hover:bg-blue-600',
  //   outlined: 'border border-blue-500 text-blue-500 hover:bg-blue-100',
  //   text: 'text-blue-500 hover:underline',
  // };

  // Define color-based styles
  // const colorStyles = {
  //   primary: '',
  //   secondary: 'bg-gray-500 text-white hover:bg-gray-700',
  // };

  // Combine styles
  const combinedStyles = `font-poppins rounded-md px-4 py-2 text-[15px] font-medium capitalize ${className}`;

  return (
    <button onClick={onClick} className={combinedStyles} type={type}>
      {children}
    </button>
  );
};

import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'text' | 'outlined' | 'contained';
  color?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = '',

  color,
}) => {
  return (
    <button
      onClick={onClick}
      className={`font-poppins rounded-md px-4 py-2 text-[15px] font-medium capitalize ${className}`}
      color={color}
    >
      {children}
    </button>
  );
};

'use client';

import React, { forwardRef, ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center gap-2 font-label-md text-label-md font-semibold transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]';

    const variantStyles = {
      primary:
        'bg-secondary-container text-on-secondary hover:bg-secondary shadow-md hover:shadow-lg focus:ring-secondary-container',
      secondary:
        'bg-surface-container-lowest border-1.5 border-primary text-primary hover:bg-primary/5 focus:ring-primary',
      tertiary: 'bg-primary-container text-on-primary hover:bg-primary focus:ring-primary-container',
      ghost: 'text-on-surface-variant hover:bg-surface-container focus:ring-outline-variant',
      outline: 'border border-outline text-on-surface hover:bg-surface-container focus:ring-outline',
    };

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-label-sm gap-1.5',
      md: 'px-5 py-2.5',
      lg: 'px-6 py-3.5 text-title-sm',
    };

    const widthStyles = fullWidth ? 'w-full' : '';

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
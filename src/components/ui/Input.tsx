'use client';

import React, { forwardRef, InputHTMLAttributes, useId } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const hintId = `${inputId}-hint`;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block font-label-sm text-label-sm text-on-surface mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div
              className="absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px] pointer-events-none"
              aria-hidden="true"
            >
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`
              w-full h-10 rounded-lg bg-surface-container-low text-on-surface placeholder:text-outline
              font-body-sm text-body-sm
              focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary
              transition-all
              ${leftIcon ? 'pl-9' : 'pl-3'}
              ${rightIcon ? 'pr-10' : 'pr-3'}
              ${error ? 'border border-error focus:ring-error' : ''}
              ${className}
            `}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? errorId : hint ? hintId : undefined}
            {...props}
          />
          {rightIcon && (
            <div
              className="absolute right-3 top-1/2 -translate-y-1/2 text-outline text-[18px] pointer-events-none"
              aria-hidden="true"
            >
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p id={errorId} className="mt-1 font-body-sm text-body-sm text-error" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={hintId} className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className = '', id, ...props }, ref) => {
    const generatedId = useId();
    const textareaId = id || generatedId;
    const errorId = `${textareaId}-error`;
    const hintId = `${textareaId}-hint`;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block font-label-sm text-label-sm text-on-surface mb-1.5"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={`
            w-full bg-surface-container-lowest text-on-surface rounded-lg p-3
            font-body-md text-body-md outline-none
            placeholder:text-outline-variant resize-none
            focus:ring-2 focus:ring-primary
            border border-transparent focus:border-primary
            transition-all
            ${error ? 'border-error focus:ring-error' : ''}
            ${className}
          `}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? errorId : hint ? hintId : undefined}
          {...props}
        />
        {error && (
          <p id={errorId} className="mt-1 font-body-sm text-body-sm text-error" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={hintId} className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
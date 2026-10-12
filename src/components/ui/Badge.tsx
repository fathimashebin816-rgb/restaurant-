'use client';

import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md';
  dot?: boolean;
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  className = '',
  ...props
}: BadgeProps) {
  const baseStyles = 'inline-flex items-center gap-1 font-label-sm text-label-sm font-bold rounded-full px-3 py-1';

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-label-xs',
    md: 'px-3 py-1',
  };

  const variantStyles = {
    default: 'bg-surface-container-high text-on-surface-variant border border-outline-variant',
    primary: 'bg-primary-container text-on-primary',
    secondary: 'bg-secondary-container text-on-secondary',
    tertiary: 'bg-tertiary-fixed text-on-tertiary-fixed',
    success: 'bg-status-ready-bg text-status-ready border border-status-ready-border',
    warning: 'bg-status-preparing-bg text-status-preparing border border-status-preparing-border',
    error: 'bg-status-cancelled-bg text-status-cancelled border border-status-cancelled-border',
    info: 'bg-status-new-bg text-status-new border border-status-new-border',
  };

  return (
    <span
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {dot && (
        <span
          className="w-2 h-2 rounded-full"
          style={{
            backgroundColor:
              variant === 'primary'
                ? 'var(--color-primary)'
                : variant === 'secondary'
                ? 'var(--color-secondary)'
                : variant === 'tertiary'
                ? 'var(--color-tertiary)'
                : variant === 'success'
                ? 'var(--color-status-ready)'
                : variant === 'warning'
                ? 'var(--color-status-preparing)'
                : variant === 'error'
                ? 'var(--color-status-cancelled)'
                : variant === 'info'
                ? 'var(--color-status-new)'
                : 'var(--color-primary)',
          }}
        />
      )}
      {children}
    </span>
  );
}

export interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: 'new' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
}

export function StatusBadge({ status, className = '', ...props }: StatusBadgeProps) {
  const statusStyles = {
    new: 'bg-status-new-bg text-status-new border border-status-new-border',
    preparing: 'bg-status-preparing-bg text-status-preparing border border-status-preparing-border',
    ready: 'bg-status-ready-bg text-status-ready border border-status-ready-border',
    delivered: 'bg-status-delivered-bg text-status-delivered border border-status-delivered-border',
    cancelled: 'bg-status-cancelled-bg text-status-cancelled border border-status-cancelled-border',
  };

  const statusLabels = {
    new: 'New',
    preparing: 'Preparing',
    ready: 'Ready',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-label-sm text-label-sm font-bold border ${statusStyles[status]} ${className}`}
      {...props}
    >
      {statusLabels[status]}
    </span>
  );
}
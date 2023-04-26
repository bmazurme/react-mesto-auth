import React from 'react';
import type { ComponentPropsWithoutRef, ElementType, PropsWithChildren } from 'react';

type ButtonProps<T extends ElementType> = PropsWithChildren<{
  as?: T;
  className?: string;
  variant: 'filled' | 'outline' | 'link' | 'icon';
  disabled?: boolean;
}> & Omit<ComponentPropsWithoutRef<T>, 'as' | 'variant' | 'children'>;

export default function Button<T extends ElementType = 'button'>({
  as, className, disabled, variant, ...props
}: ButtonProps<T>) {
  const Component = as ?? 'button';
  const rules = [className];

  if (disabled) {
    rules.push('button_disabled');
  }

  if (variant === 'filled') {
    rules.push('button_filled');
  }

  const currentClass = rules.join(' ');

  return (
    <Component
      className={currentClass}
      disabled={disabled}
      {...props}
    />
  );
}

import React, { forwardRef } from 'react';

import clsx from 'clsx';
import { toast } from 'sonner';
import { FieldError } from 'react-hook-form';

import styles from './text-field.module.sass';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  error?: FieldError;
}

export const TextField = forwardRef<HTMLInputElement, Props>(
  ({ name, error, ...rest }, ref) => {
    React.useEffect(() => {
      if (error?.message) {
        toast.error(`${name}: ${error.message}`);
      }
    }, [error]);

    return (
      <div className={clsx(styles.component, { [styles.errored]: error })}>
        <input
          className={styles.input}
          ref={ref}
          name={name}
          autoComplete='off'
          {...rest}
        />
      </div>
    );
  }
);

TextField.displayName = 'TextField';

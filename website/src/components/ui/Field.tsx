import type { ChangeEvent } from 'react';

import { cn } from '../../lib/cn';
import type { TagAccent } from './Tag';

const labelStyles: Record<TagAccent, string> = {
  cyan: 'text-accent-cyan',
  purple: 'text-accent-purple',
  green: 'text-accent-green',
  pink: 'text-accent-pink',
  yellow: 'text-accent-yellow',
  error: 'text-error',
};

const focusStyles: Record<TagAccent, string> = {
  cyan: 'focus:border-accent-cyan focus-visible:outline-accent-cyan',
  purple: 'focus:border-accent-purple focus-visible:outline-accent-purple',
  green: 'focus:border-accent-green focus-visible:outline-accent-green',
  pink: 'focus:border-accent-pink focus-visible:outline-accent-pink',
  yellow: 'focus:border-accent-yellow focus-visible:outline-accent-yellow',
  error: 'focus:border-error focus-visible:outline-error',
};

const controlClassName =
  'w-full border-2 border-line-soft bg-panel px-4 py-3 font-sans text-foreground placeholder-faint transition-colors focus:outline-none focus:ring-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';

interface FieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  accent?: TagAccent;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  type?: string;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const Field = ({
  id,
  name,
  label,
  value,
  accent = 'cyan',
  placeholder,
  required,
  rows,
  type = 'text',
  onChange,
}: FieldProps) => {
  const isTextArea = rows !== undefined;

  return (
    <div>
      <label
        htmlFor={id}
        className={cn(
          'mb-2 block text-sm font-bold uppercase tracking-wider',
          labelStyles[accent],
        )}
      >
        {label}
      </label>
      {isTextArea ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          rows={rows}
          placeholder={placeholder}
          className={cn(controlClassName, 'resize-none', focusStyles[accent])}
        />
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className={cn(controlClassName, focusStyles[accent])}
        />
      )}
    </div>
  );
};

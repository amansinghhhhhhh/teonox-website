import React, { useId } from 'react';
import { ChevronDown } from 'lucide-react';

interface FormFieldProps {
  label: string;
  required?: boolean;
  /** Error message — presence turns the field into its error state. */
  error?: string;
  hint?: string;
  /** Control markup, or a render function receiving the generated field id. */
  children: React.ReactNode | ((props: { id: string }) => React.ReactNode);
  className?: string;
}

/**
 * Shared label + control + error slot. The control itself is passed as
 * children so each field type keeps its own markup.
 */
export function FormField({
  label,
  required = false,
  error,
  hint,
  children,
  className = '',
}: FormFieldProps) {
  const id = useId();

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block font-sora text-sm font-semibold text-[#201A17] mb-2"
      >
        {label}
        {required ? <span className="text-[#F15A29] ml-0.5">*</span> : null}
      </label>

      {/* Clone-free: children receive the generated id via a render prop when
          they need it. Simple controls can ignore it entirely. */}
      {typeof children === 'function'
        ? (children as (props: { id: string }) => React.ReactNode)({ id })
        : children}

      {hint && !error ? (
        <p className="font-inter text-sm text-[#201A17] mt-1.5">{hint}</p>
      ) : null}

      {error ? (
        <p
          role="alert"
          className="font-inter text-sm text-[#DC2626] mt-2 flex items-center gap-1"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Shared control base. Kept as one string per state (rather than a base plus
 * overrides) so conflicting focus/border utilities never fight for the same
 * property in the generated stylesheet.
 * New compact design: text-sm height, spacious line-height, consistent fg/bg.
 */
const CONTROL_BASE =
  'w-full rounded-xl border border-[#E8E1DC] bg-[#FAF8F5]/60 px-4 py-3 text-sm font-semibold text-[#201A17] ' +
  'placeholder:text-[#A9A29B] bg-white focus:bg-white focus:border-[#F15A29] focus:outline-none transition-all duration-200 ease-out';

/** Fallback for callers that still import the constant directly. */
export const INPUT_CLASS = `${CONTROL_BASE} border-[#E7E2DC] hover:border-[#D6CFC8]`;

export const inputClass = (hasError?: boolean): string =>
  hasError
    ? 'w-full rounded-xl border border-[#F04438] bg-white px-4 py-3 text-sm font-semibold text-[#201A17] placeholder:text-[#F04438] focus:border-[#F04438] focus:outline-none transition-all duration-200 ease-out'
    : INPUT_CLASS;

interface SelectControlProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  hasError?: boolean;
}

/**
 * Native <select> with `appearance-none` plus an overlaid chevron, so every
 * dropdown on the page shares one modern, consistent affordance.
 */
export function SelectControl({ hasError, className = '', children, ...props }: SelectControlProps) {
  return (
    <div className="relative">
      <select
        {...props}
        className={`${inputClass(hasError)} appearance-none cursor-pointer pr-11 ${className}`}
      >
        {children}
      </select>
      <ChevronDown
        size={16}
        strokeWidth={2.25}
        aria-hidden="true"
        className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#201A17]"
      />
    </div>
  );
}

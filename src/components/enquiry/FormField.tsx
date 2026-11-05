import React, { useId } from 'react';

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
        className="block font-sora text-[13px] font-[600] text-[#111111] mb-1.5"
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
        <p className="font-inter text-[11.5px] text-[#888888] mt-1.5">{hint}</p>
      ) : null}

      {error ? (
        <p
          role="alert"
          className="font-inter text-[11.5px] text-[#DC2626] mt-1.5 flex items-center gap-1"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** Shared input styling — mirrors ContactPage's text inputs exactly. */
export const INPUT_CLASS =
  'w-full px-4 py-3.5 rounded-2xl border font-inter text-[15px] text-[#111111] placeholder-[#A8A8A8] focus:outline-none focus:ring-4 transition-all bg-[#FAF8F5]/40 focus:bg-white';

export const inputClass = (hasError?: boolean): string =>
  `${INPUT_CLASS} ${
    hasError
      ? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-[#DC2626]/10'
      : 'border-[#EFEFEF] focus:border-[#F15A29] focus:ring-[#F15A29]/10'
  }`;

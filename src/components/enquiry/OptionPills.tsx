import React from 'react';
import { FieldOption } from '../../pages/enquiry/enquiryFields';

interface OptionPillsProps {
  legend: string;
  required?: boolean;
  options: FieldOption[];
  /** Currently selected option value (single choice). */
  value: string;
  onChange: (value: string) => void;
  error?: string;
  columns?: string;
  name?: string;
}

/**
 * Pill-style single-choice radio group used for Gender, Preferred Mode,
 * Preferred Batch, Timeline, Career Goal, Discovery, etc.
 */
export function OptionPills({
  legend,
  required = false,
  options,
  value,
  onChange,
  error,
  columns = 'grid grid-cols-2 sm:grid-cols-3 gap-2.5',
  name,
}: OptionPillsProps) {
  const groupName = name || legend.replace(/\s+/g, '-').toLowerCase();

  return (
    <fieldset className="min-w-0">
      <legend className="block font-sora text-[13px] font-[600] text-[#111111] mb-2">
        {legend}
        {required ? <span className="text-[#F15A29] ml-0.5">*</span> : null}
      </legend>

      <div className={columns} role="presentation">
        {options.map((option) => {
          const checked = value === option.value;

          return (
            <label
              key={option.value}
              className={`relative flex items-center gap-2 px-3.5 py-2.5 rounded-2xl border text-[13.5px] font-inter cursor-pointer transition-all select-none ${
                checked
                  ? 'border-[#F15A29] bg-[#F15A29]/5 text-[#111111] font-[600]'
                  : error
                    ? 'border-[#DC2626]/40 bg-white text-[#555555] hover:border-[#F15A29]/40'
                    : 'border-[#EFEFEF] bg-[#FAF8F5]/40 text-[#555555] hover:border-[#F15A29]/40 hover:bg-white'
              }`}
            >
              <input
                type="radio"
                name={groupName}
                value={option.value}
                checked={checked}
                onChange={() => onChange(option.value)}
                className="sr-only peer"
              />
              <span
                className={`shrink-0 w-3.5 h-3.5 rounded-full border-2 transition-all ${
                  checked
                    ? 'border-[#F15A29] bg-[#F15A29] shadow-[inset_0_0_0_2.5px_#FFFFFF]'
                    : 'border-[#D6D0CB] bg-white'
                }`}
              />
              <span className="leading-tight">{option.label}</span>
            </label>
          );
        })}
      </div>

      {error ? (
        <p role="alert" className="font-inter text-[11.5px] text-[#DC2626] mt-1.5">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}

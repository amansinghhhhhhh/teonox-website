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
 * Preferred Batch, Timeline, Current Status, Discovery, etc.
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
      <legend className="block font-sora text-sm font-semibold text-[#201A17] mb-2">
        {legend}
        {required ? <span className="text-[#F15A29] ml-0.5">*</span> : null}
      </legend>

      <div className={columns} role="presentation">
        {options.map((option) => {
          const checked = value === option.value;

          return (
            <label
              key={option.value}
              className={`relative flex items-center gap-2.5 rounded-xl border px-4 py-2.5 text-[13.5px] font-inter select-none transition duration-200 ease-out cursor-pointer ${
                checked
                  ? 'border-[#F15A29] bg-[#F15A29] text-white font-semibold'
                  : error
                    ? 'border-[#F04438]/35 bg-white text-[#201A17] hover:border-[#F04438]/60'
                    : 'border-[#E8E1DC] bg-white text-[#201A17] hover:border-[#D6CFC8] hover:bg-[#FCFBFA]'
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
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition duration-200 ${
                  checked ? 'border-[#F15A29]' : 'border-[#CFC7C0] bg-white'
                }`}
              >
                {checked ? <span className="h-2 w-2 rounded-full bg-[#F15A29]" /> : null}
              </span>
              <span className="leading-tight">{option.label}</span>
            </label>
          );
        })}
      </div>

      {error ? (
        <p role="alert" className="font-inter text-sm text-[#DC2626] mt-1.5">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}
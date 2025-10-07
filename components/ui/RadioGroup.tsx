import React from 'react';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  options: RadioOption[];
  required?: boolean;
  className?: string;
}

export default function RadioGroup({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
  className = ''
}: RadioGroupProps) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-4">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex space-x-6 space-x-reverse">
        {options.map(option => (
          <label key={option.value} className="flex items-center cursor-pointer">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              required={required}
              className="ml-2 w-4 h-4 text-[#004705] focus:ring-[#004705] focus:ring-2"
            />
            <span className="text-gray-700 font-medium">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

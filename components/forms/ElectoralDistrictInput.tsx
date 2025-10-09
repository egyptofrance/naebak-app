
'use client';

import React from 'react';

interface ElectoralDistrictInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  id?: string;
  name?: string;
  disabled?: boolean;
}

const ElectoralDistrictInput: React.FC<ElectoralDistrictInputProps> = ({
  value,
  onChange,
  label = 'الدائرة الانتخابية',
  placeholder = 'أدخل الدائرة الانتخابية يدوياً',
  id = 'electoral-district',
  name = 'electoral-district',
  disabled = false,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        type="text"
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
};

export default ElectoralDistrictInput;


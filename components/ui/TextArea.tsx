import React from 'react';

interface TextAreaProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  className?: string;
  maxLength?: number;
}

export default function TextArea({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  rows = 4,
  className = '',
  maxLength
}: TextAreaProps) {
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004705] focus:border-transparent transition-all duration-200 hover:border-gray-400 resize-vertical"
      />
      {maxLength && (
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs text-gray-500">
            {value.length} / {maxLength} حرف
          </span>
          {value.length > maxLength * 0.9 && (
            <span className="text-xs text-orange-500">
              اقتراب من الحد الأقصى
            </span>
          )}
        </div>
      )}
    </div>
  );
}

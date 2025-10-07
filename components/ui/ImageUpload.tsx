import React, { useRef } from 'react';

interface ImageUploadProps {
  image: File | null;
  onImageChange: (file: File | null) => void;
  className?: string;
}

export default function ImageUpload({ image, onImageChange, className = '' }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageChange(file);
    }
  };

  const handleRemoveImage = () => {
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative">
        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-[#004705] shadow-lg">
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        
        {/* Upload Button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="absolute bottom-0 right-0 bg-[#FF8C00] text-white p-2 rounded-full hover:bg-[#FF7700] transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-110"
          title="رفع صورة"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>

        {/* Remove Button */}
        {image && (
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-0 left-0 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-110"
            title="حذف الصورة"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
      
      <p className="text-sm text-gray-600 mt-3 text-center">
        {image ? 'اضغط لتغيير الصورة' : 'اضغط لرفع صورة شخصية'}
      </p>
      
      <p className="text-xs text-gray-500 mt-1">
        الحد الأقصى: 5 ميجابايت
      </p>
    </div>
  );
}

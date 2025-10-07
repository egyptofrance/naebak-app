import React, { useRef } from 'react';

interface BannerUploadProps {
  image: File | null;
  onImageChange: (file: File | null) => void;
  className?: string;
}

export default function BannerUpload({ image, onImageChange, className = '' }: BannerUploadProps) {
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
    <div className={`relative w-full h-48 bg-gray-200 rounded-lg overflow-hidden border-4 border-[#004705] shadow-lg ${className}`}>
      {image ? (
        <img
          src={URL.createObjectURL(image)}
          alt="Banner"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-gray-400 font-medium">صورة البانر</p>
            <p className="text-gray-300 text-sm">اضغط لرفع صورة</p>
          </div>
        </div>
      )}
      
      {/* Upload Button */}
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="absolute bottom-4 right-4 bg-[#FF8C00] text-white p-3 rounded-full hover:bg-[#FF7700] transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-110"
        title="رفع صورة بانر"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      {/* Remove Button */}
      {image && (
        <button
          type="button"
          onClick={handleRemoveImage}
          className="absolute top-4 left-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-110"
          title="حذف صورة البانر"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
      
      <div className="absolute bottom-2 left-2 text-xs text-white bg-black bg-opacity-50 px-2 py-1 rounded">
        الحد الأقصى: 10 ميجابايت
      </div>
    </div>
  );
}

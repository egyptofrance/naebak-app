import React, { useState } from 'react';

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export default function StarRating({
  rating,
  onRatingChange,
  readonly = false,
  size = 'md',
  showText = true,
  className = ''
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const getSizeClass = () => {
    switch (size) {
      case 'sm': return 'text-lg';
      case 'md': return 'text-2xl';
      case 'lg': return 'text-4xl';
      default: return 'text-2xl';
    }
  };

  const handleStarClick = (starRating: number) => {
    if (!readonly && onRatingChange) {
      onRatingChange(starRating);
    }
  };

  const handleStarHover = (starRating: number) => {
    if (!readonly) {
      setHoverRating(starRating);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverRating(0);
    }
  };

  const renderStar = (index: number) => {
    const starRating = index + 1;
    const filled = starRating <= (hoverRating || rating);
    
    return (
      <span
        key={index}
        className={`${getSizeClass()} ${
          readonly ? 'cursor-default' : 'cursor-pointer'
        } ${filled ? 'text-yellow-400' : 'text-gray-300'} transition-colors duration-200 hover:scale-110 transform`}
        onClick={() => handleStarClick(starRating)}
        onMouseEnter={() => handleStarHover(starRating)}
        onMouseLeave={handleMouseLeave}
        title={readonly ? `${rating} نجوم` : `تقييم ${starRating} نجوم`}
      >
        ★
      </span>
    );
  };

  const getRatingText = (rating: number) => {
    if (rating === 0) return 'لا يوجد تقييم';
    if (rating <= 1) return 'ضعيف';
    if (rating <= 2) return 'مقبول';
    if (rating <= 3) return 'جيد';
    if (rating <= 4) return 'جيد جداً';
    return 'ممتاز';
  };

  return (
    <div className={`flex items-center space-x-2 space-x-reverse ${className}`}>
      <div className="flex items-center">
        {[0, 1, 2, 3, 4].map(index => renderStar(index))}
      </div>
      
      {showText && (
        <div className="flex flex-col items-start">
          <span className="text-lg font-semibold text-gray-800">
            {rating.toFixed(1)} نجوم
          </span>
          <span className="text-sm text-gray-600">
            {getRatingText(rating)}
          </span>
        </div>
      )}
    </div>
  );
}

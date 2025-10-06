import React from 'react';

interface NewsBarProps {
  newsItems: { id: string; text: string }[];
  direction: 'ltr' | 'rtl';
  speedSeconds: number;
}

const NewsBar: React.FC<NewsBarProps> = ({ newsItems, direction, speedSeconds }) => {
  return (
    <div className="relative bg-gray-dark text-white overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[2px] bg-secondary"></div>
      <div className="absolute bottom-0 left-0 w-full h-[4px] bg-secondary"></div>
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-light mt-[4px]"></div>
      <div
        className="flex whitespace-nowrap py-2"
        style={{
          animation: `scroll-${direction} ${speedSeconds}s linear infinite`,
          direction: direction,
        }}
      >
        {newsItems.map((item) => (
          <span key={item.id} className="mx-4 text-sm">
            {item.text}
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes scroll-ltr {
          from { transform: translateX(0%); }
          to { transform: translateX(-100%); }
        }
        @keyframes scroll-rtl {
          from { transform: translateX(-100%); }
          to { transform: translateX(0%); }
        }
      `}</style>
    </div>
  );
};

export default NewsBar;


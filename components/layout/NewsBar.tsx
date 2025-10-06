"use client";

import React, { useEffect, useState } from "react";

interface NewsBarProps {
  newsItems: { id: string; text: string }[];
  direction: "ltr" | "rtl";
  speedSeconds: number;
}

const NewsBar: React.FC<NewsBarProps> = ({ newsItems, direction, speedSeconds }) => {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  useEffect(() => {
    if (newsItems.length === 0) return;

    const interval = setInterval(() => {
      setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % newsItems.length);
    }, speedSeconds * 1000);

    return () => clearInterval(interval);
  }, [newsItems, speedSeconds]);

  if (newsItems.length === 0) {
    return null;
  }

  const currentNews = newsItems[currentNewsIndex];

  return (
    <div
      className="relative w-full overflow-hidden bg-gray-dark text-white"
      style={{
        borderTop: "2px solid var(--color-secondary)",
        borderBottom: "4px solid var(--color-secondary)",
      }}
    >
      <div
        className="absolute bottom-0 left-0 w-full"
        style={{
          height: "2px",
          backgroundColor: "var(--color-gray-dark)",
          transform: "translateY(4px)", // Offset by the 4px orange line
        }}
      ></div>
      <div
        className={`relative py-2 px-4 whitespace-nowrap`}
        style={{
          animation: `scroll-${direction} ${speedSeconds}s linear infinite`,
        }}
      >
        {currentNews.text}
      </div>

      <style jsx>{`
        @keyframes scroll-rtl {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes scroll-ltr {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default NewsBar;


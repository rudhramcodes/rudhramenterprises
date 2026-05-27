import React from 'react';

export const SunburstIcon = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {[...Array(12)].map((_, i) => (
      <line
        key={i}
        x1="50"
        y1="50"
        x2="50"
        y2="10"
        stroke="currentColor"
        strokeWidth="2"
        transform={`rotate(${i * 30} 50 50)`}
      />
    ))}
  </svg>
);

export const TrishulLineIcon = ({ className }) => (
  <svg viewBox="0 0 100 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M50 20V180 M30 60C30 80 50 90 50 90C50 90 70 80 70 60 M20 50C20 100 50 110 50 110C50 110 80 100 80 50"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeDasharray="400"
      strokeDashoffset="400"
      className="trishul-path"
    />
  </svg>
);

export const ArrowIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7 17L17 7M17 7H7M17 7V17"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const PlusIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 5V19M5 12H19"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export const ScrollToTopRing = ({ className, progress }) => {
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="20"
        cy="20"
        r={radius}
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.2"
      />
      <circle
        cx="20"
        cy="20"
        r={radius}
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.1s linear' }}
      />
      <path
        d="M20 26V14M14 20L20 14L26 20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

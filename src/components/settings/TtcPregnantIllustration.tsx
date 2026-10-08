import React from 'react';

export const TtcPregnantIllustration: React.FC<{ className?: string }> = ({ className = 'w-24 h-24 sm:w-28 sm:h-28' }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className} select-none shrink-0 filter drop-shadow-sm`}>
    {/* Decorative soft pink floral leaves in background */}
    <path d="M15 90 C10 75 25 65 35 75 C45 85 30 100 15 90 Z" fill="#FCE7F3" opacity="0.8" />
    <path d="M25 105 C15 95 28 80 40 88 C50 96 35 115 25 105 Z" fill="#FBCFE8" opacity="0.6" />
    <path d="M100 80 C110 70 105 55 95 62 C85 70 90 90 100 80 Z" fill="#FCE7F3" opacity="0.8" />
    <path d="M110 95 C118 85 110 72 100 78 C90 85 102 105 110 95 Z" fill="#FBCFE8" opacity="0.6" />

    {/* Floating little hearts */}
    <path d="M42 45 C42 40 46 37 49 40 C52 37 56 40 56 45 C56 50 49 55 49 55 C49 55 42 50 42 45 Z" fill="#F472B6" opacity="0.7" />
    <path d="M102 38 C102 34 105 32 107 34 C109 32 112 34 112 38 C112 42 107 46 107 46 C107 46 102 42 102 38 Z" fill="#FDA4AF" opacity="0.8" />

    {/* Woman Hair - back bun */}
    <circle cx="82" cy="24" r="11" fill="#3730A3" />

    {/* Woman Head & Neck */}
    <circle cx="76" cy="30" r="9" fill="#FDE68A" />
    <path d="M72 38 L72 45 L78 45 L78 38 Z" fill="#FCD34D" />

    {/* Hair front silhouette */}
    <path d="M70 24 C74 20 84 22 84 30 C80 32 74 32 70 28 Z" fill="#312E81" />
    <path d="M84 28 C87 34 85 42 80 44 C82 38 84 34 84 28 Z" fill="#312E81" />

    {/* Closed peaceful eye & blush */}
    <path d="M72 30 Q74 32 76 30" stroke="#78350F" strokeWidth="0.8" strokeLinecap="round" fill="none" />
    <circle cx="73" cy="33" r="1.5" fill="#F472B6" opacity="0.6" />

    {/* Torso & Pregnant Belly */}
    <path
      d="M68 45 C64 52 56 62 56 75 C56 88 66 98 78 98 C88 98 94 90 94 80 C94 68 86 52 78 45 Z"
      fill="url(#dressGrad)"
    />

    {/* Gentle Hands resting on pregnant bump */}
    <path d="M68 66 C72 64 78 68 82 72 C80 75 75 76 70 74 Z" fill="#FDE68A" />
    <path d="M65 72 C68 70 74 74 77 78 C75 80 70 81 66 79 Z" fill="#FCD34D" />

    {/* Soft Dress Shading */}
    <path d="M62 76 C62 86 70 94 80 94 C88 94 92 88 92 80 C88 88 80 90 74 88 C68 86 64 82 62 76 Z" fill="#E879F9" opacity="0.3" />

    {/* Gradient definitions */}
    <defs>
      <linearGradient id="dressGrad" x1="60" y1="45" x2="90" y2="100" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F5D0FE" />
        <stop offset="0.5" stopColor="#E9D5FF" />
        <stop offset="1" stopColor="#DDD6FE" />
      </linearGradient>
    </defs>
  </svg>
);

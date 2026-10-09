import React from 'react';

// 3D Pink Calendar with Hearts for Hero & Next Period card
export const Visual3DCalendar: React.FC<{ className?: string }> = ({ className = 'w-16 h-16 sm:w-20 sm:h-20' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className} filter drop-shadow-md select-none shrink-0`}>
    <rect x="12" y="20" width="76" height="68" rx="18" fill="url(#calBaseGrad)" stroke="#FFD1E3" strokeWidth="2.5" />
    <rect x="12" y="20" width="76" height="26" rx="16" fill="url(#calTopGrad)" />
    {/* Spiral Rings */}
    <rect x="26" y="12" width="7" height="18" rx="3.5" fill="#F43F8F" />
    <rect x="46" y="12" width="7" height="18" rx="3.5" fill="#F43F8F" />
    <rect x="66" y="12" width="7" height="18" rx="3.5" fill="#F43F8F" />
    {/* Calendar Hearts */}
    <path d="M34 58 C34 50, 42 45, 48 51 C54 45, 62 50, 62 58 C62 67, 48 76, 48 76 C48 76, 34 67, 34 58 Z" fill="#F43F8F" />
    <circle cx="72" cy="56" r="4" fill="#FFA0CA" />
    <circle cx="24" cy="56" r="4" fill="#FFA0CA" />
    <circle cx="72" cy="70" r="4" fill="#FFA0CA" />
    <circle cx="24" cy="70" r="4" fill="#FFA0CA" />
    <defs>
      <linearGradient id="calBaseGrad" x1="12" y1="20" x2="88" y2="88" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFFFFF" />
        <stop offset="1" stopColor="#FFF0F6" />
      </linearGradient>
      <linearGradient id="calTopGrad" x1="12" y1="20" x2="88" y2="46" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF6EA8" />
        <stop offset="1" stopColor="#F43F8F" />
      </linearGradient>
    </defs>
  </svg>
);

// 3D Blood Droplet / Clot
export const Visual3DClot: React.FC<{ className?: string }> = ({ className = 'w-16 h-16 sm:w-18 sm:h-18' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className} filter drop-shadow-md select-none shrink-0`}>
    <path
      d="M50 10 C50 10 16 48 16 68 C16 86 31 96 50 96 C69 96 84 86 84 68 C84 48 50 10 50 10 Z"
      fill="url(#clotGrad)"
    />
    <ellipse cx="36" cy="62" rx="8" ry="16" transform="rotate(-22 36 62)" fill="#FFFFFF" fillOpacity="0.45" />
    <circle cx="58" cy="76" r="5.5" fill="#FFFFFF" fillOpacity="0.3" />
    <defs>
      <linearGradient id="clotGrad" x1="20" y1="12" x2="80" y2="96" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF6EA8" />
        <stop offset="0.4" stopColor="#F43F8F" />
        <stop offset="1" stopColor="#9F1239" />
      </linearGradient>
    </defs>
  </svg>
);

// 3D Clipboard / Symptoms
export const Visual3DClipboard: React.FC<{ className?: string }> = ({ className = 'w-16 h-16 sm:w-18 sm:h-18' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className} filter drop-shadow-md select-none shrink-0`}>
    <rect x="18" y="18" width="64" height="74" rx="14" fill="#FFFFFF" stroke="#F1DDE8" strokeWidth="2.5" />
    <rect x="32" y="10" width="36" height="18" rx="7" fill="#F43F8F" />
    <circle cx="50" cy="17" r="3.5" fill="#FFFFFF" />
    {/* Check items */}
    <rect x="28" y="38" width="44" height="6" rx="3" fill="#FFC6DF" />
    <rect x="28" y="52" width="36" height="6" rx="3" fill="#FFC6DF" />
    <rect x="28" y="66" width="40" height="6" rx="3" fill="#FFC6DF" />
    <circle cx="76" cy="41" r="4.5" fill="#10B981" />
    <circle cx="76" cy="55" r="4.5" fill="#10B981" />
    <circle cx="76" cy="69" r="4.5" fill="#10B981" />
  </svg>
);

// 3D Uterus / Heart AI Prediction
export const Visual3DUterus: React.FC<{ className?: string }> = ({ className = 'w-20 h-16 sm:w-24 sm:h-18' }) => (
  <svg viewBox="0 0 120 95" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className} filter drop-shadow-md select-none shrink-0`}>
    {/* Cute Uterus with fallopian tubes */}
    <path
      d="M60 34 C60 34 32 18 16 26 C6 32 8 46 20 46 C34 46 45 53 50 66 C53 73 60 82 60 82 C60 82 67 73 70 66 C75 53 86 46 100 46 C112 46 114 32 104 26 C88 18 60 34 60 34 Z"
      fill="url(#uterusGrad)"
    />
    {/* Cute smiling eyes & blush */}
    <circle cx="52" cy="52" r="3" fill="#4C0519" />
    <circle cx="68" cy="52" r="3" fill="#4C0519" />
    <path d="M57 58 Q60 62 63 58" stroke="#4C0519" strokeWidth="2" strokeLinecap="round" />
    <ellipse cx="47" cy="56" rx="3" ry="2" fill="#FB7185" />
    <ellipse cx="73" cy="56" rx="3" ry="2" fill="#FB7185" />
    {/* Cute little blood drop companion */}
    <path
      d="M96 54 C96 54 82 68 82 77 C82 84 88 89 96 89 C104 89 110 84 110 77 C110 68 96 54 96 54 Z"
      fill="#F43F8F"
    />
    <circle cx="92" cy="73" r="2" fill="#FFFFFF" />
    <circle cx="100" cy="73" r="2" fill="#FFFFFF" />
    <path d="M94 78 Q96 80 98 78" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
    <defs>
      <linearGradient id="uterusGrad" x1="10" y1="20" x2="110" y2="85" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFA0CA" />
        <stop offset="0.5" stopColor="#FF6EA8" />
        <stop offset="1" stopColor="#F43F8F" />
      </linearGradient>
    </defs>
  </svg>
);

// 3D Robot Mascot for AI Recommendation
export const Visual3DRobot: React.FC<{ className?: string }> = ({ className = 'w-18 h-18 sm:w-22 sm:h-22' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className} filter drop-shadow-md select-none shrink-0`}>
    <circle cx="50" cy="50" r="44" fill="url(#botBgGrad)" />
    {/* Head */}
    <rect x="28" y="24" width="44" height="34" rx="12" fill="#FFFFFF" stroke="#D8B4FE" strokeWidth="2.5" />
    {/* Screen / Visor */}
    <rect x="34" y="30" width="32" height="20" rx="7" fill="#1E1B4B" />
    {/* Glowing Eyes */}
    <circle cx="43" cy="40" r="3.5" fill="#38BDF8" />
    <circle cx="57" cy="40" r="3.5" fill="#38BDF8" />
    {/* Antenna */}
    <rect x="47" y="12" width="5" height="12" rx="2.5" fill="#C084FC" />
    <circle cx="49.5" cy="11" r="4" fill="#F43F8F" />
    {/* Body */}
    <rect x="32" y="62" width="36" height="26" rx="9" fill="#FFFFFF" stroke="#D8B4FE" strokeWidth="2.5" />
    <circle cx="50" cy="74" r="4.5" fill="#F43F8F" />
    <defs>
      <linearGradient id="botBgGrad" x1="6" y1="6" x2="94" y2="94" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F3E8FF" />
        <stop offset="1" stopColor="#FFE4E6" />
      </linearGradient>
    </defs>
  </svg>
);

// 3D Realistic Pharmaceutical Ibuprofen (Pink & White Bi-color Capsule)
export const Visual3DIbuprofen: React.FC<{ className?: string }> = ({
  className = 'w-10 h-10 sm:w-11 sm:h-11',
}) => (
  <svg
    viewBox="0 0 100 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} select-none shrink-0 transition-transform duration-200 hover:scale-105`}
  >
    <defs>
      {/* Soft Contact Shadow */}
      <radialGradient id="ibuShadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#BE185D" stopOpacity="0.28" />
        <stop offset="60%" stopColor="#F43F8F" stopOpacity="0.12" />
        <stop offset="100%" stopColor="#F43F8F" stopOpacity="0" />
      </radialGradient>

      {/* 3D Pink Half Gradient (Cylindrical Lighting) */}
      <linearGradient id="ibuPinkGrad" x1="20" y1="20" x2="52" y2="58" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFA6CB" />
        <stop offset="25%" stopColor="#FF6DA6" />
        <stop offset="65%" stopColor="#F43F8F" />
        <stop offset="100%" stopColor="#9E1145" />
      </linearGradient>

      {/* 3D White Half Gradient (Pearl Sheen) */}
      <linearGradient id="ibuWhiteGrad" x1="48" y1="20" x2="80" y2="58" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="35%" stopColor="#F8FAFC" />
        <stop offset="70%" stopColor="#E2E8F0" />
        <stop offset="100%" stopColor="#94A3B8" />
      </linearGradient>

      {/* Specular Cylindrical Highlight */}
      <linearGradient id="ibuSheen" x1="24" y1="24" x2="76" y2="24" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
        <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.95" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.8" />
      </linearGradient>

      {/* Clip paths for halves */}
      <clipPath id="ibuCapsuleClip">
        <rect x="18" y="22" width="64" height="32" rx="16" />
      </clipPath>
    </defs>

    {/* Soft Floor Shadow */}
    <ellipse cx="50" cy="62" rx="34" ry="8" fill="url(#ibuShadow)" />

    {/* Angled Pill Group */}
    <g transform="rotate(-15 50 38)">
      {/* Base Capsule with Clip */}
      <g clipPath="url(#ibuCapsuleClip)">
        {/* Left Pink Half */}
        <rect x="16" y="20" width="34" height="36" fill="url(#ibuPinkGrad)" />
        {/* Right White Half */}
        <rect x="50" y="20" width="34" height="36" fill="url(#ibuWhiteGrad)" />
        {/* Middle Overlap Joint Seam */}
        <rect x="49" y="20" width="2.5" height="36" fill="#9E1145" fillOpacity="0.3" />
        <rect x="51.5" y="20" width="1.5" height="36" fill="#FFFFFF" fillOpacity="0.6" />
      </g>

      {/* 3D Pill Border Rim for Depth */}
      <rect
        x="18"
        y="22"
        width="64"
        height="32"
        rx="16"
        stroke="#FFFFFF"
        strokeWidth="1.2"
        strokeOpacity="0.6"
      />

      {/* Top Glossy Reflection Sheen */}
      <path
        d="M28 26 C40 24 60 24 72 26 C75 26.5 75 29 72 29 C60 27 40 27 28 29 C25 29 25 26.5 28 26 Z"
        fill="url(#ibuSheen)"
      />

      {/* Circular Endcap Highlight (Pink Cap) */}
      <ellipse cx="26" cy="34" rx="4.5" ry="6" transform="rotate(-15 26 34)" fill="#FFFFFF" fillOpacity="0.5" />

      {/* Circular Endcap Highlight (White Cap) */}
      <ellipse cx="74" cy="34" rx="4.5" ry="6" transform="rotate(15 74 34)" fill="#FFFFFF" fillOpacity="0.7" />
    </g>
  </svg>
);

// 3D Realistic Pharmaceutical Mefenamic Acid (Light Pink / Pearl Scored Tablet)
export const Visual3DMefenamic: React.FC<{ className?: string }> = ({
  className = 'w-10 h-10 sm:w-11 sm:h-11',
}) => (
  <svg
    viewBox="0 0 100 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} select-none shrink-0 transition-transform duration-200 hover:scale-105`}
  >
    <defs>
      {/* Soft Contact Shadow */}
      <radialGradient id="mefShadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FDA4AF" stopOpacity="0.3" />
        <stop offset="65%" stopColor="#FFE4E6" stopOpacity="0.12" />
        <stop offset="100%" stopColor="#FFE4E6" stopOpacity="0" />
      </radialGradient>

      {/* 3D Tablet Body Gradient */}
      <linearGradient id="mefBodyGrad" x1="18" y1="18" x2="82" y2="58" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="25%" stopColor="#FFF1F5" />
        <stop offset="60%" stopColor="#FFE4ED" />
        <stop offset="90%" stopColor="#FBCFE8" />
        <stop offset="100%" stopColor="#F472B6" />
      </linearGradient>

      {/* Bevel Rim Gradient */}
      <linearGradient id="mefRimGrad" x1="20" y1="20" x2="80" y2="56" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
        <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#F472B6" stopOpacity="0.5" />
      </linearGradient>

      {/* Top Gloss Reflection */}
      <linearGradient id="mefSheen" x1="25" y1="24" x2="75" y2="24" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.75" />
        <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.95" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.7" />
      </linearGradient>
    </defs>

    {/* Soft Floor Shadow */}
    <ellipse cx="50" cy="62" rx="34" ry="8" fill="url(#mefShadow)" />

    {/* Angled Oval Tablet */}
    <g transform="rotate(12 50 38)">
      {/* 3D Extrusion Base Rim */}
      <rect x="18" y="24" width="64" height="30" rx="15" fill="#E2A6C4" />

      {/* Main Tablet Surface */}
      <rect x="18" y="21" width="64" height="30" rx="15" fill="url(#mefBodyGrad)" stroke="url(#mefRimGrad)" strokeWidth="1.2" />

      {/* Inner Bevel Contour */}
      <rect x="21" y="23" width="58" height="26" rx="13" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.6" />

      {/* Embossed Break Line / Score Grooves */}
      <line x1="50" y1="23" x2="50" y2="49" stroke="#E599BC" strokeWidth="2" strokeLinecap="round" />
      <line x1="51.2" y1="24" x2="51.2" y2="48" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.9" />

      {/* Top Gloss Curved Sheen */}
      <path
        d="M26 25 C38 23.5 62 23.5 74 25 C77 25.5 77 28 74 28 C62 26 38 26 26 28 C23 28 23 25.5 26 25 Z"
        fill="url(#mefSheen)"
      />

      {/* Left Tablet Specular Arc */}
      <ellipse cx="26" cy="35" rx="3.5" ry="5.5" fill="#FFFFFF" fillOpacity="0.65" />
    </g>
  </svg>
);

// Unified 3D Medicine Selector Component
export const Visual3DMedicine: React.FC<{
  name: string;
  className?: string;
}> = ({ name, className = 'w-10 h-10 sm:w-11 sm:h-11' }) => {
  const lower = name.toLowerCase();
  if (lower.includes('ibuprofen') || lower.includes('advil') || lower.includes('motrin')) {
    return <Visual3DIbuprofen className={className} />;
  }
  if (lower.includes('mefenamic') || lower.includes('ponstan') || lower.includes('acid')) {
    return <Visual3DMefenamic className={className} />;
  }
  // Default clean 3D bi-color capsule
  return <Visual3DIbuprofen className={className} />;
};

// 3D Glowing Translucent Droplet with Lush Floral Petals & Botanical Bouquet (Right side of Menstruation Status Card)
export const Visual3DPeriodDroplet: React.FC<{ className?: string }> = ({
  className = 'w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48',
}) => (
  <svg
    viewBox="0 0 200 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} select-none shrink-0 filter drop-shadow-[0_12px_32px_rgba(236,72,153,0.42)]`}
  >
    <defs>
      {/* Radiant Background Aura Glow */}
      <radialGradient id="dropAuraGlow" cx="50%" cy="55%" r="50%">
        <stop offset="0%" stopColor="#F43F8F" stopOpacity="0.45" />
        <stop offset="45%" stopColor="#E879F9" stopOpacity="0.25" />
        <stop offset="75%" stopColor="#C084FC" stopOpacity="0.12" />
        <stop offset="100%" stopColor="#A855F7" stopOpacity="0" />
      </radialGradient>

      {/* Crystal Glass Droplet Base Gradient */}
      <linearGradient id="dropBodyGrad" x1="100" y1="24" x2="100" y2="148" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.96" />
        <stop offset="15%" stopColor="#FFE4EF" stopOpacity="0.94" />
        <stop offset="45%" stopColor="#FF6EA8" stopOpacity="0.90" />
        <stop offset="78%" stopColor="#F43F8F" stopOpacity="0.96" />
        <stop offset="100%" stopColor="#9F1239" />
      </linearGradient>

      {/* Inner Caustic Refraction Glow */}
      <linearGradient id="dropCausticGlow" x1="72" y1="48" x2="128" y2="136" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.88" />
        <stop offset="35%" stopColor="#FFA0CA" stopOpacity="0.5" />
        <stop offset="80%" stopColor="#F43F8F" stopOpacity="0.18" />
        <stop offset="100%" stopColor="#C084FC" stopOpacity="0" />
      </linearGradient>

      {/* Botanical Petal Gradients */}
      <linearGradient id="petalRoseVivid" x1="20" y1="100" x2="90" y2="170" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFA0CA" />
        <stop offset="45%" stopColor="#F43F8F" />
        <stop offset="100%" stopColor="#881337" />
      </linearGradient>
      <linearGradient id="petalVioletRich" x1="100" y1="100" x2="180" y2="170" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#F5D0FE" />
        <stop offset="45%" stopColor="#C084FC" />
        <stop offset="100%" stopColor="#6B21A8" />
      </linearGradient>
      <linearGradient id="petalPinkSoft" x1="60" y1="90" x2="130" y2="160" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FDE8F3" />
        <stop offset="50%" stopColor="#F472B6" />
        <stop offset="100%" stopColor="#BE185D" />
      </linearGradient>
      <linearGradient id="petalLilacSoft" x1="110" y1="90" x2="180" y2="160" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#E9D5FF" />
        <stop offset="50%" stopColor="#A855F7" />
        <stop offset="100%" stopColor="#581C87" />
      </linearGradient>

      {/* Specular Highlight Sheen */}
      <linearGradient id="dropSheen" x1="78" y1="52" x2="92" y2="110" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.98" />
        <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.65" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </linearGradient>
    </defs>

    {/* Radiant Background Aura */}
    <circle cx="100" cy="95" r="85" fill="url(#dropAuraGlow)" />

    {/* Background Botanical Leaves fanning lushly to the right and left */}
    {/* Far Right Large Leaf/Petal Tier 1 */}
    <path
      d="M145 125 C165 105 185 85 175 60 C160 75 145 95 135 115 Z"
      fill="url(#petalLilacSoft)"
      fillOpacity="0.75"
    />
    <path
      d="M155 140 C178 125 195 105 190 85 C172 98 155 118 145 135 Z"
      fill="url(#petalVioletRich)"
      fillOpacity="0.85"
    />
    <path
      d="M165 155 C185 145 200 128 195 110 C180 122 165 138 152 150 Z"
      fill="url(#petalRoseVivid)"
      fillOpacity="0.8"
    />

    {/* Left Petal Tier 1 */}
    <path
      d="M55 125 C35 105 15 85 25 60 C40 75 55 95 65 115 Z"
      fill="url(#petalRoseVivid)"
      fillOpacity="0.75"
    />
    <path
      d="M45 140 C22 125 5 105 10 85 C28 98 45 118 55 135 Z"
      fill="url(#petalPinkSoft)"
      fillOpacity="0.85"
    />

    {/* Mid Botanical Petals Layer 2 */}
    <path
      d="M60 142 C42 128 50 102 70 110 C88 118 84 144 70 154 C58 162 48 152 60 142 Z"
      fill="url(#petalPinkSoft)"
      fillOpacity="0.9"
    />
    <path
      d="M140 142 C158 128 150 102 130 110 C112 118 116 144 130 154 C142 162 152 152 140 142 Z"
      fill="url(#petalLilacSoft)"
      fillOpacity="0.9"
    />

    {/* Front Floral Cushion Layer 3 */}
    <path
      d="M100 166 C80 158 82 136 100 128 C118 136 120 158 100 166 Z"
      fill="url(#petalRoseVivid)"
    />
    <path
      d="M78 156 C66 146 70 126 85 132 C100 138 96 158 78 156 Z"
      fill="url(#petalPinkSoft)"
      fillOpacity="0.95"
    />
    <path
      d="M122 156 C134 146 130 126 115 132 C100 138 104 158 122 156 Z"
      fill="url(#petalVioletRich)"
      fillOpacity="0.95"
    />

    {/* Central 3D Glowing Glass Droplet */}
    <path
      d="M100 22 C100 22 52 74 52 108 C52 134 73 150 100 150 C127 150 148 134 148 108 C148 74 100 22 100 22 Z"
      fill="url(#dropBodyGrad)"
    />

    {/* Inner Glass Contour & Refraction */}
    <path
      d="M100 30 C100 30 61 78 61 106 C61 127 78 141 100 141 C122 141 139 127 139 106 C139 78 100 30 100 30 Z"
      fill="url(#dropCausticGlow)"
    />

    {/* Primary Specular Curved Highlight */}
    <path
      d="M78 58 C70 71 67 88 67 104 C67 113 71 118 75 114 C76 106 76 88 87 70 C91 62 86 53 78 58 Z"
      fill="url(#dropSheen)"
    />

    {/* Secondary Top-Right Glossy Dot */}
    <ellipse cx="114" cy="58" rx="5.5" ry="10" transform="rotate(28 114 58)" fill="#FFFFFF" fillOpacity="0.8" />
    <circle cx="100" cy="132" r="5" fill="#FFFFFF" fillOpacity="0.5" />

    {/* Sparkling Ambient Magic Stars & Glints */}
    {/* Star 1 */}
    <path
      d="M156 48 Q156 56 164 56 Q156 56 156 64 Q156 56 148 56 Q156 56 156 48 Z"
      fill="#FFFFFF"
      opacity="0.9"
    />
    {/* Star 2 */}
    <path
      d="M44 80 Q44 86 50 86 Q44 86 44 92 Q44 86 38 86 Q44 86 44 80 Z"
      fill="#FFA0CA"
      opacity="0.9"
    />
    {/* Star 3 */}
    <path
      d="M136 102 Q136 106 140 106 Q136 106 136 110 Q136 106 132 106 Q136 106 136 102 Z"
      fill="#FFFFFF"
      opacity="0.95"
    />
    <circle cx="36" cy="78" r="2.5" fill="#F43F8F" fillOpacity="0.75" />
    <circle cx="168" cy="80" r="3" fill="#C084FC" fillOpacity="0.85" />
    <circle cx="148" cy="42" r="2.5" fill="#FFA0CA" fillOpacity="0.9" />
    <circle cx="62" cy="44" r="2" fill="#FFFFFF" fillOpacity="0.8" />
  </svg>
);

// 3D Botanical Floral Frame for Meditation Illustration (Right side of "You're on your period" Card)
export const Visual3DMeditationFloralFrame: React.FC<{ className?: string }> = ({
  className = 'w-full h-full pointer-events-none',
}) => (
  <svg
    viewBox="0 0 260 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} select-none absolute inset-0 -z-1`}
    aria-hidden="true"
  >
    <defs>
      <radialGradient id="haloGlow" cx="60%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#F43F8F" stopOpacity="0.3" />
        <stop offset="50%" stopColor="#E879F9" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#C084FC" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="framePetalViolet" x1="160" y1="60" x2="250" y2="180" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#F5D0FE" />
        <stop offset="45%" stopColor="#C084FC" />
        <stop offset="100%" stopColor="#6B21A8" />
      </linearGradient>
      <linearGradient id="framePetalRose" x1="180" y1="100" x2="260" y2="200" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFA0CA" />
        <stop offset="50%" stopColor="#F43F8F" />
        <stop offset="100%" stopColor="#881337" />
      </linearGradient>
      <linearGradient id="framePetalPink" x1="120" y1="120" x2="180" y2="200" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FDE8F3" />
        <stop offset="50%" stopColor="#F472B6" />
        <stop offset="100%" stopColor="#BE185D" />
      </linearGradient>
    </defs>

    {/* Radiant Halo behind meditation figure */}
    <ellipse cx="160" cy="110" rx="90" ry="80" fill="url(#haloGlow)" />

    {/* Lush Layered Botanical Petals Behind Her Right & Left Sides */}
    {/* Upper Right Fanning Petals */}
    <path
      d="M200 130 C225 110 248 85 240 60 C222 75 205 95 192 118 Z"
      fill="url(#framePetalViolet)"
      fillOpacity="0.8"
    />
    <path
      d="M210 148 C238 132 258 110 252 88 C230 102 210 124 198 144 Z"
      fill="url(#framePetalRose)"
      fillOpacity="0.85"
    />
    <path
      d="M218 165 C242 152 260 135 255 118 C238 128 220 145 205 160 Z"
      fill="url(#framePetalViolet)"
      fillOpacity="0.75"
    />

    {/* Lower Left Petals around hips */}
    <path
      d="M130 160 C110 145 95 125 102 105 C118 118 130 138 138 155 Z"
      fill="url(#framePetalPink)"
      fillOpacity="0.75"
    />
    <path
      d="M120 178 C98 165 80 145 85 128 C102 138 120 155 130 170 Z"
      fill="url(#framePetalRose)"
      fillOpacity="0.7"
    />
  </svg>
);

// 3D Pink Calendar with Plus icon for Not Logged Period Tracker Card
export const Visual3DCalendarPlus: React.FC<{ className?: string }> = ({ className = 'w-20 h-20 sm:w-24 sm:h-24' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className} filter drop-shadow-md select-none shrink-0`}>
    <defs>
      <linearGradient id="calPlusBase" x1="12" y1="20" x2="88" y2="88" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFFFFF" />
        <stop offset="1" stopColor="#FFF0F6" />
      </linearGradient>
      <linearGradient id="calPlusTop" x1="12" y1="20" x2="88" y2="46" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF6EA8" />
        <stop offset="1" stopColor="#F43F8F" />
      </linearGradient>
    </defs>
    <rect x="12" y="20" width="76" height="68" rx="18" fill="url(#calPlusBase)" stroke="#FFD1E3" strokeWidth="2" />
    <rect x="12" y="20" width="76" height="24" rx="16" fill="url(#calPlusTop)" />
    {/* Spiral Rings */}
    <rect x="24" y="12" width="6" height="16" rx="3" fill="#F43F8F" />
    <rect x="40" y="12" width="6" height="16" rx="3" fill="#F43F8F" />
    <rect x="56" y="12" width="6" height="16" rx="3" fill="#F43F8F" />
    <rect x="72" y="12" width="6" height="16" rx="3" fill="#F43F8F" />
    {/* Centered White Circle with Pink + */}
    <circle cx="50" cy="60" r="14" fill="#FFFFFF" stroke="#F43F8F" strokeWidth="2.5" />
    <path d="M50 52 V68 M42 60 H58" stroke="#F43F8F" strokeWidth="3.2" strokeLinecap="round" />
  </svg>
);

// 3D Girl holding abdomen for Cramps Level card
export const Visual3DCrampsGirl: React.FC<{ className?: string }> = ({ className = 'w-20 h-20 sm:w-24 sm:h-24' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className} filter drop-shadow-md select-none shrink-0`}>
    <defs>
      <radialGradient id="crampsGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFE4F1" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="sweaterGrad" x1="30" y1="45" x2="70" y2="85" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F5A3C7" />
        <stop offset="1" stopColor="#E06B9F" />
      </linearGradient>
    </defs>
    {/* Aura */}
    <circle cx="50" cy="50" r="42" fill="url(#crampsGlow)" />
    {/* Distress rays on left and right */}
    <path d="M22 38 L14 34 M20 48 L12 48 M22 58 L14 62" stroke="#F43F8F" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M78 38 L86 34 M80 48 L88 48 M78 58 L86 62" stroke="#F43F8F" strokeWidth="2.2" strokeLinecap="round" />
    {/* Hair back */}
    <ellipse cx="50" cy="36" rx="18" ry="20" fill="#4B2C20" />
    {/* Head & Neck */}
    <rect x="46" y="38" width="8" height="10" fill="#FCD5B5" />
    <circle cx="50" cy="30" r="13" fill="#FCD5B5" />
    {/* Hair front */}
    <path d="M36 28 C36 18 64 18 64 28 C60 22 40 22 36 28 Z" fill="#4B2C20" />
    <path d="M34 26 C33 36 36 46 38 48" stroke="#4B2C20" strokeWidth="4" strokeLinecap="round" />
    <path d="M66 26 C67 36 64 46 62 48" stroke="#4B2C20" strokeWidth="4" strokeLinecap="round" />
    {/* Pain Expression */}
    <path d="M43 28 L47 30 M57 30 L53 28" stroke="#4B2C20" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M44 32 Q46 30 48 32 M52 32 Q54 30 56 32" stroke="#4B2C20" strokeWidth="1.5" strokeLinecap="round" />
    <ellipse cx="50" cy="37" rx="2" ry="1" fill="#D97706" />
    <circle cx="44" cy="35" r="2" fill="#FFA0CA" />
    <circle cx="56" cy="35" r="2" fill="#FFA0CA" />
    {/* Body / Sweater */}
    <path d="M34 48 C34 46 66 46 66 48 L72 82 C72 84 28 84 28 82 Z" fill="url(#sweaterGrad)" />
    {/* Arms clutching stomach */}
    <path d="M30 52 C34 66 46 72 50 72 C54 72 66 66 70 52" stroke="#D85A92" strokeWidth="6" strokeLinecap="round" fill="none" />
    <ellipse cx="50" cy="70" rx="6" ry="4" fill="#FCD5B5" />
  </svg>
);

// 3D Sanitary Pad with droplets for Blood Flow card
export const Visual3DSanitaryPad: React.FC<{ className?: string }> = ({ className = 'w-20 h-20 sm:w-24 sm:h-24' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className} filter drop-shadow-md select-none shrink-0`}>
    <defs>
      <radialGradient id="padGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFF0F6" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="padGrad" x1="25" y1="20" x2="75" y2="80" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFFFFF" />
        <stop offset="1" stopColor="#FDE8F3" />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="42" fill="url(#padGlow)" />
    {/* Pad Body rotated -25deg */}
    <g transform="rotate(-25 50 50)">
      {/* Wings */}
      <path d="M32 40 C20 42 20 58 32 60 Z" fill="#FCE7F3" stroke="#FBCFE8" strokeWidth="1.5" />
      <path d="M68 40 C80 42 80 58 68 60 Z" fill="#FCE7F3" stroke="#FBCFE8" strokeWidth="1.5" />
      {/* Main Absorbent Core */}
      <rect x="34" y="16" width="32" height="68" rx="16" fill="url(#padGrad)" stroke="#F9A8D4" strokeWidth="2" />
      {/* Inner embossed channel lines */}
      <rect x="40" y="24" width="20" height="52" rx="10" stroke="#F472B6" strokeWidth="1.5" strokeDasharray="3 2" fill="none" />
      {/* Center Blood Drop */}
      <path d="M50 44 C50 44 44 52 44 56 C44 59.3 46.7 62 50 62 C53.3 62 56 59.3 56 56 C56 52 50 44 50 44 Z" fill="#F43F8F" />
      <circle cx="48" cy="54" r="1" fill="#FFFFFF" />
    </g>
    {/* Floating droplet accents */}
    <circle cx="78" cy="32" r="3.5" fill="#F43F8F" />
    <circle cx="84" cy="46" r="2.5" fill="#F43F8F" />
    <circle cx="20" cy="66" r="3" fill="#F43F8F" />
  </svg>
);

// 3D Clipboard with emoji reaction faces for Symptoms card
export const Visual3DClipboardFaces: React.FC<{ className?: string }> = ({ className = 'w-20 h-20 sm:w-24 sm:h-24' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className} filter drop-shadow-md select-none shrink-0`}>
    <defs>
      <linearGradient id="clipBgGrad" x1="20" y1="15" x2="80" y2="85" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFF5FA" />
        <stop offset="1" stopColor="#FCE7F3" />
      </linearGradient>
    </defs>
    {/* Clipboard Base */}
    <rect x="18" y="16" width="64" height="74" rx="16" fill="url(#clipBgGrad)" stroke="#F9A8D4" strokeWidth="2" />
    {/* Clip Top */}
    <rect x="34" y="10" width="32" height="14" rx="6" fill="#F43F8F" />
    <circle cx="50" cy="16" r="3" fill="#FFFFFF" />
    {/* Inner Paper Sheet */}
    <rect x="25" y="26" width="50" height="56" rx="8" fill="#FFFFFF" stroke="#FDE8F3" strokeWidth="1" />
    {/* Row 1: Happy / Cramps icon */}
    <circle cx="35" cy="38" r="5.5" fill="#FED7AA" />
    <circle cx="33.5" cy="36.5" r="0.8" fill="#4B2C20" />
    <circle cx="36.5" cy="36.5" r="0.8" fill="#4B2C20" />
    <path d="M33 39 Q35 41 37 39" stroke="#4B2C20" strokeWidth="0.8" strokeLinecap="round" />
    <rect x="46" y="36" width="22" height="4" rx="2" fill="#F472B6" />
    {/* Row 2: Sad / Fatigue */}
    <circle cx="35" cy="52" r="5.5" fill="#FECDD3" />
    <circle cx="33.5" cy="50.5" r="0.8" fill="#4B2C20" />
    <circle cx="36.5" cy="50.5" r="0.8" fill="#4B2C20" />
    <path d="M33 54 Q35 52 37 54" stroke="#4B2C20" strokeWidth="0.8" strokeLinecap="round" />
    <rect x="46" y="50" width="22" height="4" rx="2" fill="#F472B6" />
    {/* Row 3: Bloating / Smug */}
    <circle cx="35" cy="66" r="5.5" fill="#BAE6FD" />
    <circle cx="33.5" cy="64.5" r="0.8" fill="#4B2C20" />
    <circle cx="36.5" cy="64.5" r="0.8" fill="#4B2C20" />
    <path d="M33.5 68 H36.5" stroke="#4B2C20" strokeWidth="0.8" strokeLinecap="round" />
    <rect x="46" y="64" width="22" height="4" rx="2" fill="#F472B6" />
    {/* Little yellow mood emoji badge at bottom right */}
    <circle cx="75" cy="74" r="7" fill="#FDE047" stroke="#FFFFFF" strokeWidth="1.5" />
    <circle cx="73" cy="72.5" r="1" fill="#4B2C20" />
    <circle cx="77" cy="72.5" r="1" fill="#4B2C20" />
    <path d="M72.5 75.5 Q75 78 77.5 75.5" stroke="#4B2C20" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

// 3D Calendar with question mark for Next Period card
export const Visual3DCalendarQuestion: React.FC<{ className?: string }> = ({ className = 'w-20 h-20 sm:w-24 sm:h-24' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className} filter drop-shadow-md select-none shrink-0`}>
    <defs>
      <linearGradient id="calQBase" x1="12" y1="20" x2="88" y2="88" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFFFFF" />
        <stop offset="1" stopColor="#FFF0F6" />
      </linearGradient>
      <linearGradient id="calQTop" x1="12" y1="20" x2="88" y2="46" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF6EA8" />
        <stop offset="1" stopColor="#F43F8F" />
      </linearGradient>
    </defs>
    <rect x="12" y="20" width="76" height="68" rx="18" fill="url(#calQBase)" stroke="#FFD1E3" strokeWidth="2" />
    <rect x="12" y="20" width="76" height="24" rx="16" fill="url(#calQTop)" />
    {/* Spiral Rings */}
    <rect x="24" y="12" width="6" height="16" rx="3" fill="#F43F8F" />
    <rect x="40" y="12" width="6" height="16" rx="3" fill="#F43F8F" />
    <rect x="56" y="12" width="6" height="16" rx="3" fill="#F43F8F" />
    <rect x="72" y="12" width="6" height="16" rx="3" fill="#F43F8F" />
    {/* Calendar grid lines */}
    <rect x="20" y="52" width="10" height="8" rx="3" fill="#FCE7F3" />
    <rect x="36" y="52" width="10" height="8" rx="3" fill="#FCE7F3" />
    <rect x="20" y="66" width="10" height="8" rx="3" fill="#FCE7F3" />
    <rect x="36" y="66" width="10" height="8" rx="3" fill="#FCE7F3" />
    {/* Big Pink Question Mark Badge on bottom right */}
    <circle cx="68" cy="65" r="16" fill="#F43F8F" stroke="#FFFFFF" strokeWidth="2.5" />
    <text x="68" y="72" textAnchor="middle" fill="#FFFFFF" fontSize="20" fontWeight="900" fontFamily="sans-serif">?</text>
  </svg>
);

// 3D Cute Uterus with question marks for AI Prediction card
export const Visual3DUterusQuestion: React.FC<{ className?: string }> = ({ className = 'w-24 h-20 sm:w-28 sm:h-24' }) => (
  <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className} filter drop-shadow-md select-none shrink-0`}>
    <defs>
      <linearGradient id="uterusQGrad" x1="10" y1="20" x2="110" y2="85" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFA0CA" />
        <stop offset="0.5" stopColor="#FF6EA8" />
        <stop offset="1" stopColor="#F43F8F" />
      </linearGradient>
    </defs>
    {/* Double Question marks on top right */}
    <text x="96" y="24" fill="#F43F8F" fontSize="18" fontWeight="900" fontFamily="sans-serif">?</text>
    <text x="108" y="28" fill="#F472B6" fontSize="15" fontWeight="900" fontFamily="sans-serif">?</text>
    {/* Cute Uterus body */}
    <path
      d="M60 38 C60 38 32 22 16 30 C6 36 8 50 20 50 C34 50 45 57 50 70 C53 77 60 86 60 86 C60 86 67 77 70 70 C75 57 86 50 100 50 C112 50 114 36 104 30 C88 22 60 38 60 38 Z"
      fill="url(#uterusQGrad)"
    />
    {/* Confused / Cute Eyes & blush */}
    <circle cx="52" cy="56" r="3.2" fill="#4C0519" />
    <circle cx="68" cy="56" r="3.2" fill="#4C0519" />
    <circle cx="53" cy="55" r="1" fill="#FFFFFF" />
    <circle cx="69" cy="55" r="1" fill="#FFFFFF" />
    <ellipse cx="60" cy="62" rx="2.5" ry="3.5" fill="#4C0519" />
    <ellipse cx="46" cy="60" rx="3" ry="2" fill="#FB7185" />
    <ellipse cx="74" cy="60" rx="3" ry="2" fill="#FB7185" />
    {/* Sweat drop on forehead */}
    <path d="M58 46 C58 46 55 50 55 52 C55 53.5 56.3 54.5 58 54.5 C59.7 54.5 61 53.5 61 52 C61 50 58 46 58 46 Z" fill="#38BDF8" />
    {/* Little blood drop companion with confused mouth */}
    <circle cx="94" cy="80" r="3" fill="#F43F8F" />
    <circle cx="26" cy="80" r="3" fill="#F43F8F" />
  </svg>
);

// 3D Chart, Calendar & Magnifying Glass Illustration for Cycle Insights Not Logged Banner
export const Visual3DInsightsBannerChart: React.FC<{ className?: string }> = ({ className = 'w-48 h-36 sm:w-64 sm:h-44 md:w-72 md:h-48' }) => (
  <svg viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className} filter drop-shadow-md select-none shrink-0`}>
    <defs>
      <linearGradient id="calChartBg" x1="70" y1="20" x2="210" y2="160" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFFFFF" />
        <stop offset="1" stopColor="#FFF0F6" />
      </linearGradient>
      <linearGradient id="bar1" x1="0" y1="0" x2="0" y2="1">
        <stop stopColor="#FFA0CA" />
        <stop offset="1" stopColor="#F43F8F" />
      </linearGradient>
      <linearGradient id="bar2" x1="0" y1="0" x2="0" y2="1">
        <stop stopColor="#FF6EA8" />
        <stop offset="1" stopColor="#E11D48" />
      </linearGradient>
      <linearGradient id="bar3" x1="0" y1="0" x2="0" y2="1">
        <stop stopColor="#F472B6" />
        <stop offset="1" stopColor="#F43F8F" />
      </linearGradient>
      <linearGradient id="magGlass" x1="180" y1="90" x2="240" y2="150" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFA0CA" />
        <stop offset="1" stopColor="#F43F8F" />
      </linearGradient>
      <linearGradient id="leafPurple" x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#E9D5FF" />
        <stop offset="1" stopColor="#A855F7" />
      </linearGradient>
      <linearGradient id="leafPink" x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#FCE7F3" />
        <stop offset="1" stopColor="#F43F8F" />
      </linearGradient>
    </defs>
    {/* Background Leaves (Left & Right) */}
    <path d="M50 120 C30 100 20 70 35 50 C50 65 60 90 65 110 Z" fill="url(#leafPink)" fillOpacity="0.8" />
    <path d="M60 135 C35 125 15 105 20 85 C40 95 60 115 70 130 Z" fill="url(#leafPurple)" fillOpacity="0.8" />
    <path d="M230 120 C250 100 260 70 245 50 C230 65 220 90 215 110 Z" fill="url(#leafPurple)" fillOpacity="0.8" />
    <path d="M220 135 C245 125 265 105 260 85 C240 95 220 115 210 130 Z" fill="url(#leafPink)" fillOpacity="0.8" />

    {/* Floating Hearts */}
    <path d="M68 62 C68 56 74 52 79 56 C84 52 90 56 90 62 C90 69 79 76 79 76 C79 76 68 69 68 62 Z" fill="#F43F8F" />
    <path d="M224 60 C224 55 229 52 233 55 C237 52 242 55 242 60 C242 66 233 72 233 72 C233 72 224 66 224 60 Z" fill="#FFA0CA" />

    {/* Center 3D Calendar with Bar Chart */}
    <rect x="80" y="24" width="120" height="110" rx="20" fill="url(#calChartBg)" stroke="#FFD1E3" strokeWidth="2.5" />
    {/* Spiral Rings */}
    <rect x="94" y="16" width="7" height="16" rx="3.5" fill="#F43F8F" />
    <rect x="114" y="16" width="7" height="16" rx="3.5" fill="#F43F8F" />
    <rect x="136" y="16" width="7" height="16" rx="3.5" fill="#F43F8F" />
    <rect x="158" y="16" width="7" height="16" rx="3.5" fill="#F43F8F" />
    <rect x="178" y="16" width="7" height="16" rx="3.5" fill="#F43F8F" />

    {/* 3D Vertical Bar Chart Columns */}
    {/* Bar 1 (Short) */}
    <rect x="100" y="80" width="16" height="38" rx="8" fill="url(#bar1)" />
    {/* Bar 2 (Tall) */}
    <rect x="124" y="52" width="16" height="66" rx="8" fill="url(#bar2)" />
    {/* Bar 3 (Medium) */}
    <rect x="148" y="66" width="16" height="52" rx="8" fill="url(#bar3)" />

    {/* 3D Magnifying Glass on front right */}
    <circle cx="196" cy="118" r="22" fill="#FFFFFF" stroke="url(#magGlass)" strokeWidth="6" />
    <circle cx="196" cy="118" r="16" fill="#FCE7F3" fillOpacity="0.4" />
    {/* Handle */}
    <path d="M212 134 L232 154" stroke="url(#magGlass)" strokeWidth="8" strokeLinecap="round" />
  </svg>
);

// ==========================================
// 1. 3D Menstrual Pad with Glossy Ruby Droplet & Leaves (Period Tracker Card)
// ==========================================
export const Visual3DPeriodPad: React.FC<{ className?: string }> = ({ className = 'w-24 h-24 sm:w-28 sm:h-28' }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className} filter drop-shadow-md select-none shrink-0`}>
    <defs>
      <radialGradient id="padGlow2" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFF0F6" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="padBodyGrad" x1="20" y1="20" x2="90" y2="90" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="45%" stopColor="#FFF5F9" />
        <stop offset="100%" stopColor="#FCE7F3" />
      </linearGradient>
      <linearGradient id="padWingGrad" x1="10" y1="30" x2="90" y2="90" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFF5FA" />
        <stop offset="100%" stopColor="#FBCFE8" />
      </linearGradient>
      <linearGradient id="rubyDropGrad" x1="70" y1="50" x2="105" y2="95" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FF4B8B" />
        <stop offset="35%" stopColor="#E11D48" />
        <stop offset="85%" stopColor="#BE123C" />
        <stop offset="100%" stopColor="#881337" />
      </linearGradient>
      <linearGradient id="leafPinkGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FCE7F3" />
        <stop offset="100%" stopColor="#F472B6" />
      </linearGradient>
      <linearGradient id="leafLilacGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#F3E8FF" />
        <stop offset="100%" stopColor="#C084FC" />
      </linearGradient>
    </defs>

    {/* Soft Aura */}
    <circle cx="60" cy="60" r="54" fill="url(#padGlow2)" />

    {/* Background Soft Pink Botanical Sprigs */}
    <path d="M22 45 C10 32 12 18 24 16 C30 26 28 38 22 45 Z" fill="url(#leafPinkGrad)" fillOpacity="0.75" />
    <path d="M14 60 C4 52 4 38 15 35 C20 44 20 54 14 60 Z" fill="url(#leafLilacGrad)" fillOpacity="0.7" />
    <path d="M102 85 C114 96 112 110 100 112 C94 102 96 90 102 85 Z" fill="url(#leafPinkGrad)" fillOpacity="0.75" />
    <path d="M110 70 C118 78 118 92 108 95 C102 86 104 76 110 70 Z" fill="url(#leafLilacGrad)" fillOpacity="0.7" />

    {/* Pad Group angled at -35deg */}
    <g transform="rotate(-35 55 58)">
      {/* Wings */}
      <path d="M24 45 C10 47 10 71 24 73 Z" fill="url(#padWingGrad)" stroke="#FBCFE8" strokeWidth="1.5" />
      <path d="M66 45 C80 47 80 71 66 73 Z" fill="url(#padWingGrad)" stroke="#FBCFE8" strokeWidth="1.5" />
      {/* Pad Main Body */}
      <rect x="25" y="14" width="40" height="90" rx="20" fill="url(#padBodyGrad)" stroke="#F9A8D4" strokeWidth="2" />
      {/* Embossed Absorption Channels */}
      <rect x="32" y="24" width="26" height="70" rx="13" stroke="#F472B6" strokeWidth="1.2" strokeDasharray="3 2" fill="none" opacity="0.85" />
      <path d="M37 35 Q45 42 53 35" stroke="#F472B6" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <path d="M37 83 Q45 76 53 83" stroke="#F472B6" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    </g>

    {/* 3D Plump Glossy Ruby-Red Blood Droplet beside the pad */}
    <g transform="translate(12, 10)">
      <path
        d="M75 52 C75 52 54 74 54 87 C54 98 63.4 106 75 106 C86.6 106 96 98 96 87 C96 74 75 52 75 52 Z"
        fill="url(#rubyDropGrad)"
        filter="drop-shadow(0 4px 8px rgba(190,18,60,0.35))"
      />
      {/* Curved Gloss Sheen */}
      <path
        d="M65 72 C61 78 60 86 62 93 C63 95 65 95 66 93 C64 87 65 80 71 74 C73 72 70 70 65 72 Z"
        fill="#FFFFFF"
        fillOpacity="0.85"
      />
      <circle cx="83" cy="94" r="3" fill="#FFFFFF" fillOpacity="0.45" />
    </g>

    {/* Floating Pink Spores/Dots */}
    <circle cx="28" cy="24" r="2" fill="#F43F8F" fillOpacity="0.6" />
    <circle cx="106" cy="38" r="2.5" fill="#F43F8F" fillOpacity="0.6" />
    <circle cx="98" cy="22" r="1.5" fill="#FFA0CA" />
  </svg>
);

// ==========================================
// 2. 3D Woman Holding Lower Abdomen for Menstrual Cramps (Current Level Card)
// ==========================================
export const Visual3DCrampsTorso: React.FC<{ className?: string }> = ({ className = 'w-24 h-24 sm:w-28 sm:h-28' }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className} filter drop-shadow-md select-none shrink-0`}>
    <defs>
      <radialGradient id="crampAura" cx="50%" cy="55%" r="48%">
        <stop offset="0%" stopColor="#FFE4F1" />
        <stop offset="70%" stopColor="#FFF0F6" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="skinToneGrad" x1="40" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFE4D6" />
        <stop offset="60%" stopColor="#FCD5B5" />
        <stop offset="100%" stopColor="#F7BE98" />
      </linearGradient>
      <linearGradient id="topFabricGrad" x1="30" y1="15" x2="90" y2="35" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#FFE4EF" />
      </linearGradient>
      <linearGradient id="shortsGrad" x1="35" y1="58" x2="85" y2="105" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFA0CA" />
        <stop offset="45%" stopColor="#F472B6" />
        <stop offset="100%" stopColor="#EC4899" />
      </linearGradient>
    </defs>

    {/* Radiant Glow */}
    <circle cx="60" cy="62" r="54" fill="url(#crampAura)" />

    {/* Pink Cramp Lightning Sparks on Left & Right */}
    <g stroke="#F43F8F" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.85">
      {/* Left Sparks */}
      <path d="M22 46 L14 52 L20 56 L12 64" />
      <path d="M26 68 L18 73 L23 77 L16 83" />
      {/* Right Sparks */}
      <path d="M98 46 L106 52 L100 56 L108 64" />
      <path d="M94 68 L102 73 L97 77 L104 83" />
    </g>

    {/* Upper Torso / Midriff */}
    <path
      d="M38 26 C38 20 82 20 82 26 C82 34 78 48 78 58 C78 62 42 62 42 58 C42 48 38 34 38 26 Z"
      fill="url(#skinToneGrad)"
    />

    {/* White / Pastel Crop Top */}
    <path
      d="M36 14 C36 14 48 18 60 18 C72 18 84 14 84 14 L82 32 C74 34 60 34 60 34 C60 34 46 34 38 32 Z"
      fill="url(#topFabricGrad)"
      stroke="#FFD1E3"
      strokeWidth="1.2"
    />
    <path d="M46 32 C54 34 66 34 74 32" stroke="#F472B6" strokeWidth="1" strokeLinecap="round" opacity="0.5" />

    {/* Belly Button Indent */}
    <ellipse cx="60" cy="50" rx="1.8" ry="2.2" fill="#E09F75" />

    {/* Pink High-Waisted Shorts / Bottoms */}
    <path
      d="M40 58 C46 59 74 59 80 58 L86 86 C86 94 72 98 62 94 L60 84 L58 94 C48 98 34 94 34 86 Z"
      fill="url(#shortsGrad)"
      stroke="#FF94C2"
      strokeWidth="1.2"
    />
    {/* Shorts Waistband & Seam */}
    <path d="M40 60 C50 62 70 62 80 60" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <path d="M60 62 L60 84" stroke="#BE185D" strokeWidth="1.2" opacity="0.4" />

    {/* Thighs */}
    <path d="M35 88 L34 104 C34 107 46 108 48 104 L52 90 Z" fill="url(#skinToneGrad)" />
    <path d="M85 88 L86 104 C86 107 74 108 72 104 L68 90 Z" fill="url(#skinToneGrad)" />

    {/* Arms wrapped around to gently hold lower abdomen */}
    {/* Left Arm & Hand */}
    <path
      d="M32 30 C24 44 26 62 38 68 C44 71 52 72 58 70"
      stroke="url(#skinToneGrad)"
      strokeWidth="7"
      strokeLinecap="round"
    />
    {/* Right Arm & Hand */}
    <path
      d="M88 30 C96 44 94 62 82 68 C76 71 68 72 62 70"
      stroke="url(#skinToneGrad)"
      strokeWidth="7"
      strokeLinecap="round"
    />
    {/* Overlapping Hands Resting on Pelvis */}
    <ellipse cx="56" cy="68" rx="7" ry="4.5" transform="rotate(-10 56 68)" fill="#FCD5B5" stroke="#E59D73" strokeWidth="0.8" />
    <ellipse cx="64" cy="68" rx="7" ry="4.5" transform="rotate(10 64 68)" fill="#FCD5B5" stroke="#E59D73" strokeWidth="0.8" />
  </svg>
);

// ==========================================
// 3. 3D Menstrual Blood Droplets with Leaves & Bubbles (Blood Flow Card)
// ==========================================
export const Visual3DBloodFlowDrops: React.FC<{ className?: string }> = ({ className = 'w-24 h-24 sm:w-28 sm:h-28' }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className} filter drop-shadow-md select-none shrink-0`}>
    <defs>
      <radialGradient id="dropsAura" cx="50%" cy="55%" r="50%">
        <stop offset="0%" stopColor="#FFF0F6" />
        <stop offset="65%" stopColor="#FCE7F3" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="bigRubyGrad" x1="45" y1="20" x2="85" y2="95" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FF4B8B" />
        <stop offset="35%" stopColor="#E11D48" />
        <stop offset="75%" stopColor="#BE123C" />
        <stop offset="100%" stopColor="#881337" />
      </linearGradient>
      <linearGradient id="smallRubyGrad" x1="10" y1="40" x2="45" y2="90" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFA0CA" />
        <stop offset="50%" stopColor="#F43F8F" />
        <stop offset="100%" stopColor="#9F1239" />
      </linearGradient>
      <linearGradient id="petalPinkFlow" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FDE8F3" />
        <stop offset="100%" stopColor="#F472B6" />
      </linearGradient>
      <linearGradient id="petalLilacFlow" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#F3E8FF" />
        <stop offset="100%" stopColor="#C084FC" />
      </linearGradient>
    </defs>

    {/* Radiant Background Aura */}
    <circle cx="60" cy="62" r="54" fill="url(#dropsAura)" />

    {/* Background Soft Pink & Lilac Foliage */}
    <path d="M25 80 C10 65 14 42 30 40 C36 55 32 72 25 80 Z" fill="url(#petalPinkFlow)" fillOpacity="0.75" />
    <path d="M18 95 C6 82 8 68 22 66 C28 78 26 88 18 95 Z" fill="url(#petalLilacFlow)" fillOpacity="0.7" />
    <path d="M95 80 C110 65 106 42 90 40 C84 55 88 72 95 80 Z" fill="url(#petalLilacFlow)" fillOpacity="0.75" />
    <path d="M102 95 C114 82 112 68 98 66 C92 78 94 88 102 95 Z" fill="url(#petalPinkFlow)" fillOpacity="0.7" />

    {/* Left Medium Droplet */}
    <g transform="translate(6, 16)">
      <path
        d="M26 40 C26 40 10 58 10 68 C10 77 17.2 84 26 84 C34.8 84 42 77 42 68 C42 58 26 40 26 40 Z"
        fill="url(#smallRubyGrad)"
        filter="drop-shadow(0 3px 6px rgba(190,18,60,0.25))"
      />
      <path d="M18 56 C15 61 14 67 16 73 C17 74 18 74 19 73 C17 68 18 63 22 58 Z" fill="#FFFFFF" fillOpacity="0.8" />
    </g>

    {/* Right Medium Droplet */}
    <g transform="translate(48, 14)">
      <path
        d="M44 42 C44 42 30 58 30 68 C30 76.5 36.3 83 44 83 C51.7 83 58 76.5 58 68 C58 58 44 42 44 42 Z"
        fill="url(#smallRubyGrad)"
        filter="drop-shadow(0 3px 6px rgba(190,18,60,0.25))"
      />
      <path d="M37 57 C35 61 34 66 36 71 C37 72 38 72 39 71 C37 67 38 62 41 58 Z" fill="#FFFFFF" fillOpacity="0.8" />
    </g>

    {/* Center Large 3D Glossy Ruby Droplet */}
    <g>
      <path
        d="M60 22 C60 22 34 54 34 72 C34 87 45.6 98 60 98 C74.4 98 86 87 86 72 C86 54 60 22 60 22 Z"
        fill="url(#bigRubyGrad)"
        filter="drop-shadow(0 6px 12px rgba(190,18,60,0.35))"
      />
      {/* Big Gloss Sheen Arc */}
      <path
        d="M48 48 C42 56 41 68 43 78 C44 81 47 81 48 78 C45 70 46 60 55 52 C57 50 53 46 48 48 Z"
        fill="#FFFFFF"
        fillOpacity="0.9"
      />
      {/* Secondary Bottom Highlight */}
      <circle cx="70" cy="84" r="4.5" fill="#FFFFFF" fillOpacity="0.4" />
      <circle cx="60" cy="36" r="2.5" fill="#FFFFFF" fillOpacity="0.6" />
    </g>

    {/* Floating Bubble Spheres */}
    <circle cx="28" cy="34" r="4.5" fill="#FCE7F3" stroke="#F472B6" strokeWidth="0.8" opacity="0.8" />
    <circle cx="92" cy="32" r="3.5" fill="#FCE7F3" stroke="#F472B6" strokeWidth="0.8" opacity="0.8" />
    <circle cx="86" cy="18" r="2" fill="#FFA0CA" />
  </svg>
);

// ==========================================
// 4. 3D Cute Girl Resting Head on Hand for Symptoms (Symptoms Card)
// ==========================================
export const Visual3DSymptomsTiredGirl: React.FC<{ className?: string }> = ({ className = 'w-24 h-24 sm:w-28 sm:h-28' }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className} filter drop-shadow-md select-none shrink-0`}>
    <defs>
      <radialGradient id="sympAura" cx="50%" cy="55%" r="50%">
        <stop offset="0%" stopColor="#FFE4F1" />
        <stop offset="70%" stopColor="#FFF0F6" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="girlHairGrad" x1="40" y1="10" x2="80" y2="70" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#5C3A21" />
        <stop offset="50%" stopColor="#4A2810" />
        <stop offset="100%" stopColor="#321A08" />
      </linearGradient>
      <linearGradient id="girlFaceGrad" x1="45" y1="30" x2="75" y2="70" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFF0E6" />
        <stop offset="60%" stopColor="#FCD5B5" />
        <stop offset="100%" stopColor="#F7C6A0" />
      </linearGradient>
      <linearGradient id="girlSweater" x1="30" y1="65" x2="90" y2="115" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFA0CA" />
        <stop offset="50%" stopColor="#F472B6" />
        <stop offset="100%" stopColor="#EC4899" />
      </linearGradient>
    </defs>

    {/* Radiant Glow */}
    <circle cx="60" cy="62" r="54" fill="url(#sympAura)" />

    {/* Pink Distress Sparks / Sparkles */}
    <path d="M22 62 L25 58 L22 54 L19 58 Z" fill="#F43F8F" />
    <path d="M28 48 L32 44 L28 40 L24 44 Z" fill="#FFA0CA" />
    <path d="M100 52 L103 48 L100 44 L97 48 Z" fill="#F43F8F" />

    {/* Background Soft Leaves */}
    <path d="M18 90 C8 78 12 62 25 60 C28 72 26 84 18 90 Z" fill="#FCE7F3" />
    <path d="M102 90 C112 78 108 62 95 60 C92 72 94 84 102 90 Z" fill="#F3E8FF" />

    {/* Back Hair Bun */}
    <circle cx="60" cy="22" r="14" fill="url(#girlHairGrad)" />
    <circle cx="60" cy="22" r="10" fill="#6B4226" opacity="0.6" />

    {/* Hair Strands around neck */}
    <path d="M42 45 C38 60 40 75 42 80" stroke="#4A2810" strokeWidth="4" strokeLinecap="round" />
    <path d="M78 45 C82 60 80 75 78 80" stroke="#4A2810" strokeWidth="4" strokeLinecap="round" />

    {/* Neck */}
    <rect x="55" y="60" width="10" height="12" rx="4" fill="url(#girlFaceGrad)" />

    {/* Head (tilted slightly left) */}
    <g transform="rotate(-6 60 50)">
      <ellipse cx="60" cy="50" rx="18" ry="20" fill="url(#girlFaceGrad)" />
      {/* Cute Front Bangs */}
      <path
        d="M42 42 C46 32 74 32 78 42 C72 36 64 35 60 38 C56 35 48 36 42 42 Z"
        fill="url(#girlHairGrad)"
      />
      {/* Side tendrils */}
      <path d="M42 40 C40 50 42 60 44 65" stroke="#4A2810" strokeWidth="3" strokeLinecap="round" />
      <path d="M78 40 C80 50 78 60 76 65" stroke="#4A2810" strokeWidth="3" strokeLinecap="round" />

      {/* Gentle Tired Eyes (Curved lines) */}
      <path d="M49 49 Q53 53 57 49" stroke="#4A2810" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M63 49 Q67 53 71 49" stroke="#4A2810" strokeWidth="1.8" strokeLinecap="round" fill="none" />

      {/* Rosy Blush */}
      <ellipse cx="48" cy="56" rx="4.5" ry="2.5" fill="#FB7185" fillOpacity="0.6" />
      <ellipse cx="72" cy="56" rx="4.5" ry="2.5" fill="#FB7185" fillOpacity="0.6" />

      {/* Tiny Gentle Mouth */}
      <path d="M58 60 Q60 62 62 60" stroke="#BE123C" strokeWidth="1.4" strokeLinecap="round" />
    </g>

    {/* Cozy Pink Long-Sleeve Sweater */}
    <path
      d="M36 72 C42 68 78 68 84 72 L92 110 C92 112 28 112 28 110 Z"
      fill="url(#girlSweater)"
      stroke="#FF94C2"
      strokeWidth="1.2"
    />
    <path d="M46 72 C52 75 68 75 74 72" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />

    {/* Arm & Hand resting against cheek */}
    <g>
      <path
        d="M34 105 C32 90 38 76 46 64"
        stroke="url(#girlSweater)"
        strokeWidth="10"
        strokeLinecap="round"
      />
      {/* Hand cupping cheek */}
      <ellipse cx="45" cy="58" rx="6" ry="7" transform="rotate(25 45 58)" fill="#FCD5B5" stroke="#E59D73" strokeWidth="0.8" />
    </g>
  </svg>
);

// ==========================================
// 5. 3D Standing Pink Desktop Calendar with Hearts & Lush Foliage (Next Period Card)
// ==========================================
export const Visual3DNextPeriodCalendar: React.FC<{ className?: string }> = ({ className = 'w-24 h-24 sm:w-28 sm:h-28' }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className} filter drop-shadow-md select-none shrink-0`}>
    <defs>
      <radialGradient id="calAura2" cx="50%" cy="55%" r="50%">
        <stop offset="0%" stopColor="#FFF0F6" />
        <stop offset="70%" stopColor="#FCE7F3" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="calPageGrad" x1="25" y1="20" x2="95" y2="90" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="60%" stopColor="#FFF5F9" />
        <stop offset="100%" stopColor="#FDE8F3" />
      </linearGradient>
      <linearGradient id="calHeaderGrad" x1="25" y1="22" x2="95" y2="44" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFA0CA" />
        <stop offset="50%" stopColor="#F472B6" />
        <stop offset="100%" stopColor="#EC4899" />
      </linearGradient>
      <linearGradient id="calStandGrad" x1="20" y1="85" x2="100" y2="105" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#F472B6" />
        <stop offset="100%" stopColor="#BE185D" />
      </linearGradient>
      <linearGradient id="foliageRose" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FFA0CA" />
        <stop offset="100%" stopColor="#F43F8F" />
      </linearGradient>
      <linearGradient id="foliageLilac" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#E9D5FF" />
        <stop offset="100%" stopColor="#A855F7" />
      </linearGradient>
    </defs>

    {/* Radiant Aura */}
    <circle cx="60" cy="62" r="54" fill="url(#calAura2)" />

    {/* Lush Botanical Leaves Behind Calendar (Left & Right) */}
    {/* Left Foliage */}
    <path d="M22 65 C8 48 12 28 28 25 C34 40 32 56 22 65 Z" fill="url(#foliageRose)" fillOpacity="0.8" />
    <path d="M12 85 C2 70 5 54 20 50 C26 64 24 78 12 85 Z" fill="url(#foliageLilac)" fillOpacity="0.85" />
    <path d="M18 100 C8 92 10 80 22 78 C26 88 24 96 18 100 Z" fill="url(#foliageRose)" fillOpacity="0.75" />

    {/* Right Foliage */}
    <path d="M98 65 C112 48 108 28 92 25 C86 40 88 56 98 65 Z" fill="url(#foliageLilac)" fillOpacity="0.8" />
    <path d="M108 85 C118 70 115 54 100 50 C94 64 96 78 108 85 Z" fill="url(#foliageRose)" fillOpacity="0.85" />
    <path d="M102 100 C112 92 110 80 98 78 C94 88 96 96 102 100 Z" fill="url(#foliageLilac)" fillOpacity="0.75" />

    {/* Calendar 3D Stand Base */}
    <path d="M24 88 L18 102 L102 102 L96 88 Z" fill="url(#calStandGrad)" />

    {/* Calendar Page */}
    <rect x="25" y="24" width="70" height="68" rx="14" fill="url(#calPageGrad)" stroke="#FFD1E3" strokeWidth="2" filter="drop-shadow(0 4px 10px rgba(236,72,153,0.18))" />

    {/* Calendar Pink Header */}
    <rect x="25" y="24" width="70" height="22" rx="12" fill="url(#calHeaderGrad)" />

    {/* 3D Spiral Binder Rings */}
    <rect x="34" y="16" width="5.5" height="16" rx="2.75" fill="#4C0519" stroke="#FFA0CA" strokeWidth="1" />
    <rect x="46" y="16" width="5.5" height="16" rx="2.75" fill="#4C0519" stroke="#FFA0CA" strokeWidth="1" />
    <rect x="58" y="16" width="5.5" height="16" rx="2.75" fill="#4C0519" stroke="#FFA0CA" strokeWidth="1" />
    <rect x="70" y="16" width="5.5" height="16" rx="2.75" fill="#4C0519" stroke="#FFA0CA" strokeWidth="1" />
    <rect x="82" y="16" width="5.5" height="16" rx="2.75" fill="#4C0519" stroke="#FFA0CA" strokeWidth="1" />

    {/* Mini Date Grid Squares */}
    <g fill="#FCE7F3">
      <rect x="33" y="52" width="9" height="7" rx="2.5" />
      <rect x="46" y="52" width="9" height="7" rx="2.5" />
      <rect x="59" y="52" width="9" height="7" rx="2.5" />
      <rect x="72" y="52" width="9" height="7" rx="2.5" />

      <rect x="33" y="63" width="9" height="7" rx="2.5" />
      <rect x="46" y="63" width="9" height="7" rx="2.5" />
      {/* Center Highlight Date with Heart */}
      <rect x="58" y="62" width="11" height="9" rx="3" fill="#FFE4EF" stroke="#F43F8F" strokeWidth="1.2" />
      <path d="M63.5 65.5 C63.5 64 65 63 66 64.5 C67 63 68.5 64 68.5 65.5 C68.5 67.5 66 69.5 66 69.5 C66 69.5 63.5 67.5 63.5 65.5 Z" fill="#F43F8F" />
      <rect x="72" y="63" width="9" height="7" rx="2.5" />

      <rect x="33" y="74" width="9" height="7" rx="2.5" />
      <rect x="46" y="74" width="9" height="7" rx="2.5" />
      <rect x="59" y="74" width="9" height="7" rx="2.5" />
      <rect x="72" y="74" width="9" height="7" rx="2.5" />
    </g>
  </svg>
);

// ==========================================
// 6. 3D Cute Waving Uterus Character with Smiling Blood Droplet (AI Prediction Card)
// ==========================================
export const Visual3DAIPredictionUterus: React.FC<{ className?: string }> = ({ className = 'w-24 h-24 sm:w-28 sm:h-28' }) => (
  <svg viewBox="0 0 130 110" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className} filter drop-shadow-md select-none shrink-0`}>
    <defs>
      <radialGradient id="uterusAura" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFF0F6" />
        <stop offset="70%" stopColor="#FCE7F3" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="uterusCharGrad" x1="15" y1="20" x2="105" y2="85" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFA6CB" />
        <stop offset="45%" stopColor="#FF77AD" />
        <stop offset="100%" stopColor="#F43F8F" />
      </linearGradient>
      <linearGradient id="bloodBuddyGrad" x1="85" y1="50" x2="120" y2="95" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FF4B8B" />
        <stop offset="45%" stopColor="#E11D48" />
        <stop offset="100%" stopColor="#9F1239" />
      </linearGradient>
    </defs>

    {/* Radiant Aura */}
    <circle cx="65" cy="55" r="50" fill="url(#uterusAura)" />

    {/* Floating Love Hearts */}
    <path d="M60 16 C60 12 64 9 67 12 C70 9 74 12 74 16 C74 21 67 25 67 25 C67 25 60 21 60 16 Z" fill="#F43F8F" />
    <path d="M96 24 C96 21 99 18 101.5 20 C104 18 107 21 107 24 C107 28 101.5 31 101.5 31 C101.5 31 96 28 96 24 Z" fill="#FFA0CA" />

    {/* Fallopian Tubes & Ovaries / Uterus Character Body */}
    {/* Left Ovary & Tube */}
    <circle cx="16" cy="40" r="7" fill="#FFA6CB" stroke="#FF77AD" strokeWidth="1.5" />
    <path d="M18 40 C28 28 42 34 52 46" stroke="url(#uterusCharGrad)" strokeWidth="8" strokeLinecap="round" fill="none" />

    {/* Right Ovary & Tube */}
    <circle cx="98" cy="36" r="7" fill="#FFA6CB" stroke="#FF77AD" strokeWidth="1.5" />
    <path d="M96 36 C86 24 72 32 64 46" stroke="url(#uterusCharGrad)" strokeWidth="8" strokeLinecap="round" fill="none" />

    {/* Main Uterus Body */}
    <path
      d="M58 36 C42 36 34 48 36 64 C38 78 48 88 58 88 C68 88 78 78 80 64 C82 48 74 36 58 36 Z"
      fill="url(#uterusCharGrad)"
      filter="drop-shadow(0 4px 8px rgba(244,63,143,0.3))"
    />
    {/* Lower Cervix Ridges */}
    <path d="M50 74 Q58 78 66 74" stroke="#9E1145" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
    <path d="M52 80 Q58 84 64 80" stroke="#9E1145" strokeWidth="2" strokeLinecap="round" opacity="0.4" />

    {/* Cute Uterus Face */}
    <circle cx="48" cy="56" r="3" fill="#2E1065" />
    <circle cx="68" cy="56" r="3" fill="#2E1065" />
    <circle cx="49" cy="55" r="1" fill="#FFFFFF" />
    <circle cx="69" cy="55" r="1" fill="#FFFFFF" />
    {/* Rosy Blush */}
    <ellipse cx="44" cy="62" rx="4" ry="2.5" fill="#FDA4AF" />
    <ellipse cx="72" cy="62" rx="4" ry="2.5" fill="#FDA4AF" />
    {/* Happy Smile */}
    <path d="M54 62 Q58 67 62 62" stroke="#2E1065" strokeWidth="2" strokeLinecap="round" />

    {/* Little Uterus Hands */}
    {/* Waving Left Hand */}
    <path d="M36 58 C28 52 24 46 22 42" stroke="#2E1065" strokeWidth="2" strokeLinecap="round" />
    <circle cx="21" cy="41" r="2.5" fill="#2E1065" />
    {/* Right Hand Holding Companion Hand */}
    <path d="M78 64 C86 68 92 70 96 72" stroke="#2E1065" strokeWidth="2" strokeLinecap="round" />

    {/* Little Uterus Feet */}
    <path d="M50 88 L48 98" stroke="#2E1065" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M66 88 L68 98" stroke="#2E1065" strokeWidth="2.5" strokeLinecap="round" />

    {/* Adorable Smiling Blood Droplet Buddy beside Uterus */}
    <g transform="translate(10, 8)">
      <path
        d="M95 50 C95 50 78 66 78 78 C78 88 85.6 96 95 96 C104.4 96 112 88 112 78 C112 66 95 50 95 50 Z"
        fill="url(#bloodBuddyGrad)"
        filter="drop-shadow(0 3px 6px rgba(190,18,60,0.3))"
      />
      {/* Droplet Face */}
      <circle cx="90" cy="74" r="2.2" fill="#2E1065" />
      <circle cx="100" cy="74" r="2.2" fill="#2E1065" />
      <circle cx="91" cy="73" r="0.8" fill="#FFFFFF" />
      <circle cx="101" cy="73" r="0.8" fill="#FFFFFF" />
      <ellipse cx="87" cy="78" rx="2.5" ry="1.5" fill="#FFA0CA" />
      <ellipse cx="103" cy="78" rx="2.5" ry="1.5" fill="#FFA0CA" />
      <path d="M93 78 Q95 81 97 78" stroke="#2E1065" strokeWidth="1.4" strokeLinecap="round" />
      {/* Droplet glossy highlight */}
      <path d="M84 66 C82 70 82 74 83 78" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
      {/* Droplet Feet */}
      <path d="M90 96 L88 102" stroke="#2E1065" strokeWidth="2" strokeLinecap="round" />
      <path d="M100 96 L102 102" stroke="#2E1065" strokeWidth="2" strokeLinecap="round" />
    </g>
  </svg>
);

// ==========================================
// 7. 3D Girl with Hot Water Bottle for Status Card (Menstruation Phase)
// ==========================================
export const Visual3DStatusCardGirl: React.FC<{ className?: string }> = ({ className = 'w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48' }) => (
  <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className} filter drop-shadow-md select-none shrink-0`}>
    <defs>
      <radialGradient id="girlStatusAura" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFE4F1" />
        <stop offset="60%" stopColor="#FFF0F6" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="girlStatusHair" x1="50" y1="15" x2="110" y2="80" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#5C3A21" />
        <stop offset="60%" stopColor="#432210" />
        <stop offset="100%" stopColor="#2A1408" />
      </linearGradient>
      <linearGradient id="girlStatusSkin" x1="60" y1="30" x2="100" y2="80" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFF0E6" />
        <stop offset="60%" stopColor="#FCD5B5" />
        <stop offset="100%" stopColor="#F7C6A0" />
      </linearGradient>
      <linearGradient id="girlTopGrad" x1="50" y1="65" x2="110" y2="105" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFA0CA" />
        <stop offset="50%" stopColor="#F472B6" />
        <stop offset="100%" stopColor="#EC4899" />
      </linearGradient>
      <linearGradient id="girlPantsGrad" x1="40" y1="100" x2="120" y2="145" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#E9D5FF" />
        <stop offset="50%" stopColor="#C084FC" />
        <stop offset="100%" stopColor="#A855F7" />
      </linearGradient>
      <linearGradient id="hotWaterGrad" x1="65" y1="75" x2="95" y2="115" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FF4B8B" />
        <stop offset="50%" stopColor="#E11D48" />
        <stop offset="100%" stopColor="#BE123C" />
      </linearGradient>
    </defs>

    {/* Radiant Aura */}
    <circle cx="80" cy="80" r="70" fill="url(#girlStatusAura)" />

    {/* Floating Hearts Above Her Head */}
    <path d="M60 22 C60 17 65 13 69 17 C73 13 78 17 78 22 C78 28 69 33 69 33 C69 33 60 28 60 22 Z" fill="#FFA0CA" />
    <path d="M82 14 C82 10 86 7 89 10 C92 7 96 10 96 14 C96 19 89 23 89 23 C89 23 82 19 82 14 Z" fill="#F43F8F" />
    <path d="M100 24 C100 20 103 17 106 19 C109 17 112 20 112 24 C112 28 106 32 106 32 C106 32 100 28 100 24 Z" fill="#FDA4AF" />

    {/* Hair Top Bun with Bow/Tie */}
    <circle cx="80" cy="32" r="14" fill="url(#girlStatusHair)" />
    <path d="M72 32 C74 26 86 26 88 32 Z" fill="#FFA0CA" />

    {/* Back Hair */}
    <ellipse cx="80" cy="54" rx="20" ry="18" fill="url(#girlStatusHair)" />

    {/* Neck */}
    <rect x="75" y="58" width="10" height="10" rx="4" fill="url(#girlStatusSkin)" />

    {/* Head */}
    <ellipse cx="80" cy="50" rx="17" ry="18" fill="url(#girlStatusSkin)" />

    {/* Front Hair Bangs & Side tendrils */}
    <path
      d="M63 44 C67 34 93 34 97 44 C91 38 84 37 80 40 C76 37 69 38 63 44 Z"
      fill="url(#girlStatusHair)"
    />
    <path d="M63 42 C61 52 63 64 65 68" stroke="#432210" strokeWidth="3" strokeLinecap="round" />
    <path d="M97 42 C99 52 97 64 95 68" stroke="#432210" strokeWidth="3" strokeLinecap="round" />

    {/* Sweet Closed Eyes */}
    <path d="M69 49 Q73 53 77 49" stroke="#321A08" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    <path d="M83 49 Q87 53 91 49" stroke="#321A08" strokeWidth="1.8" strokeLinecap="round" fill="none" />

    {/* Rosy Blush */}
    <ellipse cx="68" cy="56" rx="4.5" ry="2.5" fill="#FB7185" fillOpacity="0.7" />
    <ellipse cx="92" cy="56" rx="4.5" ry="2.5" fill="#FB7185" fillOpacity="0.7" />

    {/* Soft Smile */}
    <path d="M77 58 Q80 61 83 58" stroke="#BE123C" strokeWidth="1.5" strokeLinecap="round" />

    {/* Pink Cozy Sweater */}
    <path
      d="M58 68 C64 64 96 64 102 68 L108 98 C108 100 52 100 52 98 Z"
      fill="url(#girlTopGrad)"
      stroke="#FF94C2"
      strokeWidth="1.2"
    />

    {/* Lavender / Lilac Pants (Cross-Legged Position) */}
    <path
      d="M52 98 C40 108 36 126 50 134 C64 140 96 140 110 134 C124 126 120 108 108 98 Z"
      fill="url(#girlPantsGrad)"
      stroke="#D8B4FE"
      strokeWidth="1.2"
    />
    {/* Folded Knees */}
    <ellipse cx="44" cy="120" rx="14" ry="10" transform="rotate(-15 44 120)" fill="url(#girlPantsGrad)" stroke="#C084FC" strokeWidth="1" />
    <ellipse cx="116" cy="120" rx="14" ry="10" transform="rotate(15 116 120)" fill="url(#girlPantsGrad)" stroke="#C084FC" strokeWidth="1" />
    {/* Feet */}
    <ellipse cx="68" cy="136" rx="8" ry="5" fill="#FCD5B5" />
    <ellipse cx="92" cy="136" rx="8" ry="5" fill="#FCD5B5" />

    {/* 3D Coral-Red Hot Water Bottle / Cramp Relief Bag held against belly */}
    <g transform="translate(0, -2)">
      {/* Bottle Plug / Neck */}
      <rect x="76" y="72" width="8" height="6" rx="2" fill="#BE185D" stroke="#FFA0CA" strokeWidth="1" />
      {/* Main Bag Body */}
      <path
        d="M67 78 C67 78 72 76 80 76 C88 76 93 78 93 78 C97 82 98 96 96 102 C94 108 88 112 80 112 C72 112 66 108 64 102 C62 96 63 82 67 78 Z"
        fill="url(#hotWaterGrad)"
        stroke="#FF94C2"
        strokeWidth="1.5"
        filter="drop-shadow(0 4px 8px rgba(190,18,60,0.3))"
      />
      {/* Textured Grip Ridges on Hot Water Bottle */}
      <line x1="70" y1="84" x2="90" y2="84" stroke="#FFFFFF" strokeWidth="1" opacity="0.4" />
      <line x1="68" y1="90" x2="92" y2="90" stroke="#FFFFFF" strokeWidth="1" opacity="0.4" />
      <line x1="68" y1="96" x2="92" y2="96" stroke="#FFFFFF" strokeWidth="1" opacity="0.4" />
      <line x1="70" y1="102" x2="90" y2="102" stroke="#FFFFFF" strokeWidth="1" opacity="0.4" />
    </g>

    {/* Both Arms Wrapped Comfortably Around the Hot Water Bottle */}
    <path
      d="M56 74 C50 88 56 102 68 104 C74 105 78 102 78 98"
      stroke="url(#girlTopGrad)"
      strokeWidth="9"
      strokeLinecap="round"
    />
    <path
      d="M104 74 C110 88 104 102 92 104 C86 105 82 102 82 98"
      stroke="url(#girlTopGrad)"
      strokeWidth="9"
      strokeLinecap="round"
    />
    {/* Hands overlapping on bottle */}
    <circle cx="74" cy="98" r="5" fill="#FCD5B5" />
    <circle cx="86" cy="98" r="5" fill="#FCD5B5" />
  </svg>
);

// ==========================================
// 8. 3D Calendar with Rich Blooming Floral Bouquet & Floating Hearts (Period Hero Card)
// ==========================================
export const Visual3DPeriodHeroCalendarFloral: React.FC<{ className?: string }> = ({ className = 'w-44 h-40 sm:w-52 sm:h-44 md:w-56 md:h-48' }) => (
  <svg viewBox="0 0 200 170" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className} filter drop-shadow-md select-none shrink-0`}>
    <defs>
      <radialGradient id="heroCalAura" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFE4F1" />
        <stop offset="60%" stopColor="#FFF0F6" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="heroCalBaseGrad" x1="60" y1="30" x2="160" y2="120" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="60%" stopColor="#FFF5FA" />
        <stop offset="100%" stopColor="#FCE7F3" />
      </linearGradient>
      <linearGradient id="heroCalHeader" x1="60" y1="30" x2="160" y2="60" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFA0CA" />
        <stop offset="50%" stopColor="#F472B6" />
        <stop offset="100%" stopColor="#EC4899" />
      </linearGradient>
      <linearGradient id="heroPetalPink" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FFA0CA" />
        <stop offset="50%" stopColor="#F43F8F" />
        <stop offset="100%" stopColor="#9F1239" />
      </linearGradient>
      <linearGradient id="heroPetalLilac" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#F5D0FE" />
        <stop offset="50%" stopColor="#C084FC" />
        <stop offset="100%" stopColor="#7E22CE" />
      </linearGradient>
    </defs>

    {/* Radiant Aura Glow */}
    <circle cx="110" cy="85" r="75" fill="url(#heroCalAura)" />

    {/* Floating Hearts Rising Up */}
    <path d="M50 35 C50 30 55 26 59 30 C63 26 68 30 68 35 C68 41 59 46 59 46 C59 46 50 41 50 35 Z" fill="#F43F8F" />
    <path d="M165 25 C165 21 169 18 172 21 C175 18 179 21 179 25 C179 30 172 34 172 34 C172 34 165 30 165 25 Z" fill="#FFA0CA" />
    <path d="M185 45 C185 41 188 38 191 40 C194 38 197 41 197 45 C197 49 191 53 191 53 C191 53 185 49 185 45 Z" fill="#F472B6" />

    {/* Rich Multi-Layered Blooming Flowers & Foliage on the Left and Bottom */}
    {/* Left Large Blooming Flower */}
    <g transform="translate(10, 60)">
      {/* Outer Petals */}
      <path d="M35 50 C20 30 10 55 25 70 Z" fill="url(#heroPetalLilac)" />
      <path d="M45 55 C45 30 65 35 60 60 Z" fill="url(#heroPetalPink)" />
      <path d="M55 70 C70 55 75 80 50 85 Z" fill="url(#heroPetalLilac)" />
      <path d="M40 80 C25 95 15 75 30 65 Z" fill="url(#heroPetalPink)" />
      <path d="M25 65 C10 80 35 95 45 75 Z" fill="url(#heroPetalLilac)" />
      {/* Flower Center */}
      <circle cx="40" cy="68" r="10" fill="#FFA0CA" stroke="#FFFFFF" strokeWidth="2" />
      <circle cx="40" cy="68" r="6" fill="#F43F8F" />
    </g>

    {/* Right Botanical Petals framing Calendar */}
    <path d="M165 80 C185 65 195 90 175 105 Z" fill="url(#heroPetalPink)" fillOpacity="0.85" />
    <path d="M175 105 C195 95 200 120 180 130 Z" fill="url(#heroPetalLilac)" fillOpacity="0.85" />
    <path d="M155 125 C175 115 180 140 160 145 Z" fill="url(#heroPetalPink)" fillOpacity="0.8" />

    {/* Center 3D Calendar */}
    <g transform="translate(10, 0)">
      {/* Calendar Base Stand */}
      <path d="M64 96 L58 120 L162 120 L156 96 Z" fill="#BE185D" opacity="0.3" />

      {/* Main Calendar Body Sheet */}
      <rect x="68" y="32" width="88" height="84" rx="18" fill="url(#heroCalBaseGrad)" stroke="#FFD1E3" strokeWidth="2.5" filter="drop-shadow(0 6px 16px rgba(236,72,153,0.22))" />

      {/* Header Band */}
      <rect x="68" y="32" width="88" height="26" rx="16" fill="url(#heroCalHeader)" />

      {/* Spiral Binder Rings */}
      <rect x="80" y="22" width="6.5" height="20" rx="3.25" fill="#4C0519" stroke="#FFA0CA" strokeWidth="1.2" />
      <rect x="96" y="22" width="6.5" height="20" rx="3.25" fill="#4C0519" stroke="#FFA0CA" strokeWidth="1.2" />
      <rect x="112" y="22" width="6.5" height="20" rx="3.25" fill="#4C0519" stroke="#FFA0CA" strokeWidth="1.2" />
      <rect x="128" y="22" width="6.5" height="20" rx="3.25" fill="#4C0519" stroke="#FFA0CA" strokeWidth="1.2" />
      <rect x="142" y="22" width="6.5" height="20" rx="3.25" fill="#4C0519" stroke="#FFA0CA" strokeWidth="1.2" />

      {/* Mini Grid Squares with Red Hearts */}
      <g fill="#FCE7F3">
        <rect x="78" y="66" width="10" height="8" rx="2.5" />
        <rect x="94" y="66" width="10" height="8" rx="2.5" />
        <rect x="110" y="66" width="10" height="8" rx="2.5" />
        <rect x="126" y="66" width="10" height="8" rx="2.5" />
        <rect x="140" y="66" width="10" height="8" rx="2.5" />

        <rect x="78" y="80" width="10" height="8" rx="2.5" />
        {/* Heart 1 */}
        <rect x="93" y="79" width="12" height="10" rx="3" fill="#FFE4EF" stroke="#F43F8F" strokeWidth="1.2" />
        <path d="M99 82 C99 80.5 100.5 79.5 101.5 81 C102.5 79.5 104 80.5 104 82 C104 84 101.5 86 101.5 86 C101.5 86 99 84 99 82 Z" fill="#F43F8F" />

        {/* Heart 2 */}
        <rect x="109" y="79" width="12" height="10" rx="3" fill="#FFE4EF" stroke="#F43F8F" strokeWidth="1.2" />
        <path d="M115 82 C115 80.5 116.5 79.5 117.5 81 C118.5 79.5 120 80.5 120 82 C120 84 117.5 86 117.5 86 C117.5 86 115 84 115 82 Z" fill="#F43F8F" />

        {/* Heart 3 */}
        <rect x="125" y="79" width="12" height="10" rx="3" fill="#FFE4EF" stroke="#F43F8F" strokeWidth="1.2" />
        <path d="M131 82 C131 80.5 132.5 79.5 133.5 81 C134.5 79.5 136 80.5 136 82 C136 84 133.5 86 133.5 86 C133.5 86 131 84 131 82 Z" fill="#F43F8F" />

        <rect x="140" y="80" width="10" height="8" rx="2.5" />

        <rect x="78" y="94" width="10" height="8" rx="2.5" />
        <rect x="94" y="94" width="10" height="8" rx="2.5" />
        <rect x="110" y="94" width="10" height="8" rx="2.5" />
        <rect x="126" y="94" width="10" height="8" rx="2.5" />
        <rect x="140" y="94" width="10" height="8" rx="2.5" />
      </g>
    </g>

    {/* Front Lush Floral Bouquet Overlapping Calendar Bottom */}
    <g transform="translate(130, 100)">
      <circle cx="20" cy="20" r="14" fill="url(#heroPetalPink)" />
      <circle cx="20" cy="20" r="10" fill="#FFA0CA" />
      <circle cx="20" cy="20" r="5" fill="#FFFFFF" />
    </g>
  </svg>
);




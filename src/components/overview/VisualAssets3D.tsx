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



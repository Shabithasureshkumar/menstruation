import React, { useState } from 'react';
import { usePatient } from '../../hooks/usePatient';

/** Patient photo with an initials fallback if the image is missing or fails to load. */
export const PatientAvatar: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => {
  const { patient } = usePatient();
  const [failedUrl, setFailedUrl] = useState<string | null>(null);
  const url = patient?.avatarUrl ?? null;
  const initials = (patient?.name ?? '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

  return (
    <div className={`rounded-full overflow-hidden bg-pink-100 border-2 border-white shadow-xs shrink-0 flex items-center justify-center ${className}`}>
      {url && failedUrl !== url ? (
        <img
          src={url}
          alt=""
          width={40}
          height={40}
          onError={() => setFailedUrl(url)}
          className="w-full h-full object-cover object-top select-none"
        />
      ) : (
        <span aria-hidden="true" className="text-[0.7rem] font-bold text-[#C2185B]">
          {initials || '?'}
        </span>
      )}
    </div>
  );
};

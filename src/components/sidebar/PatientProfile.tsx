import React from 'react';
import type { PatientProfileData } from '../../types/dailyLog';
import profile1 from '../../assets/profile 1.png';

interface PatientProfileProps {
  profile: PatientProfileData;
}

export const PatientProfile: React.FC<PatientProfileProps> = ({ profile }) => {
  return (
    <div
      className="w-full rounded-[clamp(1.5rem,2.2vw,2.1rem)] p-[clamp(1rem,1.4vw,1.25rem)] text-white shadow-md flex items-center justify-between relative overflow-hidden transition-all duration-200 hover:shadow-lg"
      style={{
        background: 'linear-gradient(102deg, #E5469D 0%, #FF81B3 100%)',
      }}
    >
      {/* Patient Info */}
      <div className="space-y-1 z-10 min-w-0 pr-2">
        <h3 className="text-lg sm:text-xl md:text-[1.35rem] font-black tracking-tight leading-tight truncate">
          {profile.name}
        </h3>
        <p className="text-xs sm:text-sm font-semibold text-white/95 leading-tight truncate">
          Gender:{profile.gender}
        </p>
        <p className="text-xs sm:text-sm font-normal text-white/90 leading-tight">
          Age:{profile.age}
        </p>
      </div>

      {/* Patient Avatar Photo */}
      <div className="w-[clamp(3.75rem,5vw,4.5rem)] h-[clamp(3.75rem,5vw,4.5rem)] rounded-full border-2 border-white/80 p-0.5 shadow-md shrink-0 overflow-hidden bg-white/20 z-10">
        <img
          src={profile1}
          alt={profile.name}
          className="w-full h-full object-cover rounded-full"
        />
      </div>

      {/* Subtle decorative glow */}
      <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-white/10 blur-xl pointer-events-none" />
    </div>
  );
};

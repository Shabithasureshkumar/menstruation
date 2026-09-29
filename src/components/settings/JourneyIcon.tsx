import React from 'react';
import { Heart, ShieldCheck, Sparkles } from 'lucide-react';
import type { JourneyOption } from './JourneyOptions';

export const JourneyIcon: React.FC<{ icon: JourneyOption['icon']; className?: string }> = ({ icon, className = 'w-5 h-5' }) => {
  if (icon === 'heart') return <Heart className={`${className} fill-current`} aria-hidden="true" />;
  if (icon === 'shield') return <ShieldCheck className={className} aria-hidden="true" />;
  return <Sparkles className={className} aria-hidden="true" />;
};

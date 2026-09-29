import React from 'react';
import type { MetricCardData } from '../../types/cycleTracker';
import { MetricCard } from './MetricCard';

interface SixMetricCardsProps {
  metrics: MetricCardData[];
  onCardClick: (metricId: string) => void;
}

export const SixMetricCards: React.FC<SixMetricCardsProps> = ({ metrics, onCardClick }) => (
  <ul aria-label="Today at a glance" className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
    {metrics.map((card) => (
      <li key={card.id} className="flex">
        <MetricCard card={card} onClick={() => onCardClick(card.id)} />
      </li>
    ))}
  </ul>
);

import React from 'react';
import type { MetricCardData } from '../../types/cycleTracker';
import { MetricCard } from './MetricCard';

interface SixMetricCardsProps {
  metrics: MetricCardData[];
  onCardClick: (metricId: string) => void;
}

export const SixMetricCards: React.FC<SixMetricCardsProps> = ({ metrics, onCardClick }) => {
  if (metrics.length === 7) {
    const topRow = metrics.slice(0, 3);
    const bottomRow = metrics.slice(3, 7);

    return (
      <div aria-label="Today at a glance" className="w-full space-y-4 sm:space-y-5">
        <ul className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {topRow.map((card) => (
            <li key={card.id} className="flex">
              <MetricCard card={card} onClick={() => onCardClick(card.id)} />
            </li>
          ))}
        </ul>

        <ul className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {bottomRow.map((card) => (
            <li key={card.id} className="flex">
              <MetricCard card={card} onClick={() => onCardClick(card.id)} />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <ul aria-label="Today at a glance" className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
      {metrics.map((card) => (
        <li key={card.id} className="flex">
          <MetricCard card={card} onClick={() => onCardClick(card.id)} />
        </li>
      ))}
    </ul>
  );
};

import React from 'react';
import { Droplet, Pill } from 'lucide-react';
import type {
  BloodColor,
  BloodFlow,
  ClotSize,
  CrampSeverity,
  EnergyLevel,
  ProductsUsed as ProductsUsedType,
} from '../../types/dailyLog';
import { BloodFlowSelector } from './BloodFlowSelector';
import { CrampsLevel } from './CrampsLevel';
import { ProductsUsed } from './ProductsUsed';
import { BloodColorSelector } from './BloodColorSelector';
import { BloodClotsCard } from './BloodClotsCard';
import { EnergyLevelCard } from './EnergyLevelCard';
import { ToggleFeatureCard } from './ToggleFeatureCard';
import { AiInsightCard } from './AiInsightCard';

interface MenstruationPhaseCardProps {
  formattedDate: string;
  bloodFlow: BloodFlow;
  crampsScore: number;
  crampsSeverity: CrampSeverity;
  productsUsed: ProductsUsedType;
  bloodColor: BloodColor;
  clotsPresent: boolean;
  clotSize?: ClotSize;
  energyLevel: EnergyLevel;
  medicationActive: boolean;
  medicationName: string;
  aiInsight: {
    title: string;
    description: string;
  };
  onSelectFlow: (flow: BloodFlow) => void;
  onSelectCrampsSeverity: (sev: CrampSeverity) => void;
  onUpdateProductCount: (product: keyof ProductsUsedType, delta: number) => void;
  onSelectBloodColor: (color: BloodColor) => void;
  onSelectEnergyLevel: (level: EnergyLevel) => void;
  onToggleClots: () => void;
  onSelectClotSize: (size: ClotSize) => void;
  onToggleMedication: () => void;
}

export const MenstruationPhaseCard: React.FC<MenstruationPhaseCardProps> = ({
  formattedDate,
  bloodFlow,
  crampsScore,
  crampsSeverity,
  productsUsed,
  bloodColor,
  clotsPresent,
  clotSize,
  energyLevel,
  medicationActive,
  medicationName,
  aiInsight,
  onSelectFlow,
  onSelectCrampsSeverity,
  onUpdateProductCount,
  onSelectBloodColor,
  onSelectEnergyLevel,
  onToggleClots,
  onSelectClotSize,
  onToggleMedication,
}) => {
  return (
    <section className="w-full bg-[#FFDEE9] rounded-[clamp(1.5rem,2.5vw,2rem)] p-[clamp(1.25rem,2vw,2rem)] border border-[#EBE6EC] shadow-sm relative transition-all">
      {/* Header */}
      <div className="flex items-center gap-3.5 mb-6">
        <div className="w-11 h-11 rounded-2xl bg-white/70 backdrop-blur-md flex items-center justify-center text-pink-500 shadow-xs border border-white/80 shrink-0">
          <Droplet className="w-5 h-5 fill-pink-500 text-pink-500" />
        </div>
        <div>
          <h2 className="text-[clamp(1.25rem,1.8vw,1.5rem)] font-bold text-[#26214E] tracking-tight leading-none">
            Menstruation Phase
          </h2>
          <p className="text-xs sm:text-sm text-[#716D8D] font-medium mt-1">
            {formattedDate}
          </p>
        </div>
      </div>

      {/* Grid of Section Cards */}
      <div className="grid grid-cols-12 gap-3.5 sm:gap-4">
        {/* Row 1: Blood Flow (7 cols) + Cramps Level (5 cols) */}
        <div className="col-span-12 lg:col-span-7 flex">
          <BloodFlowSelector
            currentFlow={bloodFlow}
            onSelectFlow={onSelectFlow}
          />
        </div>

        <div className="col-span-12 lg:col-span-5 flex">
          <CrampsLevel
            score={crampsScore}
            severity={crampsSeverity}
            onSelectSeverity={onSelectCrampsSeverity}
          />
        </div>

        {/* Row 2: Products Used (5 cols) + Blood Color (7 cols) */}
        <div className="col-span-12 lg:col-span-5 flex">
          <ProductsUsed
            products={productsUsed}
            onUpdateCount={onUpdateProductCount}
          />
        </div>

        <div className="col-span-12 lg:col-span-7 flex">
          <BloodColorSelector
            currentColor={bloodColor}
            onSelectColor={onSelectBloodColor}
          />
        </div>

        {/* Row 3: Blood Clots with Size (4 cols) + Energy Level (4 cols) + Medication (4 cols) */}
        <div className="col-span-12 sm:col-span-6 lg:col-span-4 flex">
          <BloodClotsCard
            clotsPresent={clotsPresent}
            clotSize={clotSize}
            onToggleClots={onToggleClots}
            onSelectClotSize={onSelectClotSize}
          />
        </div>

        <div className="col-span-12 sm:col-span-6 lg:col-span-4 flex">
          <EnergyLevelCard
            energyLevel={energyLevel}
            onSelectEnergyLevel={onSelectEnergyLevel}
          />
        </div>

        <div className="col-span-12 sm:col-span-12 lg:col-span-4 flex">
          <ToggleFeatureCard
            title="Medication"
            subtitle={medicationName}
            isActive={medicationActive}
            onToggle={onToggleMedication}
            iconBgColor="bg-[#F9ACB1]"
            activeToggleColor="bg-[#F43F5E]"
            icon={<Pill className="w-4 h-4 text-white" />}
          />
        </div>

        {/* Row 4: AI Insight (12 cols) */}
        <div className="col-span-12 flex">
          <AiInsightCard
            title={aiInsight.title}
            description={aiInsight.description}
          />
        </div>
      </div>
    </section>
  );
};

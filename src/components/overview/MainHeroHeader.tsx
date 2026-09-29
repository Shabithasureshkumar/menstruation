import React from 'react';
import calendarImg from '../../assets/calendar-illustration.webp';
import { usePatient } from '../../hooks/usePatient';
import { useSettings } from '../../hooks/useSettings';
import { getBmi } from '../../types/identity';

export const MainHeroHeader: React.FC = () => {
  const { patient, status, retry } = usePatient();
  const { settings } = useSettings();
  const bmi = patient ? getBmi(patient) : null;

  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-5 lg:gap-8">
      {/* Branding */}
      <div className="w-full md:flex-1 min-w-0 flex items-center gap-3.5 sm:gap-4 lg:gap-5 text-left">
        <div className="w-[72px] h-[72px] sm:w-24 sm:h-24 lg:w-[116px] lg:h-[104px] shrink-0 flex items-center justify-center">
          <img
            src={calendarImg}
            alt=""
            width={116}
            height={104}
            className="max-w-full max-h-full w-auto h-auto object-contain drop-shadow-md select-none"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center">
            <span className="text-xs sm:text-sm font-extrabold tracking-[0.2em] text-[#F43F8F] uppercase">Period</span>
            <span className="w-12 sm:w-[96px] h-[3px] bg-[#F43F8F] rounded-full" aria-hidden="true" />
          </div>
          <h1 className="mt-1 text-[1.75rem] sm:text-[2.25rem] lg:text-[2.6rem] font-extrabold text-[#17152B] tracking-tight leading-[1.1]">
            Cycle <span className="text-[#F43F8F]">Tracker</span>
          </h1>
          <p className="mt-1.5 text-sm sm:text-base text-[#5F6475] font-normal leading-snug">
            Understand your body, one day at a time.
          </p>
        </div>
      </div>

      {/* Patient card: fluid width, auto height; the photo bleeds to the card edge */}
      <section
        aria-label="Patient details"
        className="relative w-full md:w-[300px] lg:w-[304px] shrink-0 min-h-[112px] rounded-[20px] text-white overflow-hidden shadow-[0_12px_30px_rgba(236,72,153,0.28)]"
        style={{ background: 'linear-gradient(105deg, #E3338F 0%, #EC4899 55%, #F472B6 100%)' }}
      >
        {/* Soft circle behind the portrait */}
        <span aria-hidden="true" className="absolute -right-6 top-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-white/15" />

        {status === 'error' ? (
          <div className="relative p-4 pr-[112px] text-left">
            <p className="text-sm font-bold">Patient details unavailable</p>
            <button type="button" onClick={retry} className="mt-1 min-h-[44px] px-4 rounded-full bg-white/20 hover:bg-white/30 text-xs font-bold cursor-pointer">
              Retry
            </button>
          </div>
        ) : (
          <div className="relative py-3 pl-4 pr-[112px] text-left min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-[17px] font-bold tracking-tight leading-tight text-white break-words">
                {patient?.name ?? 'Jimmy Alexa'}
              </h2>
            </div>
            {patient && (
              <dl className="mt-1 text-[11px] text-white/95 leading-[1.5] font-medium">
                <div>
                  <dt className="inline">Age: </dt>
                  <dd className="inline">{patient.ageYears} • {patient.gender}</dd>
                </div>
                <div>
                  <dt className="inline">Height: </dt>
                  <dd className="inline">{patient.heightCm} cm</dd>
                  <span aria-hidden="true"> • </span>
                  <dt className="inline">Weight: </dt>
                  <dd className="inline">{patient.weightKg} kg</dd>
                </div>
                <div>
                  <dt className="inline">Cycle Length: </dt>
                  <dd className="inline">{settings.cycleLength} days (avg)</dd>
                </div>
                {bmi !== null && (
                  <div>
                    <dt className="inline">BMI : </dt>
                    <dd className="inline">{bmi}</dd>
                  </div>
                )}
              </dl>
            )}
          </div>
        )}

        {patient?.avatarUrl && (
          <img
            src={patient.avatarUrl}
            alt={`Photo of ${patient.name}`}
            width={104}
            height={112}
            className="absolute right-0 bottom-0 h-full w-[104px] object-cover object-top select-none"
          />
        )}
      </section>
    </div>
  );
};

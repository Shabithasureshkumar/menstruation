/**
 * DEMO assistant: deterministic keyword rules over the patient's own saved data.
 * It is not an AI model, and the UI labels it "Demo · rule-based". Like the
 * backend, it reads data server-side; the client sends only the question.
 */
import { formatDate, formatTime, toIsoDateTime } from '../../lib/date';
import type { DateOnly } from '../../lib/date';
import { SYMPTOMS, formatDose } from '../../types/dailyLog';
import type { DailyLogEntry, MedicationEntry } from '../../types/dailyLog';
import type { CycleSummary } from '../../types/cycle';
import type { AssistantApi } from '../api/assistantApi';
import { ApiError } from '../api/client';
import { readLogs, readMedications, readSettings } from './demoStore';
import { getCycleSummary } from './localCycleEngine';

const DISCLAIMER = 'This is general wellness information, not a medical diagnosis.';

interface Context {
  log: DailyLogEntry | null;
  meds: MedicationEntry[];
  cycle: CycleSummary | null;
}

function loadContext(date: DateOnly): Context {
  const s = readSettings();
  return {
    log: readLogs()[date] ?? null,
    meds: readMedications().filter((m) => m.date === date),
    cycle: s.lastPeriodDate
      ? getCycleSummary({ periodStartDate: s.lastPeriodDate, cycleLength: s.cycleLength, periodDuration: s.periodDuration }, date)
      : null,
  };
}

function describeLog(log: DailyLogEntry | null, meds: MedicationEntry[]): string {
  if (!log && meds.length === 0) return "You haven't saved a log for today yet.";
  const lines: string[] = [];
  if (log?.flow) lines.push(`• Flow: ${log.flow}`);
  if (log?.bloodColor) lines.push(`• Blood color: ${log.bloodColor}`);
  if (log?.cramps) lines.push(`• Cramps: ${log.cramps}`);
  if (log && log.painScore !== null) lines.push(`• Pain score: ${log.painScore}/10`);
  if (log && log.clotsPresent !== null) lines.push(`• Clots: ${log.clotsPresent ? `Yes${log.clotSize ? ` (${log.clotSize})` : ''}` : 'No'}`);
  if (log?.mood) lines.push(`• Mood: ${log.mood}`);
  if (log?.energy) lines.push(`• Energy: ${log.energy}`);
  if (log && log.symptoms.length > 0) lines.push(`• Symptoms: ${log.symptoms.map((s) => SYMPTOMS.find((x) => x.id === s)?.label ?? s).join(', ')}`);
  if (log && log.products.length > 0)
    lines.push(`• Products: ${log.products.map((p) => `${p.label || p.type}${p.size ? ` (${p.size})` : ''} ×${p.quantity}`).join(', ')}`);
  for (const m of meds) lines.push(`• ${m.name} ${formatDose(m)} at ${formatTime(m.time)} — ${m.status}`);
  return lines.length > 0 ? lines.join('\n') : "Today's log is saved but has no values recorded.";
}

function answerLocally(question: string, ctx: Context): string {
  const q = question.toLowerCase();
  const { log, cycle } = ctx;
  const cycleLine = cycle
    ? `Based on your settings, today is estimated as cycle day ${cycle.currentCycleDay} of ${cycle.cycleLength} (${cycle.currentPhase}).`
    : 'Add your last period date in Settings to see where you are in your cycle.';

  if (/what did i log|summary|my log|logged today/.test(q)) return `Here is what you have saved for today:\n${describeLog(log, ctx.meds)}`;
  if (/cramp|pain|ache/.test(q)) {
    const recorded = log?.cramps ? `You recorded ${log.cramps.toLowerCase()} cramps today. ` : 'You have not recorded cramps today. ';
    return `${recorded}Heat, gentle movement, rest and hydration often help. If pain is severe, unusual for you, or getting worse, contact a healthcare professional. ${DISCLAIMER}`;
  }
  if (/flow|bleed|blood|period/.test(q)) {
    const recorded = log?.flow ? `Your saved flow for today is ${log.flow.toLowerCase()}. ` : 'You have not recorded flow today. ';
    return `${recorded}${cycleLine} If you soak through a pad or tampon every hour for several hours, or pass clots larger than a coin, contact a healthcare provider. ${DISCLAIMER}`;
  }
  if (/tired|energy|fatigue|sleep/.test(q)) {
    const recorded = log?.energy ? `You recorded ${log.energy.toLowerCase()} energy today. ` : 'You have not recorded energy today. ';
    return `${recorded}Energy often dips around menstruation. Regular sleep, iron-rich meals and gentle activity can help. ${DISCLAIMER}`;
  }
  if (/mood|feel|sad|irritable|anxious|calm/.test(q)) {
    const recorded = log?.mood ? `Your saved mood today is "${log.mood}". ` : 'You have not recorded a mood today. ';
    return `${recorded}Hormonal changes across the cycle can affect mood. Rest, movement and talking to someone you trust can help. ${DISCLAIMER}`;
  }
  if (/eat|food|diet|nutrition|craving/.test(q)) {
    return `Iron-rich foods (leafy greens, lentils, beans, lean protein), magnesium sources (nuts, seeds) and plenty of fluids are commonly recommended during a period. ${DISCLAIMER}`;
  }
  if (/cycle|phase|ovulat|fertile/.test(q)) {
    if (!cycle) return cycleLine;
    return `${cycleLine}\nNext period (estimate): ${formatDate(cycle.nextPeriodDate, 'long')}.\nFertile window (estimate): ${formatDate(cycle.fertileWindow.start, 'short')} – ${formatDate(cycle.fertileWindow.end, 'short')}.\nEstimates come from the cycle length and last period date in Settings.`;
  }
  if (/medic|pill|tablet|ibuprofen/.test(q)) {
    if (ctx.meds.length === 0) return 'No medications are logged for today.';
    return `Medications logged today:\n${ctx.meds.map((m) => `• ${m.name} ${formatDose(m)} at ${formatTime(m.time)} — ${m.status}`).join('\n')}\nAlways follow your prescriber's directions.`;
  }
  return `I can answer questions about your saved log, cramps, flow, energy, mood, nutrition, medications and your cycle estimate. ${cycleLine}`;
}

export const demoAssistantApi: AssistantApi = {
  async sendMessage(input, signal) {
    if (signal?.aborted) throw new ApiError('aborted', 'The request was cancelled.');
    const message = input.message.trim();
    if (!message || message.length > 300) throw new ApiError('validation_error', 'Ask a question of up to 300 characters.', 422);
    return { reply: answerLocally(message, loadContext(input.date)), createdAt: toIsoDateTime() };
  },
};

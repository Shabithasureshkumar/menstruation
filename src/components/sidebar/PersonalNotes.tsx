import React from 'react';

interface PersonalNotesProps {
  note: string;
  onChangeNote: (note: string) => void;
  onSaveNote: () => void;
}

export const PersonalNotes: React.FC<PersonalNotesProps> = ({
  note,
  onChangeNote,
  onSaveNote,
}) => {
  return (
    <div className="w-full space-y-2.5">
      <div>
        <h3 className="text-[0.98rem] font-bold text-[#1F2937] tracking-tight">
          Personal Notes
        </h3>
        <p className="text-xs text-[#9CA3AF] mt-0.5">
          Add your thoughts for today
        </p>
      </div>

      <div className="space-y-2">
        <textarea
          rows={3}
          value={note}
          maxLength={300}
          onChange={(e) => onChangeNote(e.target.value)}
          placeholder="Example: Today I felt nauseous after eating lunch."
          className="w-full p-3 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-pink-400 focus:bg-white resize-none transition-all"
        />

        <div className="flex items-center justify-between">
          <span className="text-xs text-[#9CA3AF] tabular-nums font-medium">
            {note.length} / 300
          </span>
        </div>

        <button
          type="button"
          onClick={onSaveNote}
          className="w-full py-2.5 px-4 rounded-2xl bg-[#EA33A1] hover:bg-[#d8218f] text-white text-sm font-semibold tracking-tight shadow-md hover:shadow-lg transition-all active:scale-[0.99] cursor-pointer"
        >
          Save Note
        </button>
      </div>
    </div>
  );
};

"use client";

interface InstrumentTypeSelectorProps {
  instrumentType: "GUITAR" | "DRUM";
  onInstrumentTypeChange: (type: "GUITAR" | "DRUM") => void;
  availableTypes?: ("GUITAR" | "DRUM")[];
  className?: string;
}

export const instrumentLabels: Record<string, string> = {
  GUITAR: "GUITAR",
  BASS: "BASS",
  DRUM: "DRUM",
  OPEN: "OPEN",
};

export function InstrumentTypeSelector({
  instrumentType,
  onInstrumentTypeChange,
  availableTypes = ["GUITAR", "DRUM"],
  className = "",
}: InstrumentTypeSelectorProps) {
  return (
    <div className={`mb-6 flex gap-2 ${className}`}>
      {availableTypes.map((type) => (
        <button
          key={type}
          onClick={() => onInstrumentTypeChange(type)}
          className={`px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${
            instrumentType === type
              ? type === "GUITAR"
                ? "bg-[#ff7c88] text-white"
                : "bg-[#007070] text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          {instrumentLabels[type]}
        </button>
      ))}
    </div>
  );
}

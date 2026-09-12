"use client";

import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  /** Debounce delay (ms) before onChange fires, so we don't refetch on every keystroke. */
  debounceMs?: number;
}

/** Debounced search box used above data tables. */
export function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  debounceMs = 350,
}: SearchInputProps) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (localValue !== value) onChange(localValue);
    }, debounceMs);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localValue]);

  return (
    <label className="input input-bordered flex w-full max-w-xs items-center gap-2">
      <Search size={16} className="text-base-content/40" />
      <input
        type="text"
        className="grow"
        placeholder={placeholder}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
      />
      {localValue && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => {
            setLocalValue("");
            onChange("");
          }}
        >
          <X size={14} className="text-base-content/40" />
        </button>
      )}
    </label>
  );
}

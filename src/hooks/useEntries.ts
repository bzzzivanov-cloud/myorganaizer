import { useEffect, useState } from 'react';
import type { Entry } from '@/types';

const STORAGE_KEY = 'organizer-entries-v1';

function load(): Entry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (e) =>
        e &&
        typeof e.id === 'string' &&
        typeof e.text === 'string' &&
        typeof e.block === 'number' &&
        typeof e.createdAt === 'number' &&
        typeof e.done === 'boolean'
    );
  } catch {
    return [];
  }
}

export function useEntries() {
  const [entries, setEntries] = useState<Entry[]>(load);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch {
      // ignore quota errors
    }
  }, [entries]);

  const addEntry = (text: string, block: number) => {
    const entry: Entry = {
      id:
        typeof crypto !== 'undefined' && 'randomUUID' in crypto
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      text,
      block,
      createdAt: Date.now(),
      done: false,
    };
    setEntries((prev) => [entry, ...prev]);
  };

  const toggleDone = (id: string) => {
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, done: !e.done } : e))
    );
  };

  const removeEntry = (id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  const updateEntry = (id: string, text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, text: trimmed } : e))
    );
  };

  const moveEntry = (id: string, block: number) => {
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, block } : e))
    );
  };

  return { entries, addEntry, toggleDone, removeEntry, updateEntry, moveEntry };
}

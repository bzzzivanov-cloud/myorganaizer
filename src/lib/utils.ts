import type { Entry } from '@/types';

export function parseEntry(raw: string): { block: number; text: string } | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  const last = trimmed[trimmed.length - 1];
  let block = 6;
  let text = trimmed;

  if (last >= '1' && last <= '6') {
    block = Number(last);
    text = trimmed.slice(0, -1).trim();
  }

  if (!text) return null;
  return { block, text };
}

export function formatDate(ts: number): string {
  return new Date(ts).toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function sortEntries(entries: Entry[]): Entry[] {
  return [...entries].sort((a, b) => b.createdAt - a.createdAt);
}

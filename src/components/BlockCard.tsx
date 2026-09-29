import type { BlockConfig } from '@/constants';
import { BLOCKS } from '@/constants';
import type { Entry } from '@/types';
import { sortEntries } from '@/lib/utils';
import { EntryItem } from '@/components/EntryItem';

interface BlockCardProps {
  block: BlockConfig;
  entries: Entry[];
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onMove: (id: string, block: number) => void;
}

export function BlockCard({ block, entries, onToggle, onRemove, onEdit, onMove }: BlockCardProps) {
  const sorted = sortEntries(entries);
  const activeCount = entries.filter((e) => !e.done).length;

  return (
    <section className="flex flex-col rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/80 transition hover:shadow-md">
      <div className={`h-1.5 w-full rounded-t-2xl ${block.accentDot}`} />
      <header
        className={`flex items-center justify-between gap-2 px-5 py-4 ${block.accentBg}`}
      >
        <div className="flex min-w-0 items-center gap-2">
          <span className="text-xl leading-none">{block.emoji}</span>
          <h2
            className={`truncate text-sm font-semibold ${block.accentText} sm:text-base`}
          >
            {block.title}
          </h2>
          {block.subtitle && (
            <span className={`shrink-0 text-[11px] font-medium ${block.accentText} opacity-70`}>
              {block.subtitle}
            </span>
          )}
          {block.tag && (
            <span
              className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${block.accentBadge}`}
            >
              {block.tag}
            </span>
          )}
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${block.accentBadge}`}
          title={`Активных: ${activeCount}`}
        >
          {entries.length}
        </span>
      </header>
      <div className="flex flex-1 flex-col gap-2 p-3">
        {sorted.length === 0 ? (
          <p className="py-8 text-center text-sm text-slate-300">
            Здесь пока пусто
          </p>
        ) : (
          sorted.map((entry) => (
            <EntryItem
              key={entry.id}
              entry={entry}
              blocks={BLOCKS}
              onToggle={onToggle}
              onRemove={onRemove}
              onEdit={onEdit}
              onMove={onMove}
            />
          ))
        )}
      </div>
    </section>
  );
}

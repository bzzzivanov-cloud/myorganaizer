import { useState, useRef, useEffect } from 'react';
import { Check, X, Pencil, ArrowRightLeft } from 'lucide-react';
import type { Entry } from '@/types';
import type { BlockConfig } from '@/constants';
import { formatDate } from '@/lib/utils';

interface EntryItemProps {
  entry: Entry;
  blocks: BlockConfig[];
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onMove: (id: string, block: number) => void;
}

export function EntryItem({ entry, blocks, onToggle, onRemove, onEdit, onMove }: EntryItemProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(entry.text);
  const [moveOpen, setMoveOpen] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const moveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(
        inputRef.current.value.length,
        inputRef.current.value.length
      );
      const el = inputRef.current;
      el.style.height = 'auto';
      el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
    }
  }, [editing]);

  useEffect(() => {
    if (!moveOpen) return;
    const handler = (e: MouseEvent) => {
      if (moveRef.current && !moveRef.current.contains(e.target as Node)) {
        setMoveOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [moveOpen]);

  const startEdit = () => {
    setDraft(entry.text);
    setEditing(true);
  };

  const cancelEdit = () => {
    setDraft(entry.text);
    setEditing(false);
  };

  const saveEdit = () => {
    onEdit(entry.id, draft);
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      saveEdit();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      cancelEdit();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDraft(e.target.value);
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  };

  const handleMove = (blockId: number) => {
    onMove(entry.id, blockId);
    setMoveOpen(false);
  };

  if (editing) {
    return (
      <div className="animate-fade-in-up flex items-start gap-2 rounded-xl bg-white px-3 py-2.5 ring-2 ring-blue-400">
        <textarea
          ref={inputRef}
          value={draft}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          rows={1}
          className="min-h-[36px] flex-1 resize-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm leading-snug text-slate-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        />
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={saveEdit}
            title="Сохранить"
            className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white transition hover:bg-blue-700"
          >
            <Check size={15} />
          </button>
          <button
            type="button"
            onClick={cancelEdit}
            title="Отмена"
            className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={15} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up group flex items-start gap-2 rounded-xl bg-slate-50 px-3 py-2.5 transition hover:bg-slate-100/80">
      <div className="min-w-0 flex-1">
        <p
          className={`break-words text-sm leading-snug ${
            entry.done
              ? 'text-slate-400 line-through'
              : 'text-slate-700'
          }`}
        >
          {entry.text}
        </p>
        <p className="mt-0.5 text-[11px] text-slate-400">
          {formatDate(entry.createdAt)}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-1">
        <div className="relative" ref={moveRef}>
          <button
            type="button"
            onClick={() => setMoveOpen((v) => !v)}
            title="Переместить в блок"
            className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 opacity-0 transition hover:bg-violet-100 hover:text-violet-600 group-hover:opacity-100"
          >
            <ArrowRightLeft size={14} />
          </button>
          {moveOpen && (
            <div className="absolute right-0 top-8 z-50 w-44 overflow-hidden rounded-xl bg-white py-1 shadow-lg ring-1 ring-slate-200">
              {blocks.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => handleMove(b.id)}
                  disabled={b.id === entry.block}
                  className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition ${
                    b.id === entry.block
                      ? 'cursor-default bg-slate-50 text-slate-400'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-base leading-none">{b.emoji}</span>
                  <span className="truncate">{b.title}</span>
                  {b.id === entry.block && (
                    <Check size={13} className="ml-auto shrink-0 text-emerald-500" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={startEdit}
          title="Редактировать"
          className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 opacity-0 transition hover:bg-blue-100 hover:text-blue-600 group-hover:opacity-100"
        >
          <Pencil size={14} />
        </button>
        <button
          type="button"
          onClick={() => onToggle(entry.id)}
          title="Отметить выполненным"
          className={`flex h-7 w-7 items-center justify-center rounded-lg transition ${
            entry.done
              ? 'bg-emerald-500 text-white'
              : 'text-slate-400 hover:bg-emerald-100 hover:text-emerald-600'
          }`}
        >
          <Check size={15} />
        </button>
        <button
          type="button"
          onClick={() => onRemove(entry.id)}
          title="Удалить"
          className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-100 hover:text-red-600"
        >
          <X size={15} />
        </button>
      </div>
    </div>
  );
}

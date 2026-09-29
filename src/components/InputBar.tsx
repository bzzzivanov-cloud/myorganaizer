import { useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import { parseEntry } from '@/lib/utils';

interface InputBarProps {
  onAdd: (text: string, block: number) => void;
}

export function InputBar({ onAdd }: InputBarProps) {
  const [value, setValue] = useState('');
  const [shake, setShake] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const submit = () => {
    const parsed = parseEntry(value);
    if (!parsed) {
      setShake(true);
      window.setTimeout(() => setShake(false), 400);
      return;
    }
    onAdd(parsed.text, parsed.block);
    setValue('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  };

  return (
    <div
      className={`flex flex-col gap-3 sm:flex-row sm:items-stretch ${
        shake ? 'animate-pop-in' : ''
      }`}
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        rows={1}
        placeholder="Запишите дело или мысль… Поставьте в конец цифру 1–6, чтобы выбрать блок"
        className="min-h-[58px] flex-1 resize-none rounded-2xl border border-slate-200 bg-white px-5 py-4 text-base leading-snug text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
      />
      <button
        type="button"
        onClick={submit}
        className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:from-blue-700 hover:to-cyan-600 hover:shadow-xl hover:shadow-blue-500/40 active:scale-95 sm:py-0"
      >
        <Plus
          size={20}
          className="transition-transform group-hover:rotate-90"
        />
        <span>Добавить</span>
      </button>
    </div>
  );
}

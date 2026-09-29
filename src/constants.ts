export interface BlockConfig {
  id: number;
  emoji: string;
  title: string;
  subtitle: string;
  tag?: string;
  accentText: string;
  accentBg: string;
  accentBorder: string;
  accentBadge: string;
  accentDot: string;
  accentDone: string;
}

export const BLOCKS: BlockConfig[] = [
  {
    id: 1,
    emoji: '🔥',
    title: 'Срочные дела',
    subtitle: '1–2 дня',
    tag: 'Срочно',
    accentText: 'text-red-600',
    accentBg: 'bg-red-50',
    accentBorder: 'border-red-500',
    accentBadge: 'bg-red-100 text-red-700',
    accentDot: 'bg-red-500',
    accentDone: 'hover:bg-red-100 hover:text-red-600',
  },
  {
    id: 2,
    emoji: '⚡',
    title: 'Важные дела',
    subtitle: '3 дня',
    accentText: 'text-amber-600',
    accentBg: 'bg-amber-50',
    accentBorder: 'border-amber-500',
    accentBadge: 'bg-amber-100 text-amber-700',
    accentDot: 'bg-amber-500',
    accentDone: 'hover:bg-amber-100 hover:text-amber-600',
  },
  {
    id: 3,
    emoji: '📋',
    title: 'Не очень важные дела',
    subtitle: '1 неделя',
    accentText: 'text-sky-600',
    accentBg: 'bg-sky-50',
    accentBorder: 'border-sky-500',
    accentBadge: 'bg-sky-100 text-sky-700',
    accentDot: 'bg-sky-500',
    accentDone: 'hover:bg-sky-100 hover:text-sky-600',
  },
  {
    id: 4,
    emoji: '🌱',
    title: 'Простые дела',
    subtitle: '1–2 месяца',
    accentText: 'text-emerald-600',
    accentBg: 'bg-emerald-50',
    accentBorder: 'border-emerald-500',
    accentBadge: 'bg-emerald-100 text-emerald-700',
    accentDot: 'bg-emerald-500',
    accentDone: 'hover:bg-emerald-100 hover:text-emerald-600',
  },
  {
    id: 5,
    emoji: '🛒',
    title: 'Покупки',
    subtitle: '',
    accentText: 'text-slate-600',
    accentBg: 'bg-slate-50',
    accentBorder: 'border-slate-400',
    accentBadge: 'bg-slate-200 text-slate-700',
    accentDot: 'bg-slate-500',
    accentDone: 'hover:bg-slate-200 hover:text-slate-700',
  },
  {
    id: 6,
    emoji: '💭',
    title: 'Мысли / Всякое',
    subtitle: '',
    accentText: 'text-teal-600',
    accentBg: 'bg-teal-50',
    accentBorder: 'border-teal-500',
    accentBadge: 'bg-teal-100 text-teal-700',
    accentDot: 'bg-teal-500',
    accentDone: 'hover:bg-teal-100 hover:text-teal-600',
  },
];

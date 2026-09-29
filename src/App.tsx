import { Info, ListTodo } from 'lucide-react';
import { useEntries } from '@/hooks/useEntries';
import { BLOCKS } from '@/constants';
import { InputBar } from '@/components/InputBar';
import { BlockCard } from '@/components/BlockCard';

function App() {
  const { entries, addEntry, toggleDone, removeEntry, updateEntry, moveEntry } = useEntries();
  const total = entries.length;
  const active = entries.filter((e) => !e.done).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <header className="mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30">
              <ListTodo size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Органайзер
              </h1>
              <p className="text-sm text-slate-500">
                Быстрый захват дел и мыслей
              </p>
            </div>
          </div>
          <div className="hidden text-right sm:block">
            <p className="text-2xl font-bold text-slate-800">{active}</p>
            <p className="text-xs text-slate-400">активных из {total}</p>
          </div>
        </header>

        <InputBar onAdd={addEntry} />

        <p className="mt-3 flex items-start gap-2 text-xs text-slate-500">
          <Info size={14} className="mt-0.5 shrink-0 text-slate-400" />
          <span>
            Без цифры запись попадёт в блок «Мысли / Всякое».
            Добавление по кнопке или клавишей Enter.
          </span>
        </p>

        <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BLOCKS.map((block) => (
            <BlockCard
              key={block.id}
              block={block}
              entries={entries.filter((e) => e.block === block.id)}
              onToggle={toggleDone}
              onRemove={removeEntry}
              onEdit={updateEntry}
              onMove={moveEntry}
            />
          ))}
        </div>

        <footer className="mt-10 text-center text-xs text-slate-400">
          Данные хранятся локально в вашем браузере
        </footer>
      </div>
    </div>
  );
}

export default App;

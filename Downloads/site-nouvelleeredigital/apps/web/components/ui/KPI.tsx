type KPIItem = { value: string | number; unit?: string; label: string };

export const KPI = ({ items }: { items: KPIItem[] }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
    {items.map((k, i) => (
      <div
        key={i}
        className="rounded-2xl bg-white shadow-soft p-6 dark:bg-zinc-900/60 text-center"
      >
        <div className="text-3xl md:text-4xl font-bold text-brand">
          {k.value}
          {k.unit && <span className="text-xl align-super ml-1">{k.unit}</span>}
        </div>
        <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          {k.label}
        </div>
      </div>
    ))}
  </div>
)

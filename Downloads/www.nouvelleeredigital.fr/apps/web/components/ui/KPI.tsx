type KPIItem = { value: string | number; unit?: string; label: string };

export const KPI = ({ items }: { items: KPIItem[] }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
    {items.map((k, i) => (
      <div
        key={i}
        className="rounded-[var(--border-radius-large)] bg-[var(--couleur-light)] shadow-[var(--box-shadow-subtil)] p-6 text-center"
      >
        <div className="text-3xl md:text-4xl font-bold text-[var(--couleur-primaire)]">
          {k.value}
          {k.unit && <span className="text-xl align-super ml-1">{k.unit}</span>}
        </div>
        <div className="mt-2 text-sm text-[var(--couleur-texte-secondaire)]">
          {k.label}
        </div>
      </div>
    ))}
  </div>
)

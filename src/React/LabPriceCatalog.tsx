import { useState, useMemo } from 'react';
import { Search, Clock, ArrowRight, Layers, Radio, Wrench, RefreshCw, KeyRound, MonitorCheck, MapPin } from 'lucide-react';
import { LAB_SERVICES, type LabService } from '@/data/labServices';

export default function LabPriceCatalog() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedModality, setSelectedModality] = useState<'all' | 'remote' | 'lab'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currency, setCurrency] = useState<'NIO' | 'USD'>('USD');

  const categories = [
    { id: 'all', label: 'Todos', icon: Layers },
    { id: 'microsoldering', label: 'Microsoldadura', icon: Wrench },
    { id: 'board_swap', label: 'Cambio de Placa / Swap', icon: RefreshCw },
    { id: 'network_unlock', label: 'Desbloqueos de Red', icon: Radio },
    { id: 'account_unlock', label: 'Cuenta Google & Cuenta Mi', icon: KeyRound },
  ];

  const filteredServices = useMemo(() => {
    return LAB_SERVICES.filter((svc) => {
      const matchCat = selectedCategory === 'all' || svc.category === selectedCategory;
      const matchModality = selectedModality === 'all' || svc.modality === selectedModality;
      const matchQuery =
        svc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        svc.models.toLowerCase().includes(searchQuery.toLowerCase()) ||
        svc.symptoms.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchModality && matchQuery;
    });
  }, [selectedCategory, selectedModality, searchQuery]);

  const handleWhatsapp = (svc: LabService) => {
    const priceText = currency === 'NIO' ? `C$${svc.workshopPriceNIO}` : `$${svc.workshopPriceUSD}`;
    const modText = svc.modality === 'remote' ? '🌐 Remoto / Server' : '🔬 Mesa Quirúrgica';
    const text = `Hola Nova Lab! 👋 Consulto disponibilidad para un servicio:\n\n🔬 *Servicio:* ${svc.name}\n📍 *Modalidad:* ${modText}\n📱 *Modelo:* ${svc.models}\n💰 *Tarifa Taller:* ${priceText}`;
    window.open(`https://wa.me/50577773083?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="w-full">
      {/* Top Bar: Search, Modality Filters & Currency Switcher */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 mb-4">
        <div className="relative w-full lg:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-zinc-500" />
          <input
            type="text"
            placeholder="Buscar falla, modelo o IC..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all font-mono"
          />
        </div>

        {/* Modality Filter Pills (Remoto vs Presencial) */}
        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-zinc-900 border border-zinc-800 overflow-x-auto scrollbar-none touch-pan-x">
          <button
            type="button"
            onClick={() => setSelectedModality('all')}
            className={`px-3 py-1.5 text-xs font-mono font-medium rounded-md whitespace-nowrap transition-transform active:scale-95 select-none cursor-pointer ${
              selectedModality === 'all'
                ? 'bg-zinc-800 text-zinc-100'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Todos
          </button>
          <button
            type="button"
            onClick={() => setSelectedModality('remote')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-semibold rounded-md whitespace-nowrap transition-transform active:scale-95 select-none cursor-pointer ${
              selectedModality === 'remote'
                ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <MonitorCheck className="size-3 text-sky-400 pointer-events-none" />
            <span className="pointer-events-none">Remoto</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedModality('lab')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-semibold rounded-md whitespace-nowrap transition-transform active:scale-95 select-none cursor-pointer ${
              selectedModality === 'lab'
                ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <MapPin className="size-3 text-purple-400 pointer-events-none" />
            <span className="pointer-events-none">Presencial</span>
          </button>
        </div>

        {/* Currency Switcher (Default USD) */}
        <div className="flex items-center gap-1 p-1 rounded-lg bg-zinc-900 border border-zinc-800 self-end lg:self-auto">
          <button
            onClick={() => setCurrency('USD')}
            className={`px-2.5 py-1 text-xs font-mono font-semibold rounded-md transition-all ${
              currency === 'USD' ? 'bg-purple-600 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            $ USD
          </button>
          <button
            onClick={() => setCurrency('NIO')}
            className={`px-2.5 py-1 text-xs font-mono font-semibold rounded-md transition-all ${
              currency === 'NIO' ? 'bg-purple-600 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            C$ NIO
          </button>
        </div>
      </div>

      {/* Tabs por Categoría */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none touch-pan-x">
        {categories.map((cat) => {
          const IconComp = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              type="button"
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-transform active:scale-95 border cursor-pointer select-none ${
                isActive
                  ? 'bg-purple-950/60 border-purple-500/60 text-purple-300 shadow-sm'
                  : 'bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-850'
              }`}
            >
              <IconComp className={`size-3.5 pointer-events-none ${isActive ? 'text-purple-400' : 'text-zinc-500'}`} />
              <span className="pointer-events-none">{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. Vista Móvil (Tarjetas Nativas) */}
      <div className="md:hidden space-y-3">
        {filteredServices.length === 0 ? (
          <div className="py-8 text-center text-zinc-500 font-mono text-xs rounded-xl border border-zinc-800 bg-zinc-900/40">
            No se encontraron servicios para la búsqueda.
          </div>
        ) : (
          filteredServices.map((svc) => {
            const workshopPrice = currency === 'NIO' ? `C$${svc.workshopPriceNIO}` : `$${svc.workshopPriceUSD}`;
            const suggestedRetail = currency === 'NIO' ? `C$${svc.suggestedRetailNIO}` : `$${svc.suggestedRetailUSD}`;
            const profitAmount = currency === 'NIO' 
              ? svc.suggestedRetailNIO - svc.workshopPriceNIO 
              : svc.suggestedRetailUSD - svc.workshopPriceUSD;
            const profitFormatted = currency === 'NIO' ? `+C$${profitAmount}` : `+$${profitAmount}`;
            const isRemote = svc.modality === 'remote';

            return (
              <div
                key={svc.id}
                className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-900/60 flex flex-col gap-2.5"
              >
                {/* Header: Name + Badges */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h3 className="font-bold text-sm text-zinc-100 leading-snug mb-1">{svc.name}</h3>
                    <p className="text-[11px] font-mono text-zinc-400">{svc.models}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    {isRemote ? (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono bg-sky-500/10 border border-sky-500/20 text-sky-400 font-medium">
                        <MonitorCheck className="size-2.5" />
                        Remoto
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono bg-purple-500/10 border border-purple-500/20 text-purple-400 font-medium">
                        <MapPin className="size-2.5" />
                        Presencial
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 border border-amber-500/20 text-amber-400">
                      <Clock className="size-2.5" />
                      {svc.deliveryTime}
                    </span>
                  </div>
                </div>

                {/* Symptoms / Details */}
                <div className="text-[11px] text-zinc-400 space-y-0.5 pl-1 border-l-2 border-purple-500/30">
                  {svc.symptoms.map((sym, i) => (
                    <div key={i} className="line-clamp-1">{sym}</div>
                  ))}
                </div>

                {/* Pricing & CTA */}
                <div className="pt-2.5 border-t border-zinc-800/80 flex items-center justify-between gap-2">
                  <div className="flex items-baseline gap-3">
                    <div>
                      <div className="text-[9px] uppercase font-mono text-zinc-400">Tarifa Taller</div>
                      <div className="text-base font-black font-mono text-purple-400 leading-none">{workshopPrice}</div>
                    </div>

                    <div className="border-l border-zinc-800 pl-3">
                      <div className="text-[9px] uppercase font-mono text-zinc-400">Público Sugerido</div>
                      <div className="text-xs font-bold font-mono text-emerald-400 flex items-center gap-1 leading-none">
                        <span>{suggestedRetail}</span>
                        <span className="text-[9px] text-emerald-500 font-semibold">({profitFormatted})</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleWhatsapp(svc)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-sm shadow-purple-600/20 cursor-pointer"
                  >
                    <span>{isRemote ? 'Remoto' : 'Mesa'}</span>
                    <ArrowRight className="size-3" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 2. Vista Desktop (Tabla Completa) */}
      <div className="hidden md:block rounded-xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900/80 text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
              <th className="py-3 px-4">Servicio & Descripción</th>
              <th className="py-3 px-3">Modalidad</th>
              <th className="py-3 px-3">Modelos</th>
              <th className="py-3 px-3">Tiempo</th>
              <th className="py-3 px-3 text-right">Tarifa Taller</th>
              <th className="py-3 px-3 text-right bg-emerald-950/10 border-l border-zinc-800/80">
                Cobro Sugerido
              </th>
              <th className="py-3 px-4 text-center">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60 text-xs">
            {filteredServices.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-zinc-500 font-mono text-xs">
                  No se encontraron servicios para la búsqueda seleccionada.
                </td>
              </tr>
            ) : (
              filteredServices.map((svc) => {
                const workshopPrice = currency === 'NIO' ? `C$${svc.workshopPriceNIO}` : `$${svc.workshopPriceUSD}`;
                const suggestedRetail = currency === 'NIO' ? `C$${svc.suggestedRetailNIO}` : `$${svc.suggestedRetailUSD}`;
                const profitAmount = currency === 'NIO' 
                  ? svc.suggestedRetailNIO - svc.workshopPriceNIO 
                  : svc.suggestedRetailUSD - svc.workshopPriceUSD;
                const profitFormatted = currency === 'NIO' ? `+C$${profitAmount}` : `+$${profitAmount}`;
                const marginPercent = Math.round((profitAmount / (currency === 'NIO' ? svc.suggestedRetailNIO : svc.suggestedRetailUSD)) * 100);
                const isRemote = svc.modality === 'remote';

                return (
                  <tr
                    key={svc.id}
                    className="hover:bg-zinc-850/50 transition-colors group"
                  >
                    {/* Service & Symptoms */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="font-bold text-zinc-100 group-hover:text-purple-300 transition-colors">
                          {svc.name}
                        </span>
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 whitespace-nowrap">
                          {svc.categoryLabel}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-zinc-400">
                        {svc.symptoms.map((sym, i) => (
                          <span key={i} className="flex items-center gap-1">
                            <span className="text-purple-400 font-bold">•</span>
                            <span>{sym}</span>
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Modality Badge */}
                    <td className="py-3 px-3 font-mono text-[11px] whitespace-nowrap">
                      {isRemote ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-sky-500/10 border border-sky-500/20 text-sky-400 font-medium">
                          <MonitorCheck className="size-3 text-sky-400 shrink-0" />
                          <span>Remoto</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-400 font-medium">
                          <MapPin className="size-3 text-purple-400 shrink-0" />
                          <span>Presencial</span>
                        </span>
                      )}
                    </td>

                    {/* Models */}
                    <td className="py-3 px-3 font-mono text-zinc-400 text-[11px]">
                      {svc.models}
                    </td>

                    {/* SLA in Yellow Accent */}
                    <td className="py-3 px-3 font-mono text-[11px] whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 font-medium">
                        <Clock className="size-3 text-amber-400 shrink-0" />
                        <span>{svc.deliveryTime}</span>
                      </div>
                    </td>

                    {/* Workshop Price */}
                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      <div className="text-sm font-black font-mono text-purple-400">
                        {workshopPrice}
                      </div>
                      <div className="text-[10px] font-mono text-zinc-500">Neto taller</div>
                    </td>

                    {/* Suggested Retail & Margin (Always Visible) */}
                    <td className="py-3 px-3 text-right whitespace-nowrap bg-emerald-950/5 border-l border-zinc-800/80">
                      <div className="text-xs font-bold font-mono text-zinc-200">
                        {suggestedRetail}
                      </div>
                      <div className="text-[10px] font-mono text-emerald-400 font-semibold flex items-center justify-end gap-1">
                        <span>Ganas {profitFormatted}</span>
                        <span className="text-[9px] px-1 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {marginPercent}%
                        </span>
                      </div>
                    </td>

                    {/* Action Button */}
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      <button
                        onClick={() => handleWhatsapp(svc)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-sm shadow-purple-600/20 cursor-pointer"
                      >
                        <span>{isRemote ? 'Remoto' : 'Mesa'}</span>
                        <ArrowRight className="size-3" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

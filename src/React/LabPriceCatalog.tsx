import { useState, useMemo } from 'react';
import { Search, Clock, ArrowRight, Layers, Radio, Wrench, RefreshCw, KeyRound, TrendingUp, MonitorCheck, MapPin } from 'lucide-react';
import { LAB_SERVICES, type LabService } from '@/data/labServices';

export default function LabPriceCatalog() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedModality, setSelectedModality] = useState<'all' | 'remote' | 'lab'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currency, setCurrency] = useState<'NIO' | 'USD'>('NIO');
  const [showProfitGuide, setShowProfitGuide] = useState<boolean>(true);

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
      {/* Top Bar: Search, Modality Filters, Profit Toggle & Currency */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 mb-5">
        <div className="relative w-full lg:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-zinc-500" />
          <input
            type="text"
            placeholder="Buscar por falla, modelo o IC..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all font-mono"
          />
        </div>

        {/* Modality Filter Pills (Remoto vs Presencial) */}
        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-zinc-900 border border-zinc-800 self-start lg:self-auto">
          <button
            onClick={() => setSelectedModality('all')}
            className={`px-2.5 py-1 text-xs font-mono font-medium rounded-md transition-all ${
              selectedModality === 'all'
                ? 'bg-zinc-800 text-zinc-100'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Todas las modalidades
          </button>
          <button
            onClick={() => setSelectedModality('remote')}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-semibold rounded-md transition-all ${
              selectedModality === 'remote'
                ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <MonitorCheck className="size-3 text-sky-400" />
            <span>Remoto / Server</span>
          </button>
          <button
            onClick={() => setSelectedModality('lab')}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-semibold rounded-md transition-all ${
              selectedModality === 'lab'
                ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <MapPin className="size-3 text-purple-400" />
            <span>Presencial / Laboratorio</span>
          </button>
        </div>

        {/* Right Tools: Toggle Margen & Currency */}
        <div className="flex items-center gap-2 self-end lg:self-auto">
          <button
            onClick={() => setShowProfitGuide(!showProfitGuide)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all border ${
              showProfitGuide
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
            }`}
            title="Mostrar u ocultar sugerencia de precio a público final"
          >
            <TrendingUp className="size-3.5" />
            <span>{showProfitGuide ? 'Ocultar Margen' : 'Ver Margen'}</span>
          </button>

          <div className="flex items-center gap-1 p-1 rounded-lg bg-zinc-900 border border-zinc-800">
            <button
              onClick={() => setCurrency('NIO')}
              className={`px-2.5 py-1 text-xs font-mono font-semibold rounded-md transition-all ${
                currency === 'NIO' ? 'bg-purple-600 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              C$
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-2.5 py-1 text-xs font-mono font-semibold rounded-md transition-all ${
                currency === 'USD' ? 'bg-purple-600 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              $
            </button>
          </div>
        </div>
      </div>

      {/* Tabs por Categoría */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none">
        {categories.map((cat) => {
          const IconComp = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all border ${
                isActive
                  ? 'bg-purple-950/60 border-purple-500/60 text-purple-300 shadow-sm'
                  : 'bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-850'
              }`}
            >
              <IconComp className={`size-3.5 ${isActive ? 'text-purple-400' : 'text-zinc-500'}`} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Modern Table Layout */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-sm overflow-x-auto md:overflow-x-visible">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900/80 text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
              <th className="py-3 px-3 md:px-4">Servicio & Descripción</th>
              <th className="py-3 px-2 md:px-3">Modalidad</th>
              <th className="py-3 px-2 md:px-3">Modelos</th>
              <th className="py-3 px-2 md:px-3">Tiempo</th>
              <th className="py-3 px-2 md:px-3 text-right">Tarifa Taller</th>
              {showProfitGuide && (
                <th className="py-3 px-2 md:px-3 text-right bg-emerald-950/10 border-l border-zinc-800/80">
                  Cobro Sugerido
                </th>
              )}
              <th className="py-3 px-3 md:px-4 text-center">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60 text-xs">
            {filteredServices.length === 0 ? (
              <tr>
                <td colSpan={showProfitGuide ? 7 : 6} className="py-8 text-center text-zinc-500 font-mono text-xs">
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
                    <td className="py-3 px-3 md:px-4 max-w-xs md:max-w-none">
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
                    <td className="py-3 px-2 md:px-3 font-mono text-[11px] whitespace-nowrap">
                      {isRemote ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-sky-500/10 border border-sky-500/20 text-sky-400 font-medium">
                          <MonitorCheck className="size-3 text-sky-400 shrink-0" />
                          <span>Remoto / Server</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-400 font-medium">
                          <MapPin className="size-3 text-purple-400 shrink-0" />
                          <span>Presencial / Lab</span>
                        </span>
                      )}
                    </td>

                    {/* Models */}
                    <td className="py-3 px-2 md:px-3 font-mono text-zinc-400 text-[11px]">
                      {svc.models}
                    </td>

                    {/* SLA in Yellow Accent */}
                    <td className="py-3 px-2 md:px-3 font-mono text-[11px] whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 font-medium">
                        <Clock className="size-3 text-amber-400 shrink-0" />
                        <span>{svc.deliveryTime}</span>
                      </div>
                    </td>

                    {/* Workshop Price */}
                    <td className="py-3 px-2 md:px-3 text-right whitespace-nowrap">
                      <div className="text-sm font-black font-mono text-purple-400">
                        {workshopPrice}
                      </div>
                      <div className="text-[10px] font-mono text-zinc-500">Neto taller</div>
                    </td>

                    {/* Suggested Retail & Margin */}
                    {showProfitGuide && (
                      <td className="py-3 px-2 md:px-3 text-right whitespace-nowrap bg-emerald-950/5 border-l border-zinc-800/80">
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
                    )}

                    {/* Action Button */}
                    <td className="py-3 px-3 md:px-4 text-center whitespace-nowrap">
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

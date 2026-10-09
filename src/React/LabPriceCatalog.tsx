import { useState, useMemo } from 'react';
import { Search, Clock, Radio, Wrench, RefreshCw, KeyRound, MonitorCheck, MapPin } from 'lucide-react';
import { LAB_SERVICES, type LabService } from '@/data/labServices';

function WhatsAppIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function LabPriceCatalog() {
  const [selectedCategory, setSelectedCategory] = useState<string>('hardware');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currency, setCurrency] = useState<'NIO' | 'USD'>('USD');

  const categories = [
    { id: 'hardware', label: 'Hardware', icon: Wrench },
    { id: 'network_unlock', label: 'Desbloqueos de Red', icon: Radio },
    { id: 'account_unlock', label: 'Cuenta Google & Mi', icon: KeyRound },
  ];

  const filteredServices = useMemo(() => {
    return LAB_SERVICES.filter((svc) => {
      const matchCat = svc.category === selectedCategory;
      const matchQuery =
        svc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        svc.models.toLowerCase().includes(searchQuery.toLowerCase()) ||
        svc.symptoms.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchQuery;
    });
  }, [selectedCategory, searchQuery]);

  const handleWhatsapp = (svc: LabService) => {
    const priceText = svc.workshopPriceUSD === 0 
      ? 'Cotización en vivo según modelo y capacidad'
      : (currency === 'NIO' ? `C$${svc.workshopPriceNIO}` : `$${svc.workshopPriceUSD}`);
    const modText = svc.modality === 'remote' ? '🌐 Remoto / Server' : '🔬 Mesa Quirúrgica';
    const text = `Hola Nova Lab! 👋 Consulto disponibilidad para un servicio:\n\n🔬 *Servicio:* ${svc.name}\n📍 *Modalidad:* ${modText}\n📱 *Modelo:* ${svc.models}\n💰 *Tarifa Taller:* ${priceText}`;
    window.open(`https://wa.me/50577773083?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="w-full">
      {/* Top Bar: Search & Currency Switcher */}
      <div className="flex flex-row items-center justify-between gap-3 mb-4">
        <div className="relative flex-1 sm:w-80 sm:flex-initial">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-zinc-500" />
          <input
            type="text"
            placeholder="Buscar falla, modelo o IC..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all font-mono"
          />
        </div>

        {/* Currency Switcher (Default USD) */}
        <div className="flex items-center gap-1 p-1 rounded-lg bg-zinc-900 border border-zinc-800 shrink-0">
          <button
            type="button"
            onClick={() => setCurrency('USD')}
            className={`px-2.5 py-1 text-xs font-mono font-semibold rounded-md transition-transform active:scale-95 cursor-pointer select-none ${
              currency === 'USD' ? 'bg-purple-600 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            $ USD
          </button>
          <button
            type="button"
            onClick={() => setCurrency('NIO')}
            className={`px-2.5 py-1 text-xs font-mono font-semibold rounded-md transition-transform active:scale-95 cursor-pointer select-none ${
              currency === 'NIO' ? 'bg-purple-600 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            C$ NIO
          </button>
        </div>
      </div>

      {/* Tabs por Categoría */}
      <div className="grid grid-cols-3 sm:flex sm:items-center gap-2 mb-4">
        {categories.map((cat) => {
          const IconComp = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              type="button"
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center justify-center sm:justify-start gap-1.5 px-3 py-2.5 sm:py-2 rounded-lg text-xs font-medium transition-transform active:scale-95 border cursor-pointer select-none ${
                isActive
                  ? 'bg-purple-950/60 border-purple-500/60 text-purple-300 shadow-sm'
                  : 'bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-850'
              }`}
            >
              <IconComp className={`size-3.5 shrink-0 pointer-events-none ${isActive ? 'text-purple-400' : 'text-zinc-500'}`} />
              <span className="truncate pointer-events-none">{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Technical notice for Hardware / Motherboard import */}
      {selectedCategory === 'hardware' && (
        <div className="mb-4 p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-2.5 text-xs font-mono">
          <span className="text-amber-400 text-sm mt-0.5 shrink-0">🔬</span>
          <div className="text-zinc-300 text-[11px] leading-relaxed">
            <span className="text-amber-400 font-bold">Laboratorio Hardware & Microsoldadura: </span>
            Reparación a nivel de componentes en placa y trasplante de tarjetas lógicas. En importación de placas completas (iPhone 11-17PM), se entregan 100% testeadas y con Face ID activo bajo cotización diaria.
          </div>
        </div>
      )}

      {/* Technical notice for Network Unlock */}
      {selectedCategory === 'network_unlock' && (
        <div className="mb-4 p-3 rounded-xl bg-purple-950/20 border border-purple-500/30 flex items-start gap-2.5 text-xs font-mono">
          <span className="text-purple-400 text-sm mt-0.5 shrink-0">🛡️</span>
          <div className="text-zinc-300 text-[11px] leading-relaxed">
            <span className="text-purple-400 font-bold">Términos y Políticas de Servidor (IMEI): </span>
            Garantía sin rebloqueo (Lifetime). Pedidos en proceso no admiten cancelación ni modificación. IMEI, operador o modelo incorrecto enviado no aplica reembolso por políticas de servidor directo. Verifica operadora e IMEI con reporte previo antes de ingresar el pedido.
          </div>
        </div>
      )}

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
                  {svc.workshopPriceUSD === 0 ? (
                    <div className="flex flex-col gap-0.5">
                      <div className="text-[9px] uppercase font-mono text-zinc-400 font-bold">Precio</div>
                      <span className="text-xs font-black font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20 inline-block w-fit">
                        Cotización al día
                      </span>
                    </div>
                  ) : (
                    <div>
                      <div className="text-[9px] uppercase font-mono text-zinc-400 font-bold">Precio</div>
                      <div className="text-base font-black font-mono text-purple-400 leading-none">{workshopPrice}</div>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => handleWhatsapp(svc)}
                    aria-label="Consultar por WhatsApp"
                    className="size-9 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-[#25D366] flex items-center justify-center transition-all active:scale-95 shadow-sm shadow-[#25D366]/10 cursor-pointer select-none shrink-0"
                  >
                    <WhatsAppIcon className="size-5 pointer-events-none" />
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
              <th className="py-3 px-3 text-right text-purple-400">Precio</th>
              <th className="py-3 px-4 text-center">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60 text-xs">
            {filteredServices.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-zinc-500 font-mono text-xs">
                  No se encontraron servicios para la búsqueda seleccionada.
                </td>
              </tr>
            ) : (
              filteredServices.map((svc) => {
                const workshopPrice = currency === 'NIO' ? `C$${svc.workshopPriceNIO}` : `$${svc.workshopPriceUSD}`;
                const isRemote = svc.modality === 'remote';

                return (
                  <tr
                    key={svc.id}
                    className="hover:bg-zinc-850/50 transition-colors group"
                  >
                    {/* Service & Symptoms */}
                    <td className="py-3 px-4">
                      <div className="font-bold text-zinc-100 group-hover:text-purple-300 transition-colors mb-1">
                        {svc.name}
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

                    {svc.workshopPriceUSD === 0 ? (
                      <td className="py-3 px-3 text-right whitespace-nowrap">
                        <span className="inline-block text-xs font-black font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                          Cotización al día
                        </span>
                        <div className="text-[10px] font-mono text-zinc-500">Según modelo/capacidad</div>
                      </td>
                    ) : (
                      <td className="py-3 px-3 text-right whitespace-nowrap">
                        <div className="text-sm font-black font-mono text-purple-400">
                          {workshopPrice}
                        </div>
                        <div className="text-[10px] font-mono text-zinc-500">Neto taller</div>
                      </td>
                    )}

                    {/* Action Button */}
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => handleWhatsapp(svc)}
                        aria-label="Consultar por WhatsApp"
                        className="size-8 rounded-lg bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-[#25D366] inline-flex items-center justify-center transition-all active:scale-95 shadow-sm shadow-[#25D366]/10 cursor-pointer select-none mx-auto"
                      >
                        <WhatsAppIcon className="size-4 pointer-events-none" />
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

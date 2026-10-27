import React, { useState } from 'react';
import { Reparation, StockItem, TabCustomSettings } from '../types';
import { MONTHS } from '../initialData';
import { formatFCFA, formatNumber } from '../utils/formatters';
import { TrendingUp, Receipt, Wrench, AlertTriangle, ArrowUpRight, SlidersHorizontal, Trash2 } from 'lucide-react';

interface DashboardTabProps {
  reparations: Reparation[];
  stock: StockItem[];
  customSettings?: TabCustomSettings;
  onOpenSettings?: () => void;
  onClearDashboardData?: () => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  reparations,
  stock,
  customSettings,
  onOpenSettings,
  onClearDashboardData,
}) => {
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);
  const [isClearAllModalOpen, setIsClearAllModalOpen] = useState(false);

  // Calcul des données mensuelles basées sur les réparations
  const monthlyData = MONTHS.map((moisNom, idx) => {
    const monthNum = idx + 1;
    const repsInMonth = reparations.filter((rep) => {
      const repMonth = new Date(rep.date).getMonth() + 1;
      return repMonth === monthNum;
    });

    const caPiecesHT = repsInMonth.reduce((sum, r) => sum + r.totalPiecesHT, 0);
    const caMainOeuvreHT = repsInMonth.reduce((sum, r) => sum + r.mainOeuvreHT, 0);
    const caTotalHT = caPiecesHT + caMainOeuvreHT;
    const tva18 = caTotalHT * 0.18;
    const caTotalTTC = caTotalHT + tva18;

    return {
      monthNum,
      moisNom,
      caPiecesHT,
      caMainOeuvreHT,
      caTotalHT,
      tva18,
      caTotalTTC,
      count: repsInMonth.length,
    };
  });

  // Totaux globaux
  const totalPiecesHT = monthlyData.reduce((acc, m) => acc + m.caPiecesHT, 0);
  const totalMOHT = monthlyData.reduce((acc, m) => acc + m.caMainOeuvreHT, 0);
  const totalHT = totalPiecesHT + totalMOHT;
  const totalTVA = totalHT * 0.18;
  const totalTTC = totalHT + totalTVA;
  const totalReparations = reparations.length;
  const stockAlertsCount = stock.filter((s) => s.quantite <= s.stockMin).length;

  // Calcul pour le graphique SVG
  const maxMonthlyVal = Math.max(
    ...monthlyData.map((m) => Math.max(m.caPiecesHT, m.caMainOeuvreHT)),
    50000
  );

  return (
    <div className="space-y-6">
      {/* Introduction bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-slate-900 border border-slate-800 p-4 rounded-xl">
        <div>
          <h2 className="text-base font-semibold text-white flex items-center gap-2">
            <span>{customSettings?.title || 'Tableau de Bord & Indicateurs de Performance'}</span>
            <span className="text-xs px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-mono">
              Onglet Excel #1
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {customSettings?.subtitle || "Synchronisation dynamique avec l'onglet Réparations via les formules SOMME.SI.MULTIPLE et MONTH."}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          {onOpenSettings && (
            <button
              type="button"
              onClick={onOpenSettings}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 transition-all shadow-sm"
              title="Modifier la couleur du tableau, les en-têtes et le style"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-blue-400" />
              <span>Paramètres</span>
            </button>
          )}

          {reparations.length > 0 && onClearDashboardData && (
            <button
              type="button"
              onClick={() => setIsClearAllModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-rose-500/15 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/30 transition-all shadow-sm"
              title="Réinitialiser toutes les données de réparations du tableau de bord"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-400 group-hover:text-white" />
              <span>Tout supprimer ({reparations.length} OR)</span>
            </button>
          )}
        </div>
      </div>

      {/* 4 KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 : CA TOTAL TTC */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>CA Total TTC</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">
            {formatFCFA(totalTTC)}
          </div>
          <div className="text-[11px] text-slate-400 mt-2 font-mono">
            Facturation globale atelier 2026
          </div>
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
        </div>

        {/* KPI 2 : TOTAL TVA 18% */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Total TVA Collectée (18%)</span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Receipt className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">
            {formatFCFA(totalTVA)}
          </div>
          <div className="text-[11px] text-slate-400 mt-2 font-mono">
            Régime fiscal normal 18%
          </div>
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-pink-600"></div>
        </div>

        {/* KPI 3 : TOTAL RÉPARATIONS */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Total Réparations (OR)</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Wrench className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">
            {formatNumber(totalReparations)} <span className="text-sm font-normal text-slate-400">fiches</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-2 font-mono">
            100% enregistrées en atelier
          </div>
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
        </div>

        {/* KPI 4 : PIÈCES EN ALERTE STOCK */}
        <div className={`bg-slate-900 border rounded-xl p-4 relative overflow-hidden group transition-all ${
          stockAlertsCount > 0 ? 'border-rose-800/80 bg-rose-950/10' : 'border-slate-800'
        }`}>
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <span className={stockAlertsCount > 0 ? 'text-rose-300' : ''}>Alertes Stock Minimum</span>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              stockAlertsCount > 0 ? 'bg-rose-500/20 text-rose-400' : 'bg-slate-800 text-slate-400'
            }`}>
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className={`text-2xl font-bold tracking-tight ${stockAlertsCount > 0 ? 'text-rose-400' : 'text-white'}`}>
            {stockAlertsCount} <span className="text-sm font-normal text-slate-400">références</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-2 font-mono">
            <span className={stockAlertsCount > 0 ? 'text-rose-400 font-medium' : ''}>
              {stockAlertsCount > 0 ? 'Réapprovisionnement requis' : 'Stock optimal'}
            </span>
          </div>
          <div className="absolute top-0 left-0 right-0 h-1 bg-rose-600"></div>
        </div>
      </div>

      {/* GRAPHIC BARCHART PREVIEW (MATCHING OPENPYXL BARCHART) */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Histogramme Mensuel : CA Pièces vs Main d'œuvre (FCFA)
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-900/40 text-blue-300 font-mono border border-blue-700/40">
                openpyxl BarChart col (I7)
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Comparatif direct des ventes de pièces détachées vs prestations de main d'œuvre mécanicien.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-blue-600"></div>
              <span className="text-slate-300">CA Pièces HT</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-amber-500"></div>
              <span className="text-slate-300">CA Main d'œuvre HT</span>
            </div>
          </div>
        </div>

        {/* Chart representation */}
        <div className="pt-4 pb-2">
          <div className="h-64 flex items-end gap-2 md:gap-3 px-2 border-b border-slate-800 relative">
            {/* Horizontal guide lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
              <div className="border-b border-dashed border-slate-600 w-full"></div>
              <div className="border-b border-dashed border-slate-600 w-full"></div>
              <div className="border-b border-dashed border-slate-600 w-full"></div>
              <div className="border-b border-dashed border-slate-600 w-full"></div>
            </div>

            {monthlyData.map((m) => {
              const heightPieces = (m.caPiecesHT / maxMonthlyVal) * 100;
              const heightMO = (m.caMainOeuvreHT / maxMonthlyVal) * 100;
              const isHovered = hoveredMonth === m.monthNum;

              return (
                <div
                  key={m.monthNum}
                  onMouseEnter={() => setHoveredMonth(m.monthNum)}
                  onMouseLeave={() => setHoveredMonth(null)}
                  className={`flex-1 flex flex-col items-center justify-end h-full group relative transition-all ${
                    isHovered ? 'opacity-100' : 'opacity-90'
                  }`}
                >
                  {/* Tooltip on hover */}
                  {isHovered && (
                    <div className="absolute bottom-full mb-2 bg-slate-950 border border-slate-700 text-white rounded-lg p-2.5 shadow-xl text-xs z-20 whitespace-nowrap pointer-events-none">
                      <div className="font-bold text-blue-400 mb-1">{m.moisNom} 2026</div>
                      <div className="text-slate-300">Pièces : <span className="font-semibold text-white">{formatFCFA(m.caPiecesHT)}</span></div>
                      <div className="text-slate-300">MO : <span className="font-semibold text-white">{formatFCFA(m.caMainOeuvreHT)}</span></div>
                      <div className="text-slate-400 border-t border-slate-800 mt-1 pt-1">
                        Total HT : <span className="font-bold text-emerald-400">{formatFCFA(m.caTotalHT)}</span>
                      </div>
                      <div className="text-slate-400 text-[10px]">TTC : {formatFCFA(m.caTotalTTC)}</div>
                    </div>
                  )}

                  {/* Dual Bars */}
                  <div className="w-full flex items-end justify-center gap-1 h-full pb-1">
                    {/* Bar Pièces */}
                    <div
                      style={{ height: `${Math.max(heightPieces, 3)}%` }}
                      className={`w-1/2 rounded-t transition-all ${
                        m.caPiecesHT > 0
                          ? 'bg-blue-600 group-hover:bg-blue-500'
                          : 'bg-slate-800'
                      }`}
                    ></div>
                    {/* Bar MO */}
                    <div
                      style={{ height: `${Math.max(heightMO, 3)}%` }}
                      className={`w-1/2 rounded-t transition-all ${
                        m.caMainOeuvreHT > 0
                          ? 'bg-amber-500 group-hover:bg-amber-400'
                          : 'bg-slate-800'
                      }`}
                    ></div>
                  </div>

                  <span className="text-[11px] text-slate-400 font-mono mt-2 truncate w-full text-center">
                    {m.moisNom.slice(0, 3)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 12-MONTH SUMMARY TABLE (MATCHING OPENPYXL STYLED TABLE) */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
        <div className="px-5 py-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span>Tableau Récapitulatif Annuel (12 Mois)</span>
              <span className="text-xs px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-mono">
                Plage A8:G21
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              En-tête bleu nuit (<code className="text-slate-300">#0F2537</code>), quadrillage fin et totaux annuels consolidés.
            </p>
          </div>
          <div className="text-xs text-slate-400 font-mono">
            Devise : FCFA (Franc CFA BCEAO)
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr
                style={{
                  backgroundColor: customSettings?.headerBg || '#0F2537',
                  color: customSettings?.headerText || '#FFFFFF',
                }}
                className="border-b border-slate-700 font-bold uppercase tracking-wider transition-colors"
              >
                <th className="py-3 px-4 border-r border-slate-700/80">{customSettings?.columnLabels?.mois || 'Mois'}</th>
                <th className="py-3 px-3 text-center border-r border-slate-700/80 w-12">N°</th>
                <th className="py-3 px-4 text-right border-r border-slate-700/80">{customSettings?.columnLabels?.caPieces || 'CA Pièces HT'}</th>
                <th className="py-3 px-4 text-right border-r border-slate-700/80">{customSettings?.columnLabels?.caMO || 'CA Main d\'œuvre HT'}</th>
                <th className="py-3 px-4 text-right border-r border-slate-700/80">{customSettings?.columnLabels?.caTotalHT || 'CA Total HT'}</th>
                <th className="py-3 px-4 text-right border-r border-slate-700/80">{customSettings?.columnLabels?.tva || 'TVA (18%)'}</th>
                <th className="py-3 px-4 text-right">{customSettings?.columnLabels?.caTTC || 'CA Total TTC'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {monthlyData.map((m, idx) => {
                const isEven = idx % 2 === 0;
                const zebraClass =
                  customSettings?.zebraStyle === 'none'
                    ? 'bg-slate-900'
                    : customSettings?.zebraStyle === 'navy'
                    ? isEven
                      ? 'bg-slate-900'
                      : 'bg-blue-950/25'
                    : isEven
                    ? 'bg-slate-900'
                    : 'bg-slate-800/40';

                return (
                  <tr
                    key={m.monthNum}
                    className={`transition-colors hover:bg-blue-950/20 ${zebraClass}`}
                  >
                    <td className="py-2.5 px-4 font-medium text-slate-200 border-r border-slate-800 flex items-center justify-between">
                      <span>{m.moisNom}</span>
                      {m.count > 0 && (
                        <span className="text-[10px] text-slate-500 font-mono">
                          {m.count} OR
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-center font-mono text-slate-400 border-r border-slate-800">
                      {m.monthNum}
                    </td>

                    {/* CA Pièces */}
                    <td className="py-2.5 px-4 text-right font-mono border-r border-slate-800 text-blue-300">
                      {formatFCFA(m.caPiecesHT)}
                    </td>

                    {/* CA Main d'œuvre */}
                    <td className="py-2.5 px-4 text-right font-mono border-r border-slate-800 text-amber-300">
                      {formatFCFA(m.caMainOeuvreHT)}
                    </td>

                    {/* CA Total HT */}
                    <td className="py-2.5 px-4 text-right font-mono font-semibold text-white border-r border-slate-800">
                      {formatFCFA(m.caTotalHT)}
                    </td>

                    {/* TVA 18% */}
                    <td className="py-2.5 px-4 text-right font-mono text-purple-300 border-r border-slate-800">
                      {formatFCFA(m.tva18)}
                    </td>

                    {/* CA Total TTC */}
                    <td className="py-2.5 px-4 text-right font-mono font-bold text-emerald-400">
                      {formatFCFA(m.caTotalTTC)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              {/* LIGNE TOTAL ANNUEL */}
              <tr className="bg-slate-800/90 text-white font-bold border-t-2 border-b-4 border-slate-500">
                <td className="py-3 px-4 uppercase tracking-wider text-amber-400 border-r border-slate-700">
                  TOTAL ANNUEL
                </td>
                <td className="py-3 px-3 text-center font-mono border-r border-slate-700">
                  12
                </td>
                <td className="py-3 px-4 text-right font-mono text-blue-300 border-r border-slate-700">
                  {formatFCFA(totalPiecesHT)}
                </td>
                <td className="py-3 px-4 text-right font-mono text-amber-300 border-r border-slate-700">
                  {formatFCFA(totalMOHT)}
                </td>
                <td className="py-3 px-4 text-right font-mono text-white border-r border-slate-700 text-sm">
                  {formatFCFA(totalHT)}
                </td>
                <td className="py-3 px-4 text-right font-mono text-purple-300 border-r border-slate-700">
                  {formatFCFA(totalTVA)}
                </td>
                <td className="py-3 px-4 text-right font-mono text-emerald-400 text-sm">
                  {formatFCFA(totalTTC)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Ratios & Key Business Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-medium">Part Pièces Détachées dans le CA</span>
            <div className="text-lg font-bold text-blue-400 mt-1">
              {totalHT > 0 ? ((totalPiecesHT / totalHT) * 100).toFixed(1) : 0}%
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">Marge brute moyenne : 35-50%</p>
          </div>
          <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-medium">Part Main d'œuvre dans le CA</span>
            <div className="text-lg font-bold text-amber-400 mt-1">
              {totalHT > 0 ? ((totalMOHT / totalHT) * 100).toFixed(1) : 0}%
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">Valeur ajoutée de l'atelier mécanicien</p>
          </div>
          <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400">
            <Wrench className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-medium">Panier Moyen par Réparation (TTC)</span>
            <div className="text-lg font-bold text-emerald-400 mt-1">
              {totalReparations > 0 ? formatFCFA(totalTTC / totalReparations) : '0 FCFA'}
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">Sur l'ensemble des réparations</p>
          </div>
          <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400">
            <Receipt className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* MODAL TOUT SUPPRIMER DANS LE TABLEAU DE BORD */}
      {isClearAllModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-rose-500/30 rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3 text-rose-400 mb-4">
              <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Vider les données du Tableau de Bord</h3>
                <p className="text-xs text-rose-400 font-medium">Action irréversible</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 mb-6 leading-relaxed">
              Êtes-vous certain de vouloir supprimer <strong>la totalité des {reparations.length} ordres de réparation</strong> qui alimentent le tableau de bord ?
              Les graphiques et le tableau mensuel seront réinitialisés à 0 FCFA.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsClearAllModalOpen(false)}
                className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={() => {
                  if (onClearDashboardData) onClearDashboardData();
                  setIsClearAllModalOpen(false);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-lg transition-all shadow-md shadow-rose-600/30"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Oui, tout supprimer</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

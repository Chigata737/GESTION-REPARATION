import React, { useState, useRef } from 'react';
import { StockItem, TabCustomSettings } from '../types';
import { formatFCFA, formatNumber } from '../utils/formatters';
import { Search, PackagePlus, AlertTriangle, CheckCircle2, DollarSign, Boxes, Trash2, Pencil, Sliders, SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';

interface StockTabProps {
  stock: StockItem[];
  onAddStockItem: (newItem: StockItem) => void;
  onUpdateQuantity: (ref: string, delta: number) => void;
  onUpdateStockMin: (ref: string, delta: number) => void;
  onSetStockMin: (ref: string, newMin: number) => void;
  onUpdateStockItem: (updatedItem: StockItem) => void;
  onDeleteStockItem: (ref: string) => void;
  onClearAllStock?: () => void;
  customSettings?: TabCustomSettings;
  onOpenSettings?: () => void;
}

export const StockTab: React.FC<StockTabProps> = ({
  stock,
  onAddStockItem,
  onUpdateQuantity,
  onUpdateStockMin,
  onSetStockMin,
  onUpdateStockItem,
  onDeleteStockItem,
  onClearAllStock,
  customSettings,
  onOpenSettings,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ALERT' | 'OK'>('ALL');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isClearAllModalOpen, setIsClearAllModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<StockItem | null>(null);
  const [itemToEdit, setItemToEdit] = useState<StockItem | null>(null);

  // Quick inline edit state for stockMin
  const [editingMinRef, setEditingMinRef] = useState<string | null>(null);
  const [tempMinVal, setTempMinVal] = useState<number>(0);

  // Form Add
  const [ref, setRef] = useState('');
  const [designation, setDesignation] = useState('');
  const [prixAchatHT, setPrixAchatHT] = useState<number>(5000);
  const [prixVenteHT, setPrixVenteHT] = useState<number>(8500);
  const [quantite, setQuantite] = useState<number>(5);
  const [stockMin, setStockMin] = useState<number>(5);

  // Ref pour le conteneur du tableau à défilement fixe
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const scrollTable = (direction: 'left' | 'right') => {
    if (tableContainerRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      tableContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Form Edit
  const [editDesignation, setEditDesignation] = useState('');
  const [editPrixAchatHT, setEditPrixAchatHT] = useState<number>(0);
  const [editPrixVenteHT, setEditPrixVenteHT] = useState<number>(0);
  const [editQuantite, setEditQuantite] = useState<number>(0);
  const [editStockMin, setEditStockMin] = useState<number>(0);

  const filteredStock = stock.filter((item) => {
    const isAlert = item.quantite <= item.stockMin;
    if (statusFilter === 'ALERT' && !isAlert) return false;
    if (statusFilter === 'OK' && isAlert) return false;

    const q = searchTerm.toLowerCase();
    return (
      item.ref.toLowerCase().includes(q) ||
      item.designation.toLowerCase().includes(q)
    );
  });

  const totalValeurAchatHT = stock.reduce(
    (sum, item) => sum + item.prixAchatHT * item.quantite,
    0
  );
  const totalArticles = stock.reduce((sum, item) => sum + item.quantite, 0);
  const alertCount = stock.filter((item) => item.quantite <= item.stockMin).length;

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!designation) return;

    const autoRef = ref || `PIEC-${String(stock.length + 1).padStart(3, '0')}`;
    const newItem: StockItem = {
      ref: autoRef,
      designation,
      prixAchatHT: Number(prixAchatHT),
      prixVenteHT: Number(prixVenteHT),
      quantite: Number(quantite),
      stockMin: Number(stockMin),
    };

    onAddStockItem(newItem);
    setIsAddModalOpen(false);
    setRef('');
    setDesignation('');
  };

  const handleOpenEdit = (item: StockItem) => {
    setItemToEdit(item);
    setEditDesignation(item.designation);
    setEditPrixAchatHT(item.prixAchatHT);
    setEditPrixVenteHT(item.prixVenteHT);
    setEditQuantite(item.quantite);
    setEditStockMin(item.stockMin);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemToEdit || !editDesignation) return;

    const updated: StockItem = {
      ...itemToEdit,
      designation: editDesignation,
      prixAchatHT: Number(editPrixAchatHT),
      prixVenteHT: Number(editPrixVenteHT),
      quantite: Math.max(0, Number(editQuantite)),
      stockMin: Math.max(0, Number(editStockMin)),
    };

    onUpdateStockItem(updated);
    setItemToEdit(null);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      onDeleteStockItem(itemToDelete.ref);
      setItemToDelete(null);
    }
  };

  const startInlineEditMin = (item: StockItem) => {
    setEditingMinRef(item.ref);
    setTempMinVal(item.stockMin);
  };

  const saveInlineEditMin = (refStr: string) => {
    onSetStockMin(refStr, tempMinVal);
    setEditingMinRef(null);
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-xl">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold text-white">{customSettings?.title || 'Inventaire & Gestion des Stocks de Pièces'}</h2>
            <span className="text-xs px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-mono">
              Onglet Excel #3
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            {customSettings?.subtitle || "Valorisation au prix d'achat HT, modification directe du seuil minimal et alertes de réapprovisionnement."}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          {onOpenSettings && (
            <button
              type="button"
              onClick={onOpenSettings}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 transition-all shadow-sm"
              title="Modifier la couleur du tableau, les en-têtes et le style"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-blue-400" />
              <span>Paramètres</span>
            </button>
          )}

          {stock.length > 0 && onClearAllStock && (
            <button
              type="button"
              onClick={() => setIsClearAllModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-rose-500/15 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/30 transition-all shadow-sm"
              title="Supprimer tout le stock de cet onglet"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-400 group-hover:text-white" />
              <span>Tout supprimer ({stock.length})</span>
            </button>
          )}

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition-all"
          >
            <PackagePlus className="w-4 h-4" />
            <span>Nouvelle Pièce</span>
          </button>
        </div>
      </div>

      {/* Top inventory mini stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-medium">Valeur Totale du Stock (Achat HT)</span>
            <div className="text-xl font-bold text-white mt-1">
              {formatFCFA(totalValeurAchatHT)}
            </div>
            <p className="text-[11px] text-slate-500 font-mono mt-0.5">
              Valorisation des références en magasin
            </p>
          </div>
          <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-medium">Nombre Total de Pièces en Rayon</span>
            <div className="text-xl font-bold text-white mt-1">
              {formatNumber(totalArticles)} <span className="text-xs font-normal text-slate-400">unités</span>
            </div>
            <p className="text-[11px] text-slate-500 font-mono mt-0.5">
              {stock.length} références catalogue
            </p>
          </div>
          <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400">
            <Boxes className="w-5 h-5" />
          </div>
        </div>

        <div className={`bg-slate-900 border rounded-xl p-4 flex items-center justify-between ${
          alertCount > 0 ? 'border-rose-800/80 bg-rose-950/20' : 'border-slate-800'
        }`}>
          <div>
            <span className={`text-xs font-medium ${alertCount > 0 ? 'text-rose-300' : 'text-slate-400'}`}>
              Alertes Réapprovisionnement
            </span>
            <div className={`text-xl font-bold mt-1 ${alertCount > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
              {alertCount} <span className="text-xs font-normal text-slate-400">articles sous le seuil</span>
            </div>
            <p className="text-[11px] text-slate-500 font-mono mt-0.5">
              Quantité ≤ Stock Minimum
            </p>
          </div>
          <div className={`p-3 rounded-lg ${alertCount > 0 ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher une pièce par désignation ou référence (ex: bougie, kit chaîne, PIEC-003)..."
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-lg border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setStatusFilter('ALL')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              statusFilter === 'ALL'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Tous ({stock.length})
          </button>
          <button
            onClick={() => setStatusFilter('ALERT')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1 ${
              statusFilter === 'ALERT'
                ? 'bg-rose-600 text-white'
                : 'text-rose-400 hover:text-rose-300'
            }`}
          >
            <AlertTriangle className="w-3 h-3" />
            <span>En alerte ({alertCount})</span>
          </button>
          <button
            onClick={() => setStatusFilter('OK')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1 ${
              statusFilter === 'OK'
                ? 'bg-emerald-600 text-white'
                : 'text-emerald-400 hover:text-emerald-300'
            }`}
          >
            <CheckCircle2 className="w-3 h-3" />
            <span>Conformes ({stock.length - alertCount})</span>
          </button>
        </div>
      </div>

      {/* Styled Stock Table with sticky headers, fixed totals footer, and fixed horizontal scrollbar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl flex flex-col">
        {/* Barre d'outils et de défilement horizontal */}
        <div className="px-4 py-2 bg-slate-950/70 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium text-slate-300">
              {filteredStock.length} référence{filteredStock.length > 1 ? 's' : ''} affichée{filteredStock.length > 1 ? 's' : ''}
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              Totaux & défilement horizontal fixes
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-slate-500 hidden md:inline mr-1">Défilement :</span>
            <button
              onClick={() => scrollTable('left')}
              className="p-1 px-2.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-1 text-[11px] border border-slate-700"
              title="Défiler vers la gauche"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Gauche</span>
            </button>
            <button
              onClick={() => scrollTable('right')}
              className="p-1 px-2.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-1 text-[11px] border border-slate-700"
              title="Défiler vers la droite"
            >
              <span className="hidden sm:inline">Droite</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Conteneur avec défilement vertical et horizontal fixe */}
        <div
          ref={tableContainerRef}
          className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-280px)] min-h-[360px] custom-table-scrollbar relative"
        >
          <table className="w-full text-left text-xs border-collapse min-w-[950px]">
            <thead className="sticky top-0 z-20 shadow-md">
              <tr
                style={{
                  backgroundColor: customSettings?.headerBg || '#0F2537',
                  color: customSettings?.headerText || '#FFFFFF',
                }}
                className="border-b border-slate-700 font-bold uppercase tracking-wider transition-colors"
              >
                <th className="sticky top-0 z-20 py-3 px-4 border-r border-slate-700/80 w-24 bg-inherit">{customSettings?.columnLabels?.ref || 'Réf Pièce'}</th>
                <th className="sticky top-0 z-20 py-3 px-4 border-r border-slate-700/80 bg-inherit">{customSettings?.columnLabels?.designation || 'Désignation de la pièce'}</th>
                <th className="sticky top-0 z-20 py-3 px-4 text-right border-r border-slate-700/80 bg-inherit">{customSettings?.columnLabels?.prixAchat || 'Prix d\'Achat HT'}</th>
                <th className="sticky top-0 z-20 py-3 px-4 text-right border-r border-slate-700/80 bg-inherit">{customSettings?.columnLabels?.prixVente || 'Prix de Vente HT'}</th>
                <th className="sticky top-0 z-20 py-3 px-3 text-center border-r border-slate-700/80 bg-inherit">{customSettings?.columnLabels?.quantite || 'Quantité en Stock'}</th>
                <th className="sticky top-0 z-20 py-3 px-3 text-center border-r border-slate-700/80 bg-inherit">
                  <div className="flex items-center justify-center gap-1">
                    <span>{customSettings?.columnLabels?.stockMin || 'Stock Min'}</span>
                    <Sliders className="w-3 h-3 text-amber-400" />
                  </div>
                </th>
                <th className="sticky top-0 z-20 py-3 px-4 text-right border-r border-slate-700/80 bg-inherit">
                  {customSettings?.columnLabels?.valeur || 'Valeur Stock HT'}
                </th>
                <th className="sticky top-0 z-20 py-3 px-4 text-center border-r border-slate-700/80 bg-inherit">
                  {customSettings?.columnLabels?.statut || 'Statut de Stock'}
                </th>
                <th className="sticky top-0 z-20 py-3 px-3 text-center w-36 bg-inherit">{customSettings?.columnLabels?.actions || 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredStock.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-slate-500 text-xs">
                    Aucune pièce trouvée dans le stock.
                  </td>
                </tr>
              ) : (
                filteredStock.map((item, idx) => {
                  const isAlert = item.quantite <= item.stockMin;
                  const isEven = idx % 2 === 0;
                  const valeurHT = item.prixAchatHT * item.quantite;
                  const isEditingMin = editingMinRef === item.ref;
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
                      key={item.ref}
                      className={`transition-colors hover:bg-blue-950/20 ${zebraClass}`}
                    >
                      <td className="py-2.5 px-4 font-mono font-semibold text-blue-400 border-r border-slate-800 whitespace-nowrap">
                        {item.ref}
                      </td>
                      <td className="py-2.5 px-4 font-medium text-white border-r border-slate-800">
                        {item.designation}
                      </td>
                      <td className="py-2.5 px-4 text-right font-mono text-slate-300 border-r border-slate-800">
                        {formatFCFA(item.prixAchatHT)}
                      </td>
                      <td className="py-2.5 px-4 text-right font-mono text-emerald-400 border-r border-slate-800">
                        {formatFCFA(item.prixVenteHT)}
                      </td>

                      {/* Quantité avec ajustement direct */}
                      <td className="py-2.5 px-3 text-center border-r border-slate-800">
                        <div className="flex items-center justify-center gap-1.5 font-mono">
                          <button
                            onClick={() => onUpdateQuantity(item.ref, -1)}
                            className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center text-xs transition-colors"
                            title="Diminuer quantité (-1)"
                          >
                            -
                          </button>
                          <span className={`w-8 font-bold ${isAlert ? 'text-rose-400' : 'text-white'}`}>
                            {item.quantite}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.ref, 1)}
                            className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center text-xs transition-colors"
                            title="Ajouter quantité (+1)"
                          >
                            +
                          </button>
                        </div>
                      </td>

                      {/* Stock Minimum avec MODIFICATION DIRECTE */}
                      <td className="py-2.5 px-3 text-center font-mono border-r border-slate-800">
                        {isEditingMin ? (
                          <div className="flex items-center justify-center gap-1">
                            <input
                              type="number"
                              min="0"
                              autoFocus
                              value={tempMinVal}
                              onChange={(e) => setTempMinVal(Math.max(0, Number(e.target.value)))}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') saveInlineEditMin(item.ref);
                                if (e.key === 'Escape') setEditingMinRef(null);
                              }}
                              onBlur={() => saveInlineEditMin(item.ref)}
                              className="w-12 px-1 py-0.5 bg-slate-950 border border-blue-500 rounded text-center text-xs text-amber-300 font-bold focus:outline-none"
                            />
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => onUpdateStockMin(item.ref, -1)}
                              className="w-5 h-5 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-amber-300 flex items-center justify-center text-xs transition-colors"
                              title="Réduire stock minimum (-1)"
                            >
                              -
                            </button>
                            <span
                              onClick={() => startInlineEditMin(item)}
                              className="w-7 font-bold text-amber-300 hover:bg-amber-500/10 hover:border hover:border-amber-500/30 rounded py-0.5 cursor-pointer transition-colors"
                              title="Cliquer pour taper un nombre directement"
                            >
                              {item.stockMin}
                            </span>
                            <button
                              onClick={() => onUpdateStockMin(item.ref, 1)}
                              className="w-5 h-5 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-amber-300 flex items-center justify-center text-xs transition-colors"
                              title="Augmenter stock minimum (+1)"
                            >
                              +
                            </button>
                          </div>
                        )}
                      </td>

                      {/* Valeur du Stock HT */}
                      <td className="py-2.5 px-4 text-right font-mono font-semibold text-white border-r border-slate-800">
                        {formatFCFA(valeurHT)}
                      </td>

                      {/* Statut Stock */}
                      <td className="py-2.5 px-4 text-center border-r border-slate-800">
                        {isAlert ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded text-xs font-bold bg-[#FEE2E2] text-[#991B1B] border border-rose-400/40 shadow-sm animate-pulse">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            <span>RÉAPPROVISIONNER</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded text-xs font-bold bg-[#DCFCE7] text-[#166534] border border-emerald-400/40">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>OK</span>
                          </span>
                        )}
                      </td>

                      {/* ACTIONS : MODIFIER & SUPPRIMER */}
                      <td className="py-2.5 px-3 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          {/* BOUTON MODIFIER */}
                          <button
                            onClick={() => handleOpenEdit(item)}
                            className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-blue-400 hover:text-white bg-blue-500/10 hover:bg-blue-600 border border-blue-500/20 hover:border-blue-600 rounded-lg transition-colors group shadow-sm"
                            title={`Modifier ${item.designation}`}
                          >
                            <Pencil className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                            <span className="hidden sm:inline">Modifier</span>
                          </button>

                          {/* BOUTON SUPPRIMER */}
                          <button
                            onClick={() => setItemToDelete(item)}
                            className="inline-flex items-center justify-center p-1 sm:px-2 sm:py-1 text-xs font-medium text-rose-400 hover:text-white bg-rose-500/10 hover:bg-rose-600 border border-rose-500/20 hover:border-rose-600 rounded-lg transition-colors group shadow-sm"
                            title={`Supprimer ${item.designation}`}
                          >
                            <Trash2 className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                            <span className="hidden sm:inline">Supprimer</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
            <tfoot className="sticky bottom-0 z-20 shadow-[0_-6px_20px_rgba(0,0,0,0.7)]">
              {/* TOTAL VALEUR DU STOCK - BARRE FIXE AU BAS DU TABLEAU */}
              <tr className="bg-slate-900 text-white font-bold border-t-2 border-slate-600">
                <td className="sticky bottom-0 z-20 py-3 px-4 border-r border-slate-700 bg-slate-900 shadow-[0_-2px_0_#475569]">
                  <span className="text-[10px] uppercase font-mono tracking-wider bg-slate-800 text-amber-400 px-1.5 py-0.5 rounded border border-amber-400/30">Total</span>
                </td>
                <td className="sticky bottom-0 z-20 py-3 px-4 uppercase tracking-wider text-amber-400 border-r border-slate-700 text-right bg-slate-900 shadow-[0_-2px_0_#475569]">
                  TOTAL VALEUR DU STOCK
                </td>
                <td className="sticky bottom-0 z-20 py-3 px-4 border-r border-slate-700 bg-slate-900 shadow-[0_-2px_0_#475569]"></td>
                <td className="sticky bottom-0 z-20 py-3 px-4 border-r border-slate-700 bg-slate-900 shadow-[0_-2px_0_#475569]"></td>
                <td className="sticky bottom-0 z-20 py-3 px-3 text-center font-mono border-r border-slate-700 text-white font-extrabold bg-slate-900 shadow-[0_-2px_0_#475569]">
                  {formatNumber(totalArticles)}
                </td>
                <td className="sticky bottom-0 z-20 py-3 px-3 border-r border-slate-700 text-center font-mono text-xs text-amber-400 bg-slate-900 shadow-[0_-2px_0_#475569]">
                  Seuils ajustables
                </td>
                <td className="sticky bottom-0 z-20 py-3 px-4 text-right font-mono text-emerald-400 border-r border-slate-700 text-sm font-extrabold bg-slate-900 shadow-[0_-2px_0_#475569]">
                  {formatFCFA(totalValeurAchatHT)}
                </td>
                <td className="sticky bottom-0 z-20 py-3 px-4 text-center font-mono text-xs text-slate-300 border-r border-slate-700 bg-slate-900 shadow-[0_-2px_0_#475569]">
                  {alertCount} alerte(s) active(s)
                </td>
                <td className="sticky bottom-0 z-20 py-3 px-3 bg-slate-900 shadow-[0_-2px_0_#475569]"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* MODAL MODIFIER UNE PIÈCE */}
      {itemToEdit && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <Pencil className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Modifier la Pièce</h3>
                  <span className="text-xs text-blue-400 font-mono font-semibold">{itemToEdit.ref}</span>
                </div>
              </div>
              <button
                onClick={() => setItemToEdit(null)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Désignation de la pièce</label>
                <input
                  type="text"
                  required
                  value={editDesignation}
                  onChange={(e) => setEditDesignation(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Prix Achat HT (FCFA)</label>
                  <input
                    type="number"
                    min="0"
                    step="100"
                    required
                    value={editPrixAchatHT}
                    onChange={(e) => setEditPrixAchatHT(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Prix Vente HT (FCFA)</label>
                  <input
                    type="number"
                    min="0"
                    step="100"
                    required
                    value={editPrixVenteHT}
                    onChange={(e) => setEditPrixVenteHT(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Quantité Actuelle en Stock</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={editQuantite}
                    onChange={(e) => setEditQuantite(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Seuil Stock Minimum <span className="text-amber-400 font-bold">*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={editStockMin}
                    onChange={(e) => setEditStockMin(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-amber-500/40 rounded-lg text-xs text-amber-300 focus:outline-none focus:border-amber-400 font-mono font-bold"
                  />
                </div>
              </div>

              {/* Aperçu en direct des calculs */}
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[11px] text-slate-400">Valeur recalculée du stock :</span>
                  <div className="font-bold font-mono text-emerald-400 mt-0.5">
                    {formatFCFA(editPrixAchatHT * editQuantite)}
                  </div>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400">Statut prévisionnel :</span>
                  <div className="mt-0.5">
                    {editQuantite <= editStockMin ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                        <AlertTriangle className="w-3 h-3" />
                        <span>RÉAPPROVISIONNER</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>OK (Conforme)</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setItemToEdit(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 transition-all"
                >
                  Enregistrer les modifications
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL CONFIRMATION DE SUPPRESSION */}
      {itemToDelete && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3 text-rose-400 mb-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-rose-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Supprimer cette référence ?</h3>
                <span className="text-xs text-slate-400 font-mono">{itemToDelete.ref}</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800 mb-4">
              Êtes-vous certain de vouloir retirer la pièce <strong className="text-white">{itemToDelete.designation}</strong> ({itemToDelete.quantite} en stock) de l'inventaire ?
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setItemToDelete(null)}
                className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/20 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Confirmer la suppression</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL TOUT SUPPRIMER DANS L'ONGLET STOCK */}
      {isClearAllModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-rose-500/30 rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3 text-rose-400 mb-4">
              <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Vider l'onglet Stock</h3>
                <p className="text-xs text-rose-400 font-medium">Action irréversible</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 mb-6 leading-relaxed">
              Êtes-vous certain de vouloir supprimer <strong>la totalité des {stock.length} références</strong> de pièces de cet onglet ?
              L'inventaire de stock sera entièrement vidé.
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
                  if (onClearAllStock) onClearAllStock();
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

      {/* MODAL NOUVELLE PIÈCE */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <PackagePlus className="w-5 h-5 text-blue-400" />
                <span>Ajouter une Référence au Stock</span>
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 pt-4">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Réf Pièce</label>
                  <input
                    type="text"
                    value={ref}
                    onChange={(e) => setRef(e.target.value)}
                    placeholder={`PIEC-${String(stock.length + 1).padStart(3, '0')}`}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-slate-300 mb-1">Désignation de la pièce</label>
                  <input
                    type="text"
                    required
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    placeholder="ex: Rétroviseur universel moto (la paire)"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Prix Achat HT (FCFA)</label>
                  <input
                    type="number"
                    min="0"
                    step="100"
                    required
                    value={prixAchatHT}
                    onChange={(e) => setPrixAchatHT(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Prix Vente HT (FCFA)</label>
                  <input
                    type="number"
                    min="0"
                    step="100"
                    required
                    value={prixVenteHT}
                    onChange={(e) => setPrixVenteHT(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Quantité Initiale</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={quantite}
                    onChange={(e) => setQuantite(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Seuil Alerte Stock Min</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={stockMin}
                    onChange={(e) => setStockMin(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-sm"
                >
                  Enregistrer Pièce
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

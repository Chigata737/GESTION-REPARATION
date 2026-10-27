import React, { useState, useRef } from 'react';
import { Reparation, Client, TabCustomSettings } from '../types';
import { MONTHS } from '../initialData';
import { formatFCFA, formatDateFr } from '../utils/formatters';
import { Search, Wrench, Plus, CheckCircle2, Clock, Smartphone, Banknote, Building, Trash2, AlertTriangle, Pencil, X, Calendar, User, FileText, Calculator, CreditCard, Check, SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';

interface ReparationsTabProps {
  reparations: Reparation[];
  clients: Client[];
  onAddReparation: (newRep: Reparation) => void;
  onUpdateReparation: (updatedRep: Reparation) => void;
  onDeleteReparation: (id: string) => void;
  onClearAllReparations?: () => void;
  customSettings?: TabCustomSettings;
  onOpenSettings?: () => void;
}

export const ReparationsTab: React.FC<ReparationsTabProps> = ({
  reparations,
  clients,
  onAddReparation,
  onUpdateReparation,
  onDeleteReparation,
  onClearAllReparations,
  customSettings,
  onOpenSettings,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [monthFilter, setMonthFilter] = useState<number | 'ALL'>('ALL');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState<'ALL' | 'Payé' | 'En attente'>('ALL');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isClearAllModalOpen, setIsClearAllModalOpen] = useState(false);
  const [repToDelete, setRepToDelete] = useState<Reparation | null>(null);
  const [repToEdit, setRepToEdit] = useState<Reparation | null>(null);

  // Form states Add
  const [selectedClient, setSelectedClient] = useState(clients[0]?.nom || '');
  const [vehicule, setVehicule] = useState(clients[0] ? `${clients[0].marque} (${clients[0].adresse})` : '');
  const [dateStr, setDateStr] = useState('2026-10-26');
  const [description, setDescription] = useState('');
  const [piecesHT, setPiecesHT] = useState<number>(15000);
  const [mainOeuvreHT, setMainOeuvreHT] = useState<number>(8000);
  const [modePaiement, setModePaiement] = useState<'Espèces' | 'Mobile Money' | 'Virement'>('Mobile Money');
  const [statutPaiement, setStatutPaiement] = useState<'Payé' | 'En attente'>('Payé');

  // Form states Edit
  const [editClient, setEditClient] = useState('');
  const [editVehicule, setEditVehicule] = useState('');
  const [editDateStr, setEditDateStr] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editPiecesHT, setEditPiecesHT] = useState<number>(0);
  const [editMainOeuvreHT, setEditMainOeuvreHT] = useState<number>(0);
  const [editModePaiement, setEditModePaiement] = useState<'Espèces' | 'Mobile Money' | 'Virement'>('Mobile Money');
  const [editStatutPaiement, setEditStatutPaiement] = useState<'Payé' | 'En attente'>('Payé');

  // Ref pour le conteneur du tableau des réparations
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const scrollTable = (direction: 'left' | 'right') => {
    if (tableContainerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      tableContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleClientChange = (clientNom: string) => {
    setSelectedClient(clientNom);
    const found = clients.find((c) => c.nom === clientNom);
    if (found) {
      setVehicule(`${found.marque} (${found.adresse})`);
    }
  };

  const formTotalHT = piecesHT + mainOeuvreHT;
  const formTVA = formTotalHT * 0.18;
  const formTotalTTC = formTotalHT + formTVA;

  const editFormTotalHT = editPiecesHT + editMainOeuvreHT;
  const editFormTVA = editFormTotalHT * 0.18;
  const editFormTotalTTC = editFormTotalHT + editFormTVA;

  const filteredReparations = reparations.filter((rep) => {
    if (paymentStatusFilter !== 'ALL' && rep.statutPaiement !== paymentStatusFilter) {
      return false;
    }
    if (monthFilter !== 'ALL') {
      const repMonth = new Date(rep.date).getMonth() + 1;
      if (repMonth !== monthFilter) return false;
    }

    const q = searchTerm.toLowerCase();
    return (
      rep.id.toLowerCase().includes(q) ||
      rep.client.toLowerCase().includes(q) ||
      rep.vehicule.toLowerCase().includes(q) ||
      rep.description.toLowerCase().includes(q) ||
      rep.modePaiement.toLowerCase().includes(q)
    );
  });

  // Totaux filtrés
  const sumPiecesHT = filteredReparations.reduce((sum, r) => sum + r.totalPiecesHT, 0);
  const sumMOHT = filteredReparations.reduce((sum, r) => sum + r.mainOeuvreHT, 0);
  const sumHT = filteredReparations.reduce((sum, r) => sum + (r.totalPiecesHT + r.mainOeuvreHT), 0);
  const sumTVA = sumHT * 0.18;
  const sumTTC = sumHT + sumTVA;

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description) return;

    const newId = `OR-2026-${String(reparations.length + 1).padStart(3, '0')}`;
    const newRep: Reparation = {
      id: newId,
      date: dateStr,
      client: selectedClient,
      vehicule,
      description,
      totalPiecesHT: Number(piecesHT),
      mainOeuvreHT: Number(mainOeuvreHT),
      modePaiement,
      statutPaiement,
    };

    onAddReparation(newRep);
    setIsAddModalOpen(false);
    setDescription('');
  };

  const handleOpenEdit = (rep: Reparation) => {
    setRepToEdit(rep);
    setEditClient(rep.client);
    setEditVehicule(rep.vehicule);
    setEditDateStr(rep.date);
    setEditDescription(rep.description);
    setEditPiecesHT(rep.totalPiecesHT);
    setEditMainOeuvreHT(rep.mainOeuvreHT);
    setEditModePaiement(rep.modePaiement);
    setEditStatutPaiement(rep.statutPaiement);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!repToEdit || !editDescription) return;

    const updated: Reparation = {
      ...repToEdit,
      client: editClient,
      vehicule: editVehicule,
      date: editDateStr,
      description: editDescription,
      totalPiecesHT: Number(editPiecesHT),
      mainOeuvreHT: Number(editMainOeuvreHT),
      modePaiement: editModePaiement,
      statutPaiement: editStatutPaiement,
    };

    onUpdateReparation(updated);
    setRepToEdit(null);
  };

  const confirmDelete = () => {
    if (repToDelete) {
      onDeleteReparation(repToDelete.id);
      setRepToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-xl">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold text-white">{customSettings?.title || 'Registre des Réparations & Ordres d\'Atelier'}</h2>
            <span className="text-xs px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-mono">
              Onglet Excel #4
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            {customSettings?.subtitle || 'Suivi des fiches d\'intervention, facturation automatique HT / TVA 18% / TTC et archivage des règlements.'}
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

          {reparations.length > 0 && onClearAllReparations && (
            <button
              type="button"
              onClick={() => setIsClearAllModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-rose-500/15 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/30 transition-all shadow-sm"
              title="Supprimer tous les ordres de réparation de cet onglet"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-400 group-hover:text-white" />
              <span>Tout supprimer ({reparations.length})</span>
            </button>
          )}

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Nouvelle Fiche Réparation</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
        <div className="md:col-span-2 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher par client, moto, n° fiche, description..."
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <select
            value={monthFilter === 'ALL' ? 'ALL' : String(monthFilter)}
            onChange={(e) => setMonthFilter(e.target.value === 'ALL' ? 'ALL' : Number(e.target.value))}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-blue-500"
          >
            <option value="ALL">Tous les mois (Année 2026)</option>
            {MONTHS.map((m, idx) => (
              <option key={m} value={idx + 1}>
                Mois {idx + 1} - {m}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={paymentStatusFilter}
            onChange={(e) => setPaymentStatusFilter(e.target.value as any)}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-blue-500"
          >
            <option value="ALL">Tous les statuts de paiement</option>
            <option value="Payé">Payé uniquement</option>
            <option value="En attente">En attente uniquement</option>
          </select>
        </div>
      </div>

      {/* Styled Repairs Table with sticky headers, fixed totals footer, and fixed horizontal scrollbar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl flex flex-col">
        {/* Barre d'outils et de défilement horizontal */}
        <div className="px-4 py-2 bg-slate-950/70 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            <span className="font-medium text-slate-300">
              {filteredReparations.length} fiche{filteredReparations.length > 1 ? 's' : ''} affichée{filteredReparations.length > 1 ? 's' : ''}
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
          <table className="w-full text-left text-xs border-collapse min-w-[1250px]">
            <thead className="sticky top-0 z-20 shadow-md">
              <tr
                style={{
                  backgroundColor: customSettings?.headerBg || '#0F2537',
                  color: customSettings?.headerText || '#FFFFFF',
                }}
                className="border-b border-slate-700 font-bold uppercase tracking-wider transition-colors"
              >
                <th className="sticky top-0 z-20 py-3 px-3 border-r border-slate-700/80 w-24 bg-inherit">{customSettings?.columnLabels?.fiche || 'N° Fiche'}</th>
                <th className="sticky top-0 z-20 py-3 px-3 text-center border-r border-slate-700/80 w-24 bg-inherit">{customSettings?.columnLabels?.date || 'Date'}</th>
                <th className="sticky top-0 z-20 py-3 px-4 border-r border-slate-700/80 bg-inherit">{customSettings?.columnLabels?.client || 'Client'}</th>
                <th className="sticky top-0 z-20 py-3 px-4 border-r border-slate-700/80 bg-inherit">{customSettings?.columnLabels?.vehicule || 'Véhicule'}</th>
                <th className="sticky top-0 z-20 py-3 px-4 border-r border-slate-700/80 min-w-[180px] bg-inherit">{customSettings?.columnLabels?.desc || 'Description Intervention'}</th>
                <th className="sticky top-0 z-20 py-3 px-3 text-right border-r border-slate-700/80 bg-inherit">{customSettings?.columnLabels?.pieces || 'Total Pièces HT'}</th>
                <th className="sticky top-0 z-20 py-3 px-3 text-right border-r border-slate-700/80 bg-inherit">{customSettings?.columnLabels?.mo || 'Main d\'œuvre HT'}</th>
                <th className="sticky top-0 z-20 py-3 px-3 text-right border-r border-slate-700/80 bg-inherit">{customSettings?.columnLabels?.tva || 'TVA (18%)'}</th>
                <th className="sticky top-0 z-20 py-3 px-4 text-right border-r border-slate-700/80 bg-inherit">{customSettings?.columnLabels?.ttc || 'Total TTC'}</th>
                <th className="sticky top-0 z-20 py-3 px-3 text-center border-r border-slate-700/80 bg-inherit">{customSettings?.columnLabels?.paiement || 'Paiement'}</th>
                <th className="sticky top-0 z-20 py-3 px-3 text-center border-r border-slate-700/80 bg-inherit">{customSettings?.columnLabels?.statut || 'Statut'}</th>
                <th className="sticky top-0 z-20 py-3 px-3 text-center w-36 bg-inherit">{customSettings?.columnLabels?.actions || 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredReparations.length === 0 ? (
                <tr>
                  <td colSpan={12} className="py-8 text-center text-slate-500 text-xs">
                    Aucun ordre de réparation trouvé pour les filtres sélectionnés.
                  </td>
                </tr>
              ) : (
                filteredReparations.map((rep, idx) => {
                  const isEven = idx % 2 === 0;
                  const totalHT = rep.totalPiecesHT + rep.mainOeuvreHT;
                  const tva = totalHT * 0.18;
                  const totalTTC = totalHT + tva;
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
                      key={rep.id}
                      className={`transition-colors hover:bg-blue-950/20 ${zebraClass}`}
                    >
                      <td className="py-2.5 px-3 font-mono font-semibold text-blue-400 border-r border-slate-800 whitespace-nowrap">
                        {rep.id}
                      </td>
                      <td className="py-2.5 px-3 text-center font-mono text-slate-300 border-r border-slate-800 whitespace-nowrap">
                        {formatDateFr(rep.date)}
                      </td>
                      <td className="py-2.5 px-4 font-medium text-white border-r border-slate-800 whitespace-nowrap">
                        {rep.client}
                      </td>
                      <td className="py-2.5 px-4 text-slate-300 border-r border-slate-800 whitespace-nowrap">
                        {rep.vehicule}
                      </td>
                      <td className="py-2.5 px-4 text-slate-300 border-r border-slate-800">
                        {rep.description}
                      </td>

                      {/* Pièces HT */}
                      <td className="py-2.5 px-3 text-right font-mono text-blue-300 border-r border-slate-800 whitespace-nowrap">
                        {formatFCFA(rep.totalPiecesHT)}
                      </td>

                      {/* MO HT */}
                      <td className="py-2.5 px-3 text-right font-mono text-amber-300 border-r border-slate-800 whitespace-nowrap">
                        {formatFCFA(rep.mainOeuvreHT)}
                      </td>

                      {/* TVA 18% */}
                      <td className="py-2.5 px-3 text-right font-mono text-purple-300 border-r border-slate-800 whitespace-nowrap">
                        {formatFCFA(tva)}
                      </td>

                      {/* Total TTC */}
                      <td className="py-2.5 px-4 text-right font-mono font-bold text-emerald-400 border-r border-slate-800 whitespace-nowrap">
                        {formatFCFA(totalTTC)}
                      </td>

                      {/* Mode Paiement */}
                      <td className="py-2.5 px-3 text-center border-r border-slate-800 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-300">
                          {rep.modePaiement === 'Mobile Money' && <Smartphone className="w-3 h-3 text-amber-400" />}
                          {rep.modePaiement === 'Espèces' && <Banknote className="w-3 h-3 text-emerald-400" />}
                          {rep.modePaiement === 'Virement' && <Building className="w-3 h-3 text-blue-400" />}
                          <span>{rep.modePaiement}</span>
                        </span>
                      </td>

                      {/* Statut Paiement */}
                      <td className="py-2.5 px-3 text-center border-r border-slate-800 whitespace-nowrap">
                        {rep.statutPaiement === 'Payé' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Payé</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                            <Clock className="w-3 h-3" />
                            <span>En attente</span>
                          </span>
                        )}
                      </td>

                      {/* ACTIONS : MODIFIER & SUPPRIMER */}
                      <td className="py-2.5 px-3 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          {/* BOUTON MODIFIER */}
                          <button
                            onClick={() => handleOpenEdit(rep)}
                            className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-blue-400 hover:text-white bg-blue-500/10 hover:bg-blue-600 border border-blue-500/20 hover:border-blue-600 rounded-lg transition-colors group shadow-sm"
                            title={`Modifier ${rep.id}`}
                          >
                            <Pencil className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                            <span className="hidden sm:inline">Modifier</span>
                          </button>

                          {/* BOUTON SUPPRIMER */}
                          <button
                            onClick={() => setRepToDelete(rep)}
                            className="inline-flex items-center justify-center p-1 sm:px-2 sm:py-1 text-xs font-medium text-rose-400 hover:text-white bg-rose-500/10 hover:bg-rose-600 border border-rose-500/20 hover:border-rose-600 rounded-lg transition-colors group shadow-sm"
                            title={`Supprimer ${rep.id}`}
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
              {/* LIGNE TOTAUX GÉNÉRAL - BARRE FIXE AU BAS DU TABLEAU */}
              <tr className="bg-slate-900 text-white font-bold border-t-2 border-slate-600">
                <td colSpan={5} className="sticky bottom-0 z-20 py-3 px-4 text-right uppercase tracking-wider text-amber-400 border-r border-slate-700 bg-slate-900 shadow-[0_-2px_0_#475569]">
                  <div className="flex items-center justify-end gap-2">
                    <span className="text-[10px] uppercase font-mono tracking-wider bg-slate-800 text-amber-400 px-1.5 py-0.5 rounded border border-amber-400/30">Total</span>
                    <span>TOTAL GÉNÉRAL ({filteredReparations.length} RÉPARATION{filteredReparations.length > 1 ? 'S' : ''})</span>
                  </div>
                </td>
                <td className="sticky bottom-0 z-20 py-3 px-3 text-right font-mono text-blue-300 border-r border-slate-700 bg-slate-900 shadow-[0_-2px_0_#475569]">
                  {formatFCFA(sumPiecesHT)}
                </td>
                <td className="sticky bottom-0 z-20 py-3 px-3 text-right font-mono text-amber-300 border-r border-slate-700 bg-slate-900 shadow-[0_-2px_0_#475569]">
                  {formatFCFA(sumMOHT)}
                </td>
                <td className="sticky bottom-0 z-20 py-3 px-3 text-right font-mono text-purple-300 border-r border-slate-700 bg-slate-900 shadow-[0_-2px_0_#475569]">
                  {formatFCFA(sumTVA)}
                </td>
                <td className="sticky bottom-0 z-20 py-3 px-4 text-right font-mono text-emerald-400 border-r border-slate-700 text-sm font-extrabold bg-slate-900 shadow-[0_-2px_0_#475569]">
                  {formatFCFA(sumTTC)}
                </td>
                <td colSpan={2} className="sticky bottom-0 z-20 py-3 px-4 border-r border-slate-700 bg-slate-900 shadow-[0_-2px_0_#475569]"></td>
                <td className="sticky bottom-0 z-20 py-3 px-3 bg-slate-900 shadow-[0_-2px_0_#475569]"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* MODAL MODIFIER UN ORDRE DE RÉPARATION */}
      {repToEdit && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-2xl w-full shadow-2xl shadow-black/80 overflow-hidden my-6 animate-in fade-in zoom-in-95">
            <div className="bg-gradient-to-r from-[#0F2537] via-slate-900 to-slate-900 px-6 py-4.5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-inner">
                  <Pencil className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                    <span>Modifier la Fiche de Réparation</span>
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                    <span className="font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-semibold text-[11px] border border-blue-500/30">
                      {repToEdit.id}
                    </span>
                    <span>·</span>
                    <span className="text-slate-400">{repToEdit.client}</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setRepToEdit(null)}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition-colors"
                title="Fermer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-blue-400" />
                    <span>Nom du client</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editClient}
                    onChange={(e) => setEditClient(e.target.value)}
                    className="w-full h-11 px-3.5 bg-slate-950 border border-slate-700 hover:border-slate-600 focus:border-blue-500 rounded-xl text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-blue-400" />
                    <span>Date d'intervention</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={editDateStr}
                    onChange={(e) => setEditDateStr(e.target.value)}
                    className="w-full h-11 px-3.5 bg-slate-950 border border-slate-700 hover:border-slate-600 focus:border-blue-500 rounded-xl text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all [color-scheme:dark]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5 text-blue-400" />
                  <span>Véhicule / Modèle / Immatriculation</span>
                </label>
                <input
                  type="text"
                  required
                  value={editVehicule}
                  onChange={(e) => setEditVehicule(e.target.value)}
                  className="w-full h-11 px-3.5 bg-slate-950 border border-slate-700 hover:border-slate-600 focus:border-blue-500 rounded-xl text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-blue-400" />
                  <span>Description détaillée des travaux</span>
                </label>
                <textarea
                  rows={2}
                  required
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full p-3 bg-slate-950 border border-slate-700 hover:border-slate-600 focus:border-blue-500 rounded-xl text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                ></textarea>
              </div>

              {/* Financial calculations */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4.5 space-y-3.5">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
                    <Calculator className="w-4 h-4 text-blue-400" />
                    <span>Tarification & Calculs Automatiques</span>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20 font-mono font-medium">
                    TVA 18%
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-blue-300 mb-1 flex items-center justify-between">
                      <span>Total Pièces HT</span>
                      <span className="text-[11px] text-blue-400/80 font-mono font-normal">FCFA</span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="500"
                      required
                      value={editPiecesHT}
                      onChange={(e) => setEditPiecesHT(Number(e.target.value))}
                      className="w-full h-11 px-3.5 bg-blue-950/20 border-2 border-blue-500/30 focus:border-blue-400 rounded-xl text-sm sm:text-base font-mono font-bold text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-amber-300 mb-1 flex items-center justify-between">
                      <span>Main d'œuvre HT</span>
                      <span className="text-[11px] text-amber-400/80 font-mono font-normal">FCFA</span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="500"
                      required
                      value={editMainOeuvreHT}
                      onChange={(e) => setEditMainOeuvreHT(Number(e.target.value))}
                      className="w-full h-11 px-3.5 bg-amber-950/20 border-2 border-amber-500/30 focus:border-amber-400 rounded-xl text-sm sm:text-base font-mono font-bold text-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 grid grid-cols-3 gap-2.5 text-center">
                  <div className="bg-slate-900 border border-slate-700/80 p-2.5 rounded-xl">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Total HT</span>
                    <div className="text-xs sm:text-sm font-bold text-white font-mono mt-0.5">{formatFCFA(editFormTotalHT)}</div>
                  </div>
                  <div className="bg-purple-950/25 border border-purple-500/30 p-2.5 rounded-xl">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-purple-300">TVA (18%)</span>
                    <div className="text-xs sm:text-sm font-bold text-purple-300 font-mono mt-0.5">{formatFCFA(editFormTVA)}</div>
                  </div>
                  <div className="bg-emerald-950/30 border-2 border-emerald-500/40 p-2.5 rounded-xl shadow-lg shadow-emerald-950/30">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">Total TTC à Régler</span>
                    <div className="text-xs sm:text-base font-extrabold text-emerald-400 font-mono mt-0.5">{formatFCFA(editFormTotalTTC)}</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-blue-400" />
                    <span>Mode de règlement</span>
                  </label>
                  <select
                    value={editModePaiement}
                    onChange={(e) => setEditModePaiement(e.target.value as any)}
                    className="w-full h-11 px-3.5 bg-slate-950 border border-slate-700 hover:border-slate-600 focus:border-blue-500 rounded-xl text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
                  >
                    <option value="Mobile Money" className="bg-slate-900 text-slate-100">Mobile Money (Wave, Orange, MTN, Moov)</option>
                    <option value="Espèces" className="bg-slate-900 text-slate-100">Espèces (Cash)</option>
                    <option value="Virement" className="bg-slate-900 text-slate-100">Virement bancaire</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Statut d'encaissement</span>
                  </label>
                  <select
                    value={editStatutPaiement}
                    onChange={(e) => setEditStatutPaiement(e.target.value as any)}
                    className="w-full h-11 px-3.5 bg-slate-950 border border-slate-700 hover:border-slate-600 focus:border-blue-500 rounded-xl text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
                  >
                    <option value="Payé" className="bg-slate-900 text-emerald-400 font-semibold">Payé (Encaissé)</option>
                    <option value="En attente" className="bg-slate-900 text-amber-400 font-semibold">En attente de paiement</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 pt-5 border-t border-slate-800">
                <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-950/70 px-3 py-1.5 rounded-xl border border-slate-800 w-fit">
                  <span>Montant final TTC :</span>
                  <span className="font-mono font-bold text-emerald-400 text-sm">{formatFCFA(editFormTotalTTC)}</span>
                </div>

                <div className="flex items-center gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() => setRepToEdit(null)}
                    className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-xl transition-all shadow-sm active:scale-95"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-bold text-white rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-600/30 active:scale-95 transition-all"
                  >
                    <Check className="w-4 h-4 stroke-[2.5]" />
                    <span>Enregistrer les modifications</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL CONFIRMATION DE SUPPRESSION */}
      {repToDelete && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3 text-rose-400 mb-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-rose-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Supprimer cette fiche ?</h3>
                <span className="text-xs text-slate-400 font-mono">{repToDelete.id} · {formatDateFr(repToDelete.date)}</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800 mb-4">
              Êtes-vous certain de vouloir supprimer la fiche <strong className="text-white">{repToDelete.id}</strong> ({repToDelete.client} - {repToDelete.vehicule}) d'un montant de <strong className="text-emerald-400">{formatFCFA(repToDelete.totalPiecesHT + repToDelete.mainOeuvreHT + (repToDelete.totalPiecesHT + repToDelete.mainOeuvreHT) * 0.18)} TTC</strong> ?
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setRepToDelete(null)}
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

      {/* MODAL TOUT SUPPRIMER DANS L'ONGLET RÉPARATIONS */}
      {isClearAllModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-rose-500/30 rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3 text-rose-400 mb-4">
              <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Vider l'onglet Réparations</h3>
                <p className="text-xs text-rose-400 font-medium">Action irréversible</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 mb-6 leading-relaxed">
              Êtes-vous certain de vouloir supprimer <strong>la totalité des {reparations.length} ordres de réparation</strong> de cet onglet ?
              Le registre des interventions et les facturations seront entièrement vidés.
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
                  if (onClearAllReparations) onClearAllReparations();
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

      {/* MODAL NOUVELLE FICHE RÉPARATION */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-2xl w-full shadow-2xl shadow-black/80 overflow-hidden my-6 animate-in fade-in zoom-in-95">
            {/* Header avec gradient et badge */}
            <div className="bg-gradient-to-r from-[#0F2537] via-slate-900 to-slate-900 px-6 py-4.5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-inner">
                  <Wrench className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                    <span>Créer un Ordre de Réparation</span>
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                    <span className="font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-semibold text-[11px] border border-blue-500/30">
                      N° OR-2026-{String(reparations.length + 1).padStart(3, '0')}
                    </span>
                    <span>·</span>
                    <span className="text-slate-400">Atelier moto · TVA 18% automatique</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition-colors"
                title="Fermer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="p-6 space-y-4">
              {/* Row 1: Client & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-blue-400" />
                    <span>Client de l'atelier</span>
                  </label>
                  <select
                    value={selectedClient}
                    onChange={(e) => handleClientChange(e.target.value)}
                    className="w-full h-11 px-3.5 bg-slate-950 border border-slate-700 hover:border-slate-600 focus:border-blue-500 rounded-xl text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
                  >
                    {clients.map((c) => (
                      <option key={c.id} value={c.nom} className="bg-slate-900 text-slate-100">
                        {c.nom} ({c.marque})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-blue-400" />
                    <span>Date d'intervention</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={dateStr}
                    onChange={(e) => setDateStr(e.target.value)}
                    className="w-full h-11 px-3.5 bg-slate-950 border border-slate-700 hover:border-slate-600 focus:border-blue-500 rounded-xl text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all [color-scheme:dark]"
                  />
                </div>
              </div>

              {/* Row 2: Véhicule */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5 text-blue-400" />
                  <span>Véhicule / Modèle / Immatriculation</span>
                </label>
                <input
                  type="text"
                  required
                  value={vehicule}
                  onChange={(e) => setVehicule(e.target.value)}
                  placeholder="ex: Yamaha Crypton 110 (AB-123-CD)"
                  className="w-full h-11 px-3.5 bg-slate-950 border border-slate-700 hover:border-slate-600 focus:border-blue-500 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              {/* Row 3: Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-blue-400" />
                  <span>Description détaillée des travaux</span>
                </label>
                <textarea
                  rows={2}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="ex: Vidange 20W50, remplacement kit chaîne 428H et purge des freins..."
                  className="w-full p-3 bg-slate-950 border border-slate-700 hover:border-slate-600 focus:border-blue-500 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                ></textarea>
              </div>

              {/* Section Financière & Calculs automatiques */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4.5 space-y-3.5">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
                    <Calculator className="w-4 h-4 text-blue-400" />
                    <span>Tarification & Calculs Automatiques</span>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20 font-mono font-medium">
                    TVA 18%
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-blue-300 mb-1 flex items-center justify-between">
                      <span>Total Pièces HT</span>
                      <span className="text-[11px] text-blue-400/80 font-mono font-normal">FCFA</span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="500"
                      required
                      value={piecesHT}
                      onChange={(e) => setPiecesHT(Number(e.target.value))}
                      className="w-full h-11 px-3.5 bg-blue-950/20 border-2 border-blue-500/30 focus:border-blue-400 rounded-xl text-sm sm:text-base font-mono font-bold text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-amber-300 mb-1 flex items-center justify-between">
                      <span>Main d'œuvre HT</span>
                      <span className="text-[11px] text-amber-400/80 font-mono font-normal">FCFA</span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="500"
                      required
                      value={mainOeuvreHT}
                      onChange={(e) => setMainOeuvreHT(Number(e.target.value))}
                      className="w-full h-11 px-3.5 bg-amber-950/20 border-2 border-amber-500/30 focus:border-amber-400 rounded-xl text-sm sm:text-base font-mono font-bold text-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
                    />
                  </div>
                </div>

                {/* Résumé des totaux calculés en direct */}
                <div className="pt-2 border-t border-slate-800/80 grid grid-cols-3 gap-2.5 text-center">
                  <div className="bg-slate-900 border border-slate-700/80 p-2.5 rounded-xl">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Total HT</span>
                    <div className="text-xs sm:text-sm font-bold text-white font-mono mt-0.5">
                      {formatFCFA(formTotalHT)}
                    </div>
                  </div>
                  <div className="bg-purple-950/25 border border-purple-500/30 p-2.5 rounded-xl">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-purple-300">TVA (18%)</span>
                    <div className="text-xs sm:text-sm font-bold text-purple-300 font-mono mt-0.5">
                      {formatFCFA(formTVA)}
                    </div>
                  </div>
                  <div className="bg-emerald-950/30 border-2 border-emerald-500/40 p-2.5 rounded-xl shadow-lg shadow-emerald-950/30">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">Total TTC à Régler</span>
                    <div className="text-xs sm:text-base font-extrabold text-emerald-400 font-mono mt-0.5">
                      {formatFCFA(formTotalTTC)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Mode de règlement & Statut d'encaissement */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-blue-400" />
                    <span>Mode de règlement</span>
                  </label>
                  <select
                    value={modePaiement}
                    onChange={(e) => setModePaiement(e.target.value as any)}
                    className="w-full h-11 px-3.5 bg-slate-950 border border-slate-700 hover:border-slate-600 focus:border-blue-500 rounded-xl text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
                  >
                    <option value="Mobile Money" className="bg-slate-900 text-slate-100">Mobile Money (Wave, Orange, MTN, Moov)</option>
                    <option value="Espèces" className="bg-slate-900 text-slate-100">Espèces (Cash)</option>
                    <option value="Virement" className="bg-slate-900 text-slate-100">Virement bancaire</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Statut d'encaissement</span>
                  </label>
                  <select
                    value={statutPaiement}
                    onChange={(e) => setStatutPaiement(e.target.value as any)}
                    className="w-full h-11 px-3.5 bg-slate-950 border border-slate-700 hover:border-slate-600 focus:border-blue-500 rounded-xl text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
                  >
                    <option value="Payé" className="bg-slate-900 text-emerald-400 font-semibold">Payé (Encaissé)</option>
                    <option value="En attente" className="bg-slate-900 text-amber-400 font-semibold">En attente de paiement</option>
                  </select>
                </div>
              </div>

              {/* Boutons d'action du bas */}
              <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 pt-5 border-t border-slate-800">
                <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-950/70 px-3 py-1.5 rounded-xl border border-slate-800 w-fit">
                  <span>Montant final TTC :</span>
                  <span className="font-mono font-bold text-emerald-400 text-sm">{formatFCFA(formTotalTTC)}</span>
                </div>

                <div className="flex items-center gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-xl transition-all shadow-sm active:scale-95"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-bold text-white rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-600/30 active:scale-95 transition-all"
                  >
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                    <span>Créer Fiche d'Atelier</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { Client, TabCustomSettings } from '../types';
import { Search, UserPlus, Phone, MapPin, Trash2, AlertTriangle, Pencil, SlidersHorizontal } from 'lucide-react';

interface ClientsTabProps {
  clients: Client[];
  onAddClient: (newClient: Client) => void;
  onUpdateClient: (updatedClient: Client) => void;
  onDeleteClient: (id: string) => void;
  onClearAllClients?: () => void;
  customSettings?: TabCustomSettings;
  onOpenSettings?: () => void;
}

export const ClientsTab: React.FC<ClientsTabProps> = ({
  clients,
  onAddClient,
  onUpdateClient,
  onDeleteClient,
  onClearAllClients,
  customSettings,
  onOpenSettings,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isClearAllModalOpen, setIsClearAllModalOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);
  const [clientToEdit, setClientToEdit] = useState<Client | null>(null);

  // Form Add
  const [nom, setNom] = useState('');
  const [telephone, setTelephone] = useState('+225 ');
  const [adresse, setAdresse] = useState('Abidjan - ');
  const [marque, setMarque] = useState('Yamaha');

  // Form Edit
  const [editNom, setEditNom] = useState('');
  const [editTelephone, setEditTelephone] = useState('');
  const [editAdresse, setEditAdresse] = useState('');
  const [editMarque, setEditMarque] = useState('Yamaha');

  const filteredClients = clients.filter((c) => {
    const q = searchTerm.toLowerCase();
    return (
      c.id.toLowerCase().includes(q) ||
      c.nom.toLowerCase().includes(q) ||
      c.telephone.toLowerCase().includes(q) ||
      c.adresse.toLowerCase().includes(q) ||
      c.marque.toLowerCase().includes(q)
    );
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nom) return;

    const newId = `CLT-${String(clients.length + 1).padStart(3, '0')}`;
    const newClient: Client = {
      id: newId,
      nom,
      telephone,
      adresse,
      marque,
    };

    onAddClient(newClient);
    setIsAddModalOpen(false);
    setNom('');
  };

  const handleOpenEdit = (c: Client) => {
    setClientToEdit(c);
    setEditNom(c.nom);
    setEditTelephone(c.telephone);
    setEditAdresse(c.adresse);
    setEditMarque(c.marque);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientToEdit || !editNom) return;

    const updated: Client = {
      ...clientToEdit,
      nom: editNom,
      telephone: editTelephone,
      adresse: editAdresse,
      marque: editMarque,
    };

    onUpdateClient(updated);
    setClientToEdit(null);
  };

  const confirmDelete = () => {
    if (clientToDelete) {
      onDeleteClient(clientToDelete.id);
      setClientToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-xl">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold text-white">{customSettings?.title || 'Répertoire des Clients'}</h2>
            <span className="text-xs px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-mono">
              Onglet Excel #2
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            {customSettings?.subtitle || 'Ajout, modification et gestion des fiches propriétaires, contacts et marques de motocycles.'}
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

          {clients.length > 0 && onClearAllClients && (
            <button
              type="button"
              onClick={() => setIsClearAllModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-rose-500/15 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/30 transition-all shadow-sm"
              title="Supprimer tous les clients de cet onglet"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-400 group-hover:text-white" />
              <span>Tout supprimer ({clients.length})</span>
            </button>
          )}

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition-all"
          >
            <UserPlus className="w-4 h-4" />
            <span>Nouveau Client</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher un client par nom, téléphone, marque, adresse (ex: Kouassi, Traoré, Yamaha, Marcory)..."
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
        <div className="text-xs text-slate-400 font-mono hidden md:block">
          {filteredClients.length} / {clients.length} clients enregistrés
        </div>
      </div>

      {/* Styled Table matching Excel sheet without modele and immatriculation */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
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
                <th className="py-3 px-4 border-r border-slate-700/80 w-28">{customSettings?.columnLabels?.id || 'ID Client'}</th>
                <th className="py-3 px-4 border-r border-slate-700/80">{customSettings?.columnLabels?.nom || 'Nom & Prénom'}</th>
                <th className="py-3 px-4 border-r border-slate-700/80">{customSettings?.columnLabels?.telephone || 'Téléphone'}</th>
                <th className="py-3 px-4 border-r border-slate-700/80">{customSettings?.columnLabels?.adresse || 'Adresse / Ville'}</th>
                <th className="py-3 px-4 border-r border-slate-700/80">{customSettings?.columnLabels?.marque || 'Marque Moto'}</th>
                <th className="py-3 px-3 text-center w-36">{customSettings?.columnLabels?.actions || 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredClients.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500 text-xs">
                    Aucun client ne correspond aux critères de recherche.
                  </td>
                </tr>
              ) : (
                filteredClients.map((c, idx) => {
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
                      key={c.id}
                      className={`transition-colors hover:bg-blue-950/20 ${zebraClass}`}
                    >
                      <td className="py-3 px-4 font-mono font-semibold text-blue-400 border-r border-slate-800 whitespace-nowrap">
                        {c.id}
                      </td>
                      <td className="py-3 px-4 font-medium text-white border-r border-slate-800">
                        {c.nom}
                      </td>
                      <td className="py-3 px-4 text-slate-300 font-mono border-r border-slate-800">
                        <div className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-slate-500" />
                          <span>{c.telephone}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-400 border-r border-slate-800">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-500" />
                          <span>{c.adresse}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-200 border-r border-slate-800 font-semibold">
                        <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700/60 text-slate-200">
                          {c.marque}
                        </span>
                      </td>

                      {/* ACTIONS : MODIFIER & SUPPRIMER */}
                      <td className="py-3 px-3 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          {/* BOUTON MODIFIER */}
                          <button
                            onClick={() => handleOpenEdit(c)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-blue-400 hover:text-white bg-blue-500/10 hover:bg-blue-600 border border-blue-500/20 hover:border-blue-600 rounded-lg transition-colors group shadow-sm"
                            title={`Modifier ${c.nom}`}
                          >
                            <Pencil className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                            <span className="hidden sm:inline">Modifier</span>
                          </button>

                          {/* BOUTON SUPPRIMER */}
                          <button
                            onClick={() => setClientToDelete(c)}
                            className="inline-flex items-center justify-center p-1 sm:px-2.5 sm:py-1 text-xs font-medium text-rose-400 hover:text-white bg-rose-500/10 hover:bg-rose-600 border border-rose-500/20 hover:border-rose-600 rounded-lg transition-colors group shadow-sm"
                            title={`Supprimer ${c.nom}`}
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
          </table>
        </div>
      </div>

      {/* MODAL MODIFIER UN CLIENT */}
      {clientToEdit && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <Pencil className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Modifier le Client</h3>
                  <span className="text-xs text-blue-400 font-mono font-semibold">{clientToEdit.id}</span>
                </div>
              </div>
              <button
                onClick={() => setClientToEdit(null)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Nom & Prénom</label>
                <input
                  type="text"
                  required
                  value={editNom}
                  onChange={(e) => setEditNom(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Téléphone</label>
                  <input
                    type="text"
                    required
                    value={editTelephone}
                    onChange={(e) => setEditTelephone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Adresse / Ville</label>
                  <input
                    type="text"
                    required
                    value={editAdresse}
                    onChange={(e) => setEditAdresse(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Marque Moto</label>
                <select
                  value={editMarque}
                  onChange={(e) => setEditMarque(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Yamaha">Yamaha</option>
                  <option value="Honda">Honda</option>
                  <option value="Bajaj">Bajaj</option>
                  <option value="TVS">TVS</option>
                  <option value="Haojue">Haojue</option>
                  <option value="KTM">KTM</option>
                  <option value="Suzuki">Suzuki</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setClientToEdit(null)}
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
      {clientToDelete && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3 text-rose-400 mb-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-rose-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Supprimer ce client ?</h3>
                <span className="text-xs text-slate-400 font-mono">{clientToDelete.id}</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800 mb-4">
              Êtes-vous certain de vouloir retirer le client <strong className="text-white">{clientToDelete.nom}</strong> ({clientToDelete.marque}) du registre ?
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setClientToDelete(null)}
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

      {/* MODAL TOUT SUPPRIMER DANS L'ONGLET CLIENTS */}
      {isClearAllModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-rose-500/30 rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3 text-rose-400 mb-4">
              <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Vider l'onglet Clients</h3>
                <p className="text-xs text-rose-400 font-medium">Action irréversible</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 mb-6 leading-relaxed">
              Êtes-vous certain de vouloir supprimer <strong>la totalité des {clients.length} clients</strong> de cet onglet ?
              Le répertoire des clients sera entièrement vidé.
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
                  if (onClearAllClients) onClearAllClients();
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

      {/* MODAL AJOUTER CLIENT */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-blue-400" />
                <span>Nouveau Client</span>
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Nom & Prénom</label>
                <input
                  type="text"
                  required
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  placeholder="ex: KOUADIO Ange Michel"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Téléphone</label>
                  <input
                    type="text"
                    required
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Adresse / Ville</label>
                  <input
                    type="text"
                    required
                    value={adresse}
                    onChange={(e) => setAdresse(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Marque Moto</label>
                <select
                  value={marque}
                  onChange={(e) => setMarque(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Yamaha">Yamaha</option>
                  <option value="Honda">Honda</option>
                  <option value="Bajaj">Bajaj</option>
                  <option value="TVS">TVS</option>
                  <option value="Haojue">Haojue</option>
                  <option value="KTM">KTM</option>
                  <option value="Suzuki">Suzuki</option>
                  <option value="Autre">Autre</option>
                </select>
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
                  Enregistrer Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { INITIAL_CLIENTS, INITIAL_STOCK, INITIAL_REPARATIONS } from './initialData';
import { Client, StockItem, Reparation, AppTableSettings } from './types';
import { loadSavedTableSettings, saveTableSettings } from './utils/tableSettings';
import {
  loadSavedClients,
  loadSavedStock,
  loadSavedReparations,
  saveAllAppData,
  getLastSavedTime,
  exportDatabaseBackup,
} from './utils/dataStorage';
import { Header } from './components/Header';
import { DashboardTab } from './components/DashboardTab';
import { ClientsTab } from './components/ClientsTab';
import { StockTab } from './components/StockTab';
import { ReparationsTab } from './components/ReparationsTab';
import { PythonScriptTab } from './components/PythonScriptTab';
import { DocumentationTab } from './components/DocumentationTab';
import { TableSettingsModal } from './components/TableSettingsModal';
import { CheckCircle2, X } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  
  // Données persistantes (chargées depuis le localStorage, conservées après fermeture)
  const [clients, setClients] = useState<Client[]>(loadSavedClients);
  const [stock, setStock] = useState<StockItem[]>(loadSavedStock);
  const [reparations, setReparations] = useState<Reparation[]>(loadSavedReparations);

  // État de sauvegarde
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(getLastSavedTime);
  const [isSavedJustNow, setIsSavedJustNow] = useState(false);
  const [toastNotification, setToastNotification] = useState<string | null>(null);

  // Sauvegarde automatique et persistante à chaque modification de données
  useEffect(() => {
    const res = saveAllAppData(clients, stock, reparations);
    if (res.success && res.timeStr) {
      setLastSavedTime(res.timeStr);
    }
  }, [clients, stock, reparations]);

  // Paramètres personnalisés des tableaux
  const [tableSettings, setTableSettings] = useState<AppTableSettings>(loadSavedTableSettings);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settingsTabKey, setSettingsTabKey] = useState<keyof AppTableSettings>('dashboard');

  const handleOpenSettings = (tabKey: keyof AppTableSettings = 'dashboard') => {
    setSettingsTabKey(tabKey);
    setIsSettingsOpen(true);
  };

  const handleSaveTableSettings = (newSettings: AppTableSettings) => {
    setTableSettings(newSettings);
    saveTableSettings(newSettings);
  };

  // Action explicite du bouton de sauvegarde
  const handleManualSave = () => {
    const res = saveAllAppData(clients, stock, reparations);
    if (res.success) {
      setLastSavedTime(res.timeStr);
      setIsSavedJustNow(true);
      setToastNotification(
        "Toutes vos données (Clients, Stock, Réparations) ont été sauvegardées. Elles resteront conservées même si vous fermez votre navigateur."
      );
      setTimeout(() => {
        setIsSavedJustNow(false);
      }, 2500);
      setTimeout(() => {
        setToastNotification(null);
      }, 5000);
    }
  };

  // Téléchargement d'une sauvegarde physique JSON
  const handleExportBackup = () => {
    exportDatabaseBackup(clients, stock, reparations, tableSettings);
    setToastNotification("Fichier de sauvegarde complet téléchargé sur votre ordinateur.");
    setTimeout(() => setToastNotification(null), 4000);
  };

  // Détection de modification des données
  const isModified =
    clients.length !== INITIAL_CLIENTS.length ||
    stock.length !== INITIAL_STOCK.length ||
    reparations.length !== INITIAL_REPARATIONS.length ||
    JSON.stringify(clients) !== JSON.stringify(INITIAL_CLIENTS) ||
    JSON.stringify(stock) !== JSON.stringify(INITIAL_STOCK);

  // Calcul du nombre d'articles en alerte
  const stockAlertCount = stock.filter((s) => s.quantite <= s.stockMin).length;

  // Handlers Clients
  const handleAddClient = (newClient: Client) => {
    setClients((prev) => [newClient, ...prev]);
  };

  const handleUpdateClient = (updatedClient: Client) => {
    setClients((prev) =>
      prev.map((c) => (c.id === updatedClient.id ? updatedClient : c))
    );
  };

  const handleDeleteClient = (id: string) => {
    setClients((prev) => prev.filter((c) => c.id !== id));
  };

  // Handlers Stock
  const handleAddStockItem = (newItem: StockItem) => {
    setStock((prev) => [newItem, ...prev]);
  };

  const handleUpdateQuantity = (ref: string, delta: number) => {
    setStock((prev) =>
      prev.map((item) => {
        if (item.ref === ref) {
          const nextQte = Math.max(0, item.quantite + delta);
          return { ...item, quantite: nextQte };
        }
        return item;
      })
    );
  };

  const handleUpdateStockMin = (ref: string, delta: number) => {
    setStock((prev) =>
      prev.map((item) => {
        if (item.ref === ref) {
          const nextMin = Math.max(0, item.stockMin + delta);
          return { ...item, stockMin: nextMin };
        }
        return item;
      })
    );
  };

  const handleSetStockMin = (ref: string, newMin: number) => {
    setStock((prev) =>
      prev.map((item) => {
        if (item.ref === ref) {
          return { ...item, stockMin: Math.max(0, newMin) };
        }
        return item;
      })
    );
  };

  const handleUpdateStockItem = (updatedItem: StockItem) => {
    setStock((prev) =>
      prev.map((item) => (item.ref === updatedItem.ref ? updatedItem : item))
    );
  };

  const handleDeleteStockItem = (ref: string) => {
    setStock((prev) => prev.filter((item) => item.ref !== ref));
  };

  // Handlers Réparations
  const handleAddReparation = (newRep: Reparation) => {
    setReparations((prev) => [newRep, ...prev]);
  };

  const handleUpdateReparation = (updatedRep: Reparation) => {
    setReparations((prev) =>
      prev.map((r) => (r.id === updatedRep.id ? updatedRep : r))
    );
  };

  const handleDeleteReparation = (id: string) => {
    setReparations((prev) => prev.filter((r) => r.id !== id));
  };

  // Handlers pour tout supprimer par onglet précis
  const handleClearAllClients = () => {
    setClients([]);
    setToastNotification("Tous les clients ont été supprimés de l'onglet Clients.");
    setTimeout(() => setToastNotification(null), 4000);
  };

  const handleClearAllStock = () => {
    setStock([]);
    setToastNotification("Toutes les pièces ont été supprimées de l'onglet Stock.");
    setTimeout(() => setToastNotification(null), 4000);
  };

  const handleClearAllReparations = () => {
    setReparations([]);
    setToastNotification("Tous les ordres de réparation ont été supprimés.");
    setTimeout(() => setToastNotification(null), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans relative">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        stockAlertCount={stockAlertCount}
        isModified={isModified}
        onSaveData={handleManualSave}
        lastSavedTime={lastSavedTime}
        isSavedJustNow={isSavedJustNow}
        onExportBackup={handleExportBackup}
        onOpenSettings={() => {
          const tabKey = (['dashboard', 'clients', 'stock', 'reparations'].includes(activeTab)
            ? activeTab
            : 'dashboard') as keyof AppTableSettings;
          handleOpenSettings(tabKey);
        }}
      />

      {/* NOTIFICATION FLOTTANTE DE SAUVEGARDE */}
      {toastNotification && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-slate-900 border border-emerald-500/40 rounded-xl p-4 shadow-2xl shadow-black/80 flex items-start gap-3 animate-in fade-in slide-in-from-bottom-5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Mise à jour enregistrée</h4>
            <p className="text-xs text-slate-300 mt-0.5">{toastNotification}</p>
          </div>
          <button
            onClick={() => setToastNotification(null)}
            className="text-slate-400 hover:text-white transition-colors p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'dashboard' && (
          <DashboardTab
            reparations={reparations}
            stock={stock}
            customSettings={tableSettings.dashboard}
            onOpenSettings={() => handleOpenSettings('dashboard')}
            onClearDashboardData={handleClearAllReparations}
          />
        )}

        {activeTab === 'clients' && (
          <ClientsTab
            clients={clients}
            onAddClient={handleAddClient}
            onUpdateClient={handleUpdateClient}
            onDeleteClient={handleDeleteClient}
            onClearAllClients={handleClearAllClients}
            customSettings={tableSettings.clients}
            onOpenSettings={() => handleOpenSettings('clients')}
          />
        )}

        {activeTab === 'stock' && (
          <StockTab
            stock={stock}
            onAddStockItem={handleAddStockItem}
            onUpdateQuantity={handleUpdateQuantity}
            onUpdateStockMin={handleUpdateStockMin}
            onSetStockMin={handleSetStockMin}
            onUpdateStockItem={handleUpdateStockItem}
            onDeleteStockItem={handleDeleteStockItem}
            onClearAllStock={handleClearAllStock}
            customSettings={tableSettings.stock}
            onOpenSettings={() => handleOpenSettings('stock')}
          />
        )}

        {activeTab === 'reparations' && (
          <ReparationsTab
            reparations={reparations}
            clients={clients}
            onAddReparation={handleAddReparation}
            onUpdateReparation={handleUpdateReparation}
            onDeleteReparation={handleDeleteReparation}
            onClearAllReparations={handleClearAllReparations}
            customSettings={tableSettings.reparations}
            onOpenSettings={() => handleOpenSettings('reparations')}
          />
        )}

        {activeTab === 'python' && (
          <PythonScriptTab />
        )}

        {activeTab === 'docs' && (
          <DocumentationTab />
        )}
      </main>

      {/* MODAL DE PARAMÈTRES ET PERSONNALISATION DES TABLEAUX */}
      <TableSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        activeTabKey={settingsTabKey}
        settings={tableSettings}
        onSaveSettings={handleSaveTableSettings}
      />

      <footer className="border-t border-slate-900 bg-slate-950/80 py-5 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            MOTO-GESTION PRO · Système d'atelier & Générateur Excel openpyxl · FCFA & TVA 18%
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Fichier modèle : <code className="text-blue-400">Gestion_Garage_Motocycles_Graphique.xlsx</code></span>
            <span>·</span>
            <span>Gestion complète des clients, stocks et réparations</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

import React from 'react';
import { Download, FileSpreadsheet, Code2, Wrench, Package, Users, BarChart3, BookOpen, SlidersHorizontal, Save, Check, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  stockAlertCount: number;
  isModified?: boolean;
  onOpenSettings?: () => void;
  onSaveData?: () => void;
  lastSavedTime?: string | null;
  isSavedJustNow?: boolean;
  onExportBackup?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  stockAlertCount,
  isModified = false,
  onOpenSettings,
  onSaveData,
  lastSavedTime,
  isSavedJustNow = false,
  onExportBackup,
}) => {
  const tabs = [
    { id: 'dashboard', label: 'Tableau de Bord', icon: BarChart3 },
    { id: 'clients', label: 'Clients & Véhicules', icon: Users },
    { id: 'stock', label: 'Stock & Pièces', icon: Package, badge: stockAlertCount > 0 ? stockAlertCount : undefined },
    { id: 'reparations', label: 'Réparations (OR)', icon: Wrench },
    { id: 'python', label: 'Code Python openpyxl', icon: Code2 },
    { id: 'docs', label: 'Guide & Formules', icon: BookOpen },
  ];

  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-white tracking-tight">
                  MOTO-GESTION PRO
                </h1>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
                  openpyxl 3.1.5
                </span>
                <span className="text-xs font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded">
                  FCFA (TVA 18%)
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <p className="text-xs text-slate-400">
                  Système de gestion d'atelier & Générateur de classeur Excel
                </p>
                <span className="text-slate-600 hidden sm:inline">•</span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Données conservées à la fermeture</span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            {/* BOUTON SAUVEGARDER MANUELLEMENT */}
            {onSaveData && (
              <button
                type="button"
                onClick={onSaveData}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg shadow-md transition-all ${
                  isSavedJustNow
                    ? 'bg-emerald-500 text-white shadow-emerald-500/30 scale-105'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/25 active:scale-95'
                }`}
                title="Enregistrer toutes vos données afin qu'elles restent intactes même après fermeture de l'application"
              >
                {isSavedJustNow ? (
                  <>
                    <Check className="w-4 h-4 text-white stroke-[2.5]" />
                    <span>Enregistré !</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 text-emerald-100" />
                    <span>Sauvegarder</span>
                  </>
                )}
              </button>
            )}

            {/* BADGE STATUT SAUVEGARDE */}
            {lastSavedTime && (
              <div className="hidden xl:flex items-center gap-1 text-[11px] text-slate-400 font-mono bg-slate-950/70 border border-slate-800 px-2.5 py-2 rounded-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Enregistré à {lastSavedTime}</span>
              </div>
            )}

            {onOpenSettings && (
              <button
                type="button"
                onClick={onOpenSettings}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 transition-colors shadow-sm"
                title="Personnaliser les couleurs et en-têtes des tableaux"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-blue-400" />
                <span>Paramètres</span>
              </button>
            )}

            {onExportBackup && (
              <button
                type="button"
                onClick={onExportBackup}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors shadow-sm"
                title="Télécharger une copie de sauvegarde JSON complète de vos données"
              >
                <Download className="w-3.5 h-3.5 text-slate-400" />
                <span>Backup JSON</span>
              </button>
            )}

            <a
              href="/generer_excel.py"
              download="generer_excel.py"
              className="inline-flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors shadow-sm"
              title="Télécharger le script Python complet"
            >
              <Code2 className="w-4 h-4 text-amber-400" />
              <span>Script Python (.py)</span>
            </a>
            <a
              href="/Gestion_Garage_Motocycles_Graphique.xlsx"
              download="Gestion_Garage_Motocycles_Graphique.xlsx"
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              title="Télécharger le classeur Excel final généré avec formules et graphique"
            >
              <Download className="w-4 h-4" />
              <span>Télécharger Excel (.xlsx)</span>
            </a>
          </div>
        </div>

        {/* Tab navigation */}
        <nav className="flex space-x-1 overflow-x-auto pb-2 scrollbar-none" aria-label="Tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span className="ml-1 px-1.5 py-0.5 text-[10px] font-bold bg-rose-500 text-white rounded-full">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

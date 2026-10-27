import React, { useState } from 'react';
import { AppTableSettings, TabCustomSettings } from '../types';
import { HEADER_COLOR_PRESETS, TEXT_COLOR_PRESETS, DEFAULT_TABLE_SETTINGS } from '../utils/tableSettings';
import { SlidersHorizontal, Palette, Type, RotateCcw, Check, X, Sparkles, Table2, Layers } from 'lucide-react';

interface TableSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTabKey: keyof AppTableSettings;
  settings: AppTableSettings;
  onSaveSettings: (newSettings: AppTableSettings) => void;
}

const TAB_NAMES: Record<keyof AppTableSettings, string> = {
  dashboard: 'Tableau de Bord',
  clients: 'Clients & Véhicules',
  stock: 'Stock & Pièces',
  reparations: 'Réparations (OR)',
};

export const TableSettingsModal: React.FC<TableSettingsModalProps> = ({
  isOpen,
  onClose,
  activeTabKey,
  settings,
  onSaveSettings,
}) => {
  if (!isOpen) return null;

  const [activeSubTab, setActiveSubTab] = useState<'colors' | 'headers'>('colors');
  const [currentTabKey, setCurrentTabKey] = useState<keyof AppTableSettings>(activeTabKey);

  // Local draft of settings
  const [draftSettings, setDraftSettings] = useState<AppTableSettings>(JSON.parse(JSON.stringify(settings)));
  const [applyToAllTabs, setApplyToAllTabs] = useState(false);

  const currentTabSettings: TabCustomSettings = draftSettings[currentTabKey];
  const defaultTabSettings: TabCustomSettings = DEFAULT_TABLE_SETTINGS[currentTabKey];

  // Updates for current tab
  const updateCurrentTab = (updates: Partial<TabCustomSettings>) => {
    setDraftSettings((prev) => {
      const updatedTab = { ...prev[currentTabKey], ...updates };
      const nextSettings = { ...prev, [currentTabKey]: updatedTab };

      // If apply to all is checked and color was updated
      if (applyToAllTabs && updates.headerBg) {
        Object.keys(nextSettings).forEach((key) => {
          const k = key as keyof AppTableSettings;
          nextSettings[k] = { ...nextSettings[k], headerBg: updates.headerBg! };
        });
      }

      if (applyToAllTabs && updates.headerText) {
        Object.keys(nextSettings).forEach((key) => {
          const k = key as keyof AppTableSettings;
          nextSettings[k] = { ...nextSettings[k], headerText: updates.headerText! };
        });
      }

      return nextSettings;
    });
  };

  const handleColumnLabelChange = (colKey: string, newLabel: string) => {
    updateCurrentTab({
      columnLabels: {
        ...currentTabSettings.columnLabels,
        [colKey]: newLabel,
      },
    });
  };

  const handleResetCurrentTab = () => {
    setDraftSettings((prev) => ({
      ...prev,
      [currentTabKey]: JSON.parse(JSON.stringify(DEFAULT_TABLE_SETTINGS[currentTabKey])),
    }));
  };

  const handleResetAll = () => {
    setDraftSettings(JSON.parse(JSON.stringify(DEFAULT_TABLE_SETTINGS)));
  };

  const handleSave = () => {
    onSaveSettings(draftSettings);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-2xl w-full shadow-2xl shadow-black/80 overflow-hidden my-6 animate-in fade-in zoom-in-95">
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-[#0F2537] via-slate-900 to-slate-900 px-6 py-4.5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-inner">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <span>Personnalisation & Paramètres Visuels</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Modifiez la couleur des en-têtes, l'intitulé des colonnes et le style des tableaux.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition-colors"
            title="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selection Bar (Which tab to customize) */}
        <div className="px-6 pt-4 pb-2 bg-slate-950/40 border-b border-slate-800 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {(Object.keys(TAB_NAMES) as Array<keyof AppTableSettings>).map((key) => {
              const isCurrent = currentTabKey === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setCurrentTabKey(key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                    isCurrent
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  {TAB_NAMES[key]}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 border-l border-slate-800 pl-3">
            <button
              type="button"
              onClick={() => setActiveSubTab('colors')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeSubTab === 'colors'
                  ? 'bg-slate-800 text-blue-400 border border-blue-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Couleurs & Style</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveSubTab('headers')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeSubTab === 'headers'
                  ? 'bg-slate-800 text-blue-400 border border-blue-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Type className="w-3.5 h-3.5" />
              <span>Titres & Colonnes</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-5">
          {/* Live Preview Box */}
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold flex items-center gap-1.5 text-slate-300">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Aperçu en direct du tableau ({TAB_NAMES[currentTabKey]})</span>
              </span>
              <span className="font-mono text-[11px] text-blue-400 bg-blue-950/40 px-2 py-0.5 rounded border border-blue-500/20">
                {currentTabSettings.headerBg}
              </span>
            </div>

            {/* Mini Table Mockup */}
            <div className="rounded-lg overflow-hidden border border-slate-700/60 shadow-md">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr
                    style={{
                      backgroundColor: currentTabSettings.headerBg,
                      color: currentTabSettings.headerText,
                    }}
                    className="font-bold uppercase tracking-wider text-[11px] transition-colors"
                  >
                    {Object.values(currentTabSettings.columnLabels).slice(0, 4).map((label, idx) => (
                      <th key={idx} className="py-2.5 px-3 border-r border-white/10 last:border-r-0">
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-slate-900 border-b border-slate-800 text-slate-300 text-[11px]">
                    <td className="py-2 px-3 border-r border-slate-800">Ligne exemple 1</td>
                    <td className="py-2 px-3 border-r border-slate-800">Exemple valeur A</td>
                    <td className="py-2 px-3 border-r border-slate-800 font-mono text-blue-400">25 000 FCFA</td>
                    <td className="py-2 px-3">OK</td>
                  </tr>
                  <tr
                    className={`border-b border-slate-800 text-slate-300 text-[11px] ${
                      currentTabSettings.zebraStyle === 'slate'
                        ? 'bg-slate-800/40'
                        : currentTabSettings.zebraStyle === 'navy'
                        ? 'bg-blue-950/25'
                        : 'bg-slate-900'
                    }`}
                  >
                    <td className="py-2 px-3 border-r border-slate-800">Ligne exemple 2</td>
                    <td className="py-2 px-3 border-r border-slate-800">Exemple valeur B</td>
                    <td className="py-2 px-3 border-r border-slate-800 font-mono text-blue-400">45 000 FCFA</td>
                    <td className="py-2 px-3">OK</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* SUBTAB 1: COULEURS & STYLE */}
          {activeSubTab === 'colors' && (
            <div className="space-y-4">
              {/* Presets Header Color */}
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-2">
                  1. Nuancier de couleurs d'en-tête (Presets professionnels)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {HEADER_COLOR_PRESETS.map((p) => {
                    const isSelected = currentTabSettings.headerBg.toLowerCase() === p.hex.toLowerCase();
                    return (
                      <button
                        key={p.hex}
                        type="button"
                        onClick={() => updateCurrentTab({ headerBg: p.hex })}
                        className={`p-2 rounded-xl text-left border transition-all flex flex-col justify-between h-16 ${
                          isSelected
                            ? 'border-blue-400 ring-2 ring-blue-500/30 bg-slate-800 shadow-md'
                            : 'border-slate-800 bg-slate-950/80 hover:border-slate-700 hover:bg-slate-800/50'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span
                            className="w-4 h-4 rounded-full border border-white/20 shadow-sm"
                            style={{ backgroundColor: p.hex }}
                          ></span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-blue-400 stroke-[3]" />}
                        </div>
                        <div>
                          <div className="text-[11px] font-bold text-slate-200 truncate">{p.name}</div>
                          <div className="text-[10px] font-mono text-slate-400">{p.hex}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Color Picker */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl border border-white/20 shadow-md flex items-center justify-center shrink-0"
                    style={{ backgroundColor: currentTabSettings.headerBg }}
                  >
                    <Palette className="w-4 h-4 text-white drop-shadow" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-200">Couleur personnalisée au choix</span>
                    <p className="text-[11px] text-slate-400">Sélectionnez n'importe quel code hexadécimal libre</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={currentTabSettings.headerBg}
                    onChange={(e) => updateCurrentTab({ headerBg: e.target.value })}
                    className="w-9 h-9 rounded-lg cursor-pointer bg-transparent border-0 p-0"
                    title="Choisir une couleur avec la palette"
                  />
                  <input
                    type="text"
                    value={currentTabSettings.headerBg}
                    onChange={(e) => updateCurrentTab({ headerBg: e.target.value })}
                    placeholder="#0F2537"
                    className="w-24 h-9 px-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono font-bold text-slate-200 focus:outline-none focus:border-blue-500 uppercase"
                  />
                </div>
              </div>

              {/* Header Text Color */}
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-2">
                  2. Couleur du texte des en-têtes
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  {TEXT_COLOR_PRESETS.map((t) => {
                    const isSelected = currentTabSettings.headerText.toLowerCase() === t.hex.toLowerCase();
                    return (
                      <button
                        key={t.hex}
                        type="button"
                        onClick={() => updateCurrentTab({ headerText: t.hex })}
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                          isSelected
                            ? 'border-blue-500 bg-slate-800 text-white shadow-sm'
                            : 'border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-white/30"
                          style={{ backgroundColor: t.hex }}
                        ></span>
                        <span>{t.name}</span>
                        {isSelected && <Check className="w-3 h-3 text-blue-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Zebra Striping Style */}
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-2">
                  3. Style des lignes alternées (Zebra)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'slate', label: 'Ardoise Subtile', desc: 'Gris ardoise sombre doux' },
                    { id: 'navy', label: 'Bleu Nuit', desc: 'Harmonisé avec l\'atelier' },
                    { id: 'none', label: 'Sans alternance', desc: 'Fond uni uniforme' },
                  ].map((z) => {
                    const isSelected = currentTabSettings.zebraStyle === z.id;
                    return (
                      <button
                        key={z.id}
                        type="button"
                        onClick={() => updateCurrentTab({ zebraStyle: z.id as any })}
                        className={`p-2.5 rounded-xl text-left border transition-all ${
                          isSelected
                            ? 'border-blue-500 bg-blue-950/20 text-white shadow-sm'
                            : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                        }`}
                      >
                        <div className="text-xs font-bold text-slate-200">{z.label}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{z.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Apply to All Tabs Option */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <label className="flex items-center gap-2 text-xs font-medium text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={applyToAllTabs}
                    onChange={(e) => setApplyToAllTabs(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 bg-slate-950 border-slate-700 focus:ring-blue-500/20"
                  />
                  <span>Appliquer automatiquement cette couleur à <strong>tous les onglets</strong> du classeur</span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    const color = currentTabSettings.headerBg;
                    const textColor = currentTabSettings.headerText;
                    setDraftSettings((prev) => {
                      const next = { ...prev };
                      (Object.keys(next) as Array<keyof AppTableSettings>).forEach((k) => {
                        next[k] = { ...next[k], headerBg: color, headerText: textColor };
                      });
                      return next;
                    });
                  }}
                  className="px-2.5 py-1 text-[11px] font-semibold text-blue-400 hover:text-blue-300 bg-blue-500/10 hover:bg-blue-500/20 rounded-lg border border-blue-500/30 transition-colors"
                >
                  Harmoniser tout maintenant
                </button>
              </div>
            </div>
          )}

          {/* SUBTAB 2: TITRES & NOMS DES COLONNES */}
          {activeSubTab === 'headers' && (
            <div className="space-y-4">
              <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Titre principal de l'onglet ({TAB_NAMES[currentTabKey]})
                  </label>
                  <input
                    type="text"
                    value={currentTabSettings.title}
                    onChange={(e) => updateCurrentTab({ title: e.target.value })}
                    className="w-full h-10 px-3 bg-slate-900 border border-slate-700 rounded-lg text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Sous-titre descriptif
                  </label>
                  <input
                    type="text"
                    value={currentTabSettings.subtitle}
                    onChange={(e) => updateCurrentTab({ subtitle: e.target.value })}
                    className="w-full h-10 px-3 bg-slate-900 border border-slate-700 rounded-lg text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-semibold text-slate-200">
                    Intitulé des colonnes du tableau (Renommer à la volée)
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      updateCurrentTab({ columnLabels: { ...defaultTabSettings.columnLabels } });
                    }}
                    className="text-[11px] text-blue-400 hover:text-blue-300 flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Rétablir les libellés par défaut</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {Object.entries(currentTabSettings.columnLabels).map(([colKey, labelVal]) => {
                    const originalLabel = defaultTabSettings.columnLabels[colKey] || colKey;
                    const isChanged = labelVal !== originalLabel;

                    return (
                      <div
                        key={colKey}
                        className={`p-2.5 rounded-xl border transition-all ${
                          isChanged
                            ? 'bg-blue-950/20 border-blue-500/40'
                            : 'bg-slate-950/60 border-slate-800'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-mono text-slate-400 uppercase">
                            Colonne : <strong className="text-slate-300">{colKey}</strong>
                          </span>
                          {isChanged && (
                            <button
                              type="button"
                              onClick={() => handleColumnLabelChange(colKey, originalLabel)}
                              className="text-[10px] text-amber-400 hover:text-amber-300"
                              title="Rétablir le nom initial"
                            >
                              Rétablir ({originalLabel})
                            </button>
                          )}
                        </div>
                        <input
                          type="text"
                          value={labelVal}
                          onChange={(e) => handleColumnLabelChange(colKey, e.target.value)}
                          className="w-full h-9 px-3 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 px-6 py-4 bg-slate-950 border-t border-slate-800">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleResetCurrentTab}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-all"
              title="Réinitialiser l'onglet sélectionné aux valeurs d'origine"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Rétablir cet onglet</span>
            </button>
            <button
              type="button"
              onClick={handleResetAll}
              className="text-xs text-slate-500 hover:text-slate-300 px-2 py-1 transition-colors"
              title="Réinitialiser tous les onglets par défaut"
            >
              Tout réinitialiser
            </button>
          </div>

          <div className="flex items-center gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-xl transition-all shadow-sm"
            >
              Annuler
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-2 px-5 py-2 text-xs sm:text-sm font-bold text-white rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-600/30 active:scale-95 transition-all"
            >
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>Appliquer les Paramètres</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

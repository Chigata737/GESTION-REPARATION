import React, { useState } from 'react';
import { PYTHON_SCRIPT_CODE } from '../initialData';
import { Copy, Check, Download, Terminal, Sparkles, FileSpreadsheet, ShieldCheck, Cpu } from 'lucide-react';

export const PythonScriptTab: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(PYTHON_SCRIPT_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-xl">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold text-white">Code Source Python (Bibliothèque openpyxl)</h2>
            <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
              Script autonome prêt à l'emploi
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Script complet créant les 4 onglets, injectant les formules sans macro, appliquant la charte bleu nuit et générant l'histogramme BarChart.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors shadow-sm"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-blue-400" />}
            <span>{copied ? 'Copié !' : 'Copier le code'}</span>
          </button>
          <a
            href="/generer_excel.py"
            download="generer_excel.py"
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Télécharger generer_excel.py</span>
          </a>
        </div>
      </div>

      {/* Terminal execution instructions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
            <Terminal className="w-4 h-4" />
            <span>1. Installation openpyxl</span>
          </div>
          <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 select-all">
            pip install openpyxl
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Bibliothèque officielle pure-Python pour lire et écrire des fichiers Excel .xlsx (OpenXML).
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">
            <Cpu className="w-4 h-4" />
            <span>2. Exécution du script</span>
          </div>
          <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 select-all">
            python generer_excel.py
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Génère le fichier sans dépendance à Microsoft Excel ni à un système d'exploitation particulier.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
            <FileSpreadsheet className="w-4 h-4" />
            <span>3. Fichier produit</span>
          </div>
          <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono text-xs text-emerald-300 truncate">
            Gestion_Garage_Motocycles_Graphique.xlsx
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Compatible Microsoft Excel 2016+, Office 365, LibreOffice Calc et Google Sheets.
          </p>
        </div>
      </div>

      {/* Code Viewer */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900/80 border-b border-slate-800">
          <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
            </div>
            <span className="ml-2 font-bold text-white">generer_excel.py</span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-400">Python 3 · UTF-8 · 360 lignes</span>
          </div>
          <button
            onClick={handleCopy}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copié' : 'Copier'}</span>
          </button>
        </div>

        <div className="p-4 overflow-x-auto max-h-[600px] scrollbar-thin scrollbar-thumb-slate-800 font-mono text-xs text-slate-300 leading-relaxed">
          <pre className="text-slate-300 whitespace-pre">
            {PYTHON_SCRIPT_CODE}
          </pre>
        </div>
      </div>

      {/* Technical Highlights */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-blue-400" />
          <span>Points d'excellence technique du script openpyxl</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
          <div className="space-y-1.5 bg-slate-950/60 p-3.5 rounded-lg border border-slate-800/80">
            <span className="font-bold text-white flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              Formules natives sans écrasement de valeurs
            </span>
            <p className="text-slate-400">
              Le script n'écrit pas de sommes statiques codées en dur : il injecte des formules Excel réelles (<code className="text-amber-300">SUMIFS</code>, <code className="text-amber-300">MONTH</code>, <code className="text-amber-300">IF</code>, <code className="text-amber-300">COUNTIF</code>). Toute modification d'un ordre de réparation met à jour automatiquement le tableau de bord et l'histogramme.
            </p>
          </div>

          <div className="space-y-1.5 bg-slate-950/60 p-3.5 rounded-lg border border-slate-800/80">
            <span className="font-bold text-white flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              Formatage monétaire en Franc CFA (FCFA)
            </span>
            <p className="text-slate-400">
              Format personnalisé OpenXML <code className="text-cyan-300">#,##0 "FCFA"</code> appliqué uniformément sur toutes les cellules de montants (pièces, main d'œuvre, totaux HT, taxes TVA et TTC).
            </p>
          </div>

          <div className="space-y-1.5 bg-slate-950/60 p-3.5 rounded-lg border border-slate-800/80">
            <span className="font-bold text-white flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              Mise en forme conditionnelle openpyxl
            </span>
            <p className="text-slate-400">
              Utilisation de <code className="text-emerald-300">CellIsRule(operator='equal', formula=['"RÉAPPROVISIONNER"'])</code> pour surligner en rouge clair (#FEE2E2) avec police rouge foncée (#991B1B) les pièces sous le seuil d'alerte.
            </p>
          </div>

          <div className="space-y-1.5 bg-slate-950/60 p-3.5 rounded-lg border border-slate-800/80">
            <span className="font-bold text-white flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              Histogramme BarChart intégré sur la feuille
            </span>
            <p className="text-slate-400">
              Le graphique colonne <code className="text-purple-300">openpyxl.chart.BarChart()</code> est directement rattaché à l'ancrage <code className="text-purple-300">I7</code> du Tableau de Bord, avec deux séries : CA Pièces HT et CA Main d'œuvre HT.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

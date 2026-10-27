import React from 'react';
import { BookOpen, FileSpreadsheet, Layers, Sparkles, CheckCircle2, AlertTriangle, ArrowRight, Download } from 'lucide-react';

export const DocumentationTab: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-xl">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold text-white">Guide d'Architecture & Correspondance des Formules</h2>
            <span className="text-xs px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-mono">
              Manuel de Gestion d'Atelier
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Détails techniques, formules Excel bilingues (FR / EN OpenXML) et bonnes pratiques de gestion d'atelier moto.
          </p>
        </div>

        <a
          href="/Gestion_Garage_Motocycles_Graphique.xlsx"
          download="Gestion_Garage_Motocycles_Graphique.xlsx"
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition-all self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>Télécharger le Fichier Excel</span>
        </a>
      </div>

      {/* Structure des 4 onglets */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-400" />
          <span>Structure et Rôle des 4 Onglets</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-blue-400 text-sm">1. Tableau de Bord (Dashboard)</span>
              <span className="font-mono text-[10px] text-slate-500">Vue Direction</span>
            </div>
            <p className="text-slate-300">
              Console de pilotage managérial destinée au gérant du garage :
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-400 pl-1">
              <li><strong className="text-slate-200">Cartes KPI :</strong> CA Total TTC, Total TVA 18%, volume d'interventions, pièces en rupture.</li>
              <li><strong className="text-slate-200">Tableau 12 mois :</strong> Agrégation automatique des ventes de pièces et main d'œuvre via <code className="text-amber-300">SUMIFS</code>.</li>
              <li><strong className="text-slate-200">Histogramme BarChart :</strong> Visualisation graphique comparative mois par mois directement ancrée en cellule <code className="text-cyan-300">I7</code>.</li>
            </ul>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-400 text-sm">2. Clients & Véhicules</span>
              <span className="font-mono text-[10px] text-slate-500">Répertoire CRM</span>
            </div>
            <p className="text-slate-300">
              Registre centralisé des propriétaires et caractéristiques techniques de leurs engins :
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-400 pl-1">
              <li><strong className="text-slate-200">Identification :</strong> ID Client unique (CLT-001, etc.), nom, contact téléphonique et quartier/ville.</li>
              <li><strong className="text-slate-200">Parc moto :</strong> Marque (Yamaha, Honda, Bajaj, TVS, Haojue, KTM), modèle et immatriculation / n° de série.</li>
              <li>Permet d'assurer un suivi personnalisé de l'historique de chaque deux-roues.</li>
            </ul>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-400 text-sm">3. Stock & Pièces</span>
              <span className="font-mono text-[10px] text-slate-500">Magasin d'Atelier</span>
            </div>
            <p className="text-slate-300">
              Suivi permanent des pièces détachées et consommables courants :
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-400 pl-1">
              <li><strong className="text-slate-200">Valorisation :</strong> Formule <code className="text-amber-300">=Prix_Achat_HT * Quantité</code>.</li>
              <li><strong className="text-slate-200">Seuil de sécurité :</strong> Formule <code className="text-amber-300">=IF(Quantité &lt;= Stock_Min, "RÉAPPROVISIONNER", "OK")</code>.</li>
              <li><strong className="text-slate-200">Mise en forme conditionnelle :</strong> Alerte rouge vif (#FEE2E2 / #991B1B) automatique sans intervention manuelle.</li>
            </ul>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-purple-400 text-sm">4. Réparations (Ordres de Réparation)</span>
              <span className="font-mono text-[10px] text-slate-500">Journal d'Atelier</span>
            </div>
            <p className="text-slate-300">
              Journal exhaustif des prestations mécaniques et facturation client :
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-400 pl-1">
              <li><strong className="text-slate-200">Calcul HT :</strong> Formule <code className="text-amber-300">=Pièces_HT + Main_Oeuvre_HT</code>.</li>
              <li><strong className="text-slate-200">Taxes :</strong> TVA à 18% calculée par formule <code className="text-amber-300">=Total_HT * 0.18</code>.</li>
              <li><strong className="text-slate-200">Extraction temporelle :</strong> Formule <code className="text-amber-300">=MONTH(Date)</code> alimentant la consolidation mensuelle.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tableau de correspondance des formules Excel FR vs US/OpenXML */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
        <div className="p-4 border-b border-slate-800">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Tableau de Correspondance des Formules Excel (Français ⟷ OpenXML International)</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Important en automatisation Python openpyxl : les formules stockées dans le fichier XML doivent obligatoirement être en anglais avec des virgules (,), Excel les traduira automatiquement en français (avec points-virgules ;) lors de l'ouverture !
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#0F2537] text-white border-b border-slate-700 font-bold uppercase tracking-wider">
                <th className="py-3 px-4 border-r border-slate-700/80">Rôle Métier</th>
                <th className="py-3 px-4 border-r border-slate-700/80">Formule Excel en Français</th>
                <th className="py-3 px-4 border-r border-slate-700/80">Formule OpenXML dans openpyxl</th>
                <th className="py-3 px-4">Explication Technique</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-mono">
              <tr className="bg-slate-900">
                <td className="py-2.5 px-4 font-sans font-medium text-white border-r border-slate-800">
                  Somme conditionnelle mensuelle
                </td>
                <td className="py-2.5 px-4 text-amber-300 border-r border-slate-800">
                  =SOMME.SI.MULTIPLE(Réparations!$F$5:$F$24; Réparations!$M$5:$M$24; B9)
                </td>
                <td className="py-2.5 px-4 text-blue-300 border-r border-slate-800">
                  =SUMIFS(Réparations!$F$5:$F$24, Réparations!$M$5:$M$24, B9)
                </td>
                <td className="py-2.5 px-4 font-sans text-slate-400">
                  Totalise le montant uniquement si le mois extrait en colonne M correspond au n° du mois.
                </td>
              </tr>

              <tr className="bg-slate-800/40">
                <td className="py-2.5 px-4 font-sans font-medium text-white border-r border-slate-800">
                  Alerte de stock minimum
                </td>
                <td className="py-2.5 px-4 text-amber-300 border-r border-slate-800">
                  =SI(E5&lt;=F5; "RÉAPPROVISIONNER"; "OK")
                </td>
                <td className="py-2.5 px-4 text-blue-300 border-r border-slate-800">
                  =IF(E5&lt;=F5, "RÉAPPROVISIONNER", "OK")
                </td>
                <td className="py-2.5 px-4 font-sans text-slate-400">
                  Compare le stock physique disponible au seuil critique de sécurité.
                </td>
              </tr>

              <tr className="bg-slate-900">
                <td className="py-2.5 px-4 font-sans font-medium text-white border-r border-slate-800">
                  Extraction automatique du mois
                </td>
                <td className="py-2.5 px-4 text-amber-300 border-r border-slate-800">
                  =MOIS(B5)
                </td>
                <td className="py-2.5 px-4 text-blue-300 border-r border-slate-800">
                  =MONTH(B5)
                </td>
                <td className="py-2.5 px-4 font-sans text-slate-400">
                  Convertit la date d'intervention (ex: 08/01/2026) en entier 1..12 pour alimenter le Dashboard.
                </td>
              </tr>

              <tr className="bg-slate-800/40">
                <td className="py-2.5 px-4 font-sans font-medium text-white border-r border-slate-800">
                  Comptage des alertes de réappro
                </td>
                <td className="py-2.5 px-4 text-amber-300 border-r border-slate-800">
                  =NB.SI('Stock & Pièces'!H5:H19; "RÉAPPROVISIONNER")
                </td>
                <td className="py-2.5 px-4 text-blue-300 border-r border-slate-800">
                  =COUNTIF('Stock & Pièces'!H5:H19, "RÉAPPROVISIONNER")
                </td>
                <td className="py-2.5 px-4 font-sans text-slate-400">
                  Alimente la 4ème carte KPI du tableau de bord sans intervention manuelle.
                </td>
              </tr>

              <tr className="bg-slate-900">
                <td className="py-2.5 px-4 font-sans font-medium text-white border-r border-slate-800">
                  Comptage du volume de réparations
                </td>
                <td className="py-2.5 px-4 text-amber-300 border-r border-slate-800">
                  =NBVAL(Réparations!A5:A24)
                </td>
                <td className="py-2.5 px-4 text-blue-300 border-r border-slate-800">
                  =COUNTA(Réparations!A5:A24)
                </td>
                <td className="py-2.5 px-4 font-sans text-slate-400">
                  Compte le nombre de cellules non vides dans la colonne N° Fiche.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Spécificités fiscales et monétaires FCFA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Formatage Monétaire FCFA & Séparateur de Milliers</span>
          </h4>
          <p className="text-xs text-slate-300">
            Le code de formatage appliqué en Python via openpyxl est :
          </p>
          <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono text-xs text-amber-300">
            cell.number_format = '#,##0 "FCFA"'
          </div>
          <p className="text-xs text-slate-400">
            Ce format garantit que :
          </p>
          <ul className="list-disc list-inside text-xs text-slate-400 space-y-1">
            <li>Les milliers sont groupés avec un espace (ex: <code className="text-slate-200">25 500 FCFA</code>).</li>
            <li>Aucune décimale superflue n'est affichée (le FCFA n'utilise pas de centimes en pratique courante).</li>
            <li>Le suffixe <code className="text-slate-200">"FCFA"</code> reste un masque d'affichage : la cellule conserve sa valeur numérique pure pour que les formules de calcul fonctionnent.</li>
          </ul>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-purple-400" />
            <span>Fiscalité TVA 18% & Modes de Règlements d'Atelier</span>
          </h4>
          <p className="text-xs text-slate-300">
            Conforme aux normes de gestion d'entreprise en zone UEMOA / CEDEAO :
          </p>
          <ul className="list-disc list-inside text-xs text-slate-400 space-y-1">
            <li><strong className="text-slate-200">Taux de TVA à 18% :</strong> Calculé sur la base hors taxes totale (Pièces + Main d'œuvre).</li>
            <li><strong className="text-slate-200">Mobile Money :</strong> Règlement prédominant (Wave, Orange Money, MTN MoMo, Moov) avec traçabilité immédiate.</li>
            <li><strong className="text-slate-200">Espèces & Virements :</strong> Pour les règlements directs au comptoir ou factures pour flottes de livraison.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

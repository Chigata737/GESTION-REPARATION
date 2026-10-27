import { AppTableSettings, TabCustomSettings } from '../types';

export const DEFAULT_TABLE_SETTINGS: AppTableSettings = {
  dashboard: {
    title: 'Tableau de Bord & Indicateurs KPI',
    subtitle: 'Analyse financière, CA Pièces vs Main d\'œuvre, TVA 18% et alertes réapprovisionnement.',
    headerBg: '#0F2537',
    headerText: '#FFFFFF',
    zebraStyle: 'slate',
    columnLabels: {
      mois: 'Mois',
      caPieces: 'CA Pièces HT',
      caMO: 'Main d\'œuvre HT',
      caTotalHT: 'CA Total HT',
      tva: 'TVA (18%)',
      caTTC: 'CA Total TTC',
      nbOR: 'Nbre OR',
    },
  },
  clients: {
    title: 'Répertoire des Clients & Flotte Moto',
    subtitle: 'Fichier clients, coordonnées téléphoniques, adresses et affectation des motocycles.',
    headerBg: '#0F2537',
    headerText: '#FFFFFF',
    zebraStyle: 'slate',
    columnLabels: {
      id: 'ID Client',
      nom: 'Nom & Prénom',
      telephone: 'Téléphone',
      adresse: 'Adresse / Ville',
      marque: 'Marque Moto',
      actions: 'Actions',
    },
  },
  stock: {
    title: 'Registre de Stock & Pièces Détachées',
    subtitle: 'Gestion des pièces, prix d\'achat/vente HT, seuils d\'alerte et valorisation du stock.',
    headerBg: '#0F2537',
    headerText: '#FFFFFF',
    zebraStyle: 'slate',
    columnLabels: {
      ref: 'Réf Pièce',
      designation: 'Désignation',
      prixAchat: 'Prix Achat HT',
      prixVente: 'Prix Vente HT',
      quantite: 'Stock Actuel',
      stockMin: 'Stock Min',
      valeur: 'Valeur Stock HT',
      statut: 'Statut Stock',
      actions: 'Actions',
    },
  },
  reparations: {
    title: 'Registre des Réparations & Ordres d\'Atelier',
    subtitle: 'Suivi des interventions, facturation automatique HT / TVA 18% / TTC et archivage des règlements.',
    headerBg: '#0F2537',
    headerText: '#FFFFFF',
    zebraStyle: 'slate',
    columnLabels: {
      fiche: 'N° Fiche',
      date: 'Date',
      client: 'Client',
      vehicule: 'Véhicule',
      desc: 'Description Intervention',
      pieces: 'Total Pièces HT',
      mo: 'Main d\'œuvre HT',
      tva: 'TVA (18%)',
      ttc: 'Total TTC',
      paiement: 'Paiement',
      statut: 'Statut',
      actions: 'Actions',
    },
  },
};

export const HEADER_COLOR_PRESETS = [
  { name: 'Bleu Nuit Garage (Défaut)', hex: '#0F2537', desc: 'Bleu foncé sobre d\'atelier' },
  { name: 'Bleu Marine Océan', hex: '#1E3A8A', desc: 'Classique et moderne' },
  { name: 'Noir Carbone / Graphite', hex: '#111827', desc: 'Ultra sobre et élégant' },
  { name: 'Vert Émeraude Pro', hex: '#064E3B', desc: 'Finance et rentabilité' },
  { name: 'Rouge Racing Atelier', hex: '#881337', desc: 'Sport mécanique et énergie' },
  { name: 'Violet Impérial Tech', hex: '#4C1D95', desc: 'Technologique et distinctif' },
  { name: 'Ambre / Cuivre Chaud', hex: '#78350F', desc: 'Mécanique industrielle' },
  { name: 'Gris Ardoise Acier', hex: '#1E293B', desc: 'Neutre et professionnel' },
  { name: 'Cyan Nuit Profond', hex: '#0E7490', desc: 'Moderne et lumineux' },
  { name: 'Bleu Canard', hex: '#155E75', desc: 'Équilibré et raffiné' },
];

export const TEXT_COLOR_PRESETS = [
  { name: 'Blanc Pur', hex: '#FFFFFF' },
  { name: 'Bleu Ciel Lumineux', hex: '#93C5FD' },
  { name: 'Jaune Doré', hex: '#FDE047' },
  { name: 'Vert Menthe', hex: '#6EE7B7' },
  { name: 'Ambre Pâle', hex: '#FCD34D' },
];

const STORAGE_KEY = 'moto_garage_table_settings_v1';

export function loadSavedTableSettings(): AppTableSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_TABLE_SETTINGS;
    const parsed = JSON.parse(raw);
    return {
      dashboard: { ...DEFAULT_TABLE_SETTINGS.dashboard, ...parsed.dashboard },
      clients: { ...DEFAULT_TABLE_SETTINGS.clients, ...parsed.clients },
      stock: { ...DEFAULT_TABLE_SETTINGS.stock, ...parsed.stock },
      reparations: { ...DEFAULT_TABLE_SETTINGS.reparations, ...parsed.reparations },
    };
  } catch (e) {
    console.error('Erreur chargement des paramètres de tableau:', e);
    return DEFAULT_TABLE_SETTINGS;
  }
}

export function saveTableSettings(settings: AppTableSettings): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error('Erreur sauvegarde des paramètres de tableau:', e);
  }
}

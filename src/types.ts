export interface Client {
  id: string;
  nom: string;
  telephone: string;
  adresse: string;
  marque: string;
  modele?: string;
  immatriculation?: string;
}

export interface StockItem {
  ref: string;
  designation: string;
  prixAchatHT: number;
  prixVenteHT: number;
  quantite: number;
  stockMin: number;
}

export interface Reparation {
  id: string;
  date: string; // YYYY-MM-DD
  client: string;
  vehicule: string;
  description: string;
  totalPiecesHT: number;
  mainOeuvreHT: number;
  modePaiement: 'Espèces' | 'Mobile Money' | 'Virement';
  statutPaiement: 'Payé' | 'En attente';
}

export interface MonthlySummary {
  moisIndex: number;
  moisNom: string;
  caPiecesHT: number;
  caMainOeuvreHT: number;
  caTotalHT: number;
  tva18: number;
  caTotalTTC: number;
  nbReparations: number;
}

export interface TabCustomSettings {
  title: string;
  subtitle: string;
  headerBg: string;
  headerText: string;
  zebraStyle: 'slate' | 'navy' | 'none';
  columnLabels: Record<string, string>;
}

export interface AppTableSettings {
  dashboard: TabCustomSettings;
  clients: TabCustomSettings;
  stock: TabCustomSettings;
  reparations: TabCustomSettings;
}

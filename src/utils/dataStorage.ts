import { Client, StockItem, Reparation, AppTableSettings } from '../types';
import { INITIAL_CLIENTS, INITIAL_STOCK, INITIAL_REPARATIONS } from '../initialData';
import { DEFAULT_TABLE_SETTINGS, loadSavedTableSettings } from './tableSettings';

export const STORAGE_KEY_CLIENTS = 'moto_garage_clients_v2';
export const STORAGE_KEY_STOCK = 'moto_garage_stock_v2';
export const STORAGE_KEY_REPARATIONS = 'moto_garage_reparations_v2';
export const STORAGE_KEY_LAST_SAVED = 'moto_garage_last_saved_time_v2';

/**
 * Charge les clients depuis le localStorage ou retourne les données par défaut
 */
export function loadSavedClients(): Client[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CLIENTS);
    if (raw === null) return INITIAL_CLIENTS;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return INITIAL_CLIENTS;
  } catch (e) {
    console.error('Erreur chargement des clients sauvegardés:', e);
    return INITIAL_CLIENTS;
  }
}

/**
 * Charge le stock depuis le localStorage ou retourne les données par défaut
 */
export function loadSavedStock(): StockItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_STOCK);
    if (raw === null) return INITIAL_STOCK;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return INITIAL_STOCK;
  } catch (e) {
    console.error('Erreur chargement du stock sauvegardé:', e);
    return INITIAL_STOCK;
  }
}

/**
 * Charge les réparations depuis le localStorage ou retourne les données par défaut
 */
export function loadSavedReparations(): Reparation[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_REPARATIONS);
    if (raw === null) return INITIAL_REPARATIONS;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return INITIAL_REPARATIONS;
  } catch (e) {
    console.error('Erreur chargement des réparations sauvegardées:', e);
    return INITIAL_REPARATIONS;
  }
}


/**
 * Enregistre toutes les données dans le localStorage
 */
export function saveAllAppData(
  clients: Client[],
  stock: StockItem[],
  reparations: Reparation[]
): { success: boolean; timeStr: string } {
  try {
    localStorage.setItem(STORAGE_KEY_CLIENTS, JSON.stringify(clients));
    localStorage.setItem(STORAGE_KEY_STOCK, JSON.stringify(stock));
    localStorage.setItem(STORAGE_KEY_REPARATIONS, JSON.stringify(reparations));
    
    const now = new Date();
    const timeStr = now.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    localStorage.setItem(STORAGE_KEY_LAST_SAVED, timeStr);
    
    return { success: true, timeStr };
  } catch (e) {
    console.error('Erreur lors de la sauvegarde complète des données:', e);
    return { success: false, timeStr: '' };
  }
}

/**
 * Récupère l'horodatage de la dernière sauvegarde
 */
export function getLastSavedTime(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY_LAST_SAVED);
  } catch {
    return null;
  }
}

/**
 * Réinitialise complètement le stockage local pour revenir aux valeurs de démo
 */
export function resetSavedDataToFactory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY_CLIENTS);
    localStorage.removeItem(STORAGE_KEY_STOCK);
    localStorage.removeItem(STORAGE_KEY_REPARATIONS);
    localStorage.removeItem(STORAGE_KEY_LAST_SAVED);
  } catch (e) {
    console.error('Erreur lors de la réinitialisation du stockage:', e);
  }
}

/**
 * Exporte un fichier JSON de sauvegarde complet (téléchargement immédiat)
 */
export function exportDatabaseBackup(
  clients: Client[],
  stock: StockItem[],
  reparations: Reparation[],
  tableSettings?: AppTableSettings
): void {
  const data = {
    appName: 'MOTO-GESTION PRO',
    exportDate: new Date().toISOString(),
    version: '2.0',
    clients,
    stock,
    reparations,
    tableSettings: tableSettings || loadSavedTableSettings(),
  };

  const jsonBlob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(jsonBlob);
  const a = document.createElement('a');
  const dateStr = new Date().toISOString().split('T')[0];
  a.href = url;
  a.download = `sauvegarde_moto_gestion_${dateStr}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

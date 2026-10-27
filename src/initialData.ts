import { Client, StockItem, Reparation } from './types';

export const INITIAL_CLIENTS: Client[] = [
  { id: 'CLT-001', nom: 'KOUASSI Yao Jean', telephone: '+225 07 48 12 34 56', adresse: 'Abidjan - Treichville', marque: 'Yamaha', modele: 'Crypton T110', immatriculation: 'AB-4589-CI' },
  { id: 'CLT-002', nom: 'TRAORÉ Mamadou', telephone: '+225 05 64 22 19 80', adresse: 'Abidjan - Yopougon', marque: 'Bajaj', modele: 'Boxer BM 150', immatriculation: 'AB-9102-CI' },
  { id: 'CLT-003', nom: 'DIABATÉ Ibrahima', telephone: '+225 01 77 90 45 11', adresse: 'Abidjan - Marcory', marque: 'Honda', modele: 'Ace 110', immatriculation: 'AB-3312-CI' },
  { id: 'CLT-004', nom: 'KONAN Affoué Sylvie', telephone: '+225 07 09 88 76 23', adresse: 'Abidjan - Cocody', marque: 'Yamaha', modele: 'NMAX 155', immatriculation: 'AB-7721-CI' },
  { id: 'CLT-005', nom: 'BAKAYOKO Souleymane', telephone: '+225 05 55 43 21 00', adresse: 'Abidjan - Adjamé', marque: 'TVS', modele: 'Apache RTR 160', immatriculation: 'AB-2144-CI' },
  { id: 'CLT-006', nom: 'SÉKA Gnangoran Guy', telephone: '+225 07 88 11 02 44', adresse: 'Abidjan - Koumassi', marque: 'Haojue', modele: 'Lucky 110', immatriculation: 'AB-6650-CI' },
  { id: 'CLT-007', nom: "N'GUESSAN Koffi Éric", telephone: '+225 01 40 23 88 95', adresse: 'Abidjan - Port-Bouët', marque: 'KTM', modele: 'Duke 200', immatriculation: 'AB-1189-CI' },
  { id: 'CLT-008', nom: 'OUÉDRAOGO Rasmané', telephone: '+225 05 12 67 94 33', adresse: 'Abidjan - Abobo', marque: 'Bajaj', modele: 'Pulsar 180', immatriculation: 'AB-5431-CI' },
  { id: 'CLT-009', nom: 'AMANI Brou Patrice', telephone: '+225 07 33 55 88 12', adresse: 'Abidjan - Plateau', marque: 'Yamaha', modele: 'DT 125 Enduro', immatriculation: 'AB-8809-CI' },
  { id: 'CLT-010', nom: 'ZOUZOUA Mireille', telephone: '+225 01 02 44 89 77', adresse: 'Abidjan - Cocody Riviera', marque: 'Honda', modele: 'Wave 110i', immatriculation: 'AB-9923-CI' },
];

export const INITIAL_STOCK: StockItem[] = [
  { ref: 'PIEC-001', designation: 'Huile Moteur 20W50 4T (Bidon 1L)', prixAchatHT: 3500, prixVenteHT: 5500, quantite: 4, stockMin: 10 },
  { ref: 'PIEC-002', designation: "Bougie d'allumage standard (NGK C7HSA)", prixAchatHT: 1200, prixVenteHT: 2500, quantite: 15, stockMin: 10 },
  { ref: 'PIEC-003', designation: 'Kit Chaîne de transmission 428H', prixAchatHT: 12000, prixVenteHT: 18500, quantite: 3, stockMin: 5 },
  { ref: 'PIEC-004', designation: 'Plaquettes de frein avant à disque', prixAchatHT: 3000, prixVenteHT: 6000, quantite: 8, stockMin: 6 },
  { ref: 'PIEC-005', designation: 'Mâchoires de frein arrière à tambour', prixAchatHT: 2500, prixVenteHT: 5000, quantite: 2, stockMin: 5 },
  { ref: 'PIEC-006', designation: 'Pneu Arrière Renforcé 3.00-17', prixAchatHT: 14000, prixVenteHT: 22000, quantite: 6, stockMin: 4 },
  { ref: 'PIEC-007', designation: 'Chambre à air renforcée 2.75/3.00-17', prixAchatHT: 2000, prixVenteHT: 3500, quantite: 18, stockMin: 8 },
  { ref: 'PIEC-008', designation: "Câble d'embrayage renforcé", prixAchatHT: 1500, prixVenteHT: 3000, quantite: 7, stockMin: 5 },
  { ref: 'PIEC-009', designation: 'Câble de frein avant', prixAchatHT: 1500, prixVenteHT: 3000, quantite: 3, stockMin: 5 },
  { ref: 'PIEC-010', designation: 'Filtre à air mousse haute filtration', prixAchatHT: 1800, prixVenteHT: 3500, quantite: 12, stockMin: 6 },
  { ref: 'PIEC-011', designation: 'Batterie 12V 5Ah sans entretien', prixAchatHT: 11000, prixVenteHT: 17000, quantite: 2, stockMin: 4 },
  { ref: 'PIEC-012', designation: 'Ampoule Phare LED H4 12V', prixAchatHT: 2500, prixVenteHT: 5000, quantite: 9, stockMin: 5 },
  { ref: 'PIEC-013', designation: 'Joint de culasse moteur 110cc-150cc', prixAchatHT: 1000, prixVenteHT: 2500, quantite: 8, stockMin: 6 },
  { ref: 'PIEC-014', designation: 'Amortisseur arrière hydraulique (paire)', prixAchatHT: 18000, prixVenteHT: 28000, quantite: 1, stockMin: 3 },
  { ref: 'PIEC-015', designation: 'Carburateur standard complet 125cc', prixAchatHT: 15000, prixVenteHT: 24000, quantite: 2, stockMin: 3 },
];

export const INITIAL_REPARATIONS: Reparation[] = [
  { id: 'OR-2026-001', date: '2026-01-08', client: 'KOUASSI Yao Jean', vehicule: 'Yamaha Crypton (AB-4589-CI)', description: 'Vidange complète + Remplacement bougie NGK', totalPiecesHT: 8000, mainOeuvreHT: 5000, modePaiement: 'Mobile Money', statutPaiement: 'Payé' },
  { id: 'OR-2026-002', date: '2026-01-21', client: 'TRAORÉ Mamadou', vehicule: 'Bajaj Boxer 150 (AB-9102-CI)', description: 'Changement kit chaîne + réglage carburateur', totalPiecesHT: 18500, mainOeuvreHT: 7500, modePaiement: 'Espèces', statutPaiement: 'Payé' },
  { id: 'OR-2026-003', date: '2026-02-05', client: 'DIABATÉ Ibrahima', vehicule: 'Honda Ace 110 (AB-3312-CI)', description: 'Remplacement pneu arrière + chambre à air', totalPiecesHT: 25500, mainOeuvreHT: 6000, modePaiement: 'Mobile Money', statutPaiement: 'Payé' },
  { id: 'OR-2026-004', date: '2026-02-18', client: 'KONAN Affoué Sylvie', vehicule: 'Yamaha NMAX 155 (AB-7721-CI)', description: 'Plaquettes frein AV + révision transmission', totalPiecesHT: 12000, mainOeuvreHT: 10000, modePaiement: 'Virement', statutPaiement: 'Payé' },
  { id: 'OR-2026-005', date: '2026-03-10', client: 'BAKAYOKO Souleymane', vehicule: 'TVS Apache 160 (AB-2144-CI)', description: 'Batterie neuve + remplacement ampoule LED', totalPiecesHT: 22000, mainOeuvreHT: 4500, modePaiement: 'Mobile Money', statutPaiement: 'Payé' },
  { id: 'OR-2026-006', date: '2026-03-27', client: 'SÉKA Gnangoran Guy', vehicule: 'Haojue Lucky 110 (AB-6650-CI)', description: 'Câble frein + mâchoires arrière + filtre à air', totalPiecesHT: 11500, mainOeuvreHT: 6500, modePaiement: 'Espèces', statutPaiement: 'Payé' },
  { id: 'OR-2026-007', date: '2026-04-12', client: "N'GUESSAN Koffi Éric", vehicule: 'KTM Duke 200 (AB-1189-CI)', description: 'Changement amortisseurs + vidange synthèse', totalPiecesHT: 33500, mainOeuvreHT: 15000, modePaiement: 'Mobile Money', statutPaiement: 'Payé' },
  { id: 'OR-2026-008', date: '2026-04-25', client: 'OUÉDRAOGO Rasmané', vehicule: 'Bajaj Pulsar 180 (AB-5431-CI)', description: 'Remplacement carburateur + câble embrayage', totalPiecesHT: 27000, mainOeuvreHT: 8000, modePaiement: 'Espèces', statutPaiement: 'Payé' },
  { id: 'OR-2026-009', date: '2026-05-09', client: 'AMANI Brou Patrice', vehicule: 'Yamaha DT 125 (AB-8809-CI)', description: 'Réfection haut moteur + joint culasse', totalPiecesHT: 38000, mainOeuvreHT: 20000, modePaiement: 'Mobile Money', statutPaiement: 'Payé' },
  { id: 'OR-2026-010', date: '2026-05-22', client: 'ZOUZOUA Mireille', vehicule: 'Honda Wave 110i (AB-9923-CI)', description: 'Plaquettes AV + vidange moteur + bougie', totalPiecesHT: 14000, mainOeuvreHT: 6000, modePaiement: 'Mobile Money', statutPaiement: 'Payé' },
  { id: 'OR-2026-011', date: '2026-06-07', client: 'KOUASSI Yao Jean', vehicule: 'Yamaha Crypton (AB-4589-CI)', description: 'Kit chaîne transmission + pneu AR', totalPiecesHT: 40500, mainOeuvreHT: 9000, modePaiement: 'Mobile Money', statutPaiement: 'Payé' },
  { id: 'OR-2026-012', date: '2026-06-29', client: 'TRAORÉ Mamadou', vehicule: 'Bajaj Boxer 150 (AB-9102-CI)', description: 'Vidange + tambour frein AR + filtre à air', totalPiecesHT: 14000, mainOeuvreHT: 6000, modePaiement: 'Espèces', statutPaiement: 'Payé' },
  { id: 'OR-2026-013', date: '2026-07-14', client: 'DIABATÉ Ibrahima', vehicule: 'Honda Ace 110 (AB-3312-CI)', description: 'Batterie 12V + révision faisceau électrique', totalPiecesHT: 17000, mainOeuvreHT: 7000, modePaiement: 'Mobile Money', statutPaiement: 'Payé' },
  { id: 'OR-2026-014', date: '2026-08-03', client: 'KONAN Affoué Sylvie', vehicule: 'Yamaha NMAX 155 (AB-7721-CI)', description: 'Courroie variateur + galets + vidange', totalPiecesHT: 29000, mainOeuvreHT: 12000, modePaiement: 'Virement', statutPaiement: 'Payé' },
  { id: 'OR-2026-015', date: '2026-08-20', client: 'BAKAYOKO Souleymane', vehicule: 'TVS Apache 160 (AB-2144-CI)', description: 'Disque de frein AV + plaquettes neuves', totalPiecesHT: 21000, mainOeuvreHT: 8000, modePaiement: 'Mobile Money', statutPaiement: 'Payé' },
  { id: 'OR-2026-016', date: '2026-09-11', client: 'SÉKA Gnangoran Guy', vehicule: 'Haojue Lucky 110 (AB-6650-CI)', description: 'Remplacement rayons roue AR + pneu neuf', totalPiecesHT: 25000, mainOeuvreHT: 7500, modePaiement: 'Espèces', statutPaiement: 'Payé' },
  { id: 'OR-2026-017', date: '2026-10-04', client: 'OUÉDRAOGO Rasmané', vehicule: 'Bajaj Pulsar 180 (AB-5431-CI)', description: 'Vidange 20W50 + Kit chaîne + bougie', totalPiecesHT: 26500, mainOeuvreHT: 7500, modePaiement: 'Mobile Money', statutPaiement: 'Payé' },
  { id: 'OR-2026-018', date: '2026-10-22', client: "N'GUESSAN Koffi Éric", vehicule: 'KTM Duke 200 (AB-1189-CI)', description: 'Diagnostic injection + filtre essence + purge', totalPiecesHT: 19000, mainOeuvreHT: 14000, modePaiement: 'Mobile Money', statutPaiement: 'En attente' },
  { id: 'OR-2026-019', date: '2026-11-15', client: 'AMANI Brou Patrice', vehicule: 'Yamaha DT 125 (AB-8809-CI)', description: 'Remplacement amortisseur AR + spy fourche', totalPiecesHT: 32000, mainOeuvreHT: 16000, modePaiement: 'Mobile Money', statutPaiement: 'Payé' },
  { id: 'OR-2026-020', date: '2026-12-18', client: 'ZOUZOUA Mireille', vehicule: 'Honda Wave 110i (AB-9923-CI)', description: 'Grande révision annuelle + 2 pneus neufs', totalPiecesHT: 48000, mainOeuvreHT: 15000, modePaiement: 'Mobile Money', statutPaiement: 'Payé' },
];

export const MONTHS = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];

export const PYTHON_SCRIPT_CODE = `#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
=============================================================================
GESTION D'UN GARAGE DE RÉPARATION DE MOTOCYCLES - GÉNÉRATEUR EXCEL OPENPYXL
=============================================================================
Structure du classeur généré :
  1. "Tableau de Bord"   : KPI, consolidation 12 mois via SOMME.SI.MULTIPLE,
                           Histogramme BarChart intégré (CA Pièces vs MO)
  2. "Clients & Véhicules" : Répertoire clients et fiches motos
  3. "Stock & Pièces"     : Valorisation stock HT et alertes conditionnelles
  4. "Réparations"        : Ordres de réparation, calculs HT / TVA 18% / TTC,
                           mode de paiement et extraction automatique du mois

Fichier cible : Gestion_Garage_Motocycles_Graphique.xlsx
Format monétaire : #,##0 "FCFA"
Thème visuel : Bleu nuit institutionnel (#0F2537), alternance zébrée
"""

import os
from datetime import date
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter
from openpyxl.chart import BarChart, Reference
from openpyxl.formatting.rule import CellIsRule

def create_motorcycle_garage_workbook():
    wb = Workbook()
    
    # 1. Configuration des 4 onglets
    ws_dashboard = wb.active
    ws_dashboard.title = "Tableau de Bord"
    
    ws_clients = wb.create_sheet(title="Clients & Véhicules")
    ws_stock = wb.create_sheet(title="Stock & Pièces")
    ws_rep = wb.create_sheet(title="Réparations")
    
    # Activer le quadrillage pour une lisibilité optimale
    for ws in [ws_dashboard, ws_clients, ws_stock, ws_rep]:
        ws.views.sheetView[0].showGridLines = True

    # 2. Définition de la charte graphique & typographique
    FONT_NAME = "Segoe UI"
    
    COLOR_NAVY_DARK = "0F2537"       # Bleu nuit pour en-têtes
    COLOR_NAVY_LIGHT = "1E3A8A"      # Bleu accent
    COLOR_HEADER_TEXT = "FFFFFF"     # Blanc pur
    COLOR_ZEBRA_LIGHT = "F8FAFC"     # Ligne paire
    COLOR_WHITE = "FFFFFF"           # Ligne impaire
    COLOR_KPI_BG = "F1F5F9"          # Arrière-plan cartes KPI
    COLOR_KPI_BORDER = "CBD5E1"
    COLOR_BORDER_LIGHT = "E2E8F0"
    COLOR_ALERT_BG = "FEE2E2"        # Rouge doux alerte
    COLOR_ALERT_TEXT = "991B1B"
    COLOR_OK_BG = "DCFCE7"           # Vert doux conforme
    COLOR_OK_TEXT = "166534"
    
    font_title = Font(name=FONT_NAME, size=15, bold=True, color="0F172A")
    font_subtitle = Font(name=FONT_NAME, size=10, italic=True, color="475569")
    font_header = Font(name=FONT_NAME, size=11, bold=True, color=COLOR_HEADER_TEXT)
    font_sub_header = Font(name=FONT_NAME, size=10, bold=True, color="1E293B")
    font_data = Font(name=FONT_NAME, size=10, color="1E293B")
    font_data_bold = Font(name=FONT_NAME, size=10, bold=True, color="0F172A")
    font_kpi_label = Font(name=FONT_NAME, size=9, bold=True, color="475569")
    font_kpi_value = Font(name=FONT_NAME, size=16, bold=True, color=COLOR_NAVY_LIGHT)
    
    fill_header_navy = PatternFill(start_color=COLOR_NAVY_DARK, end_color=COLOR_NAVY_DARK, fill_type="solid")
    fill_zebra_light = PatternFill(start_color=COLOR_ZEBRA_LIGHT, end_color=COLOR_ZEBRA_LIGHT, fill_type="solid")
    fill_white = PatternFill(start_color=COLOR_WHITE, end_color=COLOR_WHITE, fill_type="solid")
    fill_total = PatternFill(start_color="E2E8F0", end_color="E2E8F0", fill_type="solid")
    fill_kpi = PatternFill(start_color=COLOR_KPI_BG, end_color=COLOR_KPI_BG, fill_type="solid")
    
    thin_border_side = Side(border_style="thin", color=COLOR_BORDER_LIGHT)
    border_data = Border(left=thin_border_side, right=thin_border_side, top=thin_border_side, bottom=thin_border_side)
    border_kpi = Border(
        left=Side(border_style="thin", color=COLOR_KPI_BORDER),
        right=Side(border_style="thin", color=COLOR_KPI_BORDER),
        top=Side(border_style="medium", color=COLOR_NAVY_LIGHT),
        bottom=Side(border_style="thin", color=COLOR_KPI_BORDER)
    )
    double_bottom_border = Border(
        left=thin_border_side, right=thin_border_side,
        top=Side(border_style="thin", color="94A3B8"),
        bottom=Side(border_style="double", color="0F172A")
    )
    
    align_center = Alignment(horizontal="center", vertical="center")
    align_left = Alignment(horizontal="left", vertical="center")
    align_right = Alignment(horizontal="right", vertical="center")
    
    FORMAT_FCFA = '#,##0 "FCFA"'
    FORMAT_INT = '#,##0'
    FORMAT_DATE = 'DD/MM/YYYY'

    # =========================================================================
    # 3. FEUILLE : CLIENTS & VÉHICULES
    # =========================================================================
    clients_headers = [
        "ID Client", "Nom & Prénom", "Téléphone", "Adresse / Ville",
        "Marque Moto", "Modèle Moto", "Immatriculation / N° Série"
    ]
    ws_clients["A1"] = "RÉPERTOIRE DES CLIENTS & MOTOCYCLES"
    ws_clients["A1"].font = font_title
    ws_clients["A2"] = "Suivi des propriétaires, contacts et caractéristiques des engins pris en charge."
    ws_clients["A2"].font = font_subtitle
    
    for col_idx, h_text in enumerate(clients_headers, start=1):
        cell = ws_clients.cell(row=4, column=col_idx, value=h_text)
        cell.font = font_header
        cell.fill = fill_header_navy
        cell.alignment = align_center
        cell.border = border_data
    
    clients_data = [
        ("CLT-001", "KOUASSI Yao Jean", "+225 07 48 12 34 56", "Abidjan - Treichville", "Yamaha", "Crypton T110", "AB-4589-CI"),
        ("CLT-002", "TRAORÉ Mamadou", "+225 05 64 22 19 80", "Abidjan - Yopougon", "Bajaj", "Boxer BM 150", "AB-9102-CI"),
        ("CLT-003", "DIABATÉ Ibrahima", "+225 01 77 90 45 11", "Abidjan - Marcory", "Honda", "Ace 110", "AB-3312-CI"),
        ("CLT-004", "KONAN Affoué Sylvie", "+225 07 09 88 76 23", "Abidjan - Cocody", "Yamaha", "NMAX 155", "AB-7721-CI"),
        ("CLT-005", "BAKAYOKO Souleymane", "+225 05 55 43 21 00", "Abidjan - Adjamé", "TVS", "Apache RTR 160", "AB-2144-CI"),
        ("CLT-006", "SÉKA Gnangoran Guy", "+225 07 88 11 02 44", "Abidjan - Koumassi", "Haojue", "Lucky 110", "AB-6650-CI"),
        ("CLT-007", "N'GUESSAN Koffi Éric", "+225 01 40 23 88 95", "Abidjan - Port-Bouët", "KTM", "Duke 200", "AB-1189-CI"),
        ("CLT-008", "OUÉDRAOGO Rasmané", "+225 05 12 67 94 33", "Abidjan - Abobo", "Bajaj", "Pulsar 180", "AB-5431-CI"),
        ("CLT-009", "AMANI Brou Patrice", "+225 07 33 55 88 12", "Abidjan - Plateau", "Yamaha", "DT 125 Enduro", "AB-8809-CI"),
        ("CLT-010", "ZOUZOUA Mireille", "+225 01 02 44 89 77", "Abidjan - Cocody Riviera", "Honda", "Wave 110i", "AB-9923-CI"),
    ]
    
    for row_idx, row_values in enumerate(clients_data, start=5):
        row_fill = fill_white if row_idx % 2 != 0 else fill_zebra_light
        for col_idx, val in enumerate(row_values, start=1):
            cell = ws_clients.cell(row=row_idx, column=col_idx, value=val)
            cell.font = font_data
            cell.fill = row_fill
            cell.border = border_data
            cell.alignment = align_center if col_idx in [1, 3, 7] else align_left
    ws_clients.row_dimensions[4].height = 26

    # =========================================================================
    # 4. FEUILLE : STOCK & PIÈCES
    # =========================================================================
    stock_headers = [
        "Réf Pièce", "Désignation", "Prix d'Achat HT", "Prix de Vente HT",
        "Quantité en Stock", "Stock Minimum", "Valeur du Stock HT", "Statut Stock"
    ]
    ws_stock["A1"] = "INVENTAIRE DU STOCK DE PIÈCES DÉTACHÉES"
    ws_stock["A1"].font = font_title
    ws_stock["A2"] = "Gestion des pièces, valorisation au coût d'achat et alertes automatisées."
    ws_stock["A2"].font = font_subtitle
    
    for col_idx, h_text in enumerate(stock_headers, start=1):
        cell = ws_stock.cell(row=4, column=col_idx, value=h_text)
        cell.font = font_header
        cell.fill = fill_header_navy
        cell.alignment = align_center
        cell.border = border_data
        
    stock_items = [
        ("PIEC-001", "Huile Moteur 20W50 4T (Bidon 1L)", 3500, 5500, 4, 10),
        ("PIEC-002", "Bougie d'allumage standard (NGK C7HSA)", 1200, 2500, 15, 10),
        ("PIEC-003", "Kit Chaîne de transmission 428H", 12000, 18500, 3, 5),
        ("PIEC-004", "Plaquettes de frein avant à disque", 3000, 6000, 8, 6),
        ("PIEC-005", "Mâchoires de frein arrière à tambour", 2500, 5000, 2, 5),
        ("PIEC-006", "Pneu Arrière Renforcé 3.00-17", 14000, 22000, 6, 4),
        ("PIEC-007", "Chambre à air renforcée 2.75/3.00-17", 2000, 3500, 18, 8),
        ("PIEC-008", "Câble d'embrayage renforcé", 1500, 3000, 7, 5),
        ("PIEC-009", "Câble de frein avant", 1500, 3000, 3, 5),
        ("PIEC-010", "Filtre à air mousse haute filtration", 1800, 3500, 12, 6),
        ("PIEC-011", "Batterie 12V 5Ah sans entretien", 11000, 17000, 2, 4),
        ("PIEC-012", "Ampoule Phare LED H4 12V", 2500, 5000, 9, 5),
        ("PIEC-013", "Joint de culasse moteur 110cc-150cc", 1000, 2500, 8, 6),
        ("PIEC-014", "Amortisseur arrière hydraulique (paire)", 18000, 28000, 1, 3),
        ("PIEC-015", "Carburateur standard complet 125cc", 15000, 24000, 2, 3),
    ]
    
    start_row_stock = 5
    for i, item in enumerate(stock_items):
        r = start_row_stock + i
        row_fill = fill_white if r % 2 != 0 else fill_zebra_light
        ref, desig, p_achat, p_vente, qte, qte_min = item
        
        ws_stock.cell(row=r, column=1, value=ref).alignment = align_center
        ws_stock.cell(row=r, column=2, value=desig).alignment = align_left
        
        c_achat = ws_stock.cell(row=r, column=3, value=p_achat)
        c_achat.number_format = FORMAT_FCFA
        c_achat.alignment = align_right
        
        c_vente = ws_stock.cell(row=r, column=4, value=p_vente)
        c_vente.number_format = FORMAT_FCFA
        c_vente.alignment = align_right
        
        c_qte = ws_stock.cell(row=r, column=5, value=qte)
        c_qte.number_format = FORMAT_INT
        c_qte.alignment = align_center
        
        c_min = ws_stock.cell(row=r, column=6, value=qte_min)
        c_min.number_format = FORMAT_INT
        c_min.alignment = align_center
        
        # Formule Valeur du Stock HT = Prix d'Achat * Quantité
        c_val = ws_stock.cell(row=r, column=7, value=f"=C{r}*E{r}")
        c_val.number_format = FORMAT_FCFA
        c_val.alignment = align_right
        c_val.font = font_data_bold
        
        # Formule Statut Stock = SI(Quantité <= Stock Min ; "RÉAPPROVISIONNER" ; "OK")
        c_statut = ws_stock.cell(row=r, column=8, value=f'=IF(E{r}<=F{r},"RÉAPPROVISIONNER","OK")')
        c_statut.alignment = align_center
        c_statut.font = font_data_bold
        
        for col in range(1, 9):
            cell = ws_stock.cell(row=r, column=col)
            if col not in [7, 8]:
                cell.font = font_data
            cell.fill = row_fill
            cell.border = border_data
            
    end_row_stock = start_row_stock + len(stock_items) - 1
    
    # Ligne Total Stock
    tot_row_stock = end_row_stock + 1
    ws_stock.cell(row=tot_row_stock, column=2, value="TOTAL VALEUR DU STOCK").font = font_data_bold
    ws_stock.cell(row=tot_row_stock, column=2).alignment = align_right
    ws_stock.cell(row=tot_row_stock, column=5, value=f"=SUM(E{start_row_stock}:E{end_row_stock})").number_format = FORMAT_INT
    ws_stock.cell(row=tot_row_stock, column=5).alignment = align_center
    ws_stock.cell(row=tot_row_stock, column=5).font = font_data_bold
    
    cell_tot_val = ws_stock.cell(row=tot_row_stock, column=7, value=f"=SUM(G{start_row_stock}:G{end_row_stock})")
    cell_tot_val.number_format = FORMAT_FCFA
    cell_tot_val.alignment = align_right
    cell_tot_val.font = Font(name=FONT_NAME, size=11, bold=True, color="0F2537")
    
    for c in range(1, 9):
        cell = ws_stock.cell(row=tot_row_stock, column=c)
        cell.fill = fill_total
        cell.border = double_bottom_border
        
    ws_stock.row_dimensions[4].height = 26
    
    # Mise en forme conditionnelle : Rouge si "RÉAPPROVISIONNER"
    red_fill = PatternFill(start_color=COLOR_ALERT_BG, end_color=COLOR_ALERT_BG, fill_type="solid")
    red_font = Font(name=FONT_NAME, color=COLOR_ALERT_TEXT, bold=True)
    rule_reappro = CellIsRule(operator='equal', formula=['"RÉAPPROVISIONNER"'], stopIfTrue=True, fill=red_fill, font=red_font)
    ws_stock.conditional_formatting.add(f"H{start_row_stock}:H{end_row_stock}", rule_reappro)

    # Mise en forme conditionnelle : Vert si "OK"
    green_fill = PatternFill(start_color=COLOR_OK_BG, end_color=COLOR_OK_BG, fill_type="solid")
    green_font = Font(name=FONT_NAME, color=COLOR_OK_TEXT, bold=True)
    rule_ok = CellIsRule(operator='equal', formula=['"OK"'], stopIfTrue=True, fill=green_fill, font=green_font)
    ws_stock.conditional_formatting.add(f"H{start_row_stock}:H{end_row_stock}", rule_ok)

    # =========================================================================
    # 5. FEUILLE : RÉPARATIONS (ORDRES DE RÉPARATION)
    # =========================================================================
    rep_headers = [
        "N° Fiche", "Date", "Client", "Véhicule / Immat", "Description Intervention",
        "Total Pièces HT", "Main d'œuvre HT", "Total HT", "TVA 18%", "Total TTC",
        "Mode Paiement", "Statut Paiement", "N° Mois"
    ]
    ws_rep["A1"] = "REGISTRE DES RÉPARATIONS & ORDRES DE SERVICE"
    ws_rep["A1"].font = font_title
    ws_rep["A2"] = "Journal des interventions, facturation automatique et calcul des taxes."
    ws_rep["A2"].font = font_subtitle
    
    for col_idx, h_text in enumerate(rep_headers, start=1):
        cell = ws_rep.cell(row=4, column=col_idx, value=h_text)
        cell.font = font_header
        cell.fill = fill_header_navy
        cell.alignment = align_center
        cell.border = border_data
        
    reparations_data = [
        ("OR-2026-001", date(2026, 1, 8),  "KOUASSI Yao Jean",       "Yamaha Crypton (AB-4589-CI)",    "Vidange complète + Remplacement bougie", 8000, 5000, "Mobile Money", "Payé"),
        ("OR-2026-002", date(2026, 1, 21), "TRAORÉ Mamadou",         "Bajaj Boxer 150 (AB-9102-CI)",   "Changement kit chaîne + réglage carbu", 18500, 7500, "Espèces", "Payé"),
        ("OR-2026-003", date(2026, 2, 5),  "DIABATÉ Ibrahima",       "Honda Ace 110 (AB-3312-CI)",     "Remplacement pneu arrière + chambre à air", 25500, 6000, "Mobile Money", "Payé"),
        ("OR-2026-004", date(2026, 2, 18), "KONAN Affoué Sylvie",    "Yamaha NMAX 155 (AB-7721-CI)",   "Plaquettes frein AV + révision transmission", 12000, 10000, "Virement", "Payé"),
        ("OR-2026-005", date(2026, 3, 10), "BAKAYOKO Souleymane",    "TVS Apache 160 (AB-2144-CI)",    "Batterie neuve + remplacement ampoule LED", 22000, 4500, "Mobile Money", "Payé"),
        ("OR-2026-006", date(2026, 3, 27), "SÉKA Gnangoran Guy",     "Haojue Lucky 110 (AB-6650-CI)",  "Câble frein + mâchoires arrière + filtre", 11500, 6500, "Espèces", "Payé"),
        ("OR-2026-007", date(2026, 4, 12), "N'GUESSAN Koffi Éric",   "KTM Duke 200 (AB-1189-CI)",      "Changement amortisseurs + vidange synthèse", 33500, 15000, "Mobile Money", "Payé"),
        ("OR-2026-008", date(2026, 4, 25), "OUÉDRAOGO Rasmané",      "Bajaj Pulsar 180 (AB-5431-CI)",  "Remplacement carburateur + câble embrayage", 27000, 8000, "Espèces", "Payé"),
        ("OR-2026-009", date(2026, 5, 9),  "AMANI Brou Patrice",     "Yamaha DT 125 (AB-8809-CI)",     "Réfection haut moteur + joint culasse", 38000, 20000, "Mobile Money", "Payé"),
        ("OR-2026-010", date(2026, 5, 22), "ZOUZOUA Mireille",       "Honda Wave 110i (AB-9923-CI)",   "Plaquettes AV + vidange + bougie", 14000, 6000, "Mobile Money", "Payé"),
        ("OR-2026-011", date(2026, 6, 7),  "KOUASSI Yao Jean",       "Yamaha Crypton (AB-4589-CI)",    "Kit chaîne transmission + pneu AR", 40500, 9000, "Mobile Money", "Payé"),
        ("OR-2026-012", date(2026, 6, 29), "TRAORÉ Mamadou",         "Bajaj Boxer 150 (AB-9102-CI)",   "Vidange + tambour frein AR + filtre à air", 14000, 6000, "Espèces", "Payé"),
        ("OR-2026-013", date(2026, 7, 14), "DIABATÉ Ibrahima",       "Honda Ace 110 (AB-3312-CI)",     "Batterie 12V + révision faisceau", 17000, 7000, "Mobile Money", "Payé"),
        ("OR-2026-014", date(2026, 8, 3),  "KONAN Affoué Sylvie",    "Yamaha NMAX 155 (AB-7721-CI)",   "Courroie variateur + galets + vidange", 29000, 12000, "Virement", "Payé"),
        ("OR-2026-015", date(2026, 8, 20), "BAKAYOKO Souleymane",    "TVS Apache 160 (AB-2144-CI)",    "Disque de frein AV + plaquettes neuves", 21000, 8000, "Mobile Money", "Payé"),
        ("OR-2026-016", date(2026, 9, 11), "SÉKA Gnangoran Guy",     "Haojue Lucky 110 (AB-6650-CI)",  "Remplacement rayons roue AR + pneu neuf", 25000, 7500, "Espèces", "Payé"),
        ("OR-2026-017", date(2026, 10, 4), "OUÉDRAOGO Rasmané",      "Bajaj Pulsar 180 (AB-5431-CI)",  "Vidange 20W50 + Kit chaîne + bougie", 26500, 7500, "Mobile Money", "Payé"),
        ("OR-2026-018", date(2026, 10, 22),"N'GUESSAN Koffi Éric",   "KTM Duke 200 (AB-1189-CI)",      "Diagnostic injection + filtre essence + purge", 19000, 14000, "Mobile Money", "En attente"),
        ("OR-2026-019", date(2026, 11, 15),"AMANI Brou Patrice",     "Yamaha DT 125 (AB-8809-CI)",     "Remplacement amortisseur AR + spy fourche", 32000, 16000, "Mobile Money", "Payé"),
        ("OR-2026-020", date(2026, 12, 18),"ZOUZOUA Mireille",       "Honda Wave 110i (AB-9923-CI)",   "Grande révision annuelle + 2 pneus neufs", 48000, 15000, "Mobile Money", "Payé"),
    ]
    
    start_row_rep = 5
    for i, rep in enumerate(reparations_data):
        r = start_row_rep + i
        row_fill = fill_white if r % 2 != 0 else fill_zebra_light
        num_fiche, dt, client, vehic, desc, piec_ht, mo_ht, mode_p, stat_p = rep
        
        c_fiche = ws_rep.cell(row=r, column=1, value=num_fiche)
        c_fiche.alignment = align_center
        
        c_dt = ws_rep.cell(row=r, column=2, value=dt)
        c_dt.number_format = FORMAT_DATE
        c_dt.alignment = align_center
        
        ws_rep.cell(row=r, column=3, value=client).alignment = align_left
        ws_rep.cell(row=r, column=4, value=vehic).alignment = align_left
        ws_rep.cell(row=r, column=5, value=desc).alignment = align_left
        
        c_piec = ws_rep.cell(row=r, column=6, value=piec_ht)
        c_piec.number_format = FORMAT_FCFA
        c_piec.alignment = align_right
        
        c_mo = ws_rep.cell(row=r, column=7, value=mo_ht)
        c_mo.number_format = FORMAT_FCFA
        c_mo.alignment = align_right
        
        # Formule Total HT = Total Pièces HT + Main d'œuvre HT
        c_tot_ht = ws_rep.cell(row=r, column=8, value=f"=F{r}+G{r}")
        c_tot_ht.number_format = FORMAT_FCFA
        c_tot_ht.alignment = align_right
        c_tot_ht.font = font_data_bold
        
        # Formule TVA 18% = Total HT * 0.18
        c_tva = ws_rep.cell(row=r, column=9, value=f"=H{r}*0.18")
        c_tva.number_format = FORMAT_FCFA
        c_tva.alignment = align_right
        
        # Formule Total TTC = Total HT + TVA
        c_ttc = ws_rep.cell(row=r, column=10, value=f"=H{r}+I{r}")
        c_ttc.number_format = FORMAT_FCFA
        c_ttc.alignment = align_right
        c_ttc.font = font_data_bold
        
        c_mod = ws_rep.cell(row=r, column=11, value=mode_p)
        c_mod.alignment = align_center
        
        c_st = ws_rep.cell(row=r, column=12, value=stat_p)
        c_st.alignment = align_center
        c_st.font = font_data_bold
        
        # Formule N° Mois = MONTH(Date)
        c_m = ws_rep.cell(row=r, column=13, value=f"=MONTH(B{r})")
        c_m.alignment = align_center
        c_m.number_format = FORMAT_INT
        
        for col in range(1, 14):
            cell = ws_rep.cell(row=r, column=col)
            if col not in [8, 10, 12]:
                cell.font = font_data
            cell.fill = row_fill
            cell.border = border_data

    end_row_rep = start_row_rep + len(reparations_data) - 1
    
    # Ligne Totaux Réparations
    tot_row_rep = end_row_rep + 1
    ws_rep.cell(row=tot_row_rep, column=5, value="TOTAL GÉNÉRAL").font = font_data_bold
    ws_rep.cell(row=tot_row_rep, column=5).alignment = align_right
    
    for c_i, col_let in enumerate(["F", "G", "H", "I", "J"], start=6):
        c_tot = ws_rep.cell(row=tot_row_rep, column=c_i, value=f"=SUM({col_let}{start_row_rep}:{col_let}{end_row_rep})")
        c_tot.number_format = FORMAT_FCFA
        c_tot.alignment = align_right
        c_tot.font = font_data_bold if col_let != "J" else Font(name=FONT_NAME, size=11, bold=True, color="0F2537")
        
    for c in range(1, 14):
        cell = ws_rep.cell(row=tot_row_rep, column=c)
        cell.fill = fill_total
        cell.border = double_bottom_border
        
    ws_rep.row_dimensions[4].height = 26

    # =========================================================================
    # 6. FEUILLE : TABLEAU DE BORD (DASHBOARD)
    # =========================================================================
    ws_dashboard["A1"] = "TABLEAU DE BORD DE GESTION - GARAGE MOTOCYCLES"
    ws_dashboard["A1"].font = font_title
    ws_dashboard["A2"] = "Indicateurs clés de performance (KPI), consolidation mensuelle du CA et suivi graphique."
    ws_dashboard["A2"].font = font_subtitle
    
    # Cartes KPI
    kpis = [
        ("A", "C", "CHIFFRE D'AFFAIRES TOTAL TTC", f"=SUM(Réparations!J{start_row_rep}:J{end_row_rep})", FORMAT_FCFA),
        ("D", "F", "TOTAL TAXES COLLECTÉES (TVA 18%)", f"=SUM(Réparations!I{start_row_rep}:I{end_row_rep})", FORMAT_FCFA),
        ("G", "H", "TOTAL DES RÉPARATIONS", f"=COUNTA(Réparations!A{start_row_rep}:A{end_row_rep})", FORMAT_INT),
        ("I", "J", "PIÈCES EN ALERTE STOCK", f'=COUNTIF(\\'Stock & Pièces\\'!H{start_row_stock}:H{end_row_stock},"RÉAPPROVISIONNER")', FORMAT_INT),
    ]
    
    for col_start, col_end, label, formula_val, num_fmt in kpis:
        ws_dashboard.merge_cells(f"{col_start}4:{col_end}4")
        ws_dashboard.merge_cells(f"{col_start}5:{col_end}5")
        
        lbl_cell = ws_dashboard[f"{col_start}4"]
        lbl_cell.value = label
        lbl_cell.font = font_kpi_label
        lbl_cell.alignment = align_center
        lbl_cell.fill = fill_kpi
        
        val_cell = ws_dashboard[f"{col_start}5"]
        val_cell.value = formula_val
        val_cell.font = font_kpi_value if "ALERTE" not in label else Font(name=FONT_NAME, size=16, bold=True, color="DC2626")
        val_cell.number_format = num_fmt
        val_cell.alignment = align_center
        val_cell.fill = fill_kpi
        
        col_s_idx = ord(col_start) - ord('A') + 1
        col_e_idx = ord(col_end) - ord('A') + 1
        for r_k in [4, 5]:
            for c_k in range(col_s_idx, col_e_idx + 1):
                cell_k = ws_dashboard.cell(row=r_k, column=c_k)
                cell_k.fill = fill_kpi
                cell_k.border = border_kpi

    ws_dashboard.row_dimensions[4].height = 20
    ws_dashboard.row_dimensions[5].height = 28
    
    # Tableau Récapitulatif 12 Mois
    ws_dashboard["A7"] = "ÉVOLUTION MENSUELLE DU CHIFFRE D'AFFAIRES (ANALYSE DÉTAILLÉE)"
    ws_dashboard["A7"].font = font_sub_header
    
    dash_headers = [
        "Mois", "N°", "CA Pièces HT", "CA Main d'œuvre HT",
        "CA Total HT", "TVA (18%)", "CA Total TTC"
    ]
    
    for col_idx, h_text in enumerate(dash_headers, start=1):
        cell = ws_dashboard.cell(row=8, column=col_idx, value=h_text)
        cell.font = font_header
        cell.fill = fill_header_navy
        cell.alignment = align_center
        cell.border = border_data
        
    mois_noms = [
        "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ]
    
    start_row_dash = 9
    for m_idx, m_name in enumerate(mois_noms, start=1):
        r = start_row_dash + m_idx - 1
        row_fill = fill_white if r % 2 != 0 else fill_zebra_light
        
        ws_dashboard.cell(row=r, column=1, value=m_name).alignment = align_left
        ws_dashboard.cell(row=r, column=2, value=m_idx).alignment = align_center
        
        # SOMME.SI.MULTIPLE pour Pièces HT et Main d'œuvre HT
        c_piec = ws_dashboard.cell(row=r, column=3, value=f"=SUMIFS(Réparations!$F\${start_row_rep}:$F\${end_row_rep}, Réparations!$M\${start_row_rep}:$M\${end_row_rep}, B{r})")
        c_piec.number_format = FORMAT_FCFA
        c_piec.alignment = align_right
        
        c_mo = ws_dashboard.cell(row=r, column=4, value=f"=SUMIFS(Réparations!$G\${start_row_rep}:$G\${end_row_rep}, Réparations!$M\${start_row_rep}:$M\${end_row_rep}, B{r})")
        c_mo.number_format = FORMAT_FCFA
        c_mo.alignment = align_right
        
        c_tot_ht = ws_dashboard.cell(row=r, column=5, value=f"=C{r}+D{r}")
        c_tot_ht.number_format = FORMAT_FCFA
        c_tot_ht.alignment = align_right
        c_tot_ht.font = font_data_bold
        
        c_tva = ws_dashboard.cell(row=r, column=6, value=f"=E{r}*0.18")
        c_tva.number_format = FORMAT_FCFA
        c_tva.alignment = align_right
        
        c_tot_ttc = ws_dashboard.cell(row=r, column=7, value=f"=E{r}+F{r}")
        c_tot_ttc.number_format = FORMAT_FCFA
        c_tot_ttc.alignment = align_right
        c_tot_ttc.font = font_data_bold
        
        for col in range(1, 8):
            cell = ws_dashboard.cell(row=r, column=col)
            if col not in [5, 7]:
                cell.font = font_data
            cell.fill = row_fill
            cell.border = border_data
            
    end_row_dash = start_row_dash + 12 - 1
    
    # Ligne Total Annuel Tableau de Bord
    tot_row_dash = end_row_dash + 1
    ws_dashboard.cell(row=tot_row_dash, column=1, value="TOTAL ANNUEL").font = font_data_bold
    ws_dashboard.cell(row=tot_row_dash, column=1).alignment = align_left
    ws_dashboard.cell(row=tot_row_dash, column=2, value="12").alignment = align_center
    ws_dashboard.cell(row=tot_row_dash, column=2).font = font_data_bold
    
    for c_i, col_let in enumerate(["C", "D", "E", "F", "G"], start=3):
        c_tot = ws_dashboard.cell(row=tot_row_dash, column=c_i, value=f"=SUM({col_let}{start_row_dash}:{col_let}{end_row_dash})")
        c_tot.number_format = FORMAT_FCFA
        c_tot.alignment = align_right
        c_tot.font = font_data_bold
        
    for c in range(1, 8):
        cell = ws_dashboard.cell(row=tot_row_dash, column=c)
        cell.fill = fill_total
        cell.border = double_bottom_border
        
    ws_dashboard.row_dimensions[8].height = 25
    
    # 7. Histogramme BarChart openpyxl (CA Pièces vs Main d'œuvre)
    chart = BarChart()
    chart.type = "col"
    chart.style = 10
    chart.title = "Évolution Mensuelle : CA Pièces vs Main d'œuvre (FCFA)"
    chart.y_axis.title = "Montant HT (FCFA)"
    chart.x_axis.title = "Mois de l'Année"
    
    # Données : Colonnes C (Pièces) et D (MO), lignes 8 à 20
    data_ref = Reference(ws_dashboard, min_col=3, min_row=8, max_col=4, max_row=end_row_dash)
    # Catégories : Colonne A (Mois de Janvier à Décembre)
    cats_ref = Reference(ws_dashboard, min_col=1, min_row=start_row_dash, max_row=end_row_dash)
    
    chart.add_data(data_ref, titles_from_data=True)
    chart.set_categories(cats_ref)
    chart.height = 14
    chart.width = 22
    ws_dashboard.add_chart(chart, "I7")
    
    # 8. Auto-dimensionnement soigné des colonnes
    for ws in [ws_dashboard, ws_clients, ws_stock, ws_rep]:
        for col in ws.columns:
            max_len = 0
            col_letter = get_column_letter(col[0].column)
            for cell in col:
                if cell.row in [1, 2, 4, 5] and ws == ws_dashboard:
                    continue
                if cell.row in [1, 2] and ws != ws_dashboard:
                    continue
                val_str = str(cell.value or "")
                if val_str.startswith("="):
                    val_str = "12 345 678 FCFA"
                max_len = max(max_len, len(val_str))
            ws.column_dimensions[col_letter].width = max(max_len + 4, 12)
            
    # Largeurs affinées pour le Dashboard
    ws_dashboard.column_dimensions["A"].width = 16
    ws_dashboard.column_dimensions["B"].width = 6
    ws_dashboard.column_dimensions["C"].width = 18
    ws_dashboard.column_dimensions["D"].width = 20
    ws_dashboard.column_dimensions["E"].width = 18
    ws_dashboard.column_dimensions["F"].width = 16
    ws_dashboard.column_dimensions["G"].width = 18

    # Sauvegarde
    output_filename = "Gestion_Garage_Motocycles_Graphique.xlsx"
    wb.save(output_filename)
    print(f"Fichier généré avec succès : {output_filename}")
    return output_filename

if __name__ == "__main__":
    create_motorcycle_garage_workbook()
`;

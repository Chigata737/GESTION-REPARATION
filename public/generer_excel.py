#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script de génération de classeur Excel professionnel pour la gestion
d'un garage de réparation de motocycles.
Auteur : Expert Automatisation & Gestion d'Entreprise
Bibliothèque : openpyxl
Fichier cible : Gestion_Garage_Motocycles_Graphique.xlsx
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
    # Supprimer la feuille par défaut après création des nôtres ou la renommer
    ws_dashboard = wb.active
    ws_dashboard.title = "Tableau de Bord"
    
    ws_clients = wb.create_sheet(title="Clients & Véhicules")
    ws_stock = wb.create_sheet(title="Stock & Pièces")
    ws_rep = wb.create_sheet(title="Réparations")
    
    # Activer l'affichage du quadrillage sur toutes les feuilles
    for ws in [ws_dashboard, ws_clients, ws_stock, ws_rep]:
        ws.views.sheetView[0].showGridLines = True

    # -------------------------------------------------------------
    # PALETTE ET STYLES GRAPHIQUES (Épuré Bleu Nuit & FCFA)
    # -------------------------------------------------------------
    FONT_NAME = "Segoe UI"
    
    # Couleurs
    COLOR_NAVY_DARK = "0F2537"       # Bleu nuit profond pour en-têtes principaux
    COLOR_NAVY_LIGHT = "1E3A8A"      # Bleu nuit contrasté
    COLOR_HEADER_TEXT = "FFFFFF"     # Texte blanc
    COLOR_ZEBRA_LIGHT = "F8FAFC"     # Alternance gris très pâle
    COLOR_WHITE = "FFFFFF"
    COLOR_KPI_BG = "F1F5F9"          # Fond carte KPI
    COLOR_KPI_BORDER = "CBD5E1"      # Bordure carte KPI
    COLOR_BORDER_LIGHT = "E2E8F0"    # Bordure tableau standard
    COLOR_ALERT_BG = "FEE2E2"        # Alerte rouge clair
    COLOR_ALERT_TEXT = "991B1B"      # Alerte rouge foncé
    COLOR_OK_BG = "DCFCE7"           # Vert clair
    COLOR_OK_TEXT = "166534"         # Vert foncé
    
    # Polices
    font_title = Font(name=FONT_NAME, size=15, bold=True, color="0F172A")
    font_subtitle = Font(name=FONT_NAME, size=10, italic=True, color="475569")
    font_header = Font(name=FONT_NAME, size=11, bold=True, color=COLOR_HEADER_TEXT)
    font_sub_header = Font(name=FONT_NAME, size=10, bold=True, color="1E293B")
    font_data = Font(name=FONT_NAME, size=10, color="1E293B")
    font_data_bold = Font(name=FONT_NAME, size=10, bold=True, color="0F172A")
    font_kpi_label = Font(name=FONT_NAME, size=9, bold=True, color="475569")
    font_kpi_value = Font(name=FONT_NAME, size=16, bold=True, color=COLOR_NAVY_LIGHT)
    
    # Remplissages
    fill_header_navy = PatternFill(start_color=COLOR_NAVY_DARK, end_color=COLOR_NAVY_DARK, fill_type="solid")
    fill_zebra_light = PatternFill(start_color=COLOR_ZEBRA_LIGHT, end_color=COLOR_ZEBRA_LIGHT, fill_type="solid")
    fill_white = PatternFill(start_color=COLOR_WHITE, end_color=COLOR_WHITE, fill_type="solid")
    fill_total = PatternFill(start_color="E2E8F0", end_color="E2E8F0", fill_type="solid")
    fill_kpi = PatternFill(start_color=COLOR_KPI_BG, end_color=COLOR_KPI_BG, fill_type="solid")
    
    # Bordures
    thin_border_side = Side(border_style="thin", color=COLOR_BORDER_LIGHT)
    border_data = Border(left=thin_border_side, right=thin_border_side, top=thin_border_side, bottom=thin_border_side)
    
    border_kpi = Border(
        left=Side(border_style="thin", color=COLOR_KPI_BORDER),
        right=Side(border_style="thin", color=COLOR_KPI_BORDER),
        top=Side(border_style="medium", color=COLOR_NAVY_LIGHT),
        bottom=Side(border_style="thin", color=COLOR_KPI_BORDER)
    )
    
    double_bottom_border = Border(
        left=thin_border_side,
        right=thin_border_side,
        top=Side(border_style="thin", color="94A3B8"),
        bottom=Side(border_style="double", color="0F172A")
    )
    
    # Alignements
    align_center = Alignment(horizontal="center", vertical="center")
    align_left = Alignment(horizontal="left", vertical="center")
    align_right = Alignment(horizontal="right", vertical="center")
    
    # Formats numériques Excel
    FORMAT_FCFA = '#,##0 "FCFA"'
    FORMAT_INT = '#,##0'
    FORMAT_DATE = 'DD/MM/YYYY'
    
    # =============================================================
    # 1. ONGLET : CLIENTS & VÉHICULES
    # =============================================================
    clients_headers = [
        "ID Client", "Nom & Prénom", "Téléphone", "Adresse / Ville", "Marque Moto"
    ]
    
    # Titre de la feuille
    ws_clients["A1"] = "RÉPERTOIRE DES CLIENTS"
    ws_clients["A1"].font = font_title
    ws_clients["A2"] = "Suivi des propriétaires, contacts et marques de motocycles prises en charge."
    ws_clients["A2"].font = font_subtitle
    
    # En-têtes
    for col_idx, h_text in enumerate(clients_headers, start=1):
        cell = ws_clients.cell(row=4, column=col_idx, value=h_text)
        cell.font = font_header
        cell.fill = fill_header_navy
        cell.alignment = align_center
        cell.border = border_data
    
    clients_data = [
        ("CLT-001", "KOUASSI Yao Jean", "+225 07 48 12 34 56", "Abidjan - Treichville", "Yamaha"),
        ("CLT-002", "TRAORÉ Mamadou", "+225 05 64 22 19 80", "Abidjan - Yopougon", "Bajaj"),
        ("CLT-003", "DIABATÉ Ibrahima", "+225 01 77 90 45 11", "Abidjan - Marcory", "Honda"),
        ("CLT-004", "KONAN Affoué Sylvie", "+225 07 09 88 76 23", "Abidjan - Cocody", "Yamaha"),
        ("CLT-005", "BAKAYOKO Souleymane", "+225 05 55 43 21 00", "Abidjan - Adjamé", "TVS"),
        ("CLT-006", "SÉKA Gnangoran Guy", "+225 07 88 11 02 44", "Abidjan - Koumassi", "Haojue"),
        ("CLT-007", "N'GUESSAN Koffi Éric", "+225 01 40 23 88 95", "Abidjan - Port-Bouët", "KTM"),
        ("CLT-008", "OUÉDRAOGO Rasmané", "+225 05 12 67 94 33", "Abidjan - Abobo", "Bajaj"),
        ("CLT-009", "AMANI Brou Patrice", "+225 07 33 55 88 12", "Abidjan - Plateau", "Yamaha"),
        ("CLT-010", "ZOUZOUA Mireille", "+225 01 02 44 89 77", "Abidjan - Cocody Riviera", "Honda"),
    ]
    
    for row_idx, row_values in enumerate(clients_data, start=5):
        row_fill = fill_white if row_idx % 2 != 0 else fill_zebra_light
        for col_idx, val in enumerate(row_values, start=1):
            cell = ws_clients.cell(row=row_idx, column=col_idx, value=val)
            cell.font = font_data
            cell.fill = row_fill
            cell.border = border_data
            if col_idx in [1, 3]:
                cell.alignment = align_center
            else:
                cell.alignment = align_left
                
    ws_clients.row_dimensions[4].height = 26

    # =============================================================
    # 2. ONGLET : STOCK & PIÈCES
    # =============================================================
    stock_headers = [
        "Réf Pièce", "Désignation", "Prix d'Achat HT", "Prix de Vente HT",
        "Quantité en Stock", "Stock Minimum", "Valeur du Stock HT", "Statut Stock"
    ]
    
    ws_stock["A1"] = "INVENTAIRE DU STOCK DE PIÈCES DÉTACHÉES"
    ws_stock["A1"].font = font_title
    ws_stock["A2"] = "Gestion des pièces, valorisation du stock au prix d'achat et alertes de réapprovisionnement."
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
        ("PIEC-014", "Amortisseur arrière hydraulique (la paire)", 18000, 28000, 1, 3),
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
            if col != 7 and col != 8:
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
    
    # Règle de mise en forme conditionnelle pour "RÉAPPROVISIONNER" en rouge
    red_fill = PatternFill(start_color=COLOR_ALERT_BG, end_color=COLOR_ALERT_BG, fill_type="solid")
    red_font = Font(name=FONT_NAME, color=COLOR_ALERT_TEXT, bold=True)
    rule_reappro = CellIsRule(operator='equal', formula=['"RÉAPPROVISIONNER"'], stopIfTrue=True, fill=red_fill, font=red_font)
    ws_stock.conditional_formatting.add(f"H{start_row_stock}:H{end_row_stock}", rule_reappro)

    # Règle de mise en forme conditionnelle pour "OK" en vert
    green_fill = PatternFill(start_color=COLOR_OK_BG, end_color=COLOR_OK_BG, fill_type="solid")
    green_font = Font(name=FONT_NAME, color=COLOR_OK_TEXT, bold=True)
    rule_ok = CellIsRule(operator='equal', formula=['"OK"'], stopIfTrue=True, fill=green_fill, font=green_font)
    ws_stock.conditional_formatting.add(f"H{start_row_stock}:H{end_row_stock}", rule_ok)

    # =============================================================
    # 3. ONGLET : RÉPARATIONS (ORDRES DE RÉPARATION)
    # =============================================================
    rep_headers = [
        "N° Fiche", "Date", "Client", "Véhicule / Immat", "Description Intervention",
        "Total Pièces HT", "Main d'œuvre HT", "Total HT", "TVA 18%", "Total TTC",
        "Mode Paiement", "Statut Paiement", "N° Mois"
    ]
    
    ws_rep["A1"] = "REGISTRE DES RÉPARATIONS & ORDRES DE SERVICE"
    ws_rep["A1"].font = font_title
    ws_rep["A2"] = "Journal des interventions d'atelier, facturation HT/TVA/TTC et modes de règlement."
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
    
    ws_rep.cell(row=tot_row_rep, column=6, value=f"=SUM(F{start_row_rep}:F{end_row_rep})").number_format = FORMAT_FCFA
    ws_rep.cell(row=tot_row_rep, column=6).alignment = align_right
    ws_rep.cell(row=tot_row_rep, column=6).font = font_data_bold
    
    ws_rep.cell(row=tot_row_rep, column=7, value=f"=SUM(G{start_row_rep}:G{end_row_rep})").number_format = FORMAT_FCFA
    ws_rep.cell(row=tot_row_rep, column=7).alignment = align_right
    ws_rep.cell(row=tot_row_rep, column=7).font = font_data_bold
    
    ws_rep.cell(row=tot_row_rep, column=8, value=f"=SUM(H{start_row_rep}:H{end_row_rep})").number_format = FORMAT_FCFA
    ws_rep.cell(row=tot_row_rep, column=8).alignment = align_right
    ws_rep.cell(row=tot_row_rep, column=8).font = font_data_bold
    
    ws_rep.cell(row=tot_row_rep, column=9, value=f"=SUM(I{start_row_rep}:I{end_row_rep})").number_format = FORMAT_FCFA
    ws_rep.cell(row=tot_row_rep, column=9).alignment = align_right
    ws_rep.cell(row=tot_row_rep, column=9).font = font_data_bold
    
    ws_rep.cell(row=tot_row_rep, column=10, value=f"=SUM(J{start_row_rep}:J{end_row_rep})").number_format = FORMAT_FCFA
    ws_rep.cell(row=tot_row_rep, column=10).alignment = align_right
    ws_rep.cell(row=tot_row_rep, column=10).font = Font(name=FONT_NAME, size=11, bold=True, color="0F2537")
    
    for c in range(1, 14):
        cell = ws_rep.cell(row=tot_row_rep, column=c)
        cell.fill = fill_total
        cell.border = double_bottom_border
        
    ws_rep.row_dimensions[4].height = 26

    # =============================================================
    # 4. ONGLET : TABLEAU DE BORD (DASHBOARD)
    # =============================================================
    ws_dashboard["A1"] = "TABLEAU DE BORD DE GESTION - GARAGE MOTOCYCLES"
    ws_dashboard["A1"].font = font_title
    ws_dashboard["A2"] = "Indicateurs clés de performance (KPI), consolidation mensuelle du CA et suivi graphique."
    ws_dashboard["A2"].font = font_subtitle
    
    # CARTES KPI EN HAUT (Lignes 4 à 6)
    kpis = [
        ("A", "C", "CHIFFRE D'AFFAIRES TOTAL TTC", f"=SUM(Réparations!J{start_row_rep}:J{end_row_rep})", FORMAT_FCFA),
        ("D", "F", "TOTAL TAXES COLLECTÉES (TVA 18%)", f"=SUM(Réparations!I{start_row_rep}:I{end_row_rep})", FORMAT_FCFA),
        ("G", "H", "TOTAL DES RÉPARATIONS", f"=COUNTA(Réparations!A{start_row_rep}:A{end_row_rep})", FORMAT_INT),
        ("I", "J", "PIÈCES EN ALERTE STOCK", f'=COUNTIF(\'Stock & Pièces\'!H{start_row_stock}:H{end_row_stock},"RÉAPPROVISIONNER")', FORMAT_INT),
    ]
    
    for col_start, col_end, label, formula_val, num_fmt in kpis:
        # Fusionner pour la carte
        ws_dashboard.merge_cells(f"{col_start}4:{col_end}4")
        ws_dashboard.merge_cells(f"{col_start}5:{col_end}5")
        
        lbl_cell = ws_dashboard[f"{col_start}4"]
        lbl_cell.value = label
        lbl_cell.font = font_kpi_label
        lbl_cell.alignment = align_center
        lbl_cell.fill = fill_kpi
        
        val_cell = ws_dashboard[f"{col_start}5"]
        val_cell.value = formula_val
        val_cell.font = font_kpi_value
        val_cell.number_format = num_fmt
        val_cell.alignment = align_center
        val_cell.fill = fill_kpi
        
        # Coloration spéciale si alerte
        if "ALERTE" in label:
            val_cell.font = Font(name=FONT_NAME, size=16, bold=True, color="DC2626")
        
        # Appliquer bordure KPI
        col_s_idx = ord(col_start) - ord('A') + 1
        col_e_idx = ord(col_end) - ord('A') + 1
        for r_k in [4, 5]:
            for c_k in range(col_s_idx, col_e_idx + 1):
                cell_k = ws_dashboard.cell(row=r_k, column=c_k)
                cell_k.fill = fill_kpi
                cell_k.border = border_kpi

    ws_dashboard.row_dimensions[4].height = 20
    ws_dashboard.row_dimensions[5].height = 28
    
    # TABLEAU RÉCAPITULATIF DES 12 MOIS (Ligne 8 à 21)
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
        
        # Nom du mois
        c_m_name = ws_dashboard.cell(row=r, column=1, value=m_name)
        c_m_name.alignment = align_left
        c_m_name.font = font_data
        
        # N° Mois
        c_m_num = ws_dashboard.cell(row=r, column=2, value=m_idx)
        c_m_num.alignment = align_center
        c_m_num.font = font_data
        
        # CA Pièces HT : SOMME.SI.MULTIPLE / SUMIFS
        # =SUMIFS(Réparations!$F$5:$F$24, Réparations!$M$5:$M$24, B{r})
        c_piec = ws_dashboard.cell(row=r, column=3, value=f"=SUMIFS(Réparations!$F${start_row_rep}:$F${end_row_rep}, Réparations!$M${start_row_rep}:$M${end_row_rep}, B{r})")
        c_piec.number_format = FORMAT_FCFA
        c_piec.alignment = align_right
        
        # CA Main d'œuvre HT : SOMME.SI.MULTIPLE / SUMIFS
        c_mo = ws_dashboard.cell(row=r, column=4, value=f"=SUMIFS(Réparations!$G${start_row_rep}:$G${end_row_rep}, Réparations!$M${start_row_rep}:$M${end_row_rep}, B{r})")
        c_mo.number_format = FORMAT_FCFA
        c_mo.alignment = align_right
        
        # CA Total HT = CA Pièces HT + CA MO HT
        c_tot_ht = ws_dashboard.cell(row=r, column=5, value=f"=C{r}+D{r}")
        c_tot_ht.number_format = FORMAT_FCFA
        c_tot_ht.alignment = align_right
        c_tot_ht.font = font_data_bold
        
        # TVA 18% = CA Total HT * 0.18
        c_tva = ws_dashboard.cell(row=r, column=6, value=f"=E{r}*0.18")
        c_tva.number_format = FORMAT_FCFA
        c_tva.alignment = align_right
        
        # CA Total TTC = CA Total HT + TVA
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
    
    # =============================================================
    # 5. HISTOGRAMME (BARCHART) SUR LE TABLEAU DE BORD
    # =============================================================
    chart = BarChart()
    chart.type = "col"
    chart.style = 10
    chart.title = "Évolution Mensuelle : CA Pièces vs Main d'œuvre (FCFA)"
    chart.y_axis.title = "Montant HT (FCFA)"
    chart.x_axis.title = "Mois de l'Année"
    
    # Données : Colonnes C (Pièces) et D (Main d'œuvre), lignes 8 à 20
    data_ref = Reference(ws_dashboard, min_col=3, min_row=8, max_col=4, max_row=end_row_dash)
    # Catégories : Colonne A (Mois de Janvier à Décembre), lignes 9 à 20
    cats_ref = Reference(ws_dashboard, min_col=1, min_row=start_row_dash, max_row=end_row_dash)
    
    chart.add_data(data_ref, titles_from_data=True)
    chart.set_categories(cats_ref)
    
    # Dimensions et positionnement du graphique
    chart.height = 14
    chart.width = 22
    
    # Positionner le graphique à droite ou sous le tableau
    # Ligne 8 colonne I
    ws_dashboard.add_chart(chart, "I7")
    
    # =============================================================
    # 6. AJUSTEMENT AUTOMATIQUE DES LARGEURS DE COLONNES
    # =============================================================
    for ws in [ws_dashboard, ws_clients, ws_stock, ws_rep]:
        for col in ws.columns:
            max_len = 0
            col_letter = get_column_letter(col[0].column)
            # Ne pas baser la largeur sur les cellules fusionnées des titres ou KPI
            for cell in col:
                if cell.row in [1, 2, 4, 5] and ws == ws_dashboard:
                    continue
                if cell.row in [1, 2] and ws != ws_dashboard:
                    continue
                val_str = str(cell.value or "")
                if val_str.startswith("="):
                    # Estimation d'un montant formaté
                    val_str = "12 345 678 FCFA"
                max_len = max(max_len, len(val_str))
            ws.column_dimensions[col_letter].width = max(max_len + 4, 12)
            
    # Ajustements manuels spécifiques pour garantir une mise en page parfaite
    ws_dashboard.column_dimensions["A"].width = 16
    ws_dashboard.column_dimensions["B"].width = 6
    ws_dashboard.column_dimensions["C"].width = 18
    ws_dashboard.column_dimensions["D"].width = 20
    ws_dashboard.column_dimensions["E"].width = 18
    ws_dashboard.column_dimensions["F"].width = 16
    ws_dashboard.column_dimensions["G"].width = 18
    ws_dashboard.column_dimensions["H"].width = 6
    ws_dashboard.column_dimensions["I"].width = 18
    ws_dashboard.column_dimensions["J"].width = 18

    # Sauvegarde du fichier
    output_filename = "Gestion_Garage_Motocycles_Graphique.xlsx"
    wb.save(output_filename)
    print(f"Fichier généré avec succès : {output_filename}")
    return output_filename

if __name__ == "__main__":
    create_motorcycle_garage_workbook()

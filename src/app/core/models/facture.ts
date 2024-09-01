import { LigneFacture } from './ligneFacture';

export interface Facture {
    id: number;
    nom: string;
    numero: string;
    date: Date;
    montant_total: number;
    logo: string;
    etat_facture: string;
    utilisateur: number;
    lignes_factures: LigneFacture[];
    date_echeance?: string;

}
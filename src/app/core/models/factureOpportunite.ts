import { Facture } from "./facture";
import { Opportunite } from "./opportunite";

export interface FactureOpportunite {
    id: number;
    facture: Facture;
    opportunite: Opportunite;
  }
  
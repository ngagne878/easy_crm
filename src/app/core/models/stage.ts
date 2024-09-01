import { Opportunite } from "./opportunite";

export interface Stage {
    id: number;
    name: string;
    opportunities: Opportunite[];
  }
 
  interface Opportunity {
    id: number;
    nom: string;
    statut: string;
    montant: string;
    date: string;
    pipelineId: number;
  }
  
  export class OpportunitesComponent {
    stages: Stage[] = [
      { id: 1, name: 'À faire', opportunities: [] },
      { id: 2, name: 'En cours', opportunities: [] },
      { id: 3, name: 'Terminé', opportunities: [] }
    ];
  
  }
  
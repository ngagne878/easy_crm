
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Facture } from '../../../core/models/facture';
import { FactureService } from '../../../core/services/facture.service';
import { Router } from '@angular/router';

interface FilterResponse {
  results: Facture[];
}


@Component({
  selector: 'app-factures',
  templateUrl: './factures.component.html',
  styleUrls: ['./factures.component.css']
})
export class FacturesComponent {

  factures: Facture[] = [];
  newFacture: Facture = {
    id: 0,
    nom: '',
    numero: '',
    date: new Date(),
    montant_total: 0,
    logo: '',
    etat_facture: '',
    utilisateur: 0,
    lignes_factures
: []
  };

  currentPage = 1;
  pageSize = 5;
  totalFactures = 0;
  showFactureForm = false;
  showFilterForm = false;
  showInvoiceDetails = false;
  selectedFacture: Facture | null = null;
  errorMessage = '';  
  tags: string = '';
  notes: string = '';
  type_contact: string = '';
  etat_facture: 'payee' | 'impayee' | 'en_retard' = 'impayee';
  formTitle: string = 'Créer une facture';  



  constructor(private http: HttpClient, private factureService: FactureService, private router: Router) {}

  ngOnInit(): void {
    this.getFactures();
  }

  resetFilters(): void {
    // Réinitialiser les champs de filtre
    this.notes = '';
    this.tags = '';
    this.type_contact = '';
    console.log('Filtres réinitialisés');
    this.getFactures(); // Réinitialiser la liste des contacts
  }
  

  getFactures(): void {
    this.factureService.getFactures().subscribe({
      next: (data: any) => {
        this.factures = data.results || [];
        console.log("liste facture récupéré avec succées");
        console.log(this.factures);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des factures:', err);
      }
    });
  }
  addFacture(): void {
    if (this.newFacture.id === 0) {
      // Ajouter une nouvelle facture
      this.factureService.addfactures(this.newFacture).subscribe({
        next: (facture) => {
          alert('Facture ajoutée avec succès');
          this.factures.push(facture);
          this.resetFactureForm();
          this.showFactureForm = false;
        },
        error: (err) => {
          console.error('Erreur lors de l\'ajout de la facture:', err);
          if (err.error.message.includes('numéro de facture existe déjà')) {
            alert('Le numéro de facture existe déjà. Veuillez en choisir un autre.');
          }
        }
      });
    } else {
      // Mettre à jour une facture existante
      this.factureService.updateFacture(this.newFacture).subscribe({
        next: (facture) => {
          alert('Facture mise à jour avec succès');
          const index = this.factures.findIndex(f => f.id === facture.id);
          if (index !== -1) {
            this.factures[index] = facture;
          }
          this.resetFactureForm();
          this.showFactureForm = false;
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour de la facture:', err);
          if (err.error.message.includes('numéro de facture existe déjà')) {
            alert('Le numéro de facture existe déjà. Veuillez en choisir un autre.');
          }
        }
      });
    }
  }
    resetFactureForm() {
    this.newFacture = {
      id: 0,
      nom: '',
      numero: '',
      date: new Date(),
      montant_total: 0,
      logo: '',
      etat_facture: '',
      utilisateur: 0,
      lignes_factures: []
    };
  }


  get paginatedFactures() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.factures.slice(startIndex, startIndex + this.pageSize);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    const totalPages = this.getTotalPages();
    if (this.currentPage < totalPages) {
      this.currentPage++;
    }
  }

  viewFacture(facture: Facture) {
    this.selectedFacture = facture;
    this.showInvoiceDetails = true;
  }

  getTotalPages(): number {
    return Math.ceil(this.totalFactures / this.pageSize);
  }

  deleteFacture(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette facture ?')) {
      this.factureService.deleteFacture(id).subscribe({
        next: () => {
          this.factures = this.factures.filter(facture => facture.id !== id);
          alert('Facture supprimée avec succès');
        },
        error: (err) => {
          console.error('Erreur lors de la suppression de la facture:', err);
        }
      });
    }
  }
  
    editFacture(facture: Facture) {
    this.newFacture = { ...facture };  
    this.formTitle = 'Mettre à jour une facture';  
    this.showFactureForm = true;  
  }

  showDetailFacture(id: number): void {
    this.router.navigate(['/factures', id]); 
  }

  applyFilters(): void {
        const filters = {
          etat_facture: this.etat_facture
        };
    
        this.factureService.filterFactures(filters).subscribe({
          next: (response: FilterResponse): void => {
            this.factures = response.results;
            console.log('Factures filtrés:', this.factures); 
            this.showFilterForm = false;
          },
          error: (err) => {
            console.error('Erreur lors de la récupération des factures filtrés:', err);
          }
        });
      }
  
  
}

// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Facture } from '../../../core/models/facture';
// import { FactureService } from '../../../core/services/facture.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-factures',
//   templateUrl: './factures.component.html',
//   styleUrls: ['./factures.component.css']
// })
// export class FacturesComponent {

//   factures: Facture[] = [];
//   newFacture: Facture = {
//     id: 0,
//     nom: '',
//     numero: '',
//     date: new Date(),
//     montant_total: 0,
//     logo: '',
//     etat_facture: '',
//     utilisateur: 0,
//     lignes_factures
// : []
//   };

//   pageSize = 5;
//   currentPage = 1;
//   itemsPerPage = 5;
//   totalFactures = 0;
//   showFactureForm = false;
//   showFilterForm = false;
//   showInvoiceDetails = false;
//   selectedFacture: Facture | null = null;
//   errorMessage = '';  
//   formTitle: string = 'Créer une facture';  

//   constructor(private http: HttpClient, private factureService: FactureService, private router: Router) {}

//   ngOnInit(): void {
//     this.getFactures();
//   }
  

//   getFactures(): void {
//     this.factureService.getFactures().subscribe({
//       next: (data: any) => {
//         this.factures = data.results || [];
//         console.log("liste facture récupéré avec succées");
//         console.log(this.factures);
//       },
//       error: (err) => {
//         console.error('Erreur lors de la récupération des factures:', err);
//       }
//     });
//   }

//   addFacture(): void {
//     if (this.newFacture.id === 0) {
//       // Ajouter une nouvelle facture
//       this.factureService.addfactures(this.newFacture).subscribe({
//         next: (facture) => {
//           alert('Facture ajoutée avec succès');
//           this.factures.push(facture);
//           this.resetFactureForm();
//           this.showFactureForm = false;
//         },
//         error: (err) => {
//           console.error('Erreur lors de l\'ajout de la facture:', err);
//           if (err.error.message.includes('numéro de facture existe déjà')) {
//             alert('Le numéro de facture existe déjà. Veuillez en choisir un autre.');
//           }
//         }
//       });
//     } else {
//       // Mettre à jour une facture existante
//       this.factureService.updateFacture(this.newFacture).subscribe({
//         next: (facture) => {
//           alert('Facture mise à jour avec succès');
//           const index = this.factures.findIndex(f => f.id === facture.id);
//           if (index !== -1) {
//             this.factures[index] = facture;
//           }
//           this.resetFactureForm();
//           this.showFactureForm = false;
//         },
//         error: (err) => {
//           console.error('Erreur lors de la mise à jour de la facture:', err);
//           if (err.error.message.includes('numéro de facture existe déjà')) {
//             alert('Le numéro de facture existe déjà. Veuillez en choisir un autre.');
//           }
//         }
//       });
//     }
//   }
  
  
//   resetFactureForm() {
//     this.newFacture = {
//       id: 0,
//       nom: '',
//       numero: '',
//       date: new Date(),
//       montant_total: 0,
//       logo: '',
//       etat_facture: '',
//       utilisateur: 0,
//       lignes_factures: []
//     };
//   }
  
  
//   clearFilters() {
//   }


//   viewFacture(facture: Facture) {
//     this.selectedFacture = facture;
//     this.showInvoiceDetails = true;
//   }

//   deleteFacture(id: number): void {
//     if (confirm('Êtes-vous sûr de vouloir supprimer cette facture ?')) {
//       this.factureService.deleteFacture(id).subscribe({
//         next: () => {
//           this.factures = this.factures.filter(facture => facture.id !== id);
//           alert('Facture supprimée avec succès');
//         },
//         error: (err) => {
//           console.error('Erreur lors de la suppression de la facture:', err);
//         }
//       });
//     }
//   }

//   editFacture(facture: Facture) {
//     this.newFacture = { ...facture };  
//     this.formTitle = 'Mettre à jour une facture';  
//     this.showFactureForm = true;  
//   }
  
//   showDetailFacture(id: number): void {
//     this.router.navigate(['/factures', id]); 
//   }
//   get paginatedFactures() {
//     const startIndex = (this.currentPage - 1) * this.itemsPerPage;
//     return this.factures.slice(startIndex, startIndex + this.itemsPerPage);
//   }

//   getTotalPages() {
//     return Math.ceil(this.factures.length / this.itemsPerPage);
//   }

//   previousPage() {
//     if (this.currentPage > 1) {
//       this.currentPage--;
//     }
//   }

//   nextPage() {
//     if (this.currentPage < this.getTotalPages()) {
//       this.currentPage++;
//     }
//   }
  
  
// }
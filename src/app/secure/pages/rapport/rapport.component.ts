import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../../core/services/rapport.service';
import { Facture } from '../../../core/models/facture';
import { FactureService } from '../../../core/services/facture.service';

@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrls: ['./rapport.component.css']
})
export class RapportsComponent implements OnInit {
  factures: Facture[] = [];
  salesPerformance: { date: string, amount: number }[] = [];
  contactsDistribution: any;
  invoicesStatus: any;
  customCriteria: any = {}; 
  constructor(private reportService: ReportService,
    private factureService: FactureService
  ) { }

  ngOnInit(): void {
    this.loadSalesPerformance();
    this.loadContactsDistribution();
    this.loadInvoicesStatus();
    this.loadFactures();
    this.factureService.getFactures().subscribe((factures: Facture[]) => {
      this.factures = factures;
      this.salesPerformance = this.factures.map(facture => {
        return {
          date: facture.date.toISOString(),
          amount: this.calculateFactureTotalTTC(facture)
        };
      });
    });
  }
  
  loadFactures(): void {
    this.factureService.getFactures().subscribe((factures: Facture[]) => {
      this.factures = factures;
      this.salesPerformance = this.factures.map(facture => {
        return {
          date: facture.date.toISOString(),
          amount: this.calculateFactureTotalTTC(facture)
        };
      });
    });
  }
  

  calculateFactureTotalTTC(facture: Facture): number {
    return facture.lignes_factures.reduce((total, ligne) => {
      const totalHT = ligne.prix_unitaire * ligne.quantite;
      const totalTVA = totalHT * (ligne.tva / 100);
      return total + totalHT + totalTVA;
    }, 0);
  }

  loadSalesPerformance(): void {
    this.reportService.getSalesPerformance().subscribe(data => {
      this.salesPerformance = data;
    });
  }

  loadContactsDistribution(): void {
    this.reportService.getContactsDistribution().subscribe(data => {
      this.contactsDistribution = data;
    });
  }

  loadInvoicesStatus(): void {
    this.reportService.getInvoicesStatus().subscribe(data => {
      this.invoicesStatus = data;
    });
  }

  generateCustomReport(): void {
    this.reportService.getCustomReport(this.customCriteria).subscribe(data => {
    });
  }
}
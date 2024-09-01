import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

    private API_URL = environment.API_URL; 

    constructor(private http: HttpClient) {}

    private getAuthHeaders(): HttpHeaders {
      const token = localStorage.getItem('token');
      console.log('Token utilisé pour l\'authentification:', token); 
      return new HttpHeaders({
        'Authorization': token ? `Bearer ${token}` : ''
      });
    }

    getSalesPerformance(): Observable<any> {
      return this.http.get(`${this.API_URL}/reports/sales-performance`, { headers: this.getAuthHeaders() });
    }

    getContactsDistribution(): Observable<any> {
      return this.http.get(`${this.API_URL}/reports/contacts-distribution`, { headers: this.getAuthHeaders() });
    }

    getInvoicesStatus(): Observable<any> {
      return this.http.get(`${this.API_URL}/reports/invoices-status`, { headers: this.getAuthHeaders() });
    }

    getCustomReport(criteria: any): Observable<any> {
      return this.http.post(`${this.API_URL}/reports/custom`, criteria, { headers: this.getAuthHeaders() });
    }
}

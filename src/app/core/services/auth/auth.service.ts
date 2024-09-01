import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { environment } from "../../../../environments/environment";
import { Token } from '../../models/token';
import { Utilisateur } from "../../models/utilisateur";
import { Router } from "@angular/router";
import { ApiResponse } from '../../../core/models/utilisateur';



@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isAuthenticated=true
  email:string|null=null;
  password:string|null=null;
  prenom:string|null=null;
  nom:string|null=null;

  constructor(private http:HttpClient,private router: Router) {}
  private currentUser: Utilisateur | null = null;

  
  private API_URL = `${environment.API_URL}`

  getHeadersWithAuthorization(): HttpHeaders {
    const token = localStorage.getItem('token');

    if (token) {
      return new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      });
    }

    console.error('Token is null. User is not authenticated.');
    return new HttpHeaders();
  }

  login( userEmail: string,  userPassword: string ): Observable<Token> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });  
    //var data = {"email":"\""+email+"\"", "password":"\""+password+"\""};
    var data = {"email":userEmail, "password":userPassword};
    return this.http.post<Token>(`${this.API_URL}/login`, data, { headers });
  }


  register(formData: any): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, formData);
  }

  getUser(): Observable<ApiResponse> {
    const headers = this.getHeadersWithAuthorization();
    return this.http.get<ApiResponse>(`${this.API_URL}/user`, { headers });
  }
  

  getCurrentUser(): Utilisateur | null {
    return this.currentUser;
  }

  
  
  logout(): Observable<any> {
    const headers = this.getHeadersWithAuthorization();
    return this.http.post(`${this.API_URL}/logout`, {}, { headers }).pipe(
      tap(() => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      })
    );
  }

  
  
  
}

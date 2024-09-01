import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { ApiResponse, Utilisateur } from '../../../core/models/utilisateur';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userName: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe(
      (response: ApiResponse) => {
        console.log('User data:', response); // Vérifiez la structure de la réponse
        const user: Utilisateur = response.results; // Extraction de l'objet `results`
        this.userName = `${user.prenom} ${user.nom}`; // Attribution du nom complet
      },
      (error) => {
        console.error('Erreur lors de la récupération de l\'utilisateur :', error);
      }
    );
  }
}

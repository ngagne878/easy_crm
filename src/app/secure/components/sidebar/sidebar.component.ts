import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service'; 

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(
  private authService: AuthService,
   private router: Router
  ) {}

  isOpen= true;


  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  logout() {
    this.authService.logout().subscribe(
      response => {
        console.log('Logged out successfully');
      },
      error => {
        console.error('Logout failed', error);
      }
    );
  }

    
}

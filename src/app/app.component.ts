import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, LoginComponent, AccountComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private router: Router) {}

  logout() {
    // Clear session storage
    sessionStorage.clear();

    // Redirect to the login page
    this.router.navigate(['/login']);
  }
}

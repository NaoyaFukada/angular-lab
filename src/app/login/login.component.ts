import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  users = [
    { email: 'naoya@icloud.com', upwd: 'Naoya' },
    { email: 'jam@icloud.com', upwd: 'Jam' },
    { email: 'nakajima@icloud.com', upwd: 'Nakajima' },
  ];
  constructor(private router: Router) {}
  onSubmit() {
    const user = this.users.find(
      (user) => user.email === this.email && user.upwd === this.password
    );
    if (user) {
      this.errorMessage = '';
      console.log('Login successful');
      // this.router.navigateByUrl('/account');
      this.router.navigate(['/account']);
    } else {
      this.errorMessage = 'Invalid email or password';
      console.log('Invalid email or password');
    }
  }
}

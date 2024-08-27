import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  username: string = '';
  birthday: string = '';
  age: number = 0;
  email: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const userInfo = sessionStorage.getItem('current_user');
    console.log(userInfo);
    if (userInfo) {
      console.log('nam');
      const user = JSON.parse(userInfo);
      this.username = user.username;
      this.birthday = user.birthday;
      this.age = user.age;
      this.email = user.email;
    } else {
      this.router.navigate(['/login']);
    }
  }

  onSave() {
    // Save updated user info back to session storage
    const updatedUser = {
      username: this.username,
      birthday: this.birthday,
      age: this.age,
      email: this.email,
      valid: true,
    };
    sessionStorage.setItem('current_user', JSON.stringify(updatedUser));
    alert('Profile updated successfully!');
  }
}

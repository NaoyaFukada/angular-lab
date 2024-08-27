# Angular Lab4

Command used for this project.

## Lab4

### 1. Create a new angular app

```sh
ng new angular-lab
```

### 2. Add bootstrap to my application (Simple way)

```sh
ng add @ng-bootstrap/ng-bootstrap
```

### 3. Create page components

```sh
ng generate component login
ng generate component account
```

### 4. Start application

```sh
ng serve
```

## Github

```sh
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/NaoyaFukada/angular-lab.git
git push -u origin main
```

# Angular Lab5

Stems done to complete lab5

### 1. Copy the directory from week4's lab

```bash
cp -r week4/lab/angular-lab week5/lab/angular-lab
```

### 2. Create a new branch called week5

```bash
git checkout -b week5
```

### 3. Create a directory called server at the root level of your angular project

```plaintext
/project-root
  /src
  /server
```

### 4. Create a package.json File

```bash
npm init
```

### 5. Install Express

```bash
npm install express --save
```

### 6. Create Server

```javascript
const express = require("express"); // Import express.js
const path = require("path"); // Import the path module
const app = express(); // Create an instance of Express
const PORT = 3000;
var cors = require("cors");

// Parse URL-encoded bodies and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// This will allow requests from any origin by default
app.use(cors());

// Import and use routes
require("./routes/login").route(app);

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});

module.exports = app;
```

### 7. Create login.js

```javascript
module.exports = {
  route: (app) => {
    class User {
      constructor(username, birthday, age, email, password, valid) {
        this.username = username;
        this.birthday = birthday;
        this.age = age;
        this.email = email;
        this.password = password;
        this.valid = valid;
      }

      getUserInfo() {
        return {
          username: this.username,
          birthday: this.birthday,
          age: this.age,
          email: this.email,
          valid: this.valid,
        };
      }
    }

    const users = [new User("Naoya", "2000-04-07", 24, "naoya@icloud.com", "Naoya", true), new User("Jam", "2000-08-30", 24, "jam@icloud.com", "Jam", true), new User("Nakajima", "1975-04-05", 55, "Nakajima@icloud.com", "Nakajima", true)];

    app.post("/api/auth", (req, res) => {
      const { email, password } = req.body;

      // Check if both email and password are provided
      if (!email || !password) {
        return res.status(400).json({ error: "Missing email or password" });
      }

      // Find the user that matches the provided email and password
      const user = users.find((user) => user.email === email && user.password === password);

      if (user) {
        // Convert user info to JSON string for client-side storage
        const userInfo = JSON.stringify(user.getUserInfo());

        // Send the user info back to the client (client should store it in sessionStorage)
        res.status(200).json({ valid: true, userInfo });
      } else {
        // If user is not found, return valid: false
        res.status(401).json({ valid: false, message: "Invalid credentials" });
      }
    });
  },
};
```

### 8. Update login.component.ts

```typescript
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgIf } from "@angular/common";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};
const BACKEND_URL = "http://localhost:3000";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent {
  email: string = "";
  password: string = "";
  errorMessage: string = "";
  constructor(private router: Router, private httpClient: HttpClient) {}
  onSubmit() {
    let user = { email: this.email, password: this.password };
    this.httpClient.post(BACKEND_URL + "/api/auth", user, httpOptions).subscribe((data: any) => {
      console.log(JSON.stringify(user));
      console.log(JSON.stringify(data));
      if (data.valid) {
        sessionStorage.setItem("current_user", data.userInfo);
        console.log(data.userInfo);
        this.router.navigate(["/account"]);
      } else {
        this.errorMessage = data.errorMessage;
        console.log(this.errorMessage);
      }
    });
  }
}
```

### 9. Create a component

```bash
ng generate component profile
```

### 10. Update profile.component.ts

```typescript
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-profile",
  standalone: true,
  imports: [FormsModule],
  templateUrl: "./profile.component.html",
  styleUrl: "./profile.component.css",
})
export class ProfileComponent implements OnInit {
  username: string = "";
  birthday: string = "";
  age: number = 0;
  email: string = "";

  constructor(private router: Router) {}

  ngOnInit(): void {
    const userInfo = sessionStorage.getItem("current_user");
    console.log(userInfo);
    if (userInfo) {
      console.log("nam");
      const user = JSON.parse(userInfo);
      this.username = user.username;
      this.birthday = user.birthday;
      this.age = user.age;
      this.email = user.email;
    } else {
      this.router.navigate(["/login"]);
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
    sessionStorage.setItem("current_user", JSON.stringify(updatedUser));
    alert("Profile updated successfully!");
  }
}
```

### 11. Update profile.component.html

```html
<div class="container">
  <div class="row justify-content-center">
    <div class="col-md-6">
      <h2>Edit Profile</h2>
      <form (ngSubmit)="onSave()">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" [(ngModel)]="username" name="username" required class="form-control" />
        </div>
        <div class="form-group">
          <label for="birthday">Birthday:</label>
          <input type="date" id="birthday" [(ngModel)]="birthday" name="birthday" required class="form-control" />
        </div>

        <div class="form-group">
          <label for="age">Age:</label>
          <input type="number" id="age" [(ngModel)]="age" name="age" required class="form-control" />
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</div>
```

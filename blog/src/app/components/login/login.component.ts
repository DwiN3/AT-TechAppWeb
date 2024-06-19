import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public credentials = {
    login: '',
    password: ''
  };

  public logged?: boolean;
  public logout?: boolean;

  constructor(
    public authService: AuthService, 
    private router: Router, 
    @Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {}

  signIn() {
    this.authService.authenticate(this.credentials).subscribe((result) => {
      if (result) {
        const localStorage = this.document.defaultView?.localStorage;
        localStorage?.setItem('userName', this.credentials.login);
        this.router.navigate(['/']);
      }
    });
  }
}

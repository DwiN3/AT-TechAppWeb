import {Component, OnInit} from '@angular/core';
import {Inject} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'login',
  standalone: true,
  imports: [FormsModule],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  public credentials = {
    login: '',
    password: ''
  };

  public logged?: boolean;
  public logout?: boolean;

  constructor(public authService: AuthService, private router: Router, @Inject(DOCUMENT) private document: Document) {}

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

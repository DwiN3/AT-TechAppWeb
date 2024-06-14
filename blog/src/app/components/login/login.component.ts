import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";
import { catchError, of } from 'rxjs';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {
  public credentials = {
    login: '',
    password: '',
  }

  public errorMessage = "";

  public logged?: boolean;
  public logout?: boolean;

  constructor(public authService: AuthService, private router: Router) {}
  ngOnInit(): void {}

  signIn() {   
    this.authService.authenticate(this.credentials)
    .pipe(
      catchError((error) => (this.handleAuthError(error)))
    )
    .subscribe(
      (result) => {   
        if(!result) {
          this.logged = false;             
        } else {
          this.logout = false;
          this.credentials = {
            password: '',
            login: ''
          };
          this.router.navigate(['/']);          
        }
      }
  );
  }

  handleAuthError(error: Error) {
    this.errorMessage = error.message;
    return of(false);    
  }
}

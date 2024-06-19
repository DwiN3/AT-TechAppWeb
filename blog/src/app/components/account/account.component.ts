import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'account',
  standalone: true,
  imports: [CommonModule],
  providers: [AuthService],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  public username: string | null;
  public email: string | null;
  public role: string | null;

  public MessageText: string = '';

  constructor(public authService: AuthService) {
    this.username = null;
    this.email = null;
    this.role = null;
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.username = this.authService.getUserName();
      this.email = this.authService.getEmail();
      if(this.authService.isAdmin()){
        this.role = "Administrator";
      } else {
        this.role = "Użytkownik";
      }
    }
  }
}

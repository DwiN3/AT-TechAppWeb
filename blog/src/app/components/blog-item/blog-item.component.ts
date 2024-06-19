import { Component, Input } from '@angular/core';
import { CommonModule } from "@angular/common";
import { BlogItemImageComponent } from "../blog-item-image/blog-item-image.component";
import { BlogItemTextComponent } from "../blog-item-text/blog-item-text.component";
import { AuthService } from '../../services/auth/auth.service';
import { DataService } from "../../services/data.service";

@Component({
  selector: 'blog-item',
  standalone: true,
  imports: [BlogItemImageComponent, BlogItemTextComponent, CommonModule],
  providers: [AuthService],
  templateUrl: './blog-item.component.html',
  styleUrl: './blog-item.component.css'
})
export class BlogItemComponent {
  @Input() title?: string;
  @Input() image?: string;
  @Input() text?: string;
  @Input() id?: string;

  public isAdmin?: boolean;

  constructor(
    private authService: AuthService,
    private dataService: DataService) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.isAdmin = this.authService.isAdmin();
    }
  }

  removePost() {
    if (this.id != null) {
      this.dataService.removePost(this.id).subscribe(response => {
      }, error => {});
    }
    window.location.reload(); 
  }
}
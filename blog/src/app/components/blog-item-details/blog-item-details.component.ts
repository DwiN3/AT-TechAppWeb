import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataService} from "../../services/data.service";
import { AuthService } from '../../services/auth/auth.service';
import {HttpClientModule} from "@angular/common/http";
import { CommonModule } from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'blog-item-details',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  providers: [DataService],
  templateUrl: './blog-item-details.component.html',
  styleUrl: './blog-item-details.component.css'
})
export class BlogItemDetailsComponent implements OnInit {
  public image: string = '';
  public text: string = '';
  public title: string = '';
  public id: string = '';

  public isAdmin?: boolean;

  constructor(
    private service: DataService, 
    private route: ActivatedRoute,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.isAdmin = this.authService.isAdmin();
    }

    this.route.paramMap
      .subscribe((params: any) => {
        this.id = params.get('id');
        console.log("ID: "+this.id)
      });

    this.service.getById(this.id).subscribe((res: any) => {
      const post = res;
      this.title = post['title'];
      this.image = post['image'];
      this.text = post['text'];
    });
  }

  removePost() {
    if (this.id != null) {
      this.service.removePost(this.id).subscribe(response => {
      }, error => {
        console.error('Error removing post', error);
      });
      this.router.navigate(['/blog']);
    }
  }
}
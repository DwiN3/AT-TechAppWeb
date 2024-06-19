import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {DataService} from "../../services/data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-blog-add-item',
  standalone: true,
  imports: [ FormsModule ],
  templateUrl: './blog-add-item.component.html',
  styleUrl: './blog-add-item.component.css'
})
export class BlogAddItemComponent {
  post = {
    title: '',
    image: '',
    text: ''
  };
  constructor(private dataService: DataService, private router: Router) {}

  addPost() {
    this.dataService.addPost(this.post).subscribe(response => {
      this.router.navigate(['/']);
    }, error => {
      console.error('Error adding post', error);
    });
  }

}

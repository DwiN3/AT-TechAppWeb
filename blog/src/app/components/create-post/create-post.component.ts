import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {DataService} from "../../services/data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent {
  post = {
    title: '',
    image: '',
    text: ''
  };
  constructor(private dataService: DataService, private router: Router) {}

  addPost() {
    this.dataService.addPost(this.post).subscribe(response => {
      this.router.navigate(['/blog']);
    }, error => {
      console.error('Error adding post', error);
    });
  }
}

import { Component, Renderer2 } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { DataService } from "../../services/data.service";
import { Router } from "@angular/router";
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  post = {
    title: '',
    image: '',
    text: ''
  };
  imageUrl: string | undefined;

  constructor(private dataService: DataService, private router: Router, private renderer: Renderer2, private cdr: ChangeDetectorRef) {}

  addPost() {
    this.dataService.addPost(this.post).subscribe(response => {
      this.router.navigate(['/blog']);
    }, error => {
      console.error('Error adding post', error);
    });
  }

  displayImage() {
    this.imageUrl = this.post.image;
    this.updateImageSrc();
    this.cdr.detectChanges();
  }

  updateImageSrc() {
    const imgElement = document.querySelector('.image-container img');
    if (imgElement) {
      this.renderer.setAttribute(imgElement, 'src', this.imageUrl || '');
    }
  }
}

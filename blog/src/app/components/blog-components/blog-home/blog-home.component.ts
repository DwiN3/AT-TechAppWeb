import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { SearchBarComponent } from "../../search-bar/search-bar.component";
import { BlogComponent } from "../blog/blog.component";

@Component({
  selector: 'blog-home',
  standalone: true,
  imports: [HttpClientModule, SearchBarComponent, BlogComponent],
  providers: [],
  templateUrl: './blog-home.component.html',
  styleUrl: './blog-home.component.css'
})
export class BlogHomeComponent implements OnInit {

  public filterText: string = '';

  constructor() {}

  ngOnInit(): void {}

  getName($event: string): void {
    this.filterText = $event;
  }
}
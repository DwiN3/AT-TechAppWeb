import {Component, Input, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {BlogItemComponent} from"../blog-item/blog-item.component";
import {CommonModule} from "@angular/common";
import { FilterTextPipe } from '../../pipes/filter-text.pipe';
import {HttpClientModule} from "@angular/common/http";
import { SearchBarComponent } from '../../shared/search-bar/search-bar.component';

@Component({
  selector: 'blog',
  standalone: true,
  imports: [HttpClientModule, BlogItemComponent, CommonModule, SearchBarComponent, FilterTextPipe],
  providers: [DataService],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})

export class BlogComponent implements OnInit {
  public items$: any;
  @Input() filterText: string = '';

  constructor(private service: DataService) {}
  
  ngOnInit() {
    this.getAll();
  }
  
  getAll(){
    this.service.getAll().subscribe(response => {
      this.items$ = response;
    });
  }
}
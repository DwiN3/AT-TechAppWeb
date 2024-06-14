import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BlogHomeComponent } from './components/blog-home/blog-home.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BlogHomeComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
}
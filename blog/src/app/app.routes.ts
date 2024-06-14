import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BlogHomeComponent } from './components/blog-home/blog-home.component';
import { BlogItemDetailsComponent } from './components/blog-item-details/blog-item-details.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'blog',
        component: BlogHomeComponent
    },
    {
        path: 'blog/detail/:id',
        component: BlogItemDetailsComponent
    }
];
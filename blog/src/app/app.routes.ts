import { Routes } from '@angular/router';
import { BlogItemDetailsComponent } from './components/blog-item-details/blog-item-details.component';

export const routes: Routes = [
    {
        path: 'blog/detail/:id',
        component: BlogItemDetailsComponent
    }        
];
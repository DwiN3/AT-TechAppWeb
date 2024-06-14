import {Routes} from '@angular/router';
import {BlogItemDetailsComponent} from "./components/blog-item-details/blog-item-details.component";
import {BlogHomeComponent} from "./components/blog-home/blog-home.component";
import {HomeComponent} from "./components/home/home.component";
import {authGuard} from "./services/auth.guard";

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'blog',
        component: BlogHomeComponent,
        canActivate: [authGuard]
    },
    {
        path: 'blog/detail/:id',
        component: BlogItemDetailsComponent
    }
];
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { AboutComponent } from './about/about.component';
import { SearchComponent } from './search/search.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'category/:name', component: CategoryComponent }, 
  { path: 'about', component: AboutComponent },
  { path: 'search', component: SearchComponent },
];

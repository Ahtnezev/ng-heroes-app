import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { HeroesPageComponent } from '../auth/pages/hero-page/hero-page.component';

// localhost:4200/heroes
const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'new-hero',   component: NewPageComponent },
      { path: 'search',     component: SearchPageComponent },
      { path: 'edit/:id',   component: NewPageComponent },
      { path: 'list',       component: ListPageComponent },
      { path: ':id',        component: HeroesPageComponent }, // colocar al final porque si lo ponemos al principio cualquier ruta va a entrar
      { path: '**',         redirectTo: 'list' }, //
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
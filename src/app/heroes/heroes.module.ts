import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { HeroesRoutingModule } from './heroes-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { MaterialModule } from '../material/material.module';
import { CardComponent } from './components/card/card.component';
import { HeroImagePipe } from './pipes/heroImage.pipe';
import { HeroesPageComponent } from '../auth/pages/hero-page/hero-page.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    LayoutPageComponent,
    ListPageComponent,
    NewPageComponent,
    SearchPageComponent,
    CardComponent,
    HeroesPageComponent,
    ConfirmDialogComponent,

    // Pipes
    HeroImagePipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule, // -> FormControl -> search-page-component
    HeroesRoutingModule,
    MaterialModule
  ]
})
export class HeroesModule { }

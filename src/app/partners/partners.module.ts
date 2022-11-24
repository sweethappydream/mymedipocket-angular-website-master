import { PartnersComponent } from './partners.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: '', component: PartnersComponent }
]

@NgModule({
  declarations: [PartnersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PartnersModule { }

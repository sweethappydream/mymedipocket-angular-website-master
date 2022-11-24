import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutMainComponent } from './about-main/about-main.component';

const routes: Routes = [
  { path: '', component: AboutMainComponent }
]

@NgModule({
  declarations: [AboutMainComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AboutModule { }

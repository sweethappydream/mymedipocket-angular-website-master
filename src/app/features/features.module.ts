import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesMainComponent } from './features-main/features-main.component';

const routes: Routes = [
  { path: '', component: FeaturesMainComponent }
]

@NgModule({
  declarations: [FeaturesMainComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class FeaturesModule { }

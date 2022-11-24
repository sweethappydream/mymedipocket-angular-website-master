import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NoCommaPipe } from './../no-comma.pipe';
import { Routes, RouterModule } from '@angular/router';
import { SavingsFinderStepThreeComponent } from './../savings-finder-step-three/savings-finder-step-three.component';
import { SavingsFinderStepTwoComponent } from './../savings-finder-step-two/savings-finder-step-two.component';
import { SavingsFinderStepOneComponent } from './../savings-finder-step-one/savings-finder-step-one.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SavingsFinderStepFourComponent } from '../savings-finder-step-four/savings-finder-step-four.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'step1', pathMatch: 'full' },
      { path: 'step1', component: SavingsFinderStepOneComponent },
      { path: 'step2', component: SavingsFinderStepTwoComponent },
      { path: 'step3', component: SavingsFinderStepThreeComponent },
      { path: 'step4', component: SavingsFinderStepFourComponent }
    ]
  },
  
];

@NgModule({
  declarations: [
    NoCommaPipe,
    SavingsFinderStepOneComponent,
    SavingsFinderStepTwoComponent,
    SavingsFinderStepThreeComponent,
    SavingsFinderStepFourComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ]
})
export class SavingStepsModule { }

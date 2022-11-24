import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingsFinderStepFourComponent } from './savings-finder-step-four.component';

describe('SavingsFinderStepFourComponent', () => {
  let component: SavingsFinderStepFourComponent;
  let fixture: ComponentFixture<SavingsFinderStepFourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavingsFinderStepFourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavingsFinderStepFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

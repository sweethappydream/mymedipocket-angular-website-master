import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingsFinderStepOneComponent } from './savings-finder-step-one.component';

describe('SavingsFinderStepOneComponent', () => {
  let component: SavingsFinderStepOneComponent;
  let fixture: ComponentFixture<SavingsFinderStepOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavingsFinderStepOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavingsFinderStepOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

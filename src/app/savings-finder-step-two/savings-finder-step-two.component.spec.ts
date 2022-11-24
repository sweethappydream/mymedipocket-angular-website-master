import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingsFinderStepTwoComponent } from './savings-finder-step-two.component';

describe('SavingsFinderStepTwoComponent', () => {
  let component: SavingsFinderStepTwoComponent;
  let fixture: ComponentFixture<SavingsFinderStepTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavingsFinderStepTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavingsFinderStepTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

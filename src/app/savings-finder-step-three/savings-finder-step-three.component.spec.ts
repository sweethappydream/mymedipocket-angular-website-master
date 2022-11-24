import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingsFinderStepThreeComponent } from './savings-finder-step-three.component';

describe('SavingsFinderStepThreeComponent', () => {
  let component: SavingsFinderStepThreeComponent;
  let fixture: ComponentFixture<SavingsFinderStepThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavingsFinderStepThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavingsFinderStepThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

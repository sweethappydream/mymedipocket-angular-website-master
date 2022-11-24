import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturesMainComponent } from './features-main.component';

describe('FeaturesMainComponent', () => {
  let component: FeaturesMainComponent;
  let fixture: ComponentFixture<FeaturesMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturesMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturesMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

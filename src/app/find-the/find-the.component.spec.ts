import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindTheComponent } from './find-the.component';

describe('FindTheComponent', () => {
  let component: FindTheComponent;
  let fixture: ComponentFixture<FindTheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindTheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindTheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

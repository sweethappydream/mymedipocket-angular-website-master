import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchLowestPriceComponent } from './search-lowest-price.component';

describe('SearchLowestPriceComponent', () => {
  let component: SearchLowestPriceComponent;
  let fixture: ComponentFixture<SearchLowestPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchLowestPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchLowestPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

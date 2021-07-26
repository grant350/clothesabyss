import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSliderMainComponent } from './product-slider-main.component';

describe('ProductSliderMainComponent', () => {
  let component: ProductSliderMainComponent;
  let fixture: ComponentFixture<ProductSliderMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSliderMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSliderMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

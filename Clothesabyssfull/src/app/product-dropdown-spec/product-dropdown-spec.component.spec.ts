import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDropdownSpecComponent } from './product-dropdown-spec.component';

describe('ProductDropdownSpecComponent', () => {
  let component: ProductDropdownSpecComponent;
  let fixture: ComponentFixture<ProductDropdownSpecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDropdownSpecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDropdownSpecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

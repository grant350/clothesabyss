import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductaddFormComponent } from './productadd-form.component';

describe('ProductaddFormComponent', () => {
  let component: ProductaddFormComponent;
  let fixture: ComponentFixture<ProductaddFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductaddFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductaddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

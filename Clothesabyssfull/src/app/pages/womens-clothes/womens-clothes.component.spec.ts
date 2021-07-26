import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WomensClothesComponent } from './womens-clothes.component';

describe('WomensClothesComponent', () => {
  let component: WomensClothesComponent;
  let fixture: ComponentFixture<WomensClothesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WomensClothesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WomensClothesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

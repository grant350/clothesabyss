import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MensClothesComponent } from './mens-clothes.component';

describe('MensClothesComponent', () => {
  let component: MensClothesComponent;
  let fixture: ComponentFixture<MensClothesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MensClothesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MensClothesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

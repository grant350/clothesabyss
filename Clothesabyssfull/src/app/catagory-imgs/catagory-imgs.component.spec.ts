import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatagoryImgsComponent } from './catagory-imgs.component';

describe('CatagoryImgsComponent', () => {
  let component: CatagoryImgsComponent;
  let fixture: ComponentFixture<CatagoryImgsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatagoryImgsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatagoryImgsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

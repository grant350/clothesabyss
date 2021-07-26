import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgSizerItemComponent } from './img-sizer-item.component';

describe('ImgSizerItemComponent', () => {
  let component: ImgSizerItemComponent;
  let fixture: ComponentFixture<ImgSizerItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgSizerItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgSizerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

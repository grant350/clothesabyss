import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutFrow1Component } from './about-frow1.component';

describe('AboutFrow1Component', () => {
  let component: AboutFrow1Component;
  let fixture: ComponentFixture<AboutFrow1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutFrow1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutFrow1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

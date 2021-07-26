import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutFrow2Component } from './about-frow2.component';

describe('AboutFrow2Component', () => {
  let component: AboutFrow2Component;
  let fixture: ComponentFixture<AboutFrow2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutFrow2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutFrow2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

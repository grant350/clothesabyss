import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalAddPageComponent } from './global-add-page.component';

describe('GlobalAddPageComponent', () => {
  let component: GlobalAddPageComponent;
  let fixture: ComponentFixture<GlobalAddPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalAddPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalAddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

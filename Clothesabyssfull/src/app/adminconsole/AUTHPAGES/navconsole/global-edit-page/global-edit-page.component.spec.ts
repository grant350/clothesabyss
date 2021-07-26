import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalEditPageComponent } from './global-edit-page.component';

describe('GlobalEditPageComponent', () => {
  let component: GlobalEditPageComponent;
  let fixture: ComponentFixture<GlobalEditPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalEditPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesDataPageComponent } from './sales-data-page.component';

describe('SalesDataPageComponent', () => {
  let component: SalesDataPageComponent;
  let fixture: ComponentFixture<SalesDataPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesDataPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesDataPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

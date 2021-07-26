import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickDataComponent } from './pick-data.component';

describe('PickDataComponent', () => {
  let component: PickDataComponent;
  let fixture: ComponentFixture<PickDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

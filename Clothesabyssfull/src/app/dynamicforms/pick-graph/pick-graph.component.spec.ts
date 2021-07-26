import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickGraphComponent } from './pick-graph.component';

describe('PickGraphComponent', () => {
  let component: PickGraphComponent;
  let fixture: ComponentFixture<PickGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

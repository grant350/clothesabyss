import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartmakerComponent } from './chartmaker.component';

describe('ChartmakerComponent', () => {
  let component: ChartmakerComponent;
  let fixture: ComponentFixture<ChartmakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartmakerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartmakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

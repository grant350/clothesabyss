import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrowComponent } from './frow.component';

describe('FrowComponent', () => {
  let component: FrowComponent;
  let fixture: ComponentFixture<FrowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

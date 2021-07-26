import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralmapmakerComponent } from './generalmapmaker.component';

describe('GeneralmapmakerComponent', () => {
  let component: GeneralmapmakerComponent;
  let fixture: ComponentFixture<GeneralmapmakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralmapmakerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralmapmakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaddDataComponent } from './mapadd-data.component';

describe('MapaddDataComponent', () => {
  let component: MapaddDataComponent;
  let fixture: ComponentFixture<MapaddDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapaddDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaddDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakegraphComponent } from './makegraph.component';

describe('MakegraphComponent', () => {
  let component: MakegraphComponent;
  let fixture: ComponentFixture<MakegraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakegraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakegraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

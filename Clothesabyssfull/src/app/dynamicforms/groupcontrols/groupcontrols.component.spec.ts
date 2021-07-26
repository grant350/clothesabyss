import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupcontrolsComponent } from './groupcontrols.component';

describe('GroupcontrolsComponent', () => {
  let component: GroupcontrolsComponent;
  let fixture: ComponentFixture<GroupcontrolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupcontrolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupcontrolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
